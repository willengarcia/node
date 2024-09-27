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
exports.AddServicosServices = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class AddServicosServices {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ name, description, price, funcionarioID }) {
            try {
                // Verifica se o funcionário existe
                const employee = yield prisma_1.default.user.findUnique({
                    where: { id: funcionarioID },
                });
                console.log(employee.role);
                if (!employee || employee.role !== 'EMPLOYEE') {
                    throw new Error('Employee not found or not an EMPLOYEE.');
                }
                // Cria o serviço associado ao funcionário
                const newService = yield prisma_1.default.service.create({
                    data: {
                        name,
                        description,
                        price,
                        employeeId: funcionarioID,
                    },
                });
                return newService; // Retorna o serviço criado
            }
            catch (error) {
                console.error(error);
                throw new Error('An error occurred while creating the service: ' + error);
            }
        });
    }
}
exports.AddServicosServices = AddServicosServices;
//# sourceMappingURL=AddServicosServices.js.map