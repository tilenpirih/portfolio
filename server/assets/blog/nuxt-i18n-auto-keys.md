Astral8 is a fire department management platform — a Nuxt 4 frontend against a Laravel API, roughly 700 components, every single string in it translatable. For about a year, translations were the most tedious part of working on it. Not the translating. The *keys*.

This is what I replaced them with: one script, run on demand, that reads the source, decides where every string lives, and rewrites the code and the locale files to match. Nobody names a key. Nobody opens a locale file. The English sentence **is** the key.

## The part nobody enjoys

The old setup was conventional and, on paper, tidy. Laravel's `lang` files were the source of truth:

```php
<?php

return [
    'home'                                    => 'Home',
    'administration'                          => 'Administration',
    'email_address'                           => 'Email address',
    'keep_visible_until'                      => 'Keep visible until',
    // ...roughly 900 more
];
```

A Node script parsed those PHP arrays into `types/translations.d.ts` so the frontend got autocomplete on key names, and a Docker container watched the directory to regenerate the types whenever anyone touched them.

So adding one label to a modal went like this: open `general.php` — or was it `dashboard.php`, or `forms.php`? — invent a key name, add it, save, wait for the watcher, then write `$t('general.keep_visible_until')` in the component.

Four things went wrong, all of them predictably:

- **Naming is a decision, and it got made thirty times a day by different people.** We ended up with `general.save`, `forms.save_btn` and `dashboard.save_changes`, all rendering the word *Save*.
- **The template stopped telling you what the UI says.** `$t('dashboard.add_notes_modal_description')` — you have to go look that up to know what the user reads.
- **Deleting a feature never deleted its strings.** Lang files only ever grew.
- **Duplicates were invisible.** You cannot see that *Save* already exists six times under six names.

None of that is translation work. It's bookkeeping, and it was costing more than the translating.

## The rule change

One rule replaced all of it: **the sentence in the default locale is the key**.

```vue
{{ t('Keep visible until') }}
```

No namespace, no naming decision, no lookup to find out what renders. vue-i18n does not care what a key looks like — it is just a string — so in `en` the "translation" is the identity mapping, and every other locale maps that sentence to its own.

Here is a real component from the migration commit, before and after:

```diff
 const emit = defineEmits<{
     (e: 'noteCreated'): void;
 }>();
-
+const { t } = useI18n({ useScope: 'local' });
+const { t: tg } = useI18n({ useScope: 'global' });
 const modalRef = useTemplateRef('modalRef');

         <template #title>
-            {{ $t('dashboard.add_notes') }}
+            {{ tg('Add notes') }}
         </template>

         <template #description>
-            {{ $t('dashboard.add_notes_modal_description') }}
+            {{ t('Keep everyone in the loop with notes.') }}
         </template>

-                            :label="$t('general.priority')"
+                            :label="tg('Priority')"

-                            :label="$t('general.keep_visible_until')" />
+                            :label="tg('Keep visible until')" />
+
+<i18n lang="json">
+{
+    "en": {
+        "Keep everyone in the loop with notes.": "Keep everyone in the loop with notes."
+    }
+}
+</i18n>
```

The important part of that diff is what I *didn't* write. I did not choose `tg` for *Add notes* and `t` for *Keep everyone in the loop with notes.* I did not add the two `useI18n` lines, and I did not write the `<i18n>` block at the bottom. All of that is the script's output. When I write a component, every call is a bare `t('...')` and I never think about scope at all.

## One command

```bash
npm run i18n:extract
```

That walks `components`, `composables`, `pages`, `layouts`, `middleware`, `plugins`, `stores`, `utils`, `constants` and `workers`, and on every run it:

1. collects every string literal passed to `t()`, `$t()`, `tg()` or an `<I18nT keypath="…">`;
2. counts, per key, how many distinct components use it;
3. decides where the key lives — the component's own `<i18n>` block, or the shared catalog in `i18n/locales/<locale>.json`;
4. rewrites each call site to the composer matching that decision (`t` for local, `tg` for global) and injects only the `useI18n` lines the file actually needs;
5. writes the key itself as the default-locale value, and `TODO_TRANSLATION: <key>` for every other locale;
6. prunes keys that nothing references any more, from both homes.

The output is a per-file log and a summary:

```bash
  ok       components/admin/modals/SetUserRoleModal.vue  (block: 2) (→public: 2)
  updated  components/dashboard/RemindersWidget.vue  (block: 1)
  scanned  utils/enumLabels.ts  (global: 41)
  ok       i18n/locales/en.json  (1245 keys)

Public now (threshold 3, 5487 call site(s) resolve to the catalog): Add, Add document, …

Done — 0 file(s) changed. Catalog: 1245 public key(s) across en (default: en).
```

Two things about that run are worth pointing at. It took **0.42 seconds** across 705 components — it is plain Node, no build step, no watcher, no container. And it reported **0 files changed**, because the previous run already left everything where it belongs. A script that rewrites your source has to be idempotent or it is unusable; that property is not free, and part four is largely about paying for it.

## What it feels like day to day

Write the string in English. Run the command. Commit whatever it changed.

That is the entire workflow. Things I have not done since the migration: name a key, open a locale file to add one, hunt for whether a string already exists, or delete a dead key.

## Where astral8 stands

| Today | |
|---|---|
| Components scanned | 705 |
| With their own `<i18n>` block | 427 |
| Keys in the shared catalog | 1,245 |
| Key usages resolved through the catalog | 5,487 |
| The migration commit | 635 files, +17,751 / −13,602 |

That commit also deleted things: the PHP lang files as the frontend's source of truth, the `translations.d.ts` generator, the shell scripts around it, and the Docker container that watched for changes. All of it replaced by one 700-line file with no dependencies beyond `node:fs`.

## The obvious objection

**"If the sentence is the key, changing the copy breaks the key."**

Yes. Edit the English and you have created a new key; the old one is pruned on the next run and the new one arrives with fresh `TODO_TRANSLATION` placeholders in every other locale.

I decided that is the correct behaviour rather than a flaw. If the English sentence changed enough to matter, the Slovenian one is now wrong too — a key-based system would have quietly kept serving the stale translation under the unchanged key name. Here the diff makes it loud: reviewers see the string appear and the old one disappear. The price is that fixing a typo costs a re-translation, which is real, and which I pay.

**"What about the same word meaning two different things?"** *Close* the verb on a button and *close* the adjective in a proximity label are one key here. That one has an actual answer rather than a shrug, and it is the subject of the next part.

## The code

The idea, in a minimal Nuxt app you can read in one sitting, is on GitHub: [nuxt-i18n-auto-generate-keys](https://github.com/tilenpirih/nuxt-i18n-auto-generate-keys). Same design — value-as-key, local blocks, promotion at three usages, `TODO_TRANSLATION`, export/import round trip.

The version running astral8 has moved further: the `tg` composer, `<I18nT keypath>` support, carrying hand-written `useI18n` destructuring through a rewrite, cleaning up a legacy `t: $t` alias. Read the repo for the shape of the thing; the next three parts are about the production one.
