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
                const team = yield prisma_1.default.team.findMany({
                    select: {
                        id: true,
                        name: true,
                        location: true,
                        createdAt: true,
                    }
                });
                return team;
            }
            catch (error) {
                return error;
            }
        });
    }
}
exports.ListEquipeService = ListEquipeService;
//# sourceMappingURL=ListEquipeServices.js.map