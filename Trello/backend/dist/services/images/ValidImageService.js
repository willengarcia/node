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
exports.ValidImageService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class ValidImageService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ imageId }) {
            console.log(imageId);
            try {
                // Passo 1: Encontrar o UserStore associado à imagem com o id da imagem
                const userStore = yield prisma_1.default.userStore.findFirst({
                    where: {
                        images: {
                            some: {
                                id: imageId,
                            },
                        },
                    },
                });
                if (!userStore) {
                    throw new Error('UserStore não encontrado para a imagem fornecida.');
                }
                // Passo 2: Atualizar o campo isVerified no UserStore
                const updatedUserStore = yield prisma_1.default.userStore.update({
                    where: {
                        id: userStore.id, // Usar o id do UserStore encontrado
                    },
                    data: {
                        isVerified: true,
                    },
                    select: {
                        isVerified: true,
                    },
                });
                return updatedUserStore;
            }
            catch (error) {
                console.error("Erro ao atualizar o UserStore:", error.message);
                throw new Error(error.message || "Erro ao atualizar o UserStore");
            }
        });
    }
}
exports.ValidImageService = ValidImageService;
//# sourceMappingURL=ValidImageService.js.map