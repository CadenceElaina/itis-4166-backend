// productService.js
// Business logic layer between the controllers and the repository.

import * as repo from '../repositories/productRepository.js';

function notFound(id) {
  const err = new Error(`Product ${id} not found`);
  err.status = 404;
  return err;
}

/**
 * Pass-through: the controller has already typed and defaulted the options.
 */
export function getAllProducts(options) {
  return repo.findProducts(options);
}

export function getProductById(id) {
  const product = repo.findProductById(id);
  if (!product) throw notFound(id);
  return product;
}

export function createProduct(data) {
  return repo.createProduct(data);
}

export function updateProduct(id, fields) {
  const product = repo.updateProduct(id, fields);
  if (!product) throw notFound(id);
  return product;
}

export function deleteProduct(id) {
  if (!repo.deleteProduct(id)) throw notFound(id);
}
