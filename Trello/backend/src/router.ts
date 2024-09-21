import { Router } from "express";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { isAuthenticated } from "./middlwares/isAuthenticated";
import { CreateStorageController } from "./controllers/storage/CreateStorageController";
import { ListStorageController } from "./controllers/storage/ListStorageController";
import { UpdateStorageController } from "./controllers/storage/UpdateStorageController";
import { AddImagesController } from "./controllers/images/AddImagesController";
import { ListImagesController } from "./controllers/images/ListImagesController";
import { ValidImageController } from "./controllers/images/ValidImageController";
import { ListUserController } from "./controllers/user/ListUserController";
import { UpdateUserController } from "./controllers/user/UpdateUserController";
import multer from 'multer';

// Configurar o multer
const router = Router();

// ROTA USUÁRIO
router.post('/cadastrar/usuario', new CreateUserController().handle);
router.post('/login', new AuthUserController().handle);
router.get('/list/user', isAuthenticated, new ListUserController().handle);
router.put('/update/user/:userId', isAuthenticated, new UpdateUserController().handle);

// ROTA LOJA
router.post('/cadastrar/loja', isAuthenticated, new CreateStorageController().handle);
router.get('/listar/loja', isAuthenticated, new ListStorageController().handle);
router.post('/update/user_loja', isAuthenticated, new UpdateStorageController().handle);

// ROTA IMAGENS
router.post('/add/imagens', upload.single('image'), new AddImagesController().handle);
router.get('/list/imagens', isAuthenticated, new ListImagesController().handle);
router.put('/list/imagens/validate/:id', isAuthenticated, new ValidImageController().handle);

export { router };
