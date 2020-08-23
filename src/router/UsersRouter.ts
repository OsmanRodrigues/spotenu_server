import express from 'express'
import { UsersController } from '../controller/UsersController'

export const usersRouter = express.Router()

usersRouter.post('/signup', new UsersController().signup)
usersRouter.post('/login', new UsersController().login)
usersRouter.post('/band', new UsersController().registerBand)
usersRouter.get('/band', new UsersController().getAllBands)
usersRouter.put('/band/approve', new UsersController().approveBand)