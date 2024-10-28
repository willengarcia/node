import { Router } from "express";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { isAuthenticated } from "./middlwares/isAuthenticated";
import { ListUserController } from "./controllers/user/ListUserController";
import { UpdateUserController } from "./controllers/user/UpdateUserController";
import multer from 'multer';
import { CreateEquipeController } from "./controllers/equipe/CreateEquipeController";
import { CreateChecklistController } from "./controllers/checklist/CreateChecklistController";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";

// Configurar o multer para armazenar em memória
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = Router();

// ROTA USUÁRIO
router.post('/cadastrar/usuario', new CreateUserController().handle);
router.post('/login', new AuthUserController().handle);
router.get('/list/user', isAuthenticated, new ListUserController().handle);
router.put('/update/user/:userId', isAuthenticated, new UpdateUserController().handle);

// ROTA EQUIPE
router.post('/create/equipe', new CreateEquipeController().handle)
router.get('/list/equipe', new ListUserController().handle)

// ROTA CHECKLIST
router.post('/create/checklist', new CreateChecklistController().handle)

// ROTA CATEGORY
router.post('/create/category', new CreateCategoryController().handle)

export { router };
