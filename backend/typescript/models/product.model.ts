import { Schema, Document, model, Types } from "mongoose";

export interface Product extends Document {
  _id: Types.ObjectId;
  name: string;
  description: string;
  price: number;
  quantity: number;
  imageUrls: [string];
}

const ProductSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  imageUrls: {
    type: [String],
    required: false,
  },
});

export default model<Product>("Product", ProductSchema);
