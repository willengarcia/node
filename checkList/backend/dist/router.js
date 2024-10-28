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
router.post('/create/equipe', new CreateEquipeController_1.CreateEquipeController().handle);
router.get('/list/equipe', new ListUserController_1.ListUserController().handle);
// ROTA CHECKLIST
router.post('/create/checklist', new CreateChecklistController_1.CreateChecklistController().handle);
// ROTA CATEGORY
router.post('/create/category', new CreateCategoryController_1.CreateCategoryController().handle);
//# sourceMappingURL=router.js.map