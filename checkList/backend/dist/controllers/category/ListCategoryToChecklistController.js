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
exports.ListCategoryToChecklistController = void 0;
const ListCategoryToChecklistService_1 = require("../../services/category/ListCategoryToChecklistService");
class ListCategoryToChecklistController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const idChecklist = req.params.idChecklist;
            if (!idChecklist) {
                return res.status(401).json({ error: 'Id é undefined' });
            }
            try {
                const listCategoryToChecklistController = new ListCategoryToChecklistService_1.ListCategoryToChecklistService();
                const execute = yield listCategoryToChecklistController.execute({ idChecklist });
                return res.status(200).json(execute);
            }
            catch (error) {
                return res.status(500).json(error);
            }
        });
    }
}
exports.ListCategoryToChecklistController = ListCategoryToChecklistController;
//# sourceMappingURL=ListCategoryToChecklistController.js.map