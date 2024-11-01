"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const CreateUserController_1 = require("./controllers/user/CreateUserController");
const AuthUserController_1 = require("./controllers/user/AuthUserController");
const isAuthenticated_1 = require("./middlwares/isAuthenticated");
const ListUserController_1 = require("./controllers/user/ListUserController");
const UpdateUserController_1 = require("./controllers/user/UpdateUserController");
const multer_1 = __importDefault(require("multer"));
const CreateEquipeController_1 = require("./controllers/equipe/CreateEquipeController");
const CreateChecklistController_1 = require("./controllers/checklist/CreateChecklistController");
const CreateCategoryController_1 = require("./controllers/category/CreateCategoryController");
const InsertEquipeUserController_1 = require("./controllers/equipe/InsertEquipeUserController");
const ListEquipeController_1 = require("./controllers/equipe/ListEquipeController");
const ListChecklistController_1 = require("./controllers/checklist/ListChecklistController");
const ListCategoryToChecklistController_1 = require("./controllers/category/ListCategoryToChecklistController");
const CreateEntryController_1 = require("./controllers/entry/CreateEntryController");
const ListEntryController_1 = require("./controllers/entry/ListEntryController");
const ListEquipeToUserController_1 = require("./controllers/equipe/ListEquipeToUserController");
// Configurar o multer para armazenar em memória
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage: storage });
const router = (0, express_1.Router)();
exports.router = router;
// ROTA USUÁRIO
router.post('/cadastrar/usuario', new CreateUserController_1.CreateUserController().handle);
router.post('/login', new AuthUserController_1.AuthUserController().handle);
router.get('/list/user', isAuthenticated_1.isAuthenticated, new ListUserController_1.ListUserController().handle);
router.put('/update/user/:userId', isAuthenticated_1.isAuthenticated, new UpdateUserController_1.UpdateUserController().handle);
// ROTA EQUIPE
router.post('/create/equipe', isAuthenticated_1.isAuthenticated, new CreateEquipeController_1.CreateEquipeController().handle);
router.get('/list/equipe', new ListEquipeController_1.ListEquipeController().handle);
router.get('/list/equipe/user/:idUser', new ListEquipeToUserController_1.ListEquipeToUserController().handle);
router.post('/insert/user/equipe', new InsertEquipeUserController_1.InsertEquipeUserController().handle);
// ROTA CHECKLIST
router.post('/create/checklist', isAuthenticated_1.isAuthenticated, new CreateChecklistController_1.CreateChecklistController().handle);
router.get('/list/chekclist', new ListChecklistController_1.ListChecklistController().handle);
// ROTA CATEGORY
router.post('/create/category', isAuthenticated_1.isAuthenticated, new CreateCategoryController_1.CreateCategoryController().handle);
router.get('/list/category/:idChecklist', new ListCategoryToChecklistController_1.ListCategoryToChecklistController().handle);
// ROTA ENTRY
router.post('/create/entry', isAuthenticated_1.isAuthenticated, new CreateEntryController_1.CreateEntryController().handle);
router.get('/list/entry/:categoryId', isAuthenticated_1.isAuthenticated, new ListEntryController_1.ListEntryController().handle);
//# sourceMappingURL=router.js.map