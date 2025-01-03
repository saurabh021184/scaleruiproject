import { NextApiRequest, NextApiResponse } from "next";

import { UserHandler } from '../../../handlers/user';

const userHandler = new UserHandler();
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
     await userHandler.handleResetPassword(req,res);
  }else{
      res.setHeader('Allow', ['POST']);
      res.status(405).json({ message: `Method ${req.method} not allowed` });
 }
}