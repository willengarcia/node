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
exports.UpdateStorageService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class UpdateStorageService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ storeId, userId }) {
            console.log(storeId, userId);
            // Verificar se a loja existe
            if (!storeId || !userId) {
                throw new Error('O ID da loja e do usuário são obrigatórios');
            }
            const store = yield prisma_1.default.store.findUnique({
                where: {
                    id: storeId, // Passar o ID corretamente
                },
            });
            if (!store) {
                throw new Error('Loja não encontrada');
            }
            // Verificar se o usuário existe
            const user = yield prisma_1.default.user.findUnique({
                where: {
                    id: userId, // Passar o ID corretamente
                },
            });
            if (!user) {
                throw new Error('Usuário não encontrado');
            }
            const verificaUniao = yield prisma_1.default.userStore.findFirst({
                where: {
                    userId: userId, // o ID do usuário que você está verificando
                    storeId: storeId, // o ID da loja que você está verificando
                }
            });
            if (verificaUniao) {
                throw new Error('Usuário já está cadastrado na loja!');
            }
            // Adicionar o usuário à loja na tabela intermediária
            const userStoreRelation = yield prisma_1.default.userStore.create({
                data: {
                    userId: userId,
                    storeId: storeId,
                },
            });
            return userStoreRelation;
        });
    }
}
exports.UpdateStorageService = UpdateStorageService;
//# sourceMappingURL=UpdateStorageService.js.map