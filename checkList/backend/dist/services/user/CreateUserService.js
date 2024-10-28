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
exports.CreateUserService = void 0;
const index_1 = __importDefault(require("../../prisma/index"));
const bcryptjs_1 = require("bcryptjs");
class CreateUserService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ name, email, senha, superUser }) {
            // verifica se envou o email
            if (!email) {
                return { erro: "Email incorreto ou há existe" };
            }
            // verifica se o email já existe
            const userAlreadyExists = yield index_1.default.user.findFirst({
                where: {
                    email: email // o metodo findFirst busca se há alguem igual 
                }
            });
            if (userAlreadyExists) {
                throw new Error('Email já cadastrado');
            }
            // verifica se enviou o nome 
            if (!name) {
                return { erro: "Nome incorreto" };
            }
            // verifica se enviou a senha
            if (!senha) {
                return { erro: "Senha Inválida" };
            }
            const passwordHash = yield (0, bcryptjs_1.hash)(senha, 8);
            const bd = yield index_1.default.user.create({
                data: {
                    name: name,
                    email: email,
                    password: passwordHash,
                    superUser: superUser,
                },
                select: {
                    name: true,
                    id: true,
                    superUser: true,
                },
            });
            return bd;
        });
    }
}
exports.CreateUserService = CreateUserService;
//# sourceMappingURL=CreateUserService.js.map