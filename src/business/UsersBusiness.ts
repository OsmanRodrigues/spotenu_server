import { UsersDatabase } from "../data/UsersDatabase";
import { LoginInfosDTO, SignupInfosDTO, ROLE, GETBY_FIELDNAME } from "../model/Shapes";
import { CustomError } from "../error/CustomError";
import { HashManager } from "../utils/HashManager";
import { IdGenerator } from "../utils/IdGenerator";
import {Authenticator} from "../utils/Authenticator";
import { LoginChecker } from "../utils/LoginChecker";
import { SignupChecker } from "../utils/SignupChecker";

export class UsersBusiness{
  //TODO: tratar erros
  //TODO: ajustar a role
  
  async signup(infos: SignupInfosDTO, token?: string): Promise<{}>{
    try{
      const useSignupChecker = new SignupChecker(infos, new UsersDatabase(), token)
      const checkResult = await useSignupChecker.fullCheck()

      const hashedPassword = await new HashManager().hash(infos.password) 
      const id = new IdGenerator().generate()
      //valida o nickname
      await new UsersDatabase().create({
        id,
        email: infos.email,
        name: infos.name,
        nickname: infos.nickname,
        password: hashedPassword,
        role: checkResult ? checkResult.role : ROLE.NORMAL 
      })

      return new Authenticator().generateAccessToken({
        id, role:checkResult ? checkResult.role : ROLE.NORMAL 
      })
    }catch(error){
      throw new CustomError(400, error.message)
    }    
  }

  async login(infos: LoginInfosDTO): Promise<any>{
    const useLoginChecker = new LoginChecker(infos)
    useLoginChecker.checkInfos()

    try{
      const dbResult = await new UsersDatabase().getByEmailIdOrNick(
        infos.email || infos.nickname, 
        infos.email ? GETBY_FIELDNAME.EMAIL : GETBY_FIELDNAME.NICKNAME
      )
      if(dbResult){
        await useLoginChecker.checkPassword({
          hashedPassword: dbResult.password,
          plainPassword: infos.password
        })

        return new Authenticator().generateAccessToken({
          id: dbResult.id,
          role: dbResult.role
        }) 
      }else{
        throw new CustomError(400, 'User not found.')
      }
    }catch(error){
      throw new CustomError(400, error.message)
    }    
  }
}