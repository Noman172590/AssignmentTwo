import { ProductModel } from '../Product.modal';
import { Inventory, Product } from './Products.interface';

const createProductDb = async (product: Product) => {
  const result = await ProductModel.create(product);
  return result;
};

const getAllProductsFromBD = async () => {
  const result = await ProductModel.find();
  return result;
};
const getSingleProductsFromBD = async (productId: string) => {
  const result = await ProductModel.findOne({ _id: productId });
  return result;
};
const productInformationUpdateFromBD = async (
  productId: string,
  updateData: Product,
) => {
  const options = { new: true }; // To return the updated document
  const updatedProduct = await ProductModel.findByIdAndUpdate(
    productId,
    updateData,
    options,
  );
  return updatedProduct;
};

const productDeleteFromDB = async (productId: string) => {
  const deletedProduct = await ProductModel.findByIdAndDelete(productId);
  return deletedProduct;
};


const updateProductInventory = async (productId: string, inventory: Inventory) => {
  const updatedProduct = await ProductModel.findByIdAndUpdate(
    productId,
    { inventory }, // Update only the inventory field
    { new: true } // To return the updated document
  );
  return updatedProduct;
};

export const productService = {
  createProductDb,
  getAllProductsFromBD,
  getSingleProductsFromBD,
  productInformationUpdateFromBD,
  productDeleteFromDB,
  updateProductInventory
};
