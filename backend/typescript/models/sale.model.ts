import { Schema, Document, model, Types } from "mongoose";

export class SaleItem {
  constructor(productId: String, quantity: number) {
    this.productId = productId;
    this.quantity = quantity;
  }

  productId: String;

  quantity: number;
}

export interface Sale extends Document {
  _id: Types.ObjectId;
  items: [SaleItem];
}

const SaleSchema: Schema = new Schema({
  items: {
    type: [{ productId: String, quantity: Number }],
    required: true,
  },
});

export default model<Sale>("Sale", SaleSchema);
