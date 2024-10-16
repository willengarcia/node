import {MercadoPagoConfig, Payment} from "mercadopago";
import { Request, Response } from "express";
import axios from 'axios'
class PostApiPagamento{
    async handle(req:Request, res:Response){
        try{
            if(req.body.action === 'payment.updated') {
                await axios({
                  url: '/returnPagamento',
                  headers: {
                    paymentid: req.body.data.id
                  }
                })
                .then(x => x.data)
                .then(async (r) => {
                  // Verifica se r e r.response existem antes de acessar r.response.status
                  if (r && r.response && r.response.status === 'approved') {
                    console.log(r);
                    return r;
                  } else {
                    console.error('Pagamento não aprovado ou resposta inválida');
                    return { error: 'Pagamento não aprovado ou resposta inválida' };
                  }
                })
                .catch((err) => {
                  console.error('Erro ao acessar o pagamento:', err);
                  return { error: 'Erro ao acessar o pagamento' };
                });
            } else {
                console.error('Ação não é "payment.updated"');
                return { error: 'Ação inválida' };
            }
        }catch(err){
            throw new Error('Erro: '+err)
        }
    }
}
export {PostApiPagamento}