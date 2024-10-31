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
exports.InsertEquipeUserController = void 0;
const InsertEquipeUserService_1 = require("../../services/equipe/InsertEquipeUserService");
class InsertEquipeUserController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId, teamId } = req.body;
            if ((!userId) || (!teamId)) {
                return res.status(401).json({ error: 'Inserções são Undefined' });
            }
            try {
                const insertEquipeUserService = new InsertEquipeUserService_1.InsertEquipeUserService();
                const execute = yield insertEquipeUserService.execute({ userId, teamId });
                return res.status(200).json(execute);
            }
            catch (error) {
                return res.status(500).json({ error: error });
            }
        });
    }
}
exports.InsertEquipeUserController = InsertEquipeUserController;
//# sourceMappingURL=InsertEquipeUserController.js.map