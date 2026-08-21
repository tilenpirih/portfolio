Every translated string in astral8 lives in one of two places, and I never choose which. A usage count does, on every run, in both directions.

## Two homes

vue-i18n gives a Vue SFC its own message catalog through an `<i18n>` block, resolved by a composer created with `useScope: 'local'`:

```vue
<i18n lang="json">
{
    "en": {
        "Keep everyone in the loop with notes.": "Keep everyone in the loop with notes."
    }
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

## The count decides

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

Three is a guess that has held up. Two promotes too eagerly — two components sharing a word is often a coincidence, and the pair frequently wants to diverge later. Five leaves too much duplication in the blocks. It is a CLI flag (`--threshold=5`) precisely because I did not want to defend the number.

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
        .replace(/<!--[\s\S]*?-->/g, '')
        .replace(/\/\*[\s\S]*?\*\//g, '')
        .replace(/\/\/[^\n]*/g, '');
}
```

## Which composer a call site uses

A local key has to be resolved by a local composer and a public key by the global one, which in a component that uses both means two composers and two different function names. That is bookkeeping again — so the script does it.

I write every call as a bare `t('...')`. The script rewrites each one to `t` or `tg` depending on where that key ended up, then injects exactly the declarations the file needs. Here is a real component, as it sits in the repo today:

```vue
<script setup lang="ts">
const { t } = useI18n({ useScope: 'local' });
const { t: tg } = useI18n({ useScope: 'global' });
// …
</script>

<template>
    <template #title>
        {{ t('Set as user') }}
    </template>

    <template #description>
        {{ t('Select a role for this user before converting them from developer status.') }}
    </template>

    <FormSelect :label="tg('Role')" :options="roleOptions" />
    <UiButton @click="modalRef?.close()">{{ tg('Cancel') }}</UiButton>
</template>

<i18n lang="json">
{
    "en": {
        "Select a role for this user before converting them from developer status.": "Select a role for this user before converting them from developer status.",
        "Set as user": "Set as user"
    }
}
</i18n>
```

*Role* and *Cancel* are used all over the app, so they resolve against the catalog through `tg`. The modal's own two sentences exist nowhere else, so they sit in its block and resolve through `t`. If *Set as user* later shows up in a third component, the next run moves it to the catalog, flips these two call sites to `tg`, and shrinks the block — and if the block empties completely, it removes the block and the now-unused `const { t } = …` line with it.

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

Three cases skip the vote entirely:

- **`$t('…')`** — the built-in global helper. If you reach for it explicitly, the key is public.
- **any `t('…')` in a `.ts` file.** A composable, store or util cannot own an `<i18n>` block, so its strings have nowhere local to live. Astral8 has a thin `$t()` wrapper for exactly this, and the enum label maps are full of it:

```ts
export function monthName(month: number): string {
    switch (month) {
        case 1: return $t('January');
        case 2: return $t('February');
        // …
    }
    return String(month);
}
```

- **`<I18nT keypath="…">`** — vue-i18n's component for slot interpolation resolves against the global scope, so a static keypath pins its key public.

Being in the catalog on disk, though, is deliberately *not* one of these cases. If it were, nothing could ever demote.

## The same word, two meanings

This is the objection value-as-key always gets, and it has a real answer: **promotion compares values, not keys.**

Every usage of a key carries a full set of per-locale values — the component's block override if it has one, else the catalog value, else a fresh default. The public value is the most common *fully translated* one; components that give the key a *different translated* value are not counted toward the tally, and keep their own local copy, which their local `t` resolves ahead of the catalog.

```js
const analyse = (key, usages) => {
    const bySig = new Map(); // sig -> { values, count }
    let untranslated = 0;
    for (const u of usages) {
        if (!isFullyTranslated(u.values)) { untranslated++; continue; }
        const sig = sigOf(u.values);
        const e = bySig.get(sig) || { values: u.values, count: 0 };
        e.count++;
        bySig.set(sig, e);
    }
    // …most common signature wins; untranslated usages go along with it
};
```

So with `en` and `sl` configured: if *Close* is `"Zapri"` in eleven components and `"Blizu"` in one, `"Zapri"` goes public and the odd one out keeps a local `"Blizu"`. Nothing is lost and nothing is silently merged. When two different values tie, the run prints a warning and takes the more common one rather than guessing quietly.

Untranslated placeholders are treated as *not yet a meaning*: they neither compete for the public value nor block promotion. Brand-new duplicates of an ambiguous word look identical only because nobody has translated them yet. If you would rather wait until a human has committed to a meaning, `--require-translated` refuses to promote anything with a `TODO_TRANSLATION` left in it.

One subtlety falls straight out of value-as-key: **a divergence can only ever exist in a non-default locale.** In the default locale, the value *is* the key, so a block that writes `"Save": "Save but different value"` is not an override — it collapses back to `"Save"` and resolves against the catalog like everything else. Two different English strings are two different keys, by definition.

## Moving translations with the key

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

When a key demotes, the catalog value is passed as the seed for the blocks being rebuilt; when it promotes, the block values are what the catalog is written from. A real translation always beats a placeholder, so a round trip out to the catalog and back cannot downgrade a finished translation into a `TODO`.

## The knobs

```bash
node scripts/i18n-extract.mjs --threshold=5         # only promote at 5+ components
node scripts/i18n-extract.mjs --no-promote          # everything bare-t stays local
node scripts/i18n-extract.mjs --require-translated  # only promote finished translations
```

I have never changed the threshold in production. The flags exist so that the number in the config is a choice rather than a constant someone has to argue with — and `--no-promote` is a useful way to see, in one diff, exactly how much of the catalog the promotion rule is responsible for.
