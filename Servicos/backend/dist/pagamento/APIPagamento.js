"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Step 1: Import the parts of the module you want to use
const mercadopago_1 = require("mercadopago");
// Step 2: Initialize the client object
const client = new mercadopago_1.MercadoPagoConfig({ accessToken: process.env.ACCESS_TOKEN, options: { timeout: 5000, idempotencyKey: 'abc' } });
// Step 3: Initialize the API object
const payment = new mercadopago_1.Payment(client);
// Step 4: Create the request object
const body = {
    transaction_amount: 12.34,
    description: 'teste api',
    payment_method_id: 'pix',
    payer: {
        email: 'willen.garcia05@gmil.com'
    },
};
// Step 5: Create request options object - Optional
const requestOptions = {
    idempotencyKey: '<IDEMPOTENCY_KEY>',
};
// Step 6: Make the request
payment.create({ body, requestOptions }).then(console.log).catch(console.log);
//# sourceMappingURL=APIPagamento.js.map