// Run: node server/utils/negotiateEncoding.test.ts
// Getting this wrong doesn't throw, it hands a client a body it can't decode —
// so the branching gets a check.
import assert from 'node:assert/strict'
import { negotiateEncoding } from './negotiateEncoding.ts'

assert.equal(negotiateEncoding('br, gzip'), 'br', 'prefers brotli')
assert.equal(negotiateEncoding('gzip, deflate'), 'gzip', 'falls back to gzip')
assert.equal(negotiateEncoding('gzip, deflate, br'), 'br', 'header order does not decide')
assert.equal(negotiateEncoding('br;q=0, gzip'), 'gzip', 'q=0 means "do not send me this"')
assert.equal(negotiateEncoding('br;q=0, gzip;q=0'), undefined, 'all refused -> send plain')
assert.equal(negotiateEncoding('gzip;q=1.0, identity;q=0.5, *;q=0'), 'gzip', 'q values and wildcards')
assert.equal(negotiateEncoding(''), undefined, 'no header -> send plain')
assert.equal(negotiateEncoding('identity'), undefined, 'nothing we support -> send plain')

// eslint-disable-next-line no-console
console.log('negotiateEncoding: all assertions passed')
