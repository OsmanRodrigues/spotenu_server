import { LoginInfosDTO, CheckPasswordInput } from "../model/Shapes";
import {Authenticator} from "../utils/Authenticator";
import { HashManager } from "../utils/HashManager";
import { CustomError } from "../error/CustomError";

export class LoginChecker{
  constructor(
    public infos: LoginInfosDTO
  ){}
  //TODO: tratar erros
  checkInfos(): void{
    if(! this.infos.password){
      throw new CustomError(400, 'Missing password')
    }else if(! this.infos.email && ! this.infos.nickname){
      throw new CustomError(400, 'Needs email or nickname to login.')
    }
  }
  
  async checkPassword(infos: CheckPasswordInput): Promise<boolean>{
    const passwordIsValid = await new HashManager().checkHash(
      infos.hashedPassword, infos.plainPassword
    )
    if(passwordIsValid){
      return passwordIsValid 
    }else{
      throw new CustomError(400, 'Invalid password.')
    }
  }
}