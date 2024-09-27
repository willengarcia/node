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
exports.ListUserFuncioController = void 0;
const ListUserFuncioServices_1 = require("../../services/user/ListUserFuncioServices");
class ListUserFuncioController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const tipo = req.body;
            if (!tipo) {
                return res.status(400).json({ error: "Erro ao inserir o tipo: " + tipo });
            }
            try {
                console.log(tipo);
                const listUserFuncioService = new ListUserFuncioServices_1.ListUserFuncioSerices();
                const lista = yield listUserFuncioService.execute(tipo);
                return res.json(lista);
            }
            catch (err) {
                return res.json(err);
            }
        });
    }
}
exports.ListUserFuncioController = ListUserFuncioController;
//# sourceMappingURL=ListUserFuncioController.js.map