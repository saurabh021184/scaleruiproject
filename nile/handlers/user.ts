// src/handlers/user.handler.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { UserService } from '../services/user';
import { LoginDTO, SessionDTO, AddressDTO, RecommendationsDTO } from '../dtos/user';
import cookie from 'cookie';

export class UserHandler {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async handleLogin(req: NextApiRequest, res: NextApiResponse) {
    try {
      const loginDTO: LoginDTO = req.body;

      const { token, userId}  = await this.userService.loginUser(loginDTO);

      // Set token in an HttpOnly cookie
      // res.setHeader('Set-Cookie', [
      //   `token=${token}; HttpOnly; Path=/; Max-Age=3600`,
      //   `userId=${userId}; HttpOnly; Path=/; Max-Age=3600; Secure; SameSite=Strict`, // Store userId in a cookie as well
      // ]);
      res.setHeader('Set-Cookie', [
        `token=${token}; HttpOnly; Path=/; Max-Age=3600`,
        `userId=${userId}; Path=/; Max-Age=3600`, // Store userId in a cookie as well
      ]);


      res.status(200).json({ message: 'Login successful', token, userId: userId });
      // localStorage.setItem('userId', String(userId)); // Store the userId in local storage store instead in a cookie
    } catch (error) {
      // Safely handle the error type
      if (error instanceof Error) {
        console.error('Error during login:', error.message);
        res.status(401).json({ message: error.message || 'Invalid credentials' });
      } else {
        console.error('Unknown error during login:', error);
        res.status(500).json({ message: 'An unknown error occurred' });
      }
    }
  }

  async handleProfile(req: NextApiRequest, res: NextApiResponse) {
    try {
      // Parse cookies
      const cookies = cookie.parse(req.headers.cookie || '');
      const sessionDTO: SessionDTO = { userSession: cookies.userSession || '' };

      // Validate session
      const isValidSession = await this.userService.validateSession(sessionDTO);

      if (isValidSession) {
        // Return profile data if session is valid
        return res.status(200).json({ message: 'Welcome to the profile page' });
      } else {
        // If session is invalid
        return res.status(401).json({ message: 'Not authenticated' });
      }
    } catch (error) {
      console.error('Error validating session:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async handleAddress(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { userId } = req.query; // Get userId from query parameter
      if (!userId) {
        return res.status(400).json({ message: 'userId query parameter is required' });
      }

      const address: AddressDTO | null = await this.userService.getAddressByUserId(Number(userId));
      if (!address) {
        return res.status(404).json({ message: 'Address not found' });
      }

      return res.status(200).json(address); // Send the AddressDTO as the response
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error fetching address' });
    }
  }

  async handleRecommendation(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { userId } = req.body; // Get userId from query parameter
      // if (!userId) {
      //   return res.status(400).json({ message: 'userId body parameter is required' });
      // }

      const recommendations: RecommendationsDTO[] | null = await this.userService.getRecommendationsByUserId(Number(userId));

      if (!recommendations) {
        return res.status(404).json({ message: 'Reccommendations not found' });
      }

      return res.status(200).json(recommendations);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error fetching recommendations' });
    }
  }
}