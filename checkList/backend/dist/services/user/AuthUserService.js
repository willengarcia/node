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
exports.AuthUserService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken"); // gerar token
class AuthUserService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ email, password }) {
            // Verficar se o email existe 
            const user = yield prisma_1.default.user.findFirst({
                where: {
                    email: email,
                }
            });
            if (!user) {
                throw new Error('Usuário/Senha está incorreto');
            }
            // precisa verificar se a senha está correta
            const passwordMatch = yield (0, bcryptjs_1.compare)(password, user.password);
            if (!passwordMatch) {
                throw new Error('Usuário/Senha está incorreto');
            }
            const token = (0, jsonwebtoken_1.sign)({
                name: user.name, // dados do payload
                email: user.email
            }, process.env.JWT_SECRET, {
                subject: user.id,
                expiresIn: '30d' // expira em 30 dias
            });
            // Verifica se o usuário já tem alguma loja cadastrada
            const locaCadastradaUser = yield prisma_1.default.userTeam.findFirst({
                where: {
                    userId: user.id
                }
            });
            if (!locaCadastradaUser) {
                return {
                    superUser: user.superUser,
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    token: token,
                    storeId: null
                };
            }
            // Gerar um token JWT (Json Web Token: autenticar o usuário, e aplicações REST) e devolver os dados do usuário
            // Se deu tudo certo, é só gerar o token pro usuário
            return {
                superUser: user.superUser,
                id: user.id,
                name: user.name,
                email: user.email,
                token: token,
                teamId: locaCadastradaUser.teamId
            };
        });
    }
}
exports.AuthUserService = AuthUserService;
//# sourceMappingURL=AuthUserService.js.map