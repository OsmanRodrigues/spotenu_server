import express from 'express'
import { AdminController } from '../controller/AdminsController'

export const adminsRouter = express.Router()

adminsRouter.post('/create', new AdminController().createAdmin)
adminsRouter.post('/login', new AdminController().login)