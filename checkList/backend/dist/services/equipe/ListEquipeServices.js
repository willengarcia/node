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
exports.ListEquipeService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class ListEquipeService {
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Busca todas as equipes com seus ids e dados básicos
                const teams = yield prisma_1.default.team.findMany({
                    select: {
                        id: true,
                        name: true,
                        location: true,
                        createdAt: true,
                    },
                });
                // Itera sobre cada equipe para buscar os userTeams associados
                const teamsWithUserIds = yield Promise.all(teams.map((team) => __awaiter(this, void 0, void 0, function* () {
                    const userTeams = yield prisma_1.default.userTeam.findMany({
                        where: {
                            teamId: team.id,
                        },
                        select: {
                            id: true, // ID do UserTeam
                            userId: true, // ID do usuário associado
                        },
                    });
                    return {
                        teamId: team.id, // ID da equipe
                        teamName: team.name,
                        teamLocation: team.location,
                        userTeams: userTeams.map((userTeam) => ({
                            userTeamId: userTeam.id,
                            userId: userTeam.userId
                        })),
                    };
                })));
                return teamsWithUserIds;
            }
            catch (error) {
                console.error("Erro ao listar equipes e usuários:", error);
                return { error: "Erro ao listar equipes e usuários" };
            }
        });
    }
}
exports.ListEquipeService = ListEquipeService;
//# sourceMappingURL=ListEquipeServices.js.map