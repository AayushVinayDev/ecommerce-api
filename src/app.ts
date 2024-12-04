import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import productRoutes from './routes/productRoutes';
import errorHandler from './middlewares/errorHandler';
import orderRoutes from './routes/orderRoutes';

dotenv.config();

const app = express();

// Middleware
app.use(helmet());
app.use(express.json());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
  })
);



// Routes
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.get('/', (req, res) => {
  res.send('E-commerce API is running.');
});

app.get('/health', (req, res) => {
  res.status(200).send({ status: 'UP', timestamp: new Date() });
});


//Global error handler
app.use(errorHandler);

export default app;
