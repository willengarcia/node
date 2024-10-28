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
            const { teamId, userTeamId } = req.body;
            if ((!teamId) || (!userTeamId)) {
                return res.status(401).json({ error: 'Atributos undefined' });
            }
            try {
                const createChecklistService = new CreateChecklistService_1.CreateChecklistService();
                const execute = createChecklistService.execute({ teamId, userTeamId });
                return res.status(200).json({ execute });
            }
            catch (error) {
                return res.status(500).json({ error });
            }
        });
    }
}
exports.CreateChecklistController = CreateChecklistController;
//# sourceMappingURL=CreateChecklistController.js.map