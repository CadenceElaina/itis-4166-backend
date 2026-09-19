// productRepository.js
// In-memory data access for products.

let nextId = 13;

const products = [
  { id: 1, name: 'Mechanical Keyboard', price: 89.99, inStock: true },
  { id: 2, name: 'Wireless Mouse', price: 24.5, inStock: true },
  { id: 3, name: 'USB-C Hub', price: 39.0, inStock: false },
  { id: 4, name: '27 inch Monitor', price: 219.99, inStock: true },
  { id: 5, name: 'Laptop Stand', price: 34.95, inStock: true },
  { id: 6, name: 'Desk Lamp', price: 19.99, inStock: false },
  { id: 7, name: 'Webcam 1080p', price: 49.0, inStock: true },
  { id: 8, name: 'Noise Cancelling Headphones', price: 149.0, inStock: true },
  { id: 9, name: 'Ergonomic Chair', price: 289.0, inStock: false },
  { id: 10, name: 'Standing Desk', price: 399.0, inStock: true },
  { id: 11, name: 'Cable Organizer', price: 9.99, inStock: true },
  { id: 12, name: 'Portable SSD 1TB', price: 99.99, inStock: false },
];

/**
 * Filter, sort, then paginate the product dataset, in that order.
 * @param {{
 *   search?: string,
 *   inStock?: boolean,
 *   minPrice?: number,
 *   maxPrice?: number,
 *   sortBy: 'id' | 'name' | 'price',
 *   order: 'asc' | 'desc',
 *   offset: number,
 *   limit: number,
 * }} options
 * @returns {Array<object>}
 */
export function findProducts({
  search,
  inStock,
  minPrice,
  maxPrice,
  sortBy,
  order,
  offset,
  limit,
}) {
  let result = products.filter((p) => {
    if (
      search !== undefined &&
      !p.name.toLowerCase().includes(search.toLowerCase())
    ) {
      return false;
    }
    if (inStock !== undefined && p.inStock !== inStock) return false;
    if (minPrice !== undefined && p.price < minPrice) return false;
    if (maxPrice !== undefined && p.price > maxPrice) return false;
    return true;
  });

  const direction = order === 'desc' ? -1 : 1;
  result = result.toSorted((a, b) => {
    const cmp =
      sortBy === 'name' ? a.name.localeCompare(b.name) : a[sortBy] - b[sortBy];
    return cmp * direction;
  });

  return result.slice(offset, offset + limit);
}

export function findProductById(id) {
  return products.find((p) => p.id === id);
}

export function createProduct({ name, price, inStock }) {
  const product = { id: nextId++, name, price, inStock };
  products.push(product);
  return product;
}

export function updateProduct(id, fields) {
  const product = findProductById(id);
  if (!product) return undefined;
  Object.assign(product, fields);
  return product;
}

export function deleteProduct(id) {
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return false;
  products.splice(index, 1);
  return true;
}
