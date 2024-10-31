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
exports.CreateChecklistController = void 0;
const CreateChecklistService_1 = require("../../services/checklist/CreateChecklistService");
class CreateChecklistController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { teamId, userTeamId, name } = req.body;
            // Validação dos dados de entrada
            if (!teamId || !userTeamId || !name) {
                return res.status(400).json({ error: 'Atributos undefined' });
            }
            try {
                const createChecklistService = new CreateChecklistService_1.CreateChecklistService();
                const result = yield createChecklistService.execute({ name, teamId, userTeamId });
                if (result.success) {
                    return res.status(201).json(result.checklist);
                }
                else {
                    return res.status(500).json({ error: result.error });
                }
            }
            catch (error) {
                console.error("Erro no controlador:", error);
                return res.status(500).json({ error: "Erro interno do servidor" });
            }
        });
    }
}
exports.CreateChecklistController = CreateChecklistController;
//# sourceMappingURL=CreateChecklistController.js.map