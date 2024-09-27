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
exports.AddServicosUserService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class AddServicosUserService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ servicoId, description, dataTime, hora, userId }) {
            if ((!servicoId) || (!description) || (!dataTime) || (!hora)) {
                return { erro: 'Faltou colocar as entradas' };
            }
            try {
                const data = yield prisma_1.default.order.create({
                    data: {
                        clientId: userId,
                        serviceId: servicoId,
                        data: dataTime,
                        hota: hora,
                        description: description,
                        status: 'PENDING'
                    },
                    select: {
                        id: true,
                        service: true,
                        description: true,
                        data: true,
                        status: true
                    }
                });
                return data;
            }
            catch (err) {
                return err;
            }
        });
    }
}
exports.AddServicosUserService = AddServicosUserService;
//# sourceMappingURL=AddServicosUserService.js.map