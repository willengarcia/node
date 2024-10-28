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
exports.AddImagesController = void 0;
const AddImagesService_1 = require("../../services/images/AddImagesService");
class AddImagesController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId, storeId } = req.body;
            if (!req.file) {
                return res.status(400).json({ error: 'Arquivo não encontrado.' });
            }
            try {
                const addImageService = new AddImagesService_1.AddImagesService();
                const newImage = yield addImageService.execute({
                    userId,
                    storeId,
                    imageBuffer: req.file.buffer, // Passa o buffer da imagem
                });
                return res.json(newImage);
            }
            catch (error) {
                return res.status(500).json({ error: error.message });
            }
        });
    }
}
exports.AddImagesController = AddImagesController;
//# sourceMappingURL=AddImagesController.js.map