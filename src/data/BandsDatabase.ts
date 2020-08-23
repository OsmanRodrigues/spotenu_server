import { BaseDatabase } from "../model/BaseDatabase";
import { ROLE, ConvertToBandInfosDTO, UserInfosDTO } from "../model/Shapes";
import { CustomError } from "../error/CustomError";

export class BandsDatabase extends BaseDatabase{
  private bandsTableName: string = process.env.TABLE_NAME_BANDS
  private usersTableName: string = process.env.TABLE_NAME_USERS

  async convertToBand(infos: ConvertToBandInfosDTO): Promise<void>{
    try{
      const connection = this.getConnection()
      await connection(this.usersTableName)
      .where({id: infos.id})
      .update({role: ROLE.BAND})
      
      await connection(this.bandsTableName)
      .insert({
        description: infos.description,
        members_quantity: infos.membersQuantity ? infos.membersQuantity : 1,
        band_id: infos.id
      })
  
    }catch(error){
      throw new CustomError(400, (error.message || error.sqlMessage))
    }
  }

  async getAll(): Promise<UserInfosDTO[]>{
    try{
      const result: UserInfosDTO[] = await this.getConnection()
      .from(this.usersTableName)
      .innerJoin(
        this.bandsTableName, 
        `${this.usersTableName}.id`, 
        `${this.bandsTableName}.band_id`
      )
      
      return result
    }catch (error){
      throw new CustomError(400, (error.message || error.sqlMessage))
    }
  }

  async getById(id: string): Promise<UserInfosDTO>{
    try{
      const result = await this.getConnection()
      .from(this.usersTableName)
      .innerJoin(
        this.bandsTableName, 
        `${this.usersTableName}.id`, 
        `${this.bandsTableName}.band_id`
      )
      .where({id})

      return{
        id: result[0].id,
        email: result[0].email,
        name: result[0].name,
        nickname: result[0].nickname,
        password: result[0].password,
        role: result[0].role,
        description: result[0].description,
        membersQuantity: result[0].members_quantity,
        approved: result[0].approved, 
        blocked: result[0].blocked,
        subscriber: result[0].subscriber
      }
    }catch(error){
      throw new CustomError(400, (error.message || error.sqlMessage))
    }
  }

  async approve(id: string): Promise<number>{
    try{
      const connection = this.getConnection()
      const result = await connection(this.bandsTableName)
      .where({band_id: id})
      .update({approved: 1})

      return result
    }catch(error){
      throw new CustomError(400, (error.message || error.sqlMessage))
    }
  }
}