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
const CreateStorageController_1 = require("./controllers/storage/CreateStorageController");
const ListStorageController_1 = require("./controllers/storage/ListStorageController");
const UpdateStorageController_1 = require("./controllers/storage/UpdateStorageController");
const AddImagesController_1 = require("./controllers/images/AddImagesController");
const ListImagesController_1 = require("./controllers/images/ListImagesController");
const ValidImageController_1 = require("./controllers/images/ValidImageController");
const ListUserController_1 = require("./controllers/user/ListUserController");
const UpdateUserController_1 = require("./controllers/user/UpdateUserController");
const multer_1 = __importDefault(require("multer"));
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
// ROTA LOJA
router.post('/cadastrar/loja', isAuthenticated_1.isAuthenticated, new CreateStorageController_1.CreateStorageController().handle);
router.get('/listar/loja', isAuthenticated_1.isAuthenticated, new ListStorageController_1.ListStorageController().handle);
router.post('/update/user_loja', isAuthenticated_1.isAuthenticated, new UpdateStorageController_1.UpdateStorageController().handle);
// ROTA IMAGENS
router.post('/add/imagens', isAuthenticated_1.isAuthenticated, upload.single('image'), new AddImagesController_1.AddImagesController().handle);
router.get('/list/imagens', isAuthenticated_1.isAuthenticated, new ListImagesController_1.ListImagesController().handle);
router.put('/list/imagens/validate/:id', isAuthenticated_1.isAuthenticated, new ValidImageController_1.ValidImageController().handle);
//# sourceMappingURL=router.js.map