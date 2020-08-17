import { AdminsDatabase } from "../data/AdminsDatabase";
import { createAdminInfosDTO } from "../model/Shapes";
import { CustomError } from "../error/CustomError";
import { HashManager } from "../utils/HashGenerator";
import { IdGenerator } from "../utils/IdGenerator";
import Authenticator from "../utils/Authenticator";

export class AdminsBusiness{
  //TODO: tratar erros
  //TODO: solicitar token para criação de  adm
  //TODO: ajustar a role
  
  async createAdmin(infos: createAdminInfosDTO): Promise<any>{
    if(!infos){
      throw new CustomError(400, 'Need a new Administrator infos.')
    }else if(!infos.email){
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
  }
}