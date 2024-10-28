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
exports.ListImageService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class ListImageService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ storeId }) {
            // Buscar todas as imagens associadas à loja, incluindo informações do usuário
            const images = yield prisma_1.default.image.findMany({
                where: {
                    userStore: {
                        storeId: storeId
                    },
                },
                select: {
                    id: true,
                    url: true,
                    createdAt: true,
                    userStore: {
                        select: {
                            id: true,
                            user: {
                                select: {
                                    id: true,
                                    name: true, // Nome do usuário
                                },
                            },
                            store: {
                                select: {
                                    id: true,
                                    name: true, // Nome da loja
                                },
                            },
                            isVerified: true,
                        },
                    },
                },
            });
            // Formatar a resposta para incluir apenas os campos desejados
            const formattedImages = images.map(image => ({
                idImage: image.id,
                userName: image.userStore.user.name,
                imageUrl: image.url,
                isVerified: image.userStore.isVerified,
                createdAt: image.createdAt,
            }));
            return formattedImages;
        });
    }
}
exports.ListImageService = ListImageService;
//# sourceMappingURL=ListImagesService.js.map