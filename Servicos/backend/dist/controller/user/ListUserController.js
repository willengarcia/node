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
exports.ListUserController = void 0;
const ListUserService_1 = require("../../services/user/ListUserService");
class ListUserController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            if (!id) {
                return res.status(400).json({ erro: 'Não foi possível receber ID: ' + id });
            }
            console.log(id);
            try {
                const bd = new ListUserService_1.ListUserService();
                const get = yield bd.execute({ id });
                return res.json(get);
            }
            catch (err) {
                return res.status(400).json({ erro: err.message });
            }
        });
    }
}
exports.ListUserController = ListUserController;
//# sourceMappingURL=ListUserController.js.map