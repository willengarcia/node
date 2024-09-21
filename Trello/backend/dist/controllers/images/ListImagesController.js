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
exports.ListImagesController = void 0;
const ListImagesService_1 = require("../../services/images/ListImagesService");
class ListImagesController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const storeId = req.query.storeId;
            const listImages = new ListImagesService_1.ListImageService();
            try {
                const list = yield listImages.execute({ storeId });
                return res.json(list);
            }
            catch (err) {
                return res.status(400).json({ error: err.message });
            }
        });
    }
}
exports.ListImagesController = ListImagesController;
//# sourceMappingURL=ListImagesController.js.map