import { ROLE, SignupInfosDTO, AuthenticationData, GETBY_FIELDNAME } from "../model/Shapes";
import { CustomError } from "../error/CustomError";
import { Authenticator } from "./Authenticator";
import { UsersDatabase } from "../data/UsersDatabase";
import { InfosChecker } from "../model/InfosChecker";

export class SignupChecker extends InfosChecker{
  constructor(
    public infos: SignupInfosDTO,
    public dbGetter: UsersDatabase,
    public token?: string
  ){
    super(infos)
  }

  generalCheck(){
    if(!this.infos.email){
      throw new CustomError(416, 'Missing e-mail.')
    }else if(!this.infos.name){
      throw new CustomError(416, 'Missing name.')
    }else if(!this.infos.password){
      throw new CustomError(416, 'Missing password.')
    }else if(this.infos.password.length < 6){
      throw new CustomError(411, 'Password must have 6 characters or more.')
    }
  }

  private async checkNickAndEmailInDb(): Promise<void>{
    const emailResult = this.infos.email && await this.dbGetter.getByEmailIdOrNick(
      this.infos.email, GETBY_FIELDNAME.EMAIL
    )
    const nickResult = this.infos.nickname && await this.dbGetter.getByEmailIdOrNick(
      this.infos.nickname, GETBY_FIELDNAME.NICKNAME
    )

    if(emailResult != false){
      throw new CustomError(409, 'E-mail already in use.')
    }else if(nickResult != false && ! this.infos.nickname ){
      throw new CustomError(
        409, 
        'Nickname is the same as the name and it already in use. Inform another name or nickname.'
      )
    }else if(nickResult != false){
      throw new CustomError(409, 'Nickname already in use.')
    }
  }
  
  private adminsCheck(tokenInfos: AuthenticationData){
    if(tokenInfos.role != ROLE.ADMIN){
      throw new CustomError(401, "Action allowed only to Admins.");
    }else{
      if(this.infos.password.length < 10){
        throw new CustomError(411, 'Admins password must have 10 characters or more.')
      }
    }
  }

  async fullCheck(): Promise<AuthenticationData | void>{
    this.generalCheck()
    await this.checkNickAndEmailInDb()
    if(this.token){
      const useAuthenticator = new Authenticator()
      useAuthenticator.checkToken(this.token)
      const tokenInfos = useAuthenticator.getData(this.token)
      this.adminsCheck(tokenInfos)
      
      return tokenInfos
    }
  }
}