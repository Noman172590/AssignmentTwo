import { Schema, model } from 'mongoose';
import { Inventory, Product, Variant } from './Product/Products.interface';

// 2. Create a Schema corresponding to the document interface which src/app/Modules/Product/Products.interface.ts file.
const variantSchema = new Schema<Variant>({
  type: { type: String, required: true },
  value: { type: String, required: true },
});

const inventorySchema = new Schema<Inventory>({
  quantity: { type: Number, required: true },
  inStock: { type: Boolean, required: true },
});

const productSchema = new Schema<Product>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  tags: { type: [String], required: true },
  variants: { type: [variantSchema], required: true },
  inventory: { type: inventorySchema, required: true },
});
// 3. Create a Model.
export const ProductModel = model<Product>('Product', productSchema);
