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
exports.ListUserService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class ListUserService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id }) {
            const validar = yield prisma_1.default.user.findFirst({
                where: {
                    id: id
                }
            });
            if (!validar) {
                return { 'error': 'Usuário não encontrado!' };
            }
            try {
                const userPedidosFeitos = yield prisma_1.default.user.findFirst({
                    where: {
                        id: validar.id, // O ID do usuário que fez os pedidos
                    },
                    select: {
                        ordersAsClient: {
                            select: {
                                id: true,
                                service: {
                                    select: {
                                        name: true,
                                        description: true,
                                        price: true,
                                    },
                                },
                                employee: {
                                    select: {
                                        name: true,
                                        email: true
                                    },
                                },
                                status: true,
                                createdAt: true,
                                updatedAt: true,
                                urlPix: true,
                                linkPix: true,
                            },
                        },
                    },
                });
                return userPedidosFeitos;
            }
            catch (err) {
                err;
            }
        });
    }
}
exports.ListUserService = ListUserService;
//# sourceMappingURL=ListUserService.js.map