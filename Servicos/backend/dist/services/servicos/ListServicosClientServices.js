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
exports.ListOrdersService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class ListOrdersService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ status }) {
            // Listando pedidos e incluindo dados do serviço
            try {
                const orders = yield prisma_1.default.order.findMany({
                    where: Object.assign({}, (status ? { status } : {})),
                    include: {
                        service: {
                            select: {
                                name: true,
                                description: true,
                            },
                        },
                        client: {
                            select: {
                                name: true,
                                email: true,
                            },
                        },
                        employee: {
                            select: {
                                name: true,
                                id: true,
                            },
                        },
                    },
                    orderBy: {
                        status: "asc", // Ordenação crescente
                    },
                });
                return orders;
            }
            catch (err) {
                return err;
            }
        });
    }
}
exports.ListOrdersService = ListOrdersService;
//# sourceMappingURL=ListServicosClientServices.js.map