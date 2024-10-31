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
import { InsertEquipeUserController } from "./controllers/equipe/InsertEquipeUserController";
import { ListEquipeController } from "./controllers/equipe/ListEquipeController";
import { ListChecklistController } from "./controllers/checklist/ListChecklistController";
import { ListCategoryToChecklistController } from "./controllers/category/ListCategoryToChecklistController";
import { CreateEntryController } from "./controllers/entry/CreateEntryController";
import { ListEntryController } from "./controllers/entry/ListEntryController";

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
router.post('/create/equipe', isAuthenticated, new CreateEquipeController().handle)
router.get('/list/equipe', new ListEquipeController().handle)
router.post('/insert/user/equipe', new InsertEquipeUserController().handle)

// ROTA CHECKLIST
router.post('/create/checklist', isAuthenticated, new CreateChecklistController().handle)
router.get('/list/chekclist', new ListChecklistController().handle)

// ROTA CATEGORY
router.post('/create/category', isAuthenticated, new CreateCategoryController().handle)
router.get('/list/category/:idChecklist', new ListCategoryToChecklistController().handle)

// ROTA ENTRY
router.post('/create/entry', isAuthenticated, new CreateEntryController().handle)
router.get('/list/entry/:categoryId', isAuthenticated, new ListEntryController().handle)

export { router };
