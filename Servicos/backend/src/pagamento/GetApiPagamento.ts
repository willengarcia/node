import {MercadoPagoConfig, Payment} from "mercadopago";
import { Request, response, Response } from "express";
class GetApiPagamento{
    async handle(req:Request, res:Response){
        const information = await new Payment({
            accessToken: process.env.ACCESS_TOKEN
        })
            .get({
                id: req.headers.paymentid as string
            })
            .catch(console.log)
        res.send({response:information}).status(200)
    }
}
export {GetApiPagamento}