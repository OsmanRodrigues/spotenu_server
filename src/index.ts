import express from 'express'
import knex from 'knex'
import dotenv from 'dotenv'
import { AddressInfo } from 'net'
import { usersRouter } from './router/UsersRouter'

dotenv.config()

const app = express()

app.use(express.json())

app.use('/', usersRouter)

const server = app.listen(3003, ()=>{
  if(server){
    const address = server.address() as AddressInfo
    console.log(`Server running in http://localhost:${address.port}`)
  }else{
    console.error('Failure upon starting server.');
  }
})