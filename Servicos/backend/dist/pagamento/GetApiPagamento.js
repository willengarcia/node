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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetApiPagamento = void 0;
const mercadopago_1 = require("mercadopago");
class GetApiPagamento {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const information = yield new mercadopago_1.Payment({
                accessToken: process.env.ACCES_TOKEN
            })
                .get({
                id: req.headers.paymentid
            })
                .catch(console.log);
            res.send({ response: information }).status(200);
        });
    }
}
exports.GetApiPagamento = GetApiPagamento;
//# sourceMappingURL=GetApiPagamento.js.map