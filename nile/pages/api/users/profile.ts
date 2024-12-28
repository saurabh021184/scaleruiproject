import { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Parse cookies
    const cookies = cookie.parse(req.headers.cookie || '');
    if (cookies.userSession === 'authenticated') {
         // Return the profile data if the user is authenticated
         return res.status(200).json({ message: 'Welcome to the profile page' });
    } else {
          // If session is invalid or missing, return an unauthorized response
          return res.status(401).json({ message: 'Not authenticated' });
    }
}