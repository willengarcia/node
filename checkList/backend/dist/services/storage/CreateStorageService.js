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
exports.CreateStorageService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class CreateStorageService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ name, location, userId }) {
            // Validação básica
            if (!name) {
                throw new Error('Erro ao inserir o nome');
            }
            // Criar a loja
            const store = yield prisma_1.default.store.create({
                data: {
                    name: name,
                    location: location,
                },
                select: {
                    id: true,
                    name: true,
                    location: true,
                    users: {
                        select: {
                            id: true,
                            user: {
                                select: {
                                    id: true,
                                    name: true,
                                },
                            },
                        },
                    },
                },
            });
            // Se `userId` for fornecido, adiciona a conexão com o usuário através da tabela intermediária
            if (userId) {
                yield prisma_1.default.userStore.create({
                    data: {
                        user: { connect: { id: userId } },
                        store: { connect: { id: store.id } },
                    },
                });
            }
            // Retorna a loja criada
            return store;
        });
    }
}
exports.CreateStorageService = CreateStorageService;
//# sourceMappingURL=CreateStorageService.js.map