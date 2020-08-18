import { Request, Response } from "express";
import { AdminsBusiness } from "../business/AdminsBusiness";
import { SignupInfosDTO, LoginInfosDTO } from "../model/Shapes";
import { BaseDatabase } from "../model/BaseDatabase";

export class AdminController{
  async signup(req: Request, res: Response): Promise<void>{
    try{
      const token = req.headers.authorization
      const body = req.body
      const infos: SignupInfosDTO = {
        email: body.email,
        name: body.name,
        password: body.password,
        nickname: body.nickname ? body.nickname : body.name
      } 

      const result = await new AdminsBusiness().signup(infos, token)

      res.status(200).send(result)

      await BaseDatabase.destroyConnection()
    }catch(error){
      res.status(error.status) 
      .send({
        errorMessage: error.message
      })
    }
  }

  async login(req: Request, res: Response){
    try{
      const body = req.body
      const infos: LoginInfosDTO = {
        password: body.password,
        email: body.email,
        nickname: body.nickname
      }
      const result = await new AdminsBusiness().login(infos)

      res.status(200).send(result)

      await BaseDatabase.destroyConnection()
    }catch (error){
      res.status(error.status) 
      .send({
        errorMessage: error.message
      })
    }
  }
}