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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddServicosUserService = void 0;
const cloudinary_1 = __importDefault(require("../../config/cloudinary"));
const prisma_1 = __importDefault(require("../../prisma"));
const stream_1 = require("stream");
class AddServicosUserService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ servicoId, description, dataTime, hora, userId, imageBuffer }) {
            try {
                let imageUrl;
                // Verifica se o buffer da imagem foi passado, caso contrário, pula o upload
                if (imageBuffer) {
                    imageUrl = yield new Promise((resolve, reject) => {
                        const uploadStream = cloudinary_1.default.uploader.upload_stream({
                            resource_type: 'image',
                        }, (error, result) => {
                            if (error)
                                return reject(error);
                            resolve((result === null || result === void 0 ? void 0 : result.secure_url) || '');
                        });
                        const stream = stream_1.Readable.from(imageBuffer);
                        stream.pipe(uploadStream).on('error', (error) => reject(error));
                    });
                }
                // Criação do pedido no banco de dados com ou sem a imagem
                const data = yield prisma_1.default.order.create({
                    data: {
                        clientId: userId,
                        serviceId: servicoId,
                        data: dataTime,
                        hota: hora, // Corrigido de "hota" para "hora"
                        description: description,
                        status: "PENDING", // Definido como PENDING
                        urlImages: imageUrl || '', // Define como string vazia se não houver imagem
                    },
                    select: {
                        id: true,
                        service: true,
                        description: true,
                        data: true,
                        status: true,
                    }
                });
                return data;
            }
            catch (err) {
                throw new Error('Erro ao solicitar serviço!');
            }
        });
    }
}
exports.AddServicosUserService = AddServicosUserService;
//# sourceMappingURL=AddServicosUserService.js.map