import express from 'express'
import knex from 'knex'
import dotenv from 'dotenv'
import { adminsRouter } from './router/AdminsRouter'
import { AddressInfo } from 'net'

dotenv.config()

const app = express()

app.use(express.json())

app.use('/admins', adminsRouter)

const server = app.listen(3003, ()=>{
  if(server){
    const address = server.address() as AddressInfo
    console.log(`Server running in http://localhost:${address.port}`)
  }else{
    console.error('Failure upon starting server.');
  }
})