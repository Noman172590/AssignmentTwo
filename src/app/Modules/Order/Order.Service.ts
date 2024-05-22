import { OrderModel } from '../Order.modal';
import { Order } from './Order.interface';

const createOrderDb = async (order: Order) => {
  const result = await OrderModel.create(order);
  return result;
};

const getAllOrderFromBD = async () => {
  const result = await OrderModel.find();
  return result;
};
const getSingleOrderFromBD = async (email: string) => {
  const result = await OrderModel.findOne({ email: email });
  return result;
};
export const OrderService = {
  createOrderDb,getAllOrderFromBD,getSingleOrderFromBD
  
};
