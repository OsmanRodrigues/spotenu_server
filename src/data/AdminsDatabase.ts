import { BaseDatabase } from "../model/BaseDatabase";
import { CreateAdminInfosDTO, AdminInfosDTO } from "../model/Shapes";
import { CustomError } from "../error/CustomError";

export class AdminsDatabase extends BaseDatabase{
  private tableName: string = process.env.TABLE_NAME_ADMINS as string
  //TODO: criar método geral para o create e get
  
  async createAdmin(infos: CreateAdminInfosDTO): Promise<void>{
    try{
     await this.getConnection()
      .insert(infos)
      .into(this.tableName)      
    }catch(error){
      throw new CustomError(400, (error.message || error.sqlMessage))
    }
  }

  async getByEmailIdOrNick(
    email: string, id?:string, nickname?:string
    ): Promise<AdminInfosDTO>{
    try{
      const result = await this.getConnection()
      .select('*')
      .from(this.tableName)
      .where(email ? {email} : {id}  || {nickname})

      return result.length === 1 && {
        id: result[0].id,
        email: result[0].email,
        name: result[0].name,
        nickname: result[0].nickname,
        password: result[0].password
      }
    }catch(error){
      throw new CustomError(400, (error.message || error.sqlMessage))
    }
  }
}
