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
exports.AddUserService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const bcryptjs_1 = require("bcryptjs");
class AddUserService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ name, passwordUser, emailUser, celularUser, tipo }) {
            const existUser = yield prisma_1.default.user.findFirst({
                where: {
                    email: emailUser
                }
            });
            if (existUser) {
                return { 'error': "email já cadastrado" };
            }
            try {
                const passwordHash = yield (0, bcryptjs_1.hash)(passwordUser, 8);
                const addUser = yield prisma_1.default.user.create({
                    data: {
                        name: name,
                        celular: celularUser,
                        email: emailUser,
                        password: passwordHash,
                        role: tipo,
                    },
                    select: {
                        id: true,
                        name: true,
                        celular: true,
                        role: true
                    }
                });
                return addUser;
            }
            catch (err) {
                return err;
            }
        });
    }
}
exports.AddUserService = AddUserService;
//# sourceMappingURL=AddUserService.js.map