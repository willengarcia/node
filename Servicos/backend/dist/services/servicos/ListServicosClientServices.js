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
            var _b;
            // Listando pedidos e incluindo dados do serviço
            try {
                const orders = yield prisma_1.default.order.findMany({
                    include: {
                        service: {
                            select: {
                                name: true,
                                description: true,
                            },
                        },
                        client: {
                            select: {
                                name: true
                            }
                        },
                        employee: {
                            select: {
                                name: true,
                                id: true,
                            },
                        },
                    },
                    orderBy: {
                        // Ordenando pelo status usando um método alternativo
                        status: (_b = status) !== null && _b !== void 0 ? _b : "asc",
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