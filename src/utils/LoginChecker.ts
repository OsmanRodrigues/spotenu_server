import { LoginInfosDTO, CheckPasswordInput } from "../model/Shapes";
import { HashManager } from "../utils/HashManager";
import { CustomError } from "../error/CustomError";
import { InfosChecker } from "../model/InfosChecker";

export class LoginChecker extends InfosChecker{
  constructor(
    public infos: LoginInfosDTO
  ){
    super(infos)
  }
  //TODO: tratar erros
  generalCheck(): void{
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