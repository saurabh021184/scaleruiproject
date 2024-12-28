import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../prisma/prisma'; // Ensure this path matches your project structure
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'your-secret-key'; // Replace with an environment variable in production

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { username, password } = req.body;
    console.log(`username: ${username}, password: ${password}`)

    try {
      // Check if user exists

      // console.log(prisma.user.fields); // To check the Prisma Client version
      // console.log(prisma._engine.config); // To check the database URL

      const users = await prisma.user.findMany();
      console.log(users);

      const user = await prisma.user.findUnique({
        where: { username },
      });

      console.log(`db response ${user}`)

      if (user && user.password === password) {
        // Generate a token for the session
        const token = jwt.sign({ id: user.id, username }, SECRET_KEY, {
          expiresIn: '1h',
        });

        // Update the user's token in the database
        await prisma.user.update({
          where: { username },
          data: { token },
        });

        // Save token in a secure cookie
        res.setHeader('Set-Cookie', [
          `token=${token}; HttpOnly; Path=/; Max-Age=3600`,
        ]);

        res.status(200).json({ message: 'Login successful', token });
      } else {
        res.status(401).json({ message: 'Invalid username or password' });
      }
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
