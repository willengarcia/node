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
exports.AddImagesService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const cloudinary_1 = __importDefault(require("../../config/cloudinary"));
const stream_1 = require("stream");
class AddImagesService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ userId, storeId, imageBuffer }) {
            // Verificar se o usuário e a loja existem
            const user = yield prisma_1.default.user.findUnique({
                where: { id: userId },
            });
            const store = yield prisma_1.default.store.findUnique({
                where: { id: storeId },
            });
            if (!user) {
                throw new Error('Usuário não encontrado.');
            }
            if (!store) {
                throw new Error('Loja não encontrada.');
            }
            // Verificar se o usuário está associado à loja
            const userStoreRelation = yield prisma_1.default.userStore.findUnique({
                where: {
                    userId_storeId: {
                        userId: user.id,
                        storeId: store.id,
                    },
                },
            });
            if (!userStoreRelation) {
                throw new Error('Usuário não está associado à loja.');
            }
            // Fazer upload da imagem no Cloudinary
            const uploadStream = cloudinary_1.default.uploader.upload_stream({
                resource_type: 'image',
            });
            // Retornar a URL após o upload
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const stream = stream_1.Readable.from(imageBuffer);
                stream.pipe(uploadStream)
                    .on('finish', () => __awaiter(this, void 0, void 0, function* () {
                    const result = yield new Promise((res, rej) => {
                        uploadStream.on('finish', () => res(uploadStream));
                        uploadStream.on('error', (error) => rej(error));
                    });
                    resolve(result.secure_url); // Use secure_url para obter a URL
                }))
                    .on('error', (error) => reject(error));
            })).then((imageUrl) => __awaiter(this, void 0, void 0, function* () {
                // Adicionar a imagem associada ao UserStore com a URL retornada do Cloudinary
                const newImage = yield prisma_1.default.image.create({
                    data: {
                        url: imageUrl, // URL da imagem no Cloudinary
                        userStoreId: userStoreRelation.id,
                    },
                    select: {
                        id: true,
                        url: true,
                        createdAt: true,
                    },
                });
                return newImage;
            }));
        });
    }
}
exports.AddImagesService = AddImagesService;
//# sourceMappingURL=AddImagesService.js.map