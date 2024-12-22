import { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { username, password } = req.body;
        console.log("inside POST API");
        // Dummy check for username and password (replace with your real authentication logic)
        if (username === 'user' && password === 'password') {
            const cookieOptions: cookie.SerializeOptions = {
                // maxAge: 60 * 60 * 24, // 1 day
                maxAge: 60 * 2, // 2 minutes
                httpOnly: true, // Prevents JavaScript from accessing the cookie
                // secure: process.env.NODE_ENV === 'production', // Secure cookies in production
                sameSite: 'strict', // Prevents CSRF attacks
            };
            // Set the session cookie
            res.setHeader('Set-Cookie', cookie.serialize('userSession', 'authenticated', cookieOptions));
            // Send a success response
            return res.status(200).json({ message: 'Logged in successfully' });
        } else {
            // Invalid credentials
            return res.status(401).json({ message: 'Invalid credentials' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}