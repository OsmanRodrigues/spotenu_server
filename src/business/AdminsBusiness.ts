import { AdminsDatabase } from "../data/AdminsDatabase";
import { LoginInfosDTO, SignupInfosDTO, ROLE } from "../model/Shapes";
import { CustomError } from "../error/CustomError";
import { HashManager } from "../utils/HashManager";
import { IdGenerator } from "../utils/IdGenerator";
import {Authenticator} from "../utils/Authenticator";
import { LoginChecker } from "../utils/LoginChecker";
import { SignupChecker } from "../utils/SignupChecker";

export class AdminsBusiness{
  //TODO: tratar erros
  //TODO: ajustar a role
  
  async signup(infos: SignupInfosDTO, token: string): Promise<any>{
    try{
      const useSignupChecker = new SignupChecker(infos, ROLE.ADMIN, token)
      useSignupChecker.fullCheck()

      const hashedPassword = await new HashManager().hash(infos.password) 
      const id = new IdGenerator().generate()
      
      await new AdminsDatabase().createAdmin({
        id,
        email: infos.email,
        name: infos.name,
        nickname: infos.nickname ? infos.nickname : infos.name,
        password: hashedPassword
      })

      return new Authenticator().generateAccessToken({id, role: ROLE.ADMIN})
    }catch(error){
      throw new CustomError(400, error.message)
    }    
  }

  async login(infos: LoginInfosDTO): Promise<any>{
    const useLoginChecker = new LoginChecker(infos)
    useLoginChecker.checkInfos()

    try{
      const dbResult = await new AdminsDatabase().getByEmailIdOrNick(
        infos.email || infos.nickname
      )
      if(dbResult){
        await useLoginChecker.checkPassword({
          hashedPassword: dbResult.password,
          plainPassword: infos.password
        })

        return new Authenticator().generateAccessToken({
          id: dbResult.id,
          role: ROLE.ADMIN
        }) 
      }else{
        throw new CustomError(400, 'Admin not found.')
      }
    }catch(error){
      throw new CustomError(400, error.message)
    }    
  }
}