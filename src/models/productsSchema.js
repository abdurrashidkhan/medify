import mongoose, { Schema } from "mongoose";

const productsSchema = new Schema(
  {
    productName: { type: String, require: true },
    title: { type: String, require: true },
    productPrice: { type: Number, require: true },
    deliveryCharges: { type: Number, require: true },
    discount: { type: Number, require: true },
    orderNumber: { type: Number, require: true },
    description: { type: String, require: true },
    thumbnail: { type: String, require: true },
    lgImage: { type: String, require: true },
    smImage: { type: String, require: true },
    date: { type: Date, require: true },
  },
  {
    timestamps: true,
  }
);
const products = mongoose.models.products || mongoose.model("products", productsSchema);
export default products;
