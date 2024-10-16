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
exports.PostApiPagamento = void 0;
const axios_1 = __importDefault(require("axios"));
const consumers_1 = require("stream/consumers");
class PostApiPagamento {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.body.action === 'payment.updated') {
                    yield (0, axios_1.default)({
                        url: 'https://services-zeta-gold.vercel.app/returnPagamento',
                        headers: {
                            paymentid: req.body.data.id
                        }
                    })
                        .then(x => x.data)
                        .then((r) => __awaiter(this, void 0, void 0, function* () {
                        // Verifica se r e r.response existem antes de acessar r.response.status
                        if (r && r.response && r.response.status === 'approved') {
                            console.log(r);
                            return (0, consumers_1.json)(r);
                        }
                        else {
                            console.error('Pagamento não aprovado ou resposta inválida');
                            return { error: 'Pagamento não aprovado ou resposta inválida' };
                        }
                    }))
                        .catch((err) => {
                        console.error('Erro ao acessar o pagamento:', err);
                        return { error: 'Erro ao acessar o pagamento' };
                    });
                }
                else {
                    console.error('Ação não é "payment.updated"');
                    return { error: 'Ação inválida' };
                }
            }
            catch (err) {
                throw new Error('Erro: ' + err);
            }
        });
    }
}
exports.PostApiPagamento = PostApiPagamento;
//# sourceMappingURL=PostApiPagamento.js.map