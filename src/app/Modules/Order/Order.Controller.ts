import { Request, Response } from 'express';
import { OrderService } from './Order.Service';
import { OrderModel } from '../Order.modal';

const createOrder = async (req: Request, res: Response) => {
  try {
    const product = req.body;
    // service must be add because mongoose modal query apply all time
    const result = await OrderService.createOrderDb(product);
    //send response
    res.status(200).json({
      success: true,
      message: 'Order created successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};
const getAllOrder = async (req: Request, res: Response,) => {
  try {
    let result = await OrderService.getAllOrderFromBD();
    const email = req.query.email as string;
    //  email is provided
    if (email) {
      //  filter products based on the email
      result = await OrderModel.find({
        $or: [
          { name: { $regex: new RegExp(email, 'i') } },
          { description: { $regex: new RegExp(email, 'i') } },
        ],
      });
    } else {
      // fetch all products
      result = await OrderModel.find();
    }

    res.status(200).json({
      success: true,
      message: email
        ? `Products matching search term '${email}' fetched successfully!`
        : 'Products fetched successfully!',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};
const getSingleOrder = async (req: Request, res: Response) => {
  try {
    const { email } = req.params;
    const result = await OrderService.getSingleOrderFromBD(email);
    res.status(200).json({
      success: true,
      message: 'Product fetched successfully!',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

export const orderController = {
  createOrder,
  getAllOrder,
  getSingleOrder
};
