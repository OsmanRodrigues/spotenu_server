import jwt from 'jsonwebtoken';
import { AuthenticationData } from '../model/Shapes';
import { CustomError } from '../error/CustomError';

export class Authenticator{
  public generateAccessToken(
    input: AuthenticationData,
    expiresIn: string = process.env.ACC_TOKEN_EXPIRES_IN
    ): {}{
    const accessToken = jwt.sign(
      {
        id: input.id, 
        role: input.role,
        device: input.device
      }, 
      process.env.JWT_KEY as string,
      {expiresIn}
    );
    return {accessToken};
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

  checkToken(token: string){
    try{
      if(! token){
        throw new CustomError(400, 'Missing token.')
      }else if(!token.includes('.')){
        throw new CustomError(400, "Not a jwt token.")
      }
    }catch (error){
      throw new CustomError(400, error.message)
    }
  }
};