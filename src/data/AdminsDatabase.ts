import { BaseDatabase } from "../model/BaseDatabase";
import { createAdminInfosDTO } from "../model/Shapes";
import { CustomError } from "../error/CustomError";

export class AdminsDatabase extends BaseDatabase{
  private tableName: string = process.env.TABLE_NAME_ADMINS as string

  async createAdmin(infos: createAdminInfosDTO): Promise<void>{
    try{
     await this.getConnection()
      .insert(infos)
      .into(this.tableName)      
    }catch(error){
      throw new CustomError(400, (error.message || error.sqlMessage))
    }
  }
}
