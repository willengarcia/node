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
exports.ListOrdersToFuncionarioController = void 0;
const ListOrderToFuncionarioService_1 = require("../../services/servicos/ListOrderToFuncionarioService");
class ListOrdersToFuncionarioController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const funcionarioId = req.params.funcionarioId; // Presuma que isso esteja no formato correto
            try {
                const listOrdersService = new ListOrderToFuncionarioService_1.ListOrdersToFuncionarioService();
                const orders = yield listOrdersService.execute({ funcionarioId });
                return res.json(orders);
            }
            catch (err) {
                return res.status(400).json({ error: err.message });
            }
        });
    }
}
exports.ListOrdersToFuncionarioController = ListOrdersToFuncionarioController;
//# sourceMappingURL=ListOrderToFuncionarioController.js.map