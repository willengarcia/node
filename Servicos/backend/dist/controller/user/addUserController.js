"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddUserController = void 0;
const addUserService_1 = require("../../services/user/addUserService");
class AddUserController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, passwordUser, emailUser, celularUser, tipo } = req.body;
            const addFuncionarioService = new addUserService_1.AddUserService();
            try {
                const usuario = yield addFuncionarioService.execute({ name, passwordUser, emailUser, celularUser, tipo });
                return res.status(201).json(usuario); // Retorna o funcionário criado
            }
            catch (error) {
                return res.status(400).json({ message: error.message });
            }
        });
    }
}
exports.AddUserController = AddUserController;
//# sourceMappingURL=addUserController.js.map