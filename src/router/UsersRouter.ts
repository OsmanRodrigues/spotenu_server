import express from 'express'
import { UsersController } from '../controller/UsersController'

export const usersRouter = express.Router()

usersRouter.post('/signup', new UsersController().signup)
usersRouter.post('/login', new UsersController().login)
usersRouter.post('/bands', new UsersController().registerBand)