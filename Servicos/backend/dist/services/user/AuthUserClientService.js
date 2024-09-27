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
exports.AuthUserClientService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken"); // gerar token
class AuthUserClientService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ email, password }) {
            const existEmail = yield prisma_1.default.user.findFirst({
                where: {
                    email: email
                }
            });
            if (!existEmail) {
                return { 'Erro': 'Email não existe' };
            }
            const passwodConvert = yield (0, bcryptjs_1.compare)(password, existEmail.password);
            if (!passwodConvert) {
                return { 'Erro': 'Senha incorreta!' };
            }
            const token = (0, jsonwebtoken_1.sign)({
                name: existEmail.name,
                email: existEmail.email
            }, process.env.JWT_SECRET, {
                subject: existEmail.id,
                expiresIn: '15d'
            });
            try {
                const userPedidosFeitos = yield prisma_1.default.user.findFirst({
                    where: {
                        id: existEmail.id
                    },
                    select: {
                        id: true,
                        role: true
                    }
                });
                return { userPedidosFeitos, token };
            }
            catch (err) {
                return err;
            }
        });
    }
}
exports.AuthUserClientService = AuthUserClientService;
//# sourceMappingURL=AuthUserClientService.js.map