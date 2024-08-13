import mongoose, { Schema, Document } from 'mongoose';

export interface IOrder extends Document {
  orderId: string;
  itemName: string;
  quantity: number;
}

const OrderSchema: Schema = new Schema({
  orderId: { type: String, required: true, unique: true },
  itemName: { type: String, required: true },
  quantity: { type: Number, required: true },
});

export default mongoose.model<IOrder>('Order', OrderSchema);
