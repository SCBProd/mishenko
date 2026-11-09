const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const root = 'public/legacy';
for (const page of fs.readdirSync(root).filter(name => name.endsWith('.html'))) {
  const html = fs.readFileSync(path.join(root, 'dist', page), 'utf8');
  const script = html.match(/<script>([\s\S]*?)<\/script>/)[1];
  const old = new URL(`https://scbprod.github.io/mishenko/dist/${page}?lang=ru&group=landscape#photographs`);
  let result;
  vm.runInNewContext(script, {location: {search: old.search, hash: old.hash, replace(target) {result = new URL(target, old);}}});
  assert.equal(result.pathname, `/mishenko/${page}`);
  assert.equal(result.search, old.search);
  assert.equal(result.hash, old.hash);
  assert.ok(fs.existsSync(path.join(root, page)));
}
assert.ok(fs.existsSync(path.join(root, '.nojekyll')));
console.log('Verified every legacy /dist page redirects to an existing page and preserves query/hash.');
