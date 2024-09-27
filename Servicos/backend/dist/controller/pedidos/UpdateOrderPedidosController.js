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
exports.UpdateOrderPedidosController = void 0;
const UpdateOrderPedidosServices_1 = require("../../services/pedidos/UpdateOrderPedidosServices");
class UpdateOrderPedidosController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { orderId, employeeId } = req.body;
            if ((!orderId) || (!employeeId)) {
                return res.status(400).json({ erro: 'Entradas não inseridas' });
            }
            try {
                const updateOrderPedidosService = new UpdateOrderPedidosServices_1.UpdateOrderPedidosService();
                const insert = yield updateOrderPedidosService.execute({ orderId, employeeId });
                return res.status(200).json(insert);
            }
            catch (err) {
                return res.status(405).json(err);
            }
        });
    }
}
exports.UpdateOrderPedidosController = UpdateOrderPedidosController;
//# sourceMappingURL=UpdateOrderPedidosController.js.map