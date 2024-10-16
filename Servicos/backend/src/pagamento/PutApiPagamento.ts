// Step 1: Import the parts of the module you want to use
import { MercadoPagoConfig, Payment } from 'mercadopago';
import { Request, response, Response } from 'express';
class PutApiPagamento{
	async handle(req:Request, res:Response) {
		const {email, valor, descricao} = req.body
		if((!email)||(!valor)){
			throw new Error('Valor e Email não inseridos!')
		}
		try{
			const client = new MercadoPagoConfig({ accessToken: process.env.ACCESS_TOKEN});

			// Step 3: Initialize the API object
			const payment = new Payment(client);

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
			return payment.create({ body }).then((response) => res.send({url: response.point_of_interaction.transaction_data.ticket_url, pixCopiaCola:response.point_of_interaction.transaction_data.qr_code})).catch(console.log);
		}catch(err){
			throw new Error('Erro: '+err)
		}
	}
}
export {PutApiPagamento}