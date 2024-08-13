import { Request, Response } from 'express';
import OrderSchemaModel from '../models/order-model';
import { v4 as uuid } from 'uuid';

export class OrderController {
  public static async createOrder(req: Request, res: Response) {
    const { itemName, quantity } = req.body;
    if (!itemName || !quantity) {
      return res.status(400).json({ message: 'Item name and quantity are required!' });
    }

    try {
      const newOrder = new OrderSchemaModel({
        orderId: uuid(),
        itemName,
        quantity,
      });

      const result = await newOrder.save();
      res.status(200).json({ message: 'Order created successfully', result });
    } catch (ex) {
      res.status(400).json({ message: 'Error occurred' });
    }
  }

  public static async getAllOrders(req: Request, res: Response) {
    try {
      const result = await OrderSchemaModel.find();
      res.status(200).json({ message: 'Get all orders successfully', result });
    } catch (ex) {
      res.status(400).json({ message: 'Error occurred' });
    }
  }
}
