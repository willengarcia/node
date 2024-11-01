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
exports.ListEquipeToUserController = void 0;
const ListEquipeToUserService_1 = require("../../services/equipe/ListEquipeToUserService");
class ListEquipeToUserController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const idUser = req.params.idUser;
            try {
                const listEquipeToUserService = new ListEquipeToUserService_1.ListEquipeToUserService();
                const execute = yield listEquipeToUserService.execute({ idUser });
                return res.status(200).json(execute);
            }
            catch (error) {
                return res.status(500).json(error);
            }
        });
    }
}
exports.ListEquipeToUserController = ListEquipeToUserController;
//# sourceMappingURL=ListEquipeToUserController.js.map