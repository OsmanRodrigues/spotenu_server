import { AdminsDatabase } from "../data/AdminsDatabase";
import { createAdminInfosDTO, loginAdminInfosDTO } from "../model/Shapes";
import { CustomError } from "../error/CustomError";
import { HashManager } from "../utils/HashManager";
import { IdGenerator } from "../utils/IdGenerator";
import Authenticator from "../utils/Authenticator";
import { info } from "console";

export class AdminsBusiness{
  //TODO: tratar erros
  //TODO: ajustar a role
  
  async createAdmin(infos: createAdminInfosDTO, token: string): Promise<any>{
    try{
      if(! token){
        throw new CustomError(400, 'Missing token.')
      }else if(!token.includes('.')){
        throw new CustomError(400, "Not a jwt token.")
      }

      const tokenInfos = new Authenticator().getData(token)

      if(tokenInfos.role.toUpperCase() != 'ADMIN'){
        throw new CustomError(400, "Only Admins Users can log in admin account.")
      }

      if(!infos.email){
        throw new CustomError(400, 'Missing e-mail.')
      }else if(!infos.name){
        throw new CustomError(400, 'Missing name.')
      }else if(!infos.password){
        throw new CustomError(400, 'Missing password.')
      }

      const hashedPassword = await new HashManager().hash(infos.password) 
      const id = new IdGenerator().generate()
      
      await new AdminsDatabase().createAdmin({
        id,
        email: infos.email,
        name: infos.name,
        nickname: infos.nickname ? infos.nickname : infos.name,
        password: hashedPassword
      })
      
      const accessToken = new Authenticator().generateToken({id, role: 'ADMIN'})

      return {accessToken}
    }catch(error){
      throw new CustomError(400, error.message)
    }    
  }

  async login(infos: loginAdminInfosDTO): Promise<any>{
    if(! infos.password){
      throw new CustomError(400, 'Missing password')
    }else if(! infos.email && ! infos.nickname){
      throw new CustomError(400, 'Needs email or nickname to login.')
    }

    try{
      const result = await new AdminsDatabase().getByEmailIdOrNick(
        infos.email || infos.nickname
      )

      if(result){
        const passwordIsValid = await new HashManager().checkHash(result.password, infos.password)
        if(passwordIsValid){
          return{
            accessToken: new Authenticator().generateToken({
              id: result.id,
              role: 'ADMIN' 
            })
          } 
        }else{
          throw new CustomError(400, 'Invalid password.')
        }
      }else{
        throw new CustomError(400, 'Admin not found.')
      }
    }catch(error){
      throw new CustomError(400, error.message)
    }    
  }
}