Most codegen writes new files. This one edits the files you wrote — 705 of them, on every run, including the ones you have open. That puts it in an uncomfortable category, and almost every design decision in the script comes from taking that seriously.

## Rule one: running it twice must change nothing

```bash
Done — 0 file(s) changed. Catalog: 1245 public key(s) across en (default: en).
```

If a second run produces a diff, the tool is unusable: every `git status` is noisy, every pull request contains churn nobody wrote, and reviewers learn to skim the parts of a diff the script owns — which is exactly where its mistakes would be.

Idempotency does not come for free. Four things buy it:

- **No stored decisions.** Nothing is marked "global"; the placement is recomputed from usage counts on every run, so there is no state to drift out of sync with the code.
- **Rewrites map to themselves.** A call already on the correct composer rewrites to the same text.
- **Canonical serialization.** Blocks and catalog files are written with locales in configured order, keys sorted, four-space indent — one possible output per input, and the export/import pair writes byte-identically.
- **Edits in place, not appended.** When the script replaces a composer declaration it reuses the position and indentation of the line already there, rather than deleting it and inserting a fresh one after the imports:

```js
// Replace the FIRST existing managed line in place — preserving its position so
// we don't churn layout, leave a double blank line, or move a line ahead of
// `defineProps` (define-macros-order).
```

## Rule two: hand-written code is not yours to rewrite

The script owns two exact line shapes — the local `const { t } = useI18n({ useScope: 'local' })` and the global `const { t: tg } = useI18n({ useScope: 'global' })`. Everything else in the file belongs to whoever wrote it.

That distinction has to be encoded, not assumed:

```js
// The composer lines this script fully owns (injects / removes / re-orders): the
// local `t` and the global `tg`. A user's own destructuring with extra members
// (e.g. `const { t, locale } = ...`) does NOT match `{ t }` / `{ t: tg }`, so it
// is preserved.
const MANAGED_LINES = /[ \t]*const \{ t(?:: tg)? \} = useI18n\(\s*(?:\{\s*useScope: '(?:local|global)'[^}]*\}\s*)?\);?\n?/g;
```

A component that needs `locale` or `setLocale` — a language switcher, a date formatter — writes its own `useI18n()` call, and the script detects that and works *around* it: it makes sure `t` is in the existing destructuring instead of adding a second declaration, gives that call local scope so the component's one-off keys resolve, and adds the global `tg` line next to it rather than at the top of the file.

And where the script does rebuild a line it owns, members it does not own ride along:

```js
// Members of a global composer destructuring the script does NOT manage
// (anything beyond `t` / `t: tg`), e.g. `locale`. These are user code.
function globalComposerExtras(vars) {
    return vars.split(',').map(s => s.trim()).filter(v => v && v !== 't' && !/^t\s*:\s*tg$/.test(v));
}
```

Deleting someone's `locale` binding would be a compile error in a file they did not touch, in a commit that claims to be about translations. That is precisely the kind of thing that makes a team turn a tool off.

## Rule three: emit code the linter already agrees with

Generated code that fails `eslint --fix` is generated work, not saved work. Two rules in astral8's config dictate where a declaration may go: `import/first` (nothing above the imports) and `define-macros-order` (nothing above `defineProps`/`defineEmits`). So insertion is anchored to the end of the import block:

```js
// Insert one or more declaration lines just after the leading import block of
// <script setup> (astral8 keeps imports first, so this avoids eslint
// import/first). Creates a <script setup> if the file has none.
```

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

## The escaping trap

This one cost me an afternoon. The key vue-i18n resolves at runtime is the *unescaped* string, but the source contains an escaped literal — and the linter rewrites the escaping:

```js
// Unescape a captured string-literal body so the key matches the runtime value.
// e.g. eslint may rewrite t("A station's …") → t('A station\'s …'); the key vue-i18n
// sees at runtime is the unescaped form, so the catalog/block must use that too.
function unescapeKey(raw) {
    return raw.replace(/\\(.)/g, (_, c) => (c === 'n' ? '\n' : c === 't' ? '\t' : c === 'r' ? '\r' : c));
}
```

Get this wrong and a handful of keys — every string with an apostrophe in it, in an English app that is a lot of them — sit in the catalog under a name that can never be looked up. The UI renders the key text, which in a value-as-key system looks *almost right*, so it survives review.

## The warning that could only be silenced in one place

Local composers falling back to the root catalog is the design working as intended, but vue-i18n reports each one as `Not found '…' in 'en'` / `Fall back to root locale`. In development that is thousands of lines of console noise, and noise that is normal trains you to ignore the console entirely.

The fix is one line, and finding *where* it goes took reading vue-i18n's source:

```ts
// missingWarn / fallbackWarn are set here on purpose. The value-as-key design
// RELIES on a per-component local `t` not finding a shared key in its own
// <i18n> block and falling back to this root catalog — that's normal, not an
// error. In vue-i18n 11 a LOCAL composer ignores its own missingWarn/
// fallbackWarn and inherits them from this root composer (see createComposer:
// `_missingWarn = __root ? __root.missingWarn : …`), so disabling them here
// silences every local scope too — the only place to set it.
```

Before the global `tg` composer existed, the script worked around this per component, injecting `fallbackWarn: false, missingWarn: false` into every generated `useI18n` call. Once public keys got resolved directly through `tg`, that fallback path stopped firing at all — so the script now *removes* those flags wherever it finds them. A tool that rewrites source can clean up after its own earlier designs, which is a genuinely underrated property.

## Regex, not a parser

The whole thing is regular expressions over source text. No `@vue/compiler-sfc`, no TypeScript AST, no plugin pipeline. That is a deliberate trade and it is the reason the script is 700 lines that anyone on the team can read, has zero dependencies beyond `node:fs`, and runs in 0.42 seconds over 705 components with no build step.

The price is fixed and known: **keys must be string literals**. A dynamic key is invisible to a text scan, and always will be.

The migration turned every dynamic key into explicit ones:

```ts
// AUTO-GENERATED during the i18n value-as-key migration.
// Maps enum/code values to translated, human-readable labels. Strings are
// value-as-key and maintained like any other source string — add a new case
// with a $t('...') line. Unknown codes fall back to the raw code. Replaces the
// old dynamic t(`namespace.prefix_${code}`) keys.
export function monthName(month: number): string {
    switch (month) {
        case 1: return $t('January');
        // …
    }
}
```

That reads like a downgrade and is not. A dynamic key is unfindable for *everyone*: your extractor cannot see it, your dead-key pruning cannot reason about it, and a translator cannot know what `apparatus.status_ooo` renders as without reading the backend. Unrolling them into literals is the same work, done once, in a form that every tool downstream can process. Everything else in the catalog is honest about what it says.

## The rest of the limitations, stated plainly

- **Blocks and catalog files are managed as JSON.** Hand-edit one and the next run rewrites your formatting — and drops any comment you put there.
- **It only sees what is already wrapped in `t()`.** The second scanner from part three covers that gap, and it is a net rather than a proof.
- **It is invoked, not watched.** The system it replaced included a Docker container watching for changes. A tool that rewrites the file you are typing into, while you are typing into it, is hostile. `npm run i18n:extract` runs when I decide it runs, and its output is one reviewable diff.
- **Two English strings are two keys, always.** If your product needs one English string to be two different concepts, it needs two different English strings, and honestly it probably wanted that anyway.

I would not use this approach if translations came from a CMS at runtime, or if a team's translators worked directly in the repository against namespaced keys they had memorised. Neither is true of astral8: strings live in the frontend, the catalog is bundled at build time, and translation happens through the flat export.

## What it actually bought

About 1,100 lines of dependency-free Node — extract, export, import, plus the shared plumbing — deleted a PHP-derived type generator, a shell script wrapper, a watcher container, and the entire practice of naming translation keys.

The measurable outcome is 1,245 shared keys serving 5,487 resolved usages, 427 components keeping their one-off strings next to the markup that renders them, no locale file edited by a human, and no dead key surviving the run after its last usage disappears.

The unmeasurable one, which I care about more: nobody on this project has had an opinion about what to call a translation key in over a year.
