import { Router, Request, Response, NextFunction } from "express";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { isAuthenticated } from "./middlwares/isAuthenticated";
import { CreateStorageController } from "./controllers/storage/CreateStorageController";
import { ListStorageController } from "./controllers/storage/ListStorageController";
import { UpdateStorageController } from "./controllers/storage/UpdateStorageController";
import { AddImagesController } from "./controllers/images/AddImagesController";
import { ListImagesController } from "./controllers/images/ListImagesController";
import multer from "multer";
import uploadConfig from './config/multer'
import { ValidImageController } from "./controllers/images/ValidImageController";

const router = Router()

const upload = multer(uploadConfig.upload("./tmp")) // nome do arquivo para salvar a imagem

// ROTA USUÁRIO
router.post('/cadastrar/usuario', new CreateUserController().handle) // cadastrar user.
router.post('/login', new AuthUserController().handle) // Verifica se o usuário está autenticado, e retorna os dados.

// ROTA LOJA
router.post('/cadastrar/loja', isAuthenticated, new CreateStorageController().handle) // Cadastrar a loja, e junto inserir o usuário
router.get('/listar/loja', isAuthenticated, new ListStorageController().handle) // Lista uma loja, com os usuários cadastrados nela
router.post('/update/user_loja', isAuthenticated, new UpdateStorageController().handle) // Atualizar a tabela de loja, inserindo um novo usuário nela.

// ROTA IMAGENS
router.post('/add/imagens', isAuthenticated, upload.single('file'), new AddImagesController().handle) // Adiciona imagem por imagem na tabela Image, com o id do usuário, e a foto é recebida somente com a chave file
router.get('/list/imagens', isAuthenticated, new ListImagesController().handle) // Mostra todas as imagens, de acordo com o id do usuario e o id da loja.
router.put('/list/imagens/validate/:id', isAuthenticated, new ValidImageController().handle)
export {router}