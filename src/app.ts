import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import errorHandler from './middlewares/errorHandler';

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


//global error handler
app.use(errorHandler);
// Routes
app.use('/users', userRoutes);
app.get('/', (req, res) => {
  res.send('E-commerce API is running.');
});

export default app;
