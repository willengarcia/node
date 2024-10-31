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
exports.InsertEquipeUserService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class InsertEquipeUserService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ userId, teamId }) {
            const userIsTeam = yield prisma_1.default.userTeam.findFirst({
                where: {
                    userId: userId,
                    teamId: teamId
                }
            });
            if (userIsTeam) {
                return { error: 'Usuário já faz parte da equipe selecionada' };
            }
            try {
                const insert = yield prisma_1.default.userTeam.create({
                    data: {
                        userId: userId,
                        teamId: teamId,
                    }
                });
                return { sucess: 'Adicionado na equipe com sucesso!' };
            }
            catch (error) {
                return error;
            }
        });
    }
}
exports.InsertEquipeUserService = InsertEquipeUserService;
//# sourceMappingURL=InsertEquipeUserService.js.map