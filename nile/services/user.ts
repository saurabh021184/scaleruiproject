import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/user';
import { LoginDTO, SessionDTO, RecommendationsDTO, AddressDTO } from '../dtos/user';

const SECRET_KEY = process.env.SECRET_KEY || 'your-secret-key'; // Replace with an env variable in production

export class UserService {
    private userRepository: UserRepository;
  
    constructor() {
      this.userRepository = new UserRepository();
    }
  
    async loginUser(loginDTO: LoginDTO) {
      const { username, password } = loginDTO;
  
      // Fetch user from the database
      const user = await this.userRepository.findUserByUsername(username);
      if (!user || user.password !== password) {
        throw new Error('Invalid username or password');
      }
  
      // Generate JWT token
      const token = jwt.sign({ id: user.id, username }, SECRET_KEY, {
        expiresIn: '1h',
      });
  
      // Update token in the database
      await this.userRepository.updateUserToken(username, token);
  
      return { token: token, userId: user.id };
    }

    async validateSession(sessionDTO: SessionDTO): Promise<boolean> {
        const { userSession } = sessionDTO;
    
        // Use repository to validate session
        return await this.userRepository.validateSession(userSession);
      }

    async getAddressByUserId(userId: number): Promise<AddressDTO | null> {
        const address = await this.userRepository.findAddressByUserId(userId);
    
        if (!address) {
          return null;
        }
    
        // Map the data to AddressDTO
        const addressDTO: AddressDTO = {
          street: address.street,
          city: address.city,
          state: address.state,
          zip: address.zip,
        };
    
        return addressDTO;
      }

    async getRecommendationsByUserId(userId: number): Promise<RecommendationsDTO[] | null> {
      const recommendations = await this.userRepository.getRecommendationsByUserId(userId);
  
      if (!recommendations) {
        return null;
      }
  
      // Map the data to AddressDTO
      const recommendationsDTO: RecommendationsDTO[] = recommendations.map((recommendation) => ({
        id: recommendation.id,
        name: recommendation.name,
        price: recommendation.price,
      }));
  
      return recommendationsDTO;
    }
  }