import { Router, Request, Response, NextFunction } from "express";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { isAuthenticated } from "./middlwares/isAuthenticated";
import { CreateStorageController } from "./controllers/storage/CreateStorageController";
import { ListStorageController } from "./controllers/storage/ListStorageController";


const router = Router()

// ROTA USUÁRIO
router.post('/cadastrar/usuario', new CreateUserController().handle) // cadastrar user.
router.post('/login', new AuthUserController().handle) // Verifica se o usuário está autenticado, e retorna os dados.

// ROTA LOJA
router.post('/cadastrar/loja', isAuthenticated, new CreateStorageController().handle) // Cadastrar a loja, e junto inserir o usuário
router.get('/listar/loja', isAuthenticated, new ListStorageController().handle) // falta ajeitar, pois lista os usuarios de uma loja, e eu quero listar uma loja com varios usuarios

// falta fazer a rota de update de novos usuarios para uma loja.
export {router}