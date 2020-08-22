import { BaseDatabase } from "../model/BaseDatabase";
import { CreateUserInfosDTO, UserInfosDTO } from "../model/Shapes";
import { CustomError } from "../error/CustomError";

export class UsersDatabase extends BaseDatabase{
  private tableName: string = process.env.TABLE_NAME_USERS as string
  
  async create(infos: CreateUserInfosDTO): Promise<void>{
    try{
     await this.getConnection()
      .insert(infos)
      .into(this.tableName)      
    }catch(error){
      throw new CustomError(400, (error.message || error.sqlMessage))
    }
  }

  async getByEmailIdOrNick(
    value: string, fieldName: string
    ): Promise<UserInfosDTO | false>{
    try{ 
      const result = await this.getConnection()
      .select('*')
      .from(this.tableName)
      .where(fieldName,'=', value)

      return result.length === 1 && {
        id: result[0].id,
        email: result[0].email,
        name: result[0].name,
        nickname: result[0].nickname,
        password: result[0].password,
        role: result[0].role,
        blocked: result[0].blocked,
        subscriber: result[0].subscriber
      }
    }catch(error){
      throw new CustomError(400, (error.message || error.sqlMessage))
    }
  }
}
