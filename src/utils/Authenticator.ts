import jwt from 'jsonwebtoken';
import { AuthenticationData } from '../model/Shapes';

class Authenticator{
  public generateToken(
    input: AuthenticationData,
    expiresIn: string = process.env.ACC_TOKEN_EXPIRES_IN
    ): string{
      
    const token = jwt.sign(
      {
        id: input.id, 
        role: input.role,
        device: input.device
      }, 
      process.env.JWT_KEY as string,
      {expiresIn}
    );
    return token;
  };

  public getData(token: string): AuthenticationData{
    const payload = jwt.verify(
      token,
      process.env.JWT_KEY as string
    ) as any;
    const result = {
      id: payload.id,
      name: payload.name,
      email: payload.email,
      role: payload.role
    };
    return result;
  };
};
export default Authenticator;