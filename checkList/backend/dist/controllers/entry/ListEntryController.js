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
exports.ListEntryController = void 0;
const ListEntryService_1 = require("../../services/entry/ListEntryService");
class ListEntryController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const categoryId = req.params.categoryId;
            if ((!categoryId)) {
                return res.status(401).json({ error: 'Atributos is undefined' });
            }
            try {
                const listEntryService = new ListEntryService_1.ListEntryService();
                const execute = yield listEntryService.execute({ categoryId });
                return res.status(200).json(execute);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
}
exports.ListEntryController = ListEntryController;
//# sourceMappingURL=ListEntryController.js.map