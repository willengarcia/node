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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddReviewServices = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class AddReviewServices {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ clientId, rating, comment, orderId }) {
            const existPedido = yield prisma_1.default.order.findMany({
                where: {
                    id: orderId,
                },
            });
            if (!existPedido) {
                return { erro: 'Pedido não existe!' };
            }
            try {
                const nota = parseInt(rating);
                const review = yield prisma_1.default.review.create({
                    data: {
                        clientId: clientId,
                        rating: nota,
                        comment: comment,
                        orderId: orderId
                    },
                    select: {
                        rating: true,
                        comment: true
                    }
                });
                return review;
            }
            catch (error) {
                return { 'Erro:': error };
            }
        });
    }
}
exports.AddReviewServices = AddReviewServices;
//# sourceMappingURL=AddReviewServices.js.map