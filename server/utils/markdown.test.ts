// Run: node server/utils/markdown.test.ts
// The heading walk is what makes the table of contents and the anchors in the
// article agree. When they drift, nothing throws — every "On this page" link
// just quietly goes nowhere.
import assert from 'node:assert/strict'
import { renderMarkdown } from './markdown.ts'

const { html, toc, minutes } = await renderMarkdown([
  '## The rule change',
  '',
  'Body text.',
  '',
  '### `t()` and friends',
  '',
  '#### Ignored, too deep',
  '',
  '## The rule change',
  '',
  '```ts',
  'const answer: number = 42',
  '```',
].join('\n'))

assert.deepEqual(
  toc.map(entry => [entry.level, entry.id, entry.text]),
  [
    [2, 'the-rule-change', 'The rule change'],
    [3, 't-and-friends', 't() and friends'],
    [2, 'the-rule-change-x', 'The rule change'],
  ],
  'h2/h3 only, backticks stripped, a repeated heading gets its own id',
)

for (const entry of toc)
  assert.ok(html.includes(`id="${entry.id}"`), `heading ${entry.id} carries the id its toc entry links to`)

assert.ok(html.includes('class="shiki'), 'fenced code comes back highlighted')
assert.ok(html.includes('--shiki-dark'), 'both palettes are emitted, so the theme toggle can swap them')
assert.ok(minutes >= 1, 'reading time never rounds down to zero')

// eslint-disable-next-line no-console
console.log('renderMarkdown: all assertions passed')
