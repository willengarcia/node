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
exports.AddServicosUserController = void 0;
const AddServicosUserService_1 = require("../../services/user/AddServicosUserService");
class AddServicosUserController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { servicoId, description, dataTime, hora, userId } = req.body;
            // Validação dos campos obrigatórios
            if ((!servicoId) || (!dataTime) || (!hora) || (!userId)) {
                return res.status(400).json({ erro: 'Erro ao inserir os dados!' });
            }
            try {
                const addServiceUserService = new AddServicosUserService_1.AddServicosUserService();
                // Verifica se a imagem foi enviada, se não, envia undefined
                const imageBuffer = req.file ? req.file.buffer : undefined;
                const pedido = yield addServiceUserService.execute({
                    servicoId,
                    description,
                    dataTime,
                    hora,
                    userId,
                    imageBuffer // Buffer da imagem ou undefined
                });
                return res.json(pedido);
            }
            catch (err) {
                return res.status(400).json({ error: err.message || 'Erro ao processar o pedido.' });
            }
        });
    }
}
exports.AddServicosUserController = AddServicosUserController;
//# sourceMappingURL=AddServicosUserController.js.map