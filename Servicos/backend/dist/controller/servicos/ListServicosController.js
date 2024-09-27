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
exports.ListServicosController = void 0;
const ListServicosService_1 = require("../../services/servicos/ListServicosService");
class ListServicosController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const listServicoService = new ListServicosService_1.ListServicosService();
            try {
                const lista = yield listServicoService.execute();
                return res.status(200).json(lista); // Retorna 200 OK com a lista
            }
            catch (error) {
                console.error("Erro ao listar serviços:", error);
                return res.status(500).json({ message: "Erro interno ao listar serviços" }); // Retorna 500 em caso de erro
            }
        });
    }
}
exports.ListServicosController = ListServicosController;
//# sourceMappingURL=ListServicosController.js.map