import { Router } from "express";
import multer from "multer";
import { isAuthenticated } from "./middlewares/isAthenticade";
import { AddUserController } from "./controller/user/addUserController";
import { AuthUserClientController } from "./controller/user/AuthUserClientController";
import { ListUserController } from "./controller/user/ListUserController";

const rotas = Router()

rotas.post('/cadastro', new AddUserController().handle)
rotas.post('/loginClient', new AuthUserClientController().handle)
rotas.get('/listServiceClient/:id', new ListUserController().handle)

export {rotas}