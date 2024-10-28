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
exports.ValidImageController = void 0;
const ValidImageService_1 = require("../../services/images/ValidImageService");
class ValidImageController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const imageId = req.params.id;
            const validImageService = new ValidImageService_1.ValidImageService();
            try {
                const retorno = yield validImageService.execute({ imageId });
                return res.json(retorno);
            }
            catch (err) {
                return res.status(400).json({ error: err.message });
            }
        });
    }
}
exports.ValidImageController = ValidImageController;
//# sourceMappingURL=ValidImageController.js.map