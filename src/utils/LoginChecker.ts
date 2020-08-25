import { LoginInfosDTO, CheckPasswordInput, UserInfosDTO, ROLE, AuthenticationData } from "../model/Shapes";
import { HashManager } from "../utils/HashManager";
import { CustomError } from "../error/CustomError";
import { InfosChecker } from "../model/InfosChecker";
import { BandsDatabase } from "../data/BandsDatabase";

export class LoginChecker extends InfosChecker{
  constructor(
    public infos: LoginInfosDTO,
  ){
    super(infos)
  }
  
  generalCheck(): void{
    if(! this.infos.password){
      throw new CustomError(416, 'Missing password')
    }else if(! this.infos.email && ! this.infos.nickname){
      throw new CustomError(416, 'Needs email or nickname to login.')
    }
  }
  
  async checkPassword(infos: CheckPasswordInput): Promise<boolean>{
    const passwordIsValid = await new HashManager().checkHash(
      infos.hashedPassword, infos.plainPassword
    )
    if(passwordIsValid){
      return passwordIsValid 
    }else{
      throw new CustomError(401, 'Invalid password.')
    }
  }

  async checkIfHasAnyRestriction(infos: UserInfosDTO): Promise<void|{message: string}>{
    if(infos.blocked === 1){
      throw new CustomError(401, 'Not allowed. Blocked User.')
    }else{
      if(infos.role === ROLE.BAND){
        const result = await new BandsDatabase().getById(infos.id)
        
        if(result.approved === 0){
          return {message: 'Band registration not yet approved.'}
        }
      }
    }
  }
}