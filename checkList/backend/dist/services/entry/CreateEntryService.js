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
exports.CreateEntryService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class CreateEntryService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ categoryId, title, value, description }) {
            const existCategory = yield prisma_1.default.category.findFirst({
                where: {
                    id: categoryId
                }
            });
            if (!existCategory) {
                return { sucess: false, message: 'Categoria não existe!' };
            }
            const existTitle = yield prisma_1.default.entry.findFirst({
                where: {
                    categoryId: categoryId,
                    title: title,
                },
            });
            if (existTitle) {
                return { sucess: false, message: 'Titulo para essa Categoria já existe!' };
            }
            try {
                const execute = yield prisma_1.default.entry.create({
                    data: {
                        categoryId: categoryId,
                        title: title,
                        value: value,
                        description: description
                    },
                    select: {
                        title: true,
                        value: true,
                        description: true,
                    },
                });
                return execute;
            }
            catch (error) {
                return { sucess: false, message: error };
            }
        });
    }
}
exports.CreateEntryService = CreateEntryService;
//# sourceMappingURL=CreateEntryService.js.map