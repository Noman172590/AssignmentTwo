import { Request, Response } from 'express';
import { productService } from './Products.Service';
import { ProductModel } from '../Product.modal';

const createProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body;
    // service must be add because mongoose modal query apply all time
    const result = await productService.createProductDb(product);
    //send response
    res.status(200).json({
      success: true,
      message: 'Product created successfully!',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllProduct = async (req: Request, res: Response,) => {
  try {
    let result = await productService.getAllProductsFromBD();
    const searchTerm = req.query.searchTerm as string;
    //  searchTerm is provided
    if (searchTerm) {
      //  filter products based on the searchTerm
      result = await ProductModel.find({
        $or: [
          { name: { $regex: new RegExp(searchTerm, 'i') } },
          { description: { $regex: new RegExp(searchTerm, 'i') } },
        ],
      });
    } else {
      // fetch all products
      result = await ProductModel.find();
    }

    res.status(200).json({
      success: true,
      message: searchTerm
        ? `Products matching search term '${searchTerm}' fetched successfully!`
        : 'Products fetched successfully!',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};
const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await productService.getSingleProductsFromBD(productId);
    res.status(200).json({
      success: true,
      message: 'Product fetched successfully!',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const productInformationUpdate = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const updateData = req.body;

    const updatedProduct = await productService.productInformationUpdateFromBD(
      productId,
      updateData,
    );

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: 'Product is  not found!!',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product updated successfully!',
      data: updatedProduct,
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const deletedProduct = await productService.productDeleteFromDB(productId);
    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: 'Product not found!',
        data: null,
      });
    }
    res.status(200).json({
      success: true,
      message: 'Product deleted successfully!',
      data: null,
    });
  } catch (error) {
    console.error(error);
  }
};

export const productController = {
  createProduct,
  getAllProduct,
  getSingleProduct,
  productInformationUpdate,
  deleteProduct,
};
