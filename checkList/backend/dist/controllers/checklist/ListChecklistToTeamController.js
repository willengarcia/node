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
exports.ListChecklistToTeamController = void 0;
const ListChecklistToTeamService_1 = require("../../services/checklist/ListChecklistToTeamService");
class ListChecklistToTeamController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const idTeam = req.params.idTeam;
            if (!idTeam) {
                res.status(401).json({ sucess: false, error: 'Atributos is Undefined' });
            }
            try {
                const listChecklistToTeamService = new ListChecklistToTeamService_1.ListChecklistToTeamService();
                const execute = yield listChecklistToTeamService.execute({ idTeam });
                return res.status(200).json(execute);
            }
            catch (error) {
                return res.status(500).json(error);
            }
        });
    }
}
exports.ListChecklistToTeamController = ListChecklistToTeamController;
//# sourceMappingURL=ListChecklistToTeamController.js.map