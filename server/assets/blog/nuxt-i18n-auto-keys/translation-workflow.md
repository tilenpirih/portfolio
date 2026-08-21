Auto-generated keys solve the bookkeeping. They do not translate anything. After a run, the default locale is finished — the value *is* the key — and every other locale is full of placeholders:

```json
{
    "Keep visible until": "TODO_TRANSLATION: Keep visible until",
    "Save changes": "TODO_TRANSLATION: Save changes"
}
```

That is the state the rest of this workflow exists to clear.

## Why a placeholder prefix and not an empty string

`TODO_TRANSLATION: ` looks crude, and it is doing four jobs:

- **It is greppable.** "What is left to do" is one `grep -r`, not a script.
- **It collapses to one predicate.** Everything in the toolchain — promotion, export filtering, import safety — asks the same question the same way:

```js
export function isTranslated(value) {
    return value != null && value !== '' && !String(value).startsWith(TODO_PREFIX);
}
```

- **It is loud in the UI.** An empty value makes vue-i18n fall back, and a fallback is invisible: the screen shows English and looks *fine*, so nobody reports it. `TODO_TRANSLATION: Keep visible until` on a button gets reported within the hour.
- **It carries the source text.** The placeholder contains the English sentence, so a file of placeholders is already a translation request — the thing being translated is right there, no lookup, no second file to cross-reference.

That last property is what makes the export step small.

## Exporting: one flat file per locale

The strings live in 427 component blocks plus a catalog. You cannot hand a translator a repository, and you cannot hand a language model 427 files and hope the `<i18n>` blocks come back well-formed.

So `i18n-export` flattens both homes into one file per locale, namespacing each key by where it came from:

```bash
node scripts/i18n-export.mjs                    # everything
node scripts/i18n-export.mjs --untranslated     # only what still needs work
node scripts/i18n-export.mjs --untranslated sl  # …just Slovenian
```

```json
{
    "components.admin.modals.AddNoteModal-Keep everyone in the loop with notes.": "TODO_TRANSLATION: Keep everyone in the loop with notes.",
    "i18n.locales-Keep visible until": "TODO_TRANSLATION: Keep visible until"
}
```

A component block key gets the dotted file path; everything from the shared catalog gets the fixed `i18n.locales` prefix. Edit the values, never the keys.

Two details make this pleasant in practice. `--untranslated` filters to keys that are missing in *at least one* non-default locale but then exports the whole row for every locale, so the default-locale file next to it is the source text a translator works from. And the location prefix is free context: `components.incidents.IncidentReportForm-Response` tells a translator — or a model — that this *Response* is the fire-service kind, not a survey answer. Ambiguity in a word is usually resolved by the file it lives in.

## Importing: exact match, no guessing

`i18n-import` reads the edited files and writes each value back where it came from:

```bash
node scripts/i18n-import.mjs             # apply translated values
node scripts/i18n-import.mjs --dry-run   # show what would change
node scripts/i18n-import.mjs --all       # apply everything, TODOs included
```

The flat key `components.admin.modals.AddNoteModal-Keep everyone in the loop with notes.` contains hyphens in the location, hyphens in the sentence, and a dot in the sentence too. Splitting that string is unparseable in the general case, so import does not split it. Both scripts share one module that reads the live source and builds the flat keys the same way; import rebuilds every candidate key from the current tree and matches by **exact string equality**, then writes to the target it recorded while building it.

```js
const target = targets.get(fk);
if (!target) { /* unknown key → warn and skip */ }
if (target.kind === 'block') {
    (block.messages[code] ??= {})[target.innerKey] = value;
} else {
    (catalog[code] ??= {})[target.innerKey] = value;
}
```

If a key came back that no longer exists in the source, it is reported and skipped rather than resurrected. Deleting a translation is never something the importer decides; you delete a *usage*, and the next extract prunes the key.

By default only translated values are applied — anything still carrying the placeholder is skipped, so you can export the untranslated set, fill in half of it, and import just that half without stamping placeholders over work already done. `--all` overrides it, `--dry-run` shows the diff first.

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
import i18nLocales from './i18n/i18n.locales.json'

i18n: {
    defaultLocale: i18nLocales.defaultLocale,
    locales: i18nLocales.locales,
    langDir: 'locales',
}
```

Add the line, run extract, and every component block and the catalog grow an `sl` section full of placeholders — correctly, everywhere, in one pass. Then export, translate, import. The alternative, in the old system, was a person opening thirty PHP files.

## The gap this does not cover

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

A new raw string fails CI with the file and the text in the diff. Fixing old ones shrinks the ledger, and the deletions read as progress in review. The snapshot file is currently 1,405 lines, and it only ever goes down.

There is a second test guarding the first, because a scanner that quietly stops scanning is worse than no scanner:

```ts
it('scans the source tree it thinks it does', () => {
    // Guards the scanner itself: a broken path or an emptied SRC_DIRS would make
    // the snapshot collapse to `{}` and silently pass forever.
    expect(sourceFiles().length).toBeGreaterThan(500);
});
```

It is a regex, not a Vue parser, and it will never catch a string built at runtime or one read from the API. It is a net, not a proof — but a net that costs 200 lines and runs on every pull request has caught far more than the parser I did not write.
