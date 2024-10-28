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
exports.UpdateUserService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class UpdateUserService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ userId }) {
            // Busca o usuário para verificar o valor atual de superUser
            const user = yield prisma_1.default.user.findUnique({
                where: {
                    id: userId,
                },
                select: {
                    superUser: true,
                },
            });
            // Se o usuário não for encontrado, lança um erro
            if (!user) {
                throw new Error('Usuário não encontrado');
            }
            // Alterna o valor de superUser (se true vira false, se false vira true)
            const updatedUser = yield prisma_1.default.user.update({
                where: {
                    id: userId,
                },
                data: {
                    superUser: !user.superUser, // Inverte o valor atual de superUser
                },
            });
            return updatedUser;
        });
    }
}
exports.UpdateUserService = UpdateUserService;
//# sourceMappingURL=UpdateUserService.js.map