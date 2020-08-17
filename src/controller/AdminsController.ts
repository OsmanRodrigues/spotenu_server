import { Request, Response } from "express";
import { AdminsBusiness } from "../business/AdminsBusiness";
import { createAdminInfosDTO } from "../model/Shapes";
import { BaseDatabase } from "../model/BaseDatabase";

export class AdminController{
  async createAdmin(req: Request, res: Response): Promise<void>{
    try{
      const body = req.body
      const infos: createAdminInfosDTO = {
        email: body.email,
        name: body.name,
        password: body.password,
        nickname: body.nickname ? body.nickname : body.name
      } 

      const result = await new AdminsBusiness().createAdmin(infos)

      res.status(200).send(result)

      await BaseDatabase.destroyConnection()
    }catch(error){
      res.status(error.status) 
      .send({
        errorMessage: error.message
      })
    }
  }
}