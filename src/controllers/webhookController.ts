import { Request, Response } from 'express';
import { handleLineMessage } from '../services/lineService';

export const webhookHandler = (req: Request, res: Response) => {
  const events = req.body.events[0];
  handleLineMessage(events);
  res.send("HTTP POST request sent to the webhook URL!");
};
