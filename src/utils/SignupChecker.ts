import { ROLE, SignupInfosDTO } from "../model/Shapes";
import { CustomError } from "../error/CustomError";
import { Authenticator } from "./Authenticator";

export class SignupChecker{
  constructor(
    public infos: SignupInfosDTO,
    public role: string,
    public token?: string
  ){}
  //TODO: tratar erros
  private checkInfos(){
    if(!this.infos.email){
      throw new CustomError(400, 'Missing e-mail.')
    }else if(!this.infos.name){
      throw new CustomError(400, 'Missing name.')
    }else if(!this.infos.password){
      throw new CustomError(400, 'Missing password.')
    }
  }

  private checkIfIsAdmin(){
    const tokenInfos = new Authenticator().getData(this.token)

    if(tokenInfos.role != this.role){
      throw new CustomError(400, "Incompatible role.")
    }else{
      if(tokenInfos.role != ROLE.ADMIN){
        throw new CustomError(400, "Action allowed only for Admins.");
      }
    }
  }

  fullCheck(){
    this.checkInfos()
    if(this.role === ROLE.ADMIN){
      new Authenticator().checkToken(this.token)
      this.checkIfIsAdmin()
    }
  }
}