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
exports.UpdateOrderPagamentoController = void 0;
const UpdateOrderPagamentoServices_1 = require("../../services/pagamento/UpdateOrderPagamentoServices");
class UpdateOrderPagamentoController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { orderId, clientId, urlPix, linkPix } = req.body;
            if ((!orderId) || (!clientId)) {
                return res.status(400).json({ erro: 'Entradas não inseridas' });
            }
            try {
                const updateOrderPagamentoService = new UpdateOrderPagamentoServices_1.UpdateOrderPagamentoService();
                const insert = yield updateOrderPagamentoService.execute({ orderId, clientId, urlPix, linkPix });
                return res.status(200).json(insert);
            }
            catch (err) {
                return res.status(500).json({ erro: err.message });
            }
        });
    }
}
exports.UpdateOrderPagamentoController = UpdateOrderPagamentoController;
//# sourceMappingURL=UpdateOrderPagamentoController.js.map