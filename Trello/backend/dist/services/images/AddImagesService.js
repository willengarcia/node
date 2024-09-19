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
class AddImagesService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ userId, storeId, imageUrl }) {
            // Verificar se o usuário e a loja existem
            const user = yield prisma_1.default.user.findUnique({
                where: { id: userId },
            });
            const store = yield prisma_1.default.store.findUnique({
                where: { id: storeId },
            });
            console.log("ID DO USUÁRIO: " + user);
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
            // Adicionar a imagem associada ao UserStore
            const newImage = yield prisma_1.default.image.create({
                data: {
                    url: imageUrl,
                    userStoreId: userStoreRelation.id, // Usa userStoreId diretamente
                },
                select: {
                    id: true,
                    url: true,
                    createdAt: true,
                },
            });
            return newImage;
        });
    }
}
exports.AddImagesService = AddImagesService;
//# sourceMappingURL=AddImagesService.js.map