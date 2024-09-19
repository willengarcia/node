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
            const addImagesService = new AddImagesService_1.AddImagesService();
            console.log(req.file);
            const { filename: imageUrl } = req.file;
            const image = yield addImagesService.execute({ userId, storeId, imageUrl });
            return res.json(image);
            // if(!req.file){
            //     throw new Error('Erro ao colocar a imagem')
            // }else{
            //     const {filename:imageUrl} = req.file
            //     const image = await addImagesService.execute({ userId, storeId, imageUrl })
            //     return res.json(image)
            // }
        });
    }
}
exports.AddImagesController = AddImagesController;
//# sourceMappingURL=AddImagesController.js.map