import { Request, Response } from "express";
import { SignupInfosDTO, LoginInfosDTO, ConvertToBandInfosDTO } from "../model/Shapes";
import { BaseDatabase } from "../model/BaseDatabase";
import { UsersBusiness } from "../business/UsersBusiness";

export class UsersController{
  async signup(req: Request, res: Response): Promise<void>{
    try{
      const token = req.headers.authorization
      const body = req.body
      const infos: SignupInfosDTO = {
        email: body.email,
        name: body.name,
        password: body.password,
        nickname: body.nickname
      } 

      const result = await new UsersBusiness().signup(infos, token)

      res.status(200).send(result)

      await BaseDatabase.destroyConnection()
    }catch(error){
      res.status(error.status) 
      .send({
        errorMessage: error.message
      })
    }
  }

  //TODO: validar login
  async login(req: Request, res: Response){
    try{
      const body = req.body
      const infos: LoginInfosDTO = {
        password: body.password,
        email: body.email,
        nickname: body.nickname
      }
      const result = await new UsersBusiness().login(infos)

      res.status(200).send(result)

      await BaseDatabase.destroyConnection()
    }catch (error){
      res.status(error.status) 
      .send({
        errorMessage: error.message
      })
    }
  }

  async registerBand(req: Request, res: Response){
    try{
      const token = req.headers.authorization
      const body = req.body
      const infos = {
        description: body.description,
        membersQuantity: body.membersQuantity
      }
      const result = await new UsersBusiness().registerBand(infos, token)

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