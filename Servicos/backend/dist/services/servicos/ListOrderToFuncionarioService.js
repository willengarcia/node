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
exports.ListOrdersToFuncionarioService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class ListOrdersToFuncionarioService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ funcionarioId }) {
            // Listando pedidos e incluindo dados do serviço
            try {
                const orders = yield prisma_1.default.order.findMany({
                    where: {
                        employeeId: funcionarioId,
                    },
                    select: {
                        urlImages: true,
                        data: true,
                        hota: true,
                        service: {
                            select: {
                                name: true,
                                description: true,
                            },
                        },
                        client: {
                            select: {
                                name: true,
                                celular: true,
                            },
                        },
                        employee: {
                            select: {
                                name: true,
                                id: true,
                            },
                        },
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
exports.ListOrdersToFuncionarioService = ListOrdersToFuncionarioService;
//# sourceMappingURL=ListOrderToFuncionarioService.js.map