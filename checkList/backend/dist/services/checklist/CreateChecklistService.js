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
exports.CreateChecklistService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class CreateChecklistService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ name, teamId, userTeamId }) {
            try {
                // Verificar se o teamId e o userTeamId existem
                const teamExists = yield prisma_1.default.team.findUnique({
                    where: { id: teamId }
                });
                const userExists = yield prisma_1.default.userTeam.findUnique({
                    where: { id: userTeamId }
                });
                if (!teamExists) {
                    return { success: false, error: "O ID da equipe não existe. TeamId: " + teamId };
                }
                if (!userExists) {
                    return { success: false, error: "O ID do usuário não existe. UserTeamId: " + userTeamId };
                }
                // Criar o checklist se ambos os IDs forem válidos
                const checklist = yield prisma_1.default.checklist.create({
                    data: {
                        name: name,
                        teamId: teamId,
                        userTeamId: userTeamId,
                    },
                    select: {
                        name: true,
                    }
                });
                return { success: true, checklist };
            }
            catch (error) {
                console.error("Erro ao criar checklist:", error);
                return { success: false, error: "Erro ao criar checklist" };
            }
        });
    }
}
exports.CreateChecklistService = CreateChecklistService;
//# sourceMappingURL=CreateChecklistService.js.map