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
exports.UpdateOrderPagamentoService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class UpdateOrderPagamentoService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ orderId, clientId, urlPix, linkPix }) {
            const existService = yield prisma_1.default.order.findFirst({
                where: {
                    id: orderId
                }
            });
            if (!existService) {
                throw new Error('Serviço não encontrado');
            }
            const isConfirmed = yield prisma_1.default.order.findFirst({
                where: {
                    id: existService.id,
                    status: 'CONFIRMED',
                    clientId: clientId,
                },
            });
            if (!isConfirmed) {
                throw new Error('surto');
            }
            try {
                const update = yield prisma_1.default.order.update({
                    where: {
                        id: existService.id,
                        AND: {
                            clientId: clientId,
                        },
                    },
                    data: {
                        linkPix: linkPix,
                        urlPix: urlPix,
                    },
                    select: {
                        client: {
                            select: {
                                name: true,
                                email: true,
                                celular: true,
                            },
                        },
                        urlPix: true,
                        linkPix: true,
                    },
                });
                return update;
            }
            catch (err) {
                throw new Error('Erro ao inserir a url do pagamento: ' + err);
            }
        });
    }
}
exports.UpdateOrderPagamentoService = UpdateOrderPagamentoService;
//# sourceMappingURL=UpdateOrderPagamentoServices.js.map