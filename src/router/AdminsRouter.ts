import express from 'express'
import { AdminController } from '../controller/AdminsController'

export const adminsRouter = express.Router()

adminsRouter.post('/signup', new AdminController().signup)
adminsRouter.post('/login', new AdminController().login)