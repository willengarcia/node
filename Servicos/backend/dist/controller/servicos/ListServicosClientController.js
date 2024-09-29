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
exports.ListOrdersController = void 0;
const ListServicosClientServices_1 = require("../../services/servicos/ListServicosClientServices");
class ListOrdersController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Capture o status diretamente dos parâmetros da requisição
            const status = req.params.status; // Certifique-se de que seja do tipo OrderStatus
            try {
                const listOrdersService = new ListServicosClientServices_1.ListOrdersService();
                const orders = yield listOrdersService.execute({ status });
                return res.json(orders);
            }
            catch (err) {
                return res.status(400).json({ error: err.message });
            }
        });
    }
}
exports.ListOrdersController = ListOrdersController;
//# sourceMappingURL=ListServicosClientController.js.map