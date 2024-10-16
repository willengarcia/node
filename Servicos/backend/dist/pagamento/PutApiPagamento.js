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
exports.PutApiPagamento = void 0;
// Step 1: Import the parts of the module you want to use
const mercadopago_1 = require("mercadopago");
class PutApiPagamento {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, valor, descricao } = req.body;
            if ((!email) || (!valor)) {
                throw new Error('Valor e Email não inseridos!');
            }
            try {
                const client = new mercadopago_1.MercadoPagoConfig({ accessToken: process.env.ACCESS_TOKEN });
                // Step 3: Initialize the API object
                const payment = new mercadopago_1.Payment(client);
                // Step 4: Create the request object
                const body = {
                    transaction_amount: Number(valor),
                    description: descricao,
                    payment_method_id: 'pix',
                    payer: {
                        email: email
                    },
                };
                // Step 6: Make the request
                return payment.create({ body }).then((response) => res.send({ url: response.point_of_interaction.transaction_data.ticket_url, pixCopiaCola: response.point_of_interaction.transaction_data.qr_code, id: response.id })).catch(console.log);
            }
            catch (err) {
                throw new Error('Erro: ' + err);
            }
        });
    }
}
exports.PutApiPagamento = PutApiPagamento;
//# sourceMappingURL=PutApiPagamento.js.map