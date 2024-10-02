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
exports.AddReviewController = void 0;
const AddReviewServices_1 = require("../../services/avaliacao/AddReviewServices");
class AddReviewController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { clientId, rating, comment, orderId } = req.body;
            if ((!clientId) || (!orderId) || (!rating)) {
                return res.status(400).json({ erro: 'Falha ao encontrar Id do cliente, o id do pedido e é necessário colocar o número!' });
            }
            try {
                const addReviewService = new AddReviewServices_1.AddReviewServices();
                const insercao = yield addReviewService.execute({ clientId, rating, comment, orderId });
                return res.status(200).json({ insersao: insercao });
            }
            catch (error) {
                return res.status(400).json({ erro: error });
            }
        });
    }
}
exports.AddReviewController = AddReviewController;
//# sourceMappingURL=AddReviewController.js.map