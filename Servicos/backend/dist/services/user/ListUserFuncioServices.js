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
exports.ListUserFuncioSerices = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class ListUserFuncioSerices {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ tipo }) {
            try {
                const list = yield prisma_1.default.user.findMany({
                    where: {
                        role: tipo,
                    },
                    select: {
                        name: true,
                        id: true,
                        celular: true,
                        email: true,
                    },
                });
                return list;
            }
            catch (err) {
                return err;
            }
        });
    }
}
exports.ListUserFuncioSerices = ListUserFuncioSerices;
//# sourceMappingURL=ListUserFuncioServices.js.map