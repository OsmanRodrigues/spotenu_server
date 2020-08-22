import { BaseDatabase } from "../model/BaseDatabase";
import { ROLE, ConvertToBandInfosDTO } from "../model/Shapes";
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

}