import { ROLE, SignupInfosDTO, AuthenticationData, GETBY_FIELDNAME } from "../model/Shapes";
import { CustomError } from "../error/CustomError";
import { Authenticator } from "./Authenticator";
import { UsersDatabase } from "../data/UsersDatabase";
import { compareSync } from "bcryptjs";

export class SignupChecker{
  constructor(
    public infos: SignupInfosDTO,
    public dbGetter: UsersDatabase,
    public token?: string
  ){}
  //TODO: tratar erros
  //TODO: remover a checkagem por envio de role

  private checkGeneralInfos(){
    if(!this.infos.email){
      throw new CustomError(400, 'Missing e-mail.')
    }else if(!this.infos.name){
      throw new CustomError(400, 'Missing name.')
    }else if(!this.infos.password){
      throw new CustomError(400, 'Missing password.')
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
      throw new CustomError(400, 'E-mail already in use.')
    }else if(nickResult != false && ! this.infos.nickname ){
      throw new CustomError(
        400, 
        'Nickname is the same as the name and it already exists. Inform another name or nickname.'
      )
    }else if(nickResult != false){
      throw new CustomError(400, 'Nickname already exists.')
    }
  }
  
  private checkIfIsAdmin(tokenInfos: AuthenticationData){
    if(tokenInfos.role != ROLE.ADMIN){
      throw new CustomError(400, "Action allowed only to Admins.");
    }
  }

  async fullCheck(): Promise<AuthenticationData | void>{
    this.checkGeneralInfos()
    await this.checkNickAndEmailInDb()
    if(this.token){
      const useAuthenticator = new Authenticator()
      useAuthenticator.checkToken(this.token)
      const userInfos = useAuthenticator.getData(this.token)
      this.checkIfIsAdmin(userInfos)
      
      return userInfos
    }
  }
}