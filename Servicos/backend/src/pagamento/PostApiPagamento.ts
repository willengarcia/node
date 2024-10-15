import {MercadoPagoConfig, Payment} from "mercadopago";
import { Request, Response } from "express";
import axios from 'axios'
class PostApiPagamento{
    async handle(req:Request, res:Response){
        try{
            if(req.body.action === 'payment.updated'){
                await axios({
                    url: 'https://services-zeta-gold.vercel.app/returnPagamento',
                    headers:{
                        paymentid:req.body.data.id
                    }
                })
                .then(x=>x.data)
                .then(async (r)=>{
                    if(r.response.status==='approved'){
                        console.log(r)
                        return r
                    }
                })
                .catch(console.log)
            }
        }catch(err){
            throw new Error('Erro: '+err)
        }
    }
}
export {PostApiPagamento}