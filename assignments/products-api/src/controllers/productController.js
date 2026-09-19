// productController.js
// Reads the request, calls the service, and writes the response.

import * as service from '../services/productService.js';

/**
 * GET /api/products
 * Express delivers every query value as a string, so each one is cast to a
 * native type here before the options object goes to the service.
 */
export function getAllProducts(req, res) {
  const {
    search,
    inStock,
    minPrice,
    maxPrice,
    sortBy = 'id',
    order = 'asc',
    offset = 0,
    limit = 10,
  } = req.query;

  const options = {
    search,
    inStock: inStock === undefined ? undefined : inStock === 'true',
    minPrice: minPrice === undefined ? undefined : parseFloat(minPrice),
    maxPrice: maxPrice === undefined ? undefined : parseFloat(maxPrice),
    sortBy,
    // The validator accepts any casing but cannot rewrite req.query in Express 5.
    order: order.toLowerCase(),
    offset: parseInt(offset, 10),
    limit: parseInt(limit, 10),
  };

  res.json(service.getAllProducts(options));
}

export function getProductById(req, res) {
  res.json(service.getProductById(parseInt(req.params.id, 10)));
}

export function createProduct(req, res) {
  const { name, price, inStock } = req.body;
  res.status(201).json(service.createProduct({ name, price, inStock }));
}

export function updateProduct(req, res) {
  const { name, price, inStock } = req.body;
  const fields = Object.fromEntries(
    Object.entries({ name, price, inStock }).filter(([, v]) => v !== undefined),
  );
  res.json(service.updateProduct(parseInt(req.params.id, 10), fields));
}

export function deleteProduct(req, res) {
  service.deleteProduct(parseInt(req.params.id, 10));
  res.status(204).send();
}
