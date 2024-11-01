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
exports.ListEquipeToUserService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class ListEquipeToUserService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ idUser }) {
            const existIdUserEquipe = yield prisma_1.default.userTeam.findFirst({
                where: {
                    userId: idUser
                }
            });
            if (!existIdUserEquipe) {
                return { sucess: false, message: 'Usuário não está inserido em uma Equipe!' };
            }
            try {
                // Busca todas as equipes com seus ids e dados básicos
                const teams = yield prisma_1.default.userTeam.findMany({
                    where: {
                        userId: idUser
                    },
                    select: {
                        id: true,
                        team: {
                            select: {
                                id: true,
                                name: true,
                                location: true,
                                createdAt: true,
                            }
                        }
                    },
                });
                return teams;
            }
            catch (error) {
                console.error("Erro ao listar equipes e usuários:", error);
                return { error: "Erro ao listar equipes e usuários" };
            }
        });
    }
}
exports.ListEquipeToUserService = ListEquipeToUserService;
//# sourceMappingURL=ListEquipeToUserService.js.map