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
exports.UpdateOrderPedidosService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class UpdateOrderPedidosService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ orderId, employeeId, status }) {
            const existService = yield prisma_1.default.order.findFirst({
                where: {
                    id: orderId
                }
            });
            if (!existService) {
                return { erro: 'Serviço não existe na base de dados' };
            }
            const existFuncionario = yield prisma_1.default.user.findMany({
                where: {
                    role: "EMPLOYEE",
                    id: employeeId
                }
            });
            if (!existFuncionario) {
                return { erro: 'Usuário não foi achado, ou não é funcionário!' };
            }
            try {
                const update = yield prisma_1.default.order.update({
                    where: {
                        id: existService.id,
                    },
                    data: {
                        employeeId: employeeId,
                        status: status
                    },
                    select: {
                        client: {
                            select: {
                                name: true,
                                email: true,
                                celular: true,
                            },
                        },
                    },
                });
                return update;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
}
exports.UpdateOrderPedidosService = UpdateOrderPedidosService;
//# sourceMappingURL=UpdateOrderPedidosServices.js.map