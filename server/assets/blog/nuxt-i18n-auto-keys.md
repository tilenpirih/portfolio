Every Nuxt app that ships in more than one language ends up with the same file — `i18n/locales/en.json`, a thousand entries deep, organised by a convention nobody ever wrote down:

```json
{
    "general": { "save": "Save", "close": "Close" },
    "dashboard": {
        "add_notes": "Add notes",
        "add_notes_modal_description": "Keep everyone in the loop with notes."
    },
    "forms": { "save_btn": "Save" }
}
```

I maintained one of those for a year on a Nuxt 4 app with roughly 700 components, every string in it translatable. The translating was never the tedious part. The **keys** were.

- **Naming is a decision**, and it got made thirty times a day by different people. We ended up with `general.save`, `forms.save_btn` and `dashboard.save_changes`, all rendering the word *Save*.
- **The template stops telling you what the UI says.** `$t('dashboard.add_notes_modal_description')` — you have to go and look that up to know what the user reads.
- **Deleting a feature never deletes its strings.** The locale file only ever grows.
- **Duplicates are invisible.** You cannot see that *Save* already exists six times under six names.

None of that is translation work. It is bookkeeping, and it was costing more than the translating.

So I replaced it with one script, run on demand, that reads the source, decides where every string lives, and rewrites both the components and the locale files to match. Nobody names a key. Nobody opens a locale file. The English sentence **is** the key.

The whole idea sits in a minimal Nuxt 4 app you can read in one sitting: **[nuxt-i18n-auto-generate-keys](https://github.com/tilenpirih/nuxt-i18n-auto-generate-keys)**. Every snippet below is from that repo — clone it, run the command, watch it rewrite your components.

## The rule: the sentence is the key

One rule replaces the naming convention: **the string in the default locale is the key**.

```vue
<template>
    <p>{{ t('Keep everyone in the loop with notes.') }}</p>
</template>
```

No namespace, no naming decision, no lookup to find out what renders. vue-i18n does not care what a key looks like — it is just a string — so in `en` the "translation" is the identity mapping, and every other locale maps that sentence to its own.

Here is what the migration looked like in a real component:

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

The important part of that diff is what I *didn't* write. I did not choose `tg` for *Add notes* and `t` for *Keep everyone in the loop with notes.* I did not add the two `useI18n` lines, and I did not write the `<i18n>` block at the bottom. All of that is the script's output.

When I write a component, every call is a bare `t('...')` and I never think about scope at all:

```vue
<!-- write this — no useI18n(), no imports, no key naming -->
<template>
    <p>{{ t('Goodbye') }}</p>
</template>
```

## One command

```bash
pnpm i18n:extract
```

That walks the source tree and on every run it:

1. collects every string literal passed to `t()`, `$t()`, `tg()` or an `<I18nT keypath="…">`;
2. counts, per key, how many distinct components use it;
3. decides where the key lives — the component's own `<i18n>` block, or the shared catalog in `i18n/locales/<locale>.json`;
4. rewrites each call site to the composer matching that decision, and injects only the `useI18n` lines the file actually needs;
5. writes the key itself as the default-locale value, and `TODO_TRANSLATION: <key>` for every other locale;
6. prunes keys that nothing references any more, from both homes.

The component above comes back like this:

```vue
<script setup lang="ts">
const { t } = useI18n({ useScope: 'local' });
</script>

<template>
    <p>{{ t('Goodbye') }}</p>
</template>

<i18n lang="json">
{
    "en": { "Goodbye": "Goodbye" },
    "sl": { "Goodbye": "TODO_TRANSLATION: Goodbye" }
}
</i18n>
```

The output is a per-file log and a summary. This is the example repo, which is deliberately tiny:

```bash
  ok       app/components/Greeting.vue  (block: 1) (→public: 2)
  ok       app/components/SwitchLanguage.vue  (block: 0)
  ok       app/components/Toolbar.vue  (block: 1) (→public: 2)
  ok       app/components/UserCard.vue  (block: 1) (→public: 2)
  ok       app/pages/index.vue  (block: 1)
  scanned  app/composables/composableExample.ts  (global: 1)
  scanned  app/utils/utilsExample.ts  (global: 1)
  ok       i18n/locales/en.json  (4 keys)
  ok       i18n/locales/sl.json  (4 keys)

Public now (threshold 3, 6 call site(s) resolve to the catalog): Close, Save

Done — 0 file(s) changed. Catalog: 4 public key(s) across en, sl (default: en).
```

On the production app the same run takes **0.42 seconds** across 705 components — it is plain Node against `node:fs`, no build step, no watcher, no plugin pipeline. And it reports **0 files changed**, because the previous run already left everything where it belongs. A script that rewrites your source has to be idempotent or it is unusable; that property is not free, and a good chunk of this post is about paying for it.

## Two homes for a string

vue-i18n gives a Vue SFC its own message catalog through an `<i18n>` block, resolved by a composer created with `useScope: 'local'`:

```vue
<i18n lang="json">
{
    "en": { "Goodbye": "Goodbye" },
    "sl": { "Goodbye": "Nasvidenje" }
}
</i18n>
```

And it gives the app a shared catalog — for `@nuxtjs/i18n`, the files in `i18n/locales/*.json` — resolved by the global composer.

Both are useful, for opposite reasons:

| | Local `<i18n>` block | Shared catalog |
|---|---|---|
| Good for | one-off strings | strings used all over |
| Lives | next to the markup that renders it | in one file |
| Deleting the component | takes the string with it | leaves the key behind |
| Translating *Save* | once per component that uses it | once |

Put everything in blocks and you translate *Cancel* two hundred times. Put everything in the catalog and it becomes the same unnavigable file I was trying to get rid of — several thousand entries, every one-off validation message among them.

So the split is worth having. It is just not worth *deciding*, string by string, by hand.

## The usage count decides which

The rule is one line long: a key used in **three or more distinct components** is public and lives in the catalog; anything below that is local and lives in the components' own blocks.

```js
const PROMOTE = {
    enabled: true,
    // N: a local key (with identical values) used in this many DISTINCT .vue
    // components is moved to the shared public catalog. Higher keeps more
    // strings local; 2 shares aggressively.
    threshold: 3,
    requireTranslated: false,
};
```

Three is a guess that has held up. Two promotes too eagerly — two components sharing a word is often a coincidence, and the pair frequently wants to diverge later. Five leaves too much duplication in the blocks. It is a CLI flag precisely because I did not want to defend the number:

```bash
pnpm i18n:extract --threshold=5         # go public only at 5+ components
pnpm i18n:extract --no-promote          # never promote; every bare `t` stays local
pnpm i18n:extract --require-translated  # only promote keys that are actually translated
```

What matters more than the number is that the decision is **re-derived from scratch on every run**, never stored. There is no "this key is global now" flag anywhere. That is what makes it work in both directions:

- add a third usage of *Assign to* → next run, it moves into the catalog and disappears from the two blocks that had it;
- delete a usage and drop back to two → next run, it leaves the catalog and reappears in the blocks of whatever still uses it, translations intact.

Commented-out code does not count. The scan strips comments from its working copy first, so a `<!-- {{ t('Save') }} -->` left behind during a refactor cannot hold a key in the catalog:

```js
// Strip comments before scanning for `t(` calls, so a commented-out usage
// (e.g. `<!-- {{ t('Save') }} -->`) no longer counts toward a key's usage.
// Only the *scan copy* is stripped; files are never written from this.
function stripComments(source) {
    return source
        .replace(/<!--[\s\S]*?-->/g, '')  // <!-- HTML / template comments -->
        .replace(/\/\*[\s\S]*?\*\//g, '') // /* block comments */
        .replace(/\/\/[^\n]*/g, '');      // // line comments
}
```

## Who writes `tg`? Not you

A local key has to be resolved by a local composer and a public key by the global one, which in a component that uses both means two composers and two different function names. That is bookkeeping again — so the script does it.

I write every call as a bare `t('...')`. The script rewrites each one to `t` or `tg` depending on where that key ended up, then injects exactly the declarations the file needs. Here is [Toolbar.vue](https://github.com/tilenpirih/nuxt-i18n-auto-generate-keys/blob/main/app/components/Toolbar.vue) as it sits in the repo after a run:

```vue
<script setup lang="ts">
const { t } = useI18n({ useScope: 'local' });      // ← injected: 'Refresh' is local
const { t: tg } = useI18n({ useScope: 'global' }); // ← injected: 'Save'/'Close' went public
</script>

<template>
    <nav>
        <button>{{ t('Refresh') }}</button>
        <button>{{ tg('Save') }}</button>
        <button>{{ tg('Close') }}</button>
    </nav>
</template>

<i18n lang="json">
{
    "en": { "Refresh": "Refresh" },
    "sl": { "Refresh": "Osveži" }
}
</i18n>
```

*Save* and *Close* are used across three components, so they resolve against the catalog through `tg`. *Refresh* exists nowhere else, so it sits in the toolbar's own block and resolves through `t`. If *Refresh* later shows up in a third component, the next run moves it to the catalog, flips those call sites to `tg`, and shrinks the block — and if the block empties completely, it removes the block and the now-unused `const { t } = …` line with it.

The rewrite is idempotent by construction: a call already on the right composer rewrites to itself.

```js
function rewriteCalls(body, globalKeys, localKeys, includeDollar) {
    const fns = includeDollar ? 't|tg|\\$t' : 't|tg';
    const re = new RegExp(`(?<![\\w$.])(?:${fns})\\(\\s*(['"\`])((?:\\\\.|(?!\\1).)*?)\\1`, 'g');
    return body.replace(re, (m, _q, raw) => {
        const key = unescapeKey(raw);
        const want = globalKeys.has(key) && !localKeys.has(key) ? 'tg' : 't';
        return m.replace(/^(?:t|tg|\$t)\(/, `${want}(`);
    });
}
```

## Keys that are global no matter what

Three cases skip the vote entirely.

**`$t('…')`** — reach for the global helper explicitly and the key is public, no counting.

**Any `t('…')` in a `.ts` file.** A composable, store or util cannot own an `<i18n>` block, so its strings have nowhere local to live. The repo ships a thin `$t()` wrapper for exactly this, auto-imported from `app/utils/i18n.ts`:

```ts
export function $t(
    key: string,
    values?: number | string | unknown[] | Record<string, unknown>,
    options?: TranslateOptions,
): string {
    return useNuxtApp().$i18n.t(key, values as any, options as any);
}
```

```ts
// app/composables/composableExample.ts
export function translationKeyInComposable() {
    return $t('Translation key in composable');
}
```

**`<I18nT keypath="…">`** — vue-i18n's component for slot interpolation. Its keys always live in the catalog, and the script pins the tag's scope to match, because leaving it implicit is a subtle papercut:

```js
// Pin `<I18nT keypath="…">` to the shared catalog, where its keys always live.
// Unlike `t`/`tg`, <I18nT> is a COMPONENT: with no explicit scope it resolves
// against the nearest local composer — its own, or one inherited from an
// ancestor — so a catalog key reads as missing and vue-i18n logs a missing-key +
// root-fallback warning on every render (or "Not found parent scope" when no
// local composer is in the tree). The text renders correctly either way; this
// just silences the noise. An existing scope="…" is the author's call, untouched.
function scopeKeypathTags(body) {
    return body.replace(I18NT_TAG, tag => {
        if (!/\bkeypath\s*=\s*['"]/.test(tag) || /\bscope\s*=/.test(tag)) return tag;
        return tag.replace(/^<(?:I18nT|i18n-t)\b/i, '$& scope="global"');
    });
}
```

Being in the catalog on disk, though, is deliberately *not* one of these cases. If it were, nothing could ever demote.

## The same word, two meanings

This is the objection value-as-key always gets, and it has a real answer: **promotion compares values, not keys.**

Every usage of a key carries a full set of per-locale values — the component's block override if it has one, else the catalog value, else a fresh default. The public value is the most common *fully translated* one; components that give the key a *different translated* value are not counted toward the tally, and keep their own local copy, which their local `t` resolves ahead of the catalog.

```js
const analyse = (key, usages) => {
    const bySig = new Map(); // sig -> { values, count }
    let untranslated = 0;
    for (const u of usages) {
        if (!hasAnyTranslation(u.values)) { untranslated++; continue; }
        const sig = sigOf(u.values);
        const e = bySig.get(sig) || { values: u.values, count: 0 };
        e.count++;
        bySig.set(sig, e);
    }
    // …most common signature wins; untranslated usages go along with it
};
```

The example repo ships that exact case live. *Close* is a button in three components — `"Zapri"` — and a distance on the index page:

```vue
<!-- app/pages/index.vue -->
<template>
    <!-- "Close" here means proximity, not "dismiss" — see the sl override below. -->
    <p>{{ t('Close') }}</p>
</template>

<i18n lang="json">
{
    "en": { "Close": "Close" },
    "sl": { "Close": "Blizu" }
}
</i18n>
```

`"Zapri"` goes public and the odd one out keeps its local `"Blizu"`, resolved through `t` instead of `tg`. Nothing is lost and nothing is silently merged. When two different values tie, the run prints a warning and takes the more common one rather than guessing quietly.

Two caveats fall out of this:

- **Non-default locales only.** Value-as-key means the default locale's value *is* the key, so it cannot diverge. Writing `"Save": "Save but different"` in a block is not an override — it collapses back to `Save`. Two different English strings are two different keys, by definition.
- **Untranslated placeholders never override.** A `TODO_TRANSLATION:` value is "no meaning yet", so it goes along with the majority rather than competing with it. Brand-new duplicates of an ambiguous word look identical only because nobody has translated them yet. Pass `--require-translated` if you would rather nothing is promoted until a human has committed to a meaning.

Promotion and demotion move a key between files, and the translations have to travel with it or the whole thing is a data-loss machine. One function decides every value that gets written, in either direction:

```js
// Pick the best value for one locale: a real translation beats a TODO/empty
// placeholder, and `primary` (the key's own home) beats `secondary` (a value
// carried over when a key moves between local and public).
function chooseValue(code, key, primary, secondary) {
    if (code === defaultLocale) return key;
    if (isTranslated(primary)) return primary;
    if (isTranslated(secondary)) return secondary;
    return valueFor(code, key, primary || secondary);
}
```

A real translation always beats a placeholder, so a round trip out to the catalog and back cannot downgrade finished work into a `TODO`.

## Filling in the other locales

Auto-generated keys solve the bookkeeping. They do not translate anything. After a run the default locale is finished — the value *is* the key — and every other locale is full of placeholders:

```json
{
    "Keep visible until": "TODO_TRANSLATION: Keep visible until",
    "Save changes": "TODO_TRANSLATION: Save changes"
}
```

### Why a placeholder prefix and not an empty string

`TODO_TRANSLATION: ` looks crude, and it is doing four jobs:

- **It is greppable.** "What is left to do" is one `grep -r`, not a script.
- **It collapses to one predicate.** Everything in the toolchain — promotion, export filtering, import safety — asks the same question the same way:

```js
export function isTranslated(value) {
    return value != null && value !== '' && !String(value).startsWith(TODO_PREFIX);
}
```

- **It is loud in the UI.** An empty value makes vue-i18n fall back, and a fallback is invisible: the screen shows English and looks *fine*, so nobody reports it. `TODO_TRANSLATION: Keep visible until` on a button gets reported within the hour.
- **It carries the source text.** The placeholder contains the English sentence, so a file of placeholders is already a translation request — no lookup, no second file to cross-reference.

### Export: one flat file per locale

On the production app the strings live in 427 component blocks plus a catalog. You cannot hand a translator a repository, and you cannot hand a language model 427 files and hope the `<i18n>` blocks come back well-formed.

So `i18n-export` flattens both homes into one file per locale, namespacing each key by where it came from:

```bash
pnpm i18n:export                   # everything
pnpm i18n:export --untranslated    # only what still needs work
pnpm i18n:export --untranslated sl # …just Slovenian
```

```json
{
    "app.components.Greeting-Goodbye": "Nasvidenje",
    "app.components.Toolbar-Refresh": "Osveži",
    "app.pages.index-Close": "Blizu",
    "i18n.locales-Close": "Zapri",
    "i18n.locales-Save": "Shrani"
}
```

A component block key gets the dotted file path; everything from the shared catalog gets the fixed `i18n.locales` prefix. **Edit the values, never the keys** — the keys encode where each string goes home to.

Two details make this pleasant in practice. `--untranslated` filters to keys that are missing in *at least one* non-default locale but then exports the whole row for every locale, so the default-locale file next to it is the source text a translator works from. And the location prefix is free context: `app.components.incidents.IncidentReportForm-Response` tells a translator — or a model — that this *Response* is the fire-service kind, not a survey answer. Ambiguity in a word is usually resolved by the file it lives in.

### Import: exact match, no guessing

```bash
pnpm i18n:import             # apply translated values
pnpm i18n:import --dry-run   # show what would change, write nothing
pnpm i18n:import --all       # apply everything, TODOs included
```

The flat key `app.components.AddNoteModal-Keep everyone in the loop with notes.` contains hyphens in the location, hyphens in the sentence, and a dot in the sentence too. Splitting that string is unparseable in the general case, so import does not split it. Both scripts share one module that reads the live source and builds the flat keys the same way; import rebuilds every candidate key from the current tree and matches by **exact string equality**, then writes to the target it recorded while building it.

```js
const target = targets.get(fk);
if (!target) { /* unknown key → warn and skip */ }
if (target.kind === 'block') {
    (block.messages[code] ??= {})[target.innerKey] = value;
} else {
    (catalog[code] ??= {})[target.innerKey] = value;
}
```

If a key comes back that no longer exists in the source, it is reported and skipped rather than resurrected. Deleting a translation is never something the importer decides; you delete a *usage*, and the next extract prunes the key.

By default only translated values are applied — anything still carrying the placeholder is skipped, so you can export the untranslated set, fill in half of it, and import just that half without stamping placeholders over work already done.

Both scripts serialize blocks and catalog files byte-identically to the way `i18n-extract` writes them — same locale order, same key sorting, same four-space indent. That is not cosmetic: it means an extract run immediately after an import reports **0 files changed**. Any diff there would be a bug in one of the three.

## Adding a locale

Locales are declared once, in a JSON file that both `nuxt.config.ts` and every script read:

```json
{
    "defaultLocale": "en",
    "locales": [
        { "code": "en", "name": "English", "file": "en.json" },
        { "code": "sl", "name": "Slovenščina", "file": "sl.json" }
    ]
}
```

```ts
// nuxt.config.ts
import i18nLocales from './i18n/i18n.locales.json';

export default defineNuxtConfig({
    modules: ['@nuxtjs/i18n'],
    i18n: {
        defaultLocale: i18nLocales.defaultLocale,
        strategy: 'prefix_except_default',
        locales: i18nLocales.locales,
    },
});
```

Add a line there, run extract, and every component block and the catalog grow a section for the new locale full of placeholders — correctly, everywhere, in one pass. Then export, translate, import.

## Rewriting your own source without breaking it

Most codegen writes new files. This one edits the files you wrote — 705 of them on the production app, on every run, including the ones you have open. That puts it in an uncomfortable category, and almost every design decision in the script comes from taking that seriously.

### Running it twice must change nothing

```bash
Done — 0 file(s) changed. Catalog: 1245 public key(s) across en (default: en).
```

If a second run produces a diff, the tool is unusable: every `git status` is noisy, every pull request contains churn nobody wrote, and reviewers learn to skim the parts of a diff the script owns — which is exactly where its mistakes would be.

Four things buy that property:

- **No stored decisions.** Nothing is marked "global"; placement is recomputed from usage counts every run, so there is no state to drift out of sync with the code.
- **Rewrites map to themselves.** A call already on the correct composer rewrites to the same text.
- **Canonical serialization.** Blocks and catalog files are written with locales in configured order, keys sorted, four-space indent — one possible output per input.
- **Edits in place, not appended.** When the script replaces a composer declaration it reuses the position and indentation of the line already there, rather than deleting it and inserting a fresh one after the imports.

### Hand-written code is not the script's to rewrite

The script owns two exact line shapes — the local `const { t } = useI18n({ useScope: 'local' })` and the global `const { t: tg } = useI18n({ useScope: 'global' })`. Everything else in the file belongs to whoever wrote it.

That distinction has to be encoded, not assumed:

```js
// The composer lines this script fully owns (injects / removes / re-orders): the
// local `t` and the global `tg`. A user's own destructuring with extra members
// (e.g. `const { t, locale } = ...`) does NOT match `{ t }` / `{ t: tg }`, so it
// is preserved.
const MANAGED_LINES = /[ \t]*const \{ t(?:: tg)? \} = useI18n\(\s*(?:\{\s*useScope: '(?:local|global)'[^}]*\}\s*)?\);?\n?/g;
```

A component that needs `locale` or `setLocale` — a language switcher, a date formatter — writes its own `useI18n()` call. [SwitchLanguage.vue](https://github.com/tilenpirih/nuxt-i18n-auto-generate-keys/blob/main/app/components/SwitchLanguage.vue) in the example repo is exactly that:

```vue
<script setup lang="ts">
const { locales, locale, setLocale } = useI18n();
</script>
```

The script detects it and works *around* it: it makes sure `t` is in the existing destructuring instead of adding a second declaration, gives that call local scope so the component's one-off keys resolve, and adds the global `tg` line next to it rather than at the top of the file. And where it does rebuild a line it owns, members it does not own ride along:

```js
// Members of a global composer destructuring the script does NOT manage
// (anything beyond `t` / `t: tg`), e.g. `locale`. These are user code.
function globalComposerExtras(vars) {
    return vars.split(',').map(s => s.trim()).filter(v => v && v !== 't' && !/^t\s*:\s*tg$/.test(v));
}
```

Deleting someone's `locale` binding would be a compile error in a file they did not touch, in a commit that claims to be about translations. That is precisely the kind of thing that makes a team turn a tool off.

### Emit code the linter already agrees with

Generated code that fails `eslint --fix` is generated work, not saved work. Two common rules dictate where a declaration may go: `import/first` (nothing above the imports) and `define-macros-order` (nothing above `defineProps`/`defineEmits`). So insertion is anchored to the end of the leading import block of `<script setup>`, and a file without one gets a `<script setup>` created for it.

Finding that insertion point is fiddlier than it sounds, and both of the fiddly bits are documented in the source because both were bugs first. The `<script>` opening tag has to be matched quote-aware, or a `>` inside an attribute ends the match early and the declaration lands *inside the tag*:

```js
// Matches one <script …> opening tag, quote-aware so a `>` inside an attribute
// value (e.g. generic="T extends Record<string, any>") doesn't end it early —
// otherwise injected lines land INSIDE the tag. Alternatives are mutually
// exclusive ([^>"'] excludes the quote chars) so matching stays linear; the
// `setup` attribute is checked separately (insertAfterImports) instead of a
// mid-pattern anchor that backtracks catastrophically on non-setup <script>s.
const SCRIPT_TAG = /<script\b(?:"[^"]*"|'[^']*'|[^>"'])*>/gi;
```

And the leading-whitespace class in the import matcher has to be `\s*` rather than same-line whitespace, or blank lines between imports break the match and the declaration is inserted *above* an import — tripping the exact lint rule the anchor exists to satisfy.

Neither is clever. Both are the difference between a tool that runs unattended and a tool someone has to clean up after.

### The escaping trap

This one cost me an afternoon. The key vue-i18n resolves at runtime is the *unescaped* string, but the source contains an escaped literal — and the linter rewrites the escaping:

```js
// Unescape a captured string-literal body so the key matches the runtime value.
// e.g. eslint may rewrite t("A station's …") → t('A station\'s …'); the key vue-i18n
// sees at runtime is the unescaped form, so the catalog/block must use that too.
function unescapeKey(raw) {
    return raw.replace(/\\(.)/g, (_, c) => (c === 'n' ? '\n' : c === 't' ? '\t' : c === 'r' ? '\r' : c));
}
```

Get this wrong and a handful of keys — every string with an apostrophe in it, which in an English app is a lot of them — sit in the catalog under a name that can never be looked up. The UI renders the key text, which in a value-as-key system looks *almost right*, so it survives review.

### Silencing vue-i18n's fallback warnings

A local composer falling back to the root catalog is the design working as intended, but vue-i18n reports each one as `Not found '…' in 'en'` / `Fall back to root locale`. In development that is thousands of lines of console noise, and noise that is normal trains you to ignore the console entirely.

So when a component resolves *some* keys against the catalog, the script adds the flags to the local composer it generates:

```js
function addLocalScope(content, fallback) {
    const opts = fallback
        ? 'useScope: \'local\', fallbackWarn: false, missingWarn: false'
        : 'useScope: \'local\'';
    // …
}
```

And once the global `tg` composer entered the design, that fallback path stopped firing at all — so the script now *removes* those flags wherever it finds them:

```js
// Strip the benign warn-suppression flags from any useI18n(...) options. The
// project no longer uses them — a global `tg` composer resolves public keys
// directly, so the local→global fallback that produced the warnings never fires.
function stripWarnFlags(content) { /* … */ }
```

A tool that rewrites source can clean up after its own earlier designs, which is a genuinely underrated property.

## Regex, not a parser

The whole thing is regular expressions over source text. No `@vue/compiler-sfc`, no TypeScript AST, no Vite plugin. That is a deliberate trade and it is the reason the script is ~800 lines that anyone on the team can read, has zero dependencies beyond `node:fs`, and runs in under half a second over 705 components with no build step.

The price is fixed and known: **keys must be string literals.** `t('Sentence')` works; `t(someVariable)` can never be extracted by a text scan.

The migration turned every dynamic key into explicit ones:

```ts
// Maps enum/code values to translated, human-readable labels. Strings are
// value-as-key and maintained like any other source string — add a new case
// with a $t('...') line. Replaces the old dynamic t(`namespace.prefix_${code}`).
export function monthName(month: number): string {
    switch (month) {
        case 1: return $t('January');
        case 2: return $t('February');
        // …
    }
    return String(month);
}
```

That reads like a downgrade and is not. A dynamic key is unfindable for *everyone*: your extractor cannot see it, your dead-key pruning cannot reason about it, and a translator cannot know what `apparatus.status_ooo` renders as without reading the backend. Unrolling them into literals is the same work, done once, in a form every tool downstream can process.

## The strings nobody wrapped

Extraction only sees strings that are already inside a `t()`. A string somebody typed straight into a template is invisible to it, and no amount of scanning for `t(` will ever find one.

So there is a second scan, as a Vitest test, looking for the opposite thing: user-facing text that is *not* wrapped. It catches three shapes — raw prose between tags, a static human-facing attribute like `title="…"`, and human-facing object keys in script (`message: 'This field is required.'`, `label: 'Personnel'`), which is where breadcrumbs, table headers and form errors hide.

The app had roughly 900 of these when I wrote it, so it is a snapshot rather than a hard failure:

```ts
/**
 * WHY A SNAPSHOT AND NOT A HARD FAIL: the app already has ~900 of these. The
 * snapshot is the debt ledger — it locks in what exists today, so a NEW raw
 * string fails the test (one added line in the diff, naming file + string)
 * while the existing backlog stays green. Fix some? `npx vitest run -u`
 * shrinks the ledger, and the removals show up in review as progress.
 */
```

A new raw string fails CI with the file and the text in the diff. Fixing old ones shrinks the ledger, and the deletions read as progress in review.

There is a second test guarding the first, because a scanner that quietly stops scanning is worse than no scanner:

```ts
it('scans the source tree it thinks it does', () => {
    // Guards the scanner itself: a broken path or an emptied SRC_DIRS would make
    // the snapshot collapse to `{}` and silently pass forever.
    expect(sourceFiles().length).toBeGreaterThan(500);
});
```

It is a regex, not a Vue parser, and it will never catch a string built at runtime or one read from the API. It is a net, not a proof — but a net that costs 200 lines and runs on every pull request has caught far more than the parser I did not write.

## What this costs

**Changing the copy changes the key.** Edit the English and you have created a new key; the old one is pruned on the next run and the new one arrives with fresh `TODO_TRANSLATION` placeholders in every other locale.

I decided that is the correct behaviour rather than a flaw. If the English sentence changed enough to matter, the Slovenian one is now wrong too — a key-based system would have quietly kept serving the stale translation under an unchanged key name. Here the diff makes it loud: reviewers see the new string appear and the old one disappear. The price is that fixing a typo costs a re-translation, which is real, and which I pay.

The rest, stated plainly:

- **Blocks and catalog files are managed as JSON.** Hand-edit one and the next run rewrites your formatting — and drops any comment you put there.
- **It only sees what is already wrapped in `t()`.** The second scanner covers that gap, and it is a net rather than a proof.
- **It is invoked, not watched.** A tool that rewrites the file you are typing into, while you are typing into it, is hostile. `pnpm i18n:extract` runs when I decide it runs, and its output is one reviewable diff.
- **Two English strings are two keys, always.** If your product needs one English string to be two different concepts, it needs two different English strings, and honestly it probably wanted that anyway.

I would not use this approach if translations came from a CMS at runtime, or if a team's translators worked directly in the repository against namespaced keys they had memorised. Neither is true here: strings live in the frontend, the catalog is bundled at build time, and translation happens through the flat export.

## Where it stands

| The production app | |
|---|---|
| Components scanned | 705 |
| With their own `<i18n>` block | 427 |
| Keys in the shared catalog | 1,245 |
| Key usages resolved through the catalog | 5,487 |
| Full run | 0.42 s |
| The migration commit | 635 files, +17,751 / −13,602 |

About 1,100 lines of dependency-free Node — extract, export, import, plus the shared plumbing — replaced the entire practice of naming translation keys.

The unmeasurable outcome, which I care about more: nobody on this project has had an opinion about what to call a translation key in over a year.

## Try it

The example repo is a full Nuxt 4 app with `@nuxtjs/i18n`, four components, two locales, and the three scripts:

```bash
git clone https://github.com/tilenpirih/nuxt-i18n-auto-generate-keys
cd nuxt-i18n-auto-generate-keys
pnpm install

# add a `t('Something new')` to any component, then:
pnpm i18n:extract
```

Add a third usage of an existing key and watch it move into the catalog. Comment one out and watch it move back. **[github.com/tilenpirih/nuxt-i18n-auto-generate-keys](https://github.com/tilenpirih/nuxt-i18n-auto-generate-keys)**
