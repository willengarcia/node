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
exports.AuthUserClientController = void 0;
const AuthUserClientService_1 = require("../../services/user/AuthUserClientService");
class AuthUserClientController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password, tipo } = req.body;
            const authUserService = new AuthUserClientService_1.AuthUserClientService();
            if ((!email) || (!password)) {
                return res.status(400).json({ error: 'Insira o email e password' });
            }
            try {
                const auth = yield authUserService.execute({ email, password, tipo });
                return res.json(auth);
            }
            catch (err) {
                return res.status(400).json({ error: err.message });
            }
        });
    }
}
exports.AuthUserClientController = AuthUserClientController;
//# sourceMappingURL=AuthUserClientController.js.map