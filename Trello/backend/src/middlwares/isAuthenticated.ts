import { configDotenv } from "dotenv";
import { Request, Response, NextFunction} from "express";
import { verify } from "jsonwebtoken";

interface Payload{
    sub: string;
}
export function isAuthenticated(req: Request, res: Response, next: NextFunction){
    console.log('Chamou esse Middleware')
    // Receber o Token
    const authToken = req.headers.authorization
    if(!authToken){
        return res.status(401).end() // barra o usuário
    }
    
    const [, token] = authToken.split(' ')

    console.log('Token: '+token)

    try{
        // validar o token
        const {sub} = verify(token, process.env.JWT_SECRET)  as Payload// argumentos: token do usuário, chave que eu coloquei e retorna o id do banco de dados

        // recuperar o ID do token e colocar dentro de uma variável e colocar dentro do Request
        req.user_id = sub
        
        return next()
    }catch(err){
        return res.status(401).end()
    }

}