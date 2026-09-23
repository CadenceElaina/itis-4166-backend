# Quiz 1 Cheatsheet — ITIS 4166 Modules 1-4

80 of 100 points are "here is a code snippet, what is wrong and how do you fix
it." So this is organized by **bug**, not by topic. Each entry: the broken code,
the one-sentence diagnosis, the fix.

A short-answer answer that scores full credit usually has three parts:
1. **Name the defect** ("`.map()` returns a new array; the original is unchanged")
2. **Say what actually happens at runtime** ("`prices` still holds the old values, so the response is wrong")
3. **Give the fix** (corrected line, or `const updated = prices.map(...)`)

---

## Module 1 — JavaScript Fundamentals

### 1.1 Non-mutating method whose result is thrown away

```js
const prices = [10, 20, 30];
prices.map(p => p * 2);
console.log(prices);  // [10, 20, 30] — NOT doubled
```
**Why:** `.map()`, `.filter()`, `.slice()`, `.concat()`, `.toSorted()` all return a
**new** array and leave the original alone. Calling one as a statement discards the result.
**Fix:** `const doubled = prices.map(p => p * 2);`

**The mirror-image bug:** assigning the result of a *mutating* method.
```js
const sorted = arr.push(4);   // sorted === 4, the new LENGTH, not the array
const sorted = arr.sort();    // works, but arr is ALSO sorted in place
```

| Non-mutating (returns new) | Mutating (changes original) |
|---|---|
| `.map()` `.filter()` `.reduce()` `.slice()` `.concat()` `.find()` `.findIndex()` `.toSorted()` | `.push()` `.pop()` `.shift()` `.unshift()` `.splice()` `.sort()` `.reverse()` |

Return values worth memorizing:
- `.push()` / `.unshift()` → new **length**
- `.pop()` / `.shift()` → the **removed element**
- `.splice(i, n)` → an **array** of removed elements (always an array, even for one item)
- `.find()` → the **element**, or `undefined`
- `.findIndex()` / `.indexOf()` → the **index**, or **`-1`**

### 1.2 `.find()` vs `.filter()` confusion

```js
const user = users.filter(u => u.id === id);
res.json(user.name);   // undefined — user is an ARRAY
```
**Fix:** `const user = users.find(u => u.id === id);`
`.filter()` returns an array (possibly empty); `.find()` returns the element or `undefined`.

### 1.3 The `-1` truthiness trap

```js
const index = arr.findIndex(p => p.id === id);
if (!index) { /* wrong */ }
```
**Why:** `findIndex` returns `-1` when not found, and `-1` is **truthy**. Worse,
a legitimate match at index `0` is **falsy**, so `!index` fires on a *successful* find.
**Fix:** `if (index === -1) { ... }` — always compare explicitly.

### 1.4 Falsy values

Exactly seven: `false`, `0`, `-0`, `""`, `null`, `undefined`, `NaN` (plus `0n`).
**Everything else is truthy**, including `[]`, `{}`, `"0"`, `"false"`, `-1`.

```js
if (!req.body.quantity) return res.status(400).json({ error: 'required' });
// rejects quantity === 0, which may be valid
```
**Fix:** `if (req.body.quantity === undefined) ...`

```js
if (req.query.inStock) { ... }   // "false" is a non-empty string → truthy!
```
**Fix:** `if (req.query.inStock === 'true') ...`

### 1.5 `var` vs `let` / `const`

- `var` — **function-scoped**, hoisted and initialized to `undefined`, can be redeclared.
- `let` / `const` — **block-scoped** (`{ }`), hoisted but in the **temporal dead zone**
  (a term meaning: the binding exists but accessing it before the declaration line throws `ReferenceError`).
- `const` prevents **reassignment of the binding**, not mutation of the value.
  `const arr = [1]; arr.push(2);` is legal. `arr = [2];` throws `TypeError`.

```js
for (var i = 0; i < 3; i++) setTimeout(() => console.log(i));  // 3 3 3
for (let i = 0; i < 3; i++) setTimeout(() => console.log(i));  // 0 1 2
```
**Why:** `var i` is one binding shared by all three callbacks; `let i` creates a fresh binding per iteration.

### 1.6 `for...in` vs `for...of`

```js
for (const p of products) console.log(p.name);   // p = the ELEMENT
for (const i in products) console.log(i);        // i = the INDEX, as a STRING "0","1"
```
`for...in` iterates **keys** (and inherited enumerable ones); `for...of` iterates **values**
of an iterable. Using `for...in` on an array then doing `i + 1` gives `"01"`, since `i` is a string.

### 1.7 Arrow functions vs `function`

- Arrow with a **block body** needs an explicit `return`:
  ```js
  arr.map(x => { x * 2 });   // [undefined, undefined, ...]
  arr.map(x => x * 2);       // correct (implicit return)
  arr.map(x => ({ id: x }));  // object literal needs parens, else {} reads as a block
  ```
- Arrows have **no own `this`**; they inherit `this` lexically. Arrows have no `arguments` object and cannot be used as constructors.
- **Function declarations** (`function f() {}`) are fully hoisted — callable before their line.
  **Function expressions** (`const f = function(){}` / `const f = () => {}`) are not: calling early throws.

### 1.8 Destructuring and spread

```js
const { name, price } = req.body;              // object destructuring by KEY
const [first, second] = arr;                   // array destructuring by POSITION
const { name = 'Unknown' } = req.body;         // default applies only if undefined
const { id: productId } = req.params;          // rename while destructuring
```
Destructuring a property that does not exist yields `undefined`, not an error, but
destructuring from `null`/`undefined` throws `TypeError`.

Spread `...` **expands**; rest `...` **collects**:
```js
Math.max(...[1,2,3])              // 3  — Math.max([1,2,3]) is NaN
const copy = { ...original };     // SHALLOW copy — nested objects still shared
const merged = { ...a, ...b };    // later keys win
function f(...args) {}            // rest: collects into an array
```

### 1.9 Dynamic key lookup

```js
const key = 'price';
obj.key      // undefined — looks for a literal property named "key"
obj[key]     // correct — looks up the property named by the VALUE of key
```

### 1.10 `==` vs `===`

`==` coerces types (`0 == "0"` is `true`, `null == undefined` is `true`).
`===` compares type and value. Use `===` unless you deliberately want the coercion.

---

## Module 2 — Node.js Core

### 2.1 Forgetting `await`

```js
const posts = await readPosts();     // correct
const posts = readPosts();           // a pending Promise object, not the data
console.log(posts.length);           // undefined
```
**Symptom to name on the quiz:** logs `Promise { <pending> }`, or a property reads `undefined`.
**Fix:** `await` it, or `.then()` it.

### 2.2 `await` outside an `async` function

```js
function getPosts() {
  const data = await fs.readFile(...);   // SyntaxError
}
```
**Fix:** `async function getPosts() { ... }`. (Top-level `await` is allowed only in ES modules.)

### 2.3 An `async` function's return value is always a Promise

```js
async function getCount() { return 5; }
const n = getCount();        // Promise, not 5
const n = await getCount();  // 5
```

### 2.4 Trying to return from inside a callback

```js
function readPosts() {
  fs.readFile('posts.json', 'utf8', (err, data) => {
    return JSON.parse(data);   // returns to the CALLBACK, not to readPosts
  });
}                              // readPosts returns undefined immediately
```
**Fix:** use `fs/promises` with `async/await`, or accept a callback and invoke it.

### 2.5 Sync vs async ordering

```js
console.log('1');
setTimeout(() => console.log('2'), 0);
Promise.resolve().then(() => console.log('3'));
console.log('4');
// prints 1, 4, 3, 2
```
**Why:** synchronous code runs first, then **microtasks** (Promise callbacks), then
**macrotasks** (timers, I/O). "Microtask" = a job queued to run right after the current
stack empties, before any timer.

### 2.6 Blocking the event loop

`fs.readFileSync()` halts everything — no other request is served while it runs.
In a server, prefer `await fs.readFile()` from `node:fs/promises`.

### 2.7 Missing error handling

```js
const data = await fs.readFile('missing.json', 'utf8');   // throws, unhandled
```
**Fix:** wrap in `try/catch`, or `.catch()` on the Promise chain. In Express, pass it on
with `next(err)` (see 3.6).

### 2.8 CommonJS vs ES Modules

| CommonJS | ES Modules |
|---|---|
| `const x = require('./x.js')` | `import x from './x.js'` |
| `module.exports = x` / `exports.x = x` | `export default x` / `export const x` |
| default in Node | needs `"type": "module"` in `package.json`, or `.mjs` |
| `__dirname`, `__filename` available | use `import.meta.dirname` |
| loaded synchronously, can be conditional | static, hoisted to the top |

Common bug: mixing the two in one file, or omitting the **`.js` extension** in an ESM import
(required in Node ESM; `import x from './x'` throws `ERR_MODULE_NOT_FOUND`).

Also: reassigning `exports` breaks the link to `module.exports`.
```js
exports = { a: 1 };          // exports nothing
module.exports = { a: 1 };   // correct
```

### 2.9 `dependencies` vs `devDependencies`

- `dependencies` — needed to **run** in production (`express`, `express-validator`).
- `devDependencies` — needed only to **develop/test** (`eslint`, `prettier`, `nodemon`, test runners).
- `npm install pkg` → dependencies; `npm install -D pkg` → devDependencies.
Putting `express` in devDependencies is a quiz-plausible bug: `npm install --production` then omits it and the server crashes on import.

---

## Module 3 — Web Servers & Express

### 3.1 Missing `express.json()`

```js
app.post('/api/products', (req, res) => {
  const { name } = req.body;   // TypeError: Cannot destructure ... of undefined
});
```
**Fix:** `app.use(express.json());` **before** the routes. Without that body-parsing
middleware, `req.body` is `undefined` for a JSON payload.

### 3.2 Route order / middleware registered after routes

Express matches **top to bottom, first match wins**.
```js
app.get('/products/:id', ...);   // catches "/products/new" with id = "new"
app.get('/products/new', ...);   // never reached
```
**Fix:** put the specific literal route above the parameterized one.
Same principle: a catch-all 404 handler and the error handler must be registered **last**.

### 3.3 `req.params` vs `req.query` vs `req.body`

| | Source | Example | Type |
|---|---|---|---|
| `req.params` | the `:name` slots in the path | `/products/5` → `req.params.id === "5"` | always **string** |
| `req.query` | after the `?` | `/products?limit=10` → `req.query.limit === "10"` | **string** (or array) |
| `req.body` | the request payload | `{"price": 9.99}` → `req.body.price === 9.99` | parsed **JSON types** |

**The classic bug:**
```js
const product = products.find(p => p.id === req.params.id);   // never matches
```
`p.id` is the number `5`; `req.params.id` is the string `"5"`; `===` is `false`.
**Fix:** `parseInt(req.params.id, 10)` or `Number(req.params.id)`.

### 3.4 Sending two responses

```js
if (!product) res.status(404).json({ error: 'Not found' });
res.json(product);   // ERR_HTTP_HEADERS_SENT — both lines run
```
**Fix:** `return res.status(404).json(...)` — or use `else`. A handler may send **one** response.

### 3.5 Middleware that never calls `next()`

```js
app.use((req, res, next) => {
  console.log(req.method, req.url);
});   // request hangs forever — no next(), no response
```
**Fix:** call `next()` to continue, **or** send a response to end it. Do exactly one.
Calling `next()` *and* sending a response causes the headers-sent error.

`next(err)` with any argument skips all remaining normal middleware and jumps straight
to the error handler.

### 3.6 Error handler with the wrong arity

```js
app.use((err, req, res) => { ... });   // only 3 params — treated as NORMAL middleware
```
Express identifies an error handler **solely by its four parameters**. Three params means
it never receives errors; `err` gets bound to the request object.
**Fix:**
```js
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ errors: [err.message] });
});
```
Keep `next` in the signature even when unused (that is what the
`// eslint-disable-next-line no-unused-vars` comment in `server.js` is for).

### 3.7 Async errors are not caught automatically in Express 4

```js
app.get('/x', async (req, res) => { throw new Error('boom'); });  // Express 4: hangs
```
**Fix (Express 4):** `try { ... } catch (err) { next(err); }`.
Express 5 forwards rejected Promises to the error handler automatically.

### 3.8 HTTP status codes

| Code | Meaning | When |
|---|---|---|
| 200 | OK | successful GET / PUT |
| 201 | Created | successful POST that creates a resource |
| 204 | No Content | successful DELETE, empty body (`res.status(204).send()`) |
| 400 | Bad Request | client validation failed |
| 401 | Unauthorized | not authenticated |
| 403 | Forbidden | authenticated but not allowed |
| 404 | Not Found | resource does not exist |
| 500 | Internal Server Error | unhandled server-side fault |

`res.status(204).json({...})` is a bug: 204 means "no content," so the body is dropped.

### 3.9 `app.listen()` placement

Routes registered **after** `app.listen()` still work (listen is non-blocking), but the
convention and the expected answer is: all `app.use` / routes first, `app.listen()` last.

---

## Module 4 — REST API & Layered Architecture

### 4.1 REST URL design

- Resources are **plural nouns**: `/api/products`, not `/api/getProducts` or `/api/product`.
- The **verb lives in the HTTP method**, not the path.
- Hierarchy via nesting: `/api/posts/5/comments`.
- Filtering/sorting/paging go in the **query string**, not the path: `/api/products?sortBy=price&order=desc`.

| Wrong | Right |
|---|---|
| `GET /api/getAllProducts` | `GET /api/products` |
| `POST /api/createProduct` | `POST /api/products` |
| `GET /api/deleteProduct/5` | `DELETE /api/products/5` |
| `POST /api/products/5/update` | `PUT /api/products/5` |

### 4.2 Idempotency

**Idempotent** means: making the identical request N times leaves the server in the same
state as making it once.

| Method | Idempotent? | Safe (no state change)? |
|---|---|---|
| GET | yes | yes |
| PUT | yes (same full replacement each time) | no |
| DELETE | yes (after the first, it is already gone) | no |
| POST | **no** (each call creates another resource) | no |
| PATCH | not guaranteed | no |

### 4.3 Layer responsibilities

| Layer | Owns | Must NOT touch |
|---|---|---|
| **Routes** | URL → middleware chain → controller | logic, data |
| **Validation middleware** | inspect `req.body` / `params` / `query`, send **400** and stop | business rules, data |
| **Controller** | read `req`, cast types, call the service, set status, `res.json()` | business rules, the array |
| **Service** | business logic, rules, throwing `404`-shaped errors | `req` / `res` |
| **Repository** | CRUD on the in-memory array | `req` / `res`, business rules |

**Violations to spot in a snippet:**
```js
// service layer
export function getProduct(req, res) {         // BUG: service touching req/res
  res.json(products.find(...));
}
```
```js
// controller
export function getAll(req, res) {
  const filtered = products.filter(...);        // BUG: controller reaching into data
  res.json(filtered);
}
```
The rule to recite: **`req` and `res` stop at the controller; the data array stops at the repository.**

### 4.4 Validation middleware that forgets to stop

```js
function validate(req, res, next) {
  if (!req.body.name) res.status(400).json({ error: 'Name required' });
  next();   // BUG: runs even after the 400 → headers-sent error
}
```
**Fix:** `return res.status(400).json(...)` before `next()`, and call `next()` only on success.

With `express-validator`, the same shape:
```js
export function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array().map(e => e.msg) });
  }
  next();
}
```
Note that `validationResult(req)` must be called in a **separate handler after** the
validation chain — the `body()` / `param()` checks only record results, they do not respond.

### 4.5 Query handling: filter → sort → paginate, in that order

```js
let result = products.filter(...);            // 1. narrow
result = result.toSorted((a, b) => ...);       // 2. order
return result.slice(offset, offset + limit);   // 3. slice the page
```
**Bug to spot:** paginating before filtering — you slice 10 rows out of the full set and
*then* filter, so the page comes back short or empty.

Pagination arithmetic: `slice(offset, offset + limit)`. Writing `slice(offset, limit)` is wrong
(the second argument is an **end index**, not a count).

### 4.6 Query values are always strings

```js
const limit = req.query.limit;                 // "10", a string
products.slice(0, limit);                      // works by coercion, but fragile
const minPrice = req.query.minPrice;
p.price >= minPrice                            // "9.99" comparisons are lexicographic in places
```
**Fix:** cast in the controller — `parseInt(limit, 10)`, `parseFloat(minPrice)`,
`inStock === 'true'` for booleans.
Note `Boolean("false") === true`, so never cast a query boolean with `Boolean()`.

### 4.7 Default values for optional query params

```js
const { sortBy = 'id', order = 'asc', offset = 0, limit = 10 } = req.query;
```
Destructuring defaults apply only when the value is `undefined` — an empty string `?limit=`
is **not** `undefined`, so `limit` becomes `""` and `parseInt("")` is `NaN`.

### 4.8 Sorting comparators

```js
arr.sort();                                  // lexicographic: [1, 10, 2, 20]
arr.sort((a, b) => a.price - b.price);       // numeric ascending
arr.sort((a, b) => a.name.localeCompare(b.name));   // strings
arr.sort((a, b) => a.name - b.name);         // BUG: NaN, order unchanged
```
`.sort()` **mutates**; `.toSorted()` returns a new array. Sorting a shared repository array
in place silently reorders the stored data.

### 4.9 POST response shape

```js
app.post('/api/products', (req, res) => {
  products.push(product);
  res.json(product);        // BUG: 200, should be 201
});
```
**Fix:** `res.status(201).json(product);` — and return the **created resource**, including
its server-assigned `id`.

### 4.10 ID generation

```js
const id = products.length + 1;   // BUG: collides after any delete
```
**Fix:** a monotonic counter (`let nextId = 13; ... id: nextId++`) or
`Math.max(...products.map(p => p.id)) + 1` — the latter guarded for the empty array,
since `Math.max()` of nothing is `-Infinity`.

---

## Five-minute pre-quiz recall list

If you re-read only one section, read this. These are the highest-frequency answers.

1. `req.params.id` is a **string**; array ids are **numbers** → `parseInt(req.params.id, 10)`.
2. Missing `app.use(express.json())` → `req.body` is `undefined`.
3. Missing `return` before `res.status(404)...` → headers-sent error.
4. Error handler needs **four** parameters or Express ignores it.
5. Middleware must call `next()` **or** send a response, exactly one.
6. `.map()`/`.filter()` return new arrays; assign the result.
7. `findIndex` returns `-1`, which is truthy → compare `=== -1`.
8. Missing `await` → you get a pending Promise, not the value.
9. POST returns **201**; DELETE returns **204** with no body.
10. Verbs belong in the HTTP method, not the URL; resources are plural nouns.
11. POST is **not** idempotent; GET/PUT/DELETE are.
12. Service and repository layers never touch `req`/`res`.
13. Filter, then sort, then `slice(offset, offset + limit)`.
14. Query booleans: compare to the string `'true'`, never `Boolean(value)`.
