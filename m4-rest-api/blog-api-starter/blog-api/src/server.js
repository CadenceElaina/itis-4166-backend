import express from 'express';
import morgan from 'morgan';
import postRoutes from './routes/postRoutes.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(morgan('tiny'));
app.use('/api/posts', postRoutes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
