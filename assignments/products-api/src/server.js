// server.js
// Sets up the Express app, mounts the product routes, and handles errors.

import express from 'express';
import productRoutes from './routes/productRoutes.js';

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/api/products', productRoutes);

// Unknown routes
app.use((req, res, next) => {
  const err = new Error('Not found');
  err.status = 404;
  next(err);
});

// Centralized error handler: every error leaves as { errors: [message] }
// eslint-disable-next-line no-unused-vars -- Express needs all four arguments
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = status === 500 ? 'Internal Server Error' : err.message;
  res.status(status).json({ errors: [message] });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
}

export default app;
