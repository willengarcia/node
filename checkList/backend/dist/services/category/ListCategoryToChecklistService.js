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
exports.ListCategoryToChecklistService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class ListCategoryToChecklistService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ idChecklist }) {
            const existId = yield prisma_1.default.category.findFirst({
                where: {
                    checklistId: idChecklist
                }
            });
            if (!existId) {
                return { sucess: false, message: 'Não existe checklist para essa categoria!' };
            }
            try {
                const execute = yield prisma_1.default.category.findMany({
                    where: {
                        checklistId: idChecklist
                    },
                    select: {
                        id: true,
                        name: true,
                        entries: true
                    }
                });
                return execute;
            }
            catch (error) {
                return { sucess: false, message: error };
            }
        });
    }
}
exports.ListCategoryToChecklistService = ListCategoryToChecklistService;
//# sourceMappingURL=ListCategoryToChecklistService.js.map