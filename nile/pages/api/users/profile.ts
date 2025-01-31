// src/pages/api/users/profile.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { UserHandler } from '../../../handlers/user';

const userHandler = new UserHandler();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    await userHandler.handleProfile(req, res);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}