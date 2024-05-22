import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { ProductRouter } from './app/Modules/Product/products.route';
import { OrderRouter } from './app/Modules/Order/Order.route';
const app: Application = express();
// parser use
app.use(express.json());

// cors use it
app.use(cors());

//application routes
// products
app.use('/api/products', ProductRouter);
// order
app.use('/api/orders', OrderRouter);

app.get('/', (req: Request, res: Response) => {
  const a = 5;

  res.send(a);
});

export default app;
