import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import app from '../src/server.js';

let server;
let base;

before(async () => {
  server = app.listen(0);
  await new Promise((resolve) => server.once('listening', resolve));
  base = `http://localhost:${server.address().port}/api/products`;
});

after(() => server.close());

async function call(path, { method = 'GET', body } = {}) {
  const res = await fetch(base + path, {
    method,
    headers: body === undefined ? {} : { 'Content-Type': 'application/json' },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const text = await res.text();
  return { status: res.status, body: text ? JSON.parse(text) : undefined };
}

// ---- Section 1: validation (the four samples from the instructions) ----

test('GET /-1 -> 400 with id message', async () => {
  const r = await call('/-1');
  assert.equal(r.status, 400);
  assert.deepEqual(r.body, { errors: ['ID must be a positive integer'] });
});

test('POST with bad name, price, inStock -> three errors in order', async () => {
  const r = await call('', {
    method: 'POST',
    body: { name: 'Desk', price: -5, inStock: 'yes' },
  });
  assert.equal(r.status, 400);
  assert.deepEqual(r.body, {
    errors: [
      'Name Must be at least 5 characters long',
      'Price must be a positive number',
      'inStock must be a boolean',
    ],
  });
});

test('PUT with empty body -> oneOf message', async () => {
  const r = await call('/1', { method: 'PUT', body: {} });
  assert.equal(r.status, 400);
  assert.deepEqual(r.body, {
    errors: ['At least one field (name, price, or inStock) must be provided'],
  });
});

test('GET ?minPrice=-10 -> 400', async () => {
  const r = await call('?minPrice=-10');
  assert.equal(r.status, 400);
  assert.deepEqual(r.body, {
    errors: ['minPrice must be a non-negative number'],
  });
});

test('POST trims and escapes name, casts price and inStock', async () => {
  const r = await call('', {
    method: 'POST',
    body: { name: '  <b>Chair</b>  ', price: '12.5', inStock: 'true' },
  });
  assert.equal(r.status, 201);
  assert.equal(r.body.name, '&lt;b&gt;Chair&lt;&#x2F;b&gt;');
  assert.equal(r.body.price, 12.5);
  assert.equal(r.body.inStock, true);
});

test('POST with whitespace-only name -> "Name is required"', async () => {
  const r = await call('', {
    method: 'POST',
    body: { name: '      ', price: 5, inStock: true },
  });
  assert.equal(r.status, 400);
  assert.deepEqual(r.body, { errors: ['Name is required'] });
});

test('POST with non-string name -> "Name must be a string"', async () => {
  const r = await call('', {
    method: 'POST',
    body: { name: 12345, price: 5, inStock: true },
  });
  assert.deepEqual(r.body, { errors: ['Name must be a string'] });
});

test('PUT updates only the provided field', async () => {
  const r = await call('/2', { method: 'PUT', body: { price: 30 } });
  assert.equal(r.status, 200);
  assert.equal(r.body.price, 30);
  assert.equal(r.body.name, 'Wireless Mouse');
});

test('PUT with short name and bad price -> both messages', async () => {
  const r = await call('/2', {
    method: 'PUT',
    body: { name: 'abc', price: 0 },
  });
  assert.equal(r.status, 400);
  assert.deepEqual(r.body, {
    errors: [
      'Name must be at least 5 characters long',
      'Price must be a positive number',
    ],
  });
});

test('missing product -> 404 in the errors array shape', async () => {
  const r = await call('/9999');
  assert.equal(r.status, 404);
  assert.deepEqual(r.body, { errors: ['Product 9999 not found'] });
});

test('GET /1.5 -> 400', async () => {
  const r = await call('/1.5');
  assert.equal(r.status, 400);
});

// ---- Section 2: query parameters ----

test('defaults: sorted by id asc, at most 10 items', async () => {
  const r = await call('');
  assert.equal(r.status, 200);
  assert.equal(r.body.length, 10);
  const ids = r.body.map((p) => p.id);
  assert.deepEqual(
    ids,
    [...ids].sort((a, b) => a - b),
  );
});

test('search is a case-insensitive substring match', async () => {
  const r = await call('?search=DESK');
  assert.deepEqual(r.body.map((p) => p.name).sort(), [
    'Desk Lamp',
    'Standing Desk',
  ]);
});

test('inStock=false filters to out-of-stock only', async () => {
  const r = await call('?inStock=false&limit=100');
  assert.ok(r.body.length > 0);
  assert.ok(r.body.every((p) => p.inStock === false));
});

test('minPrice and maxPrice are inclusive', async () => {
  const r = await call('?minPrice=34.95&maxPrice=39&limit=100');
  const prices = r.body.map((p) => p.price);
  assert.ok(prices.includes(34.95) && prices.includes(39));
  assert.ok(prices.every((p) => p >= 34.95 && p <= 39));
});

test('sortBy=price&order=DESC is case-insensitive on order', async () => {
  const r = await call('?sortBy=price&order=DESC');
  assert.equal(r.status, 200);
  const prices = r.body.map((p) => p.price);
  assert.deepEqual(
    prices,
    [...prices].sort((a, b) => b - a),
  );
});

test('sortBy=name sorts alphabetically', async () => {
  const r = await call('?sortBy=name&limit=100');
  const names = r.body.map((p) => p.name);
  assert.deepEqual(
    names,
    [...names].sort((a, b) => a.localeCompare(b)),
  );
});

test('offset and limit slice after sorting', async () => {
  const all = (await call('?limit=100')).body.map((p) => p.id);
  const r = await call('?offset=2&limit=3');
  assert.deepEqual(
    r.body.map((p) => p.id),
    all.slice(2, 5),
  );
});

test('filter runs before pagination', async () => {
  const inStock = (await call('?inStock=true&limit=100')).body.map((p) => p.id);
  const r = await call('?inStock=true&offset=1&limit=2');
  assert.deepEqual(
    r.body.map((p) => p.id),
    inStock.slice(1, 3),
  );
});

const badQueries = [
  ['?inStock=yes', 'inStock must be a boolean'],
  ['?maxPrice=-1', 'maxPrice must be a non-negative number'],
  ['?minPrice=abc', 'minPrice must be a non-negative number'],
  ['?sortBy=color', 'sortBy must be one of: id, name, price'],
  ['?order=up', 'order must be either asc or desc'],
  ['?offset=-1', 'offset must be a non-negative integer'],
  ['?offset=1.5', 'offset must be a non-negative integer'],
  ['?limit=0', 'limit must be an integer greater than 0'],
  ['?limit=abc', 'limit must be an integer greater than 0'],
];

for (const [qs, message] of badQueries) {
  test(`GET ${qs} -> 400`, async () => {
    const r = await call(qs);
    assert.equal(r.status, 400);
    assert.deepEqual(r.body, { errors: [message] });
  });
}

test('DELETE removes the product, then it 404s', async () => {
  const del = await call('/11', { method: 'DELETE' });
  assert.equal(del.status, 204);
  const get = await call('/11');
  assert.equal(get.status, 404);
});
