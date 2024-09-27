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
exports.ListServicosService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class ListServicosService {
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const servicos = yield prisma_1.default.service.findMany({
                    select: {
                        name: true,
                        id: true,
                        price: true,
                        employeeId: true
                    }
                });
                return servicos;
            }
            catch (err) {
                // Lançar um erro para que o controlador possa tratar
                throw new Error(`Erro ao listar serviços: ${err.message}`);
            }
        });
    }
}
exports.ListServicosService = ListServicosService;
//# sourceMappingURL=ListServicosService.js.map