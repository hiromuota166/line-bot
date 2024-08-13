import { Request, Response } from 'express';
import { fetchOrderStatus } from '../services/supabaseService';

export const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await fetchOrderStatus();
    res.status(200).json(orders);
  } catch (error) {
    console.log('ここには届いてる')
    if (error instanceof Error) {
      console.error('Error fetching groups:', error.message);
      res.status(500).json({ error: error.message });
    } else {
      console.error('Unexpected error:', error);
      res.status(500).json({ error: 'An unexpected error occurred' });
    }
  }
};
