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
exports.CreateEntryController = void 0;
const CreateEntryService_1 = require("../../services/entry/CreateEntryService");
class CreateEntryController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { categoryId, title, valueText, description } = req.body;
            if ((!categoryId) || (!title) || (!valueText)) {
                return res.status(401).json({ error: 'Atributos is undefined' });
            }
            const value = parseFloat(valueText);
            try {
                const createEntryService = new CreateEntryService_1.CreateEntryService();
                const execute = yield createEntryService.execute({ categoryId, title, value, description });
                return res.status(200).json(execute);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
}
exports.CreateEntryController = CreateEntryController;
//# sourceMappingURL=CreateEntryController.js.map