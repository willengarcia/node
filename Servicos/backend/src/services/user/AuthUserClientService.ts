import { Request, Response } from "express";
import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import {sign} from 'jsonwebtoken' // gerar token
interface AuthUser {
    email:string
    password:string
    tipo:string
}
class AuthUserClientService{
    async execute({email, password}:AuthUser){
        const existEmail = await prismaClient.user.findFirst({
            where:{
                email:email
            }
        })
        if(!existEmail){
            return {'Erro':'Email não existe'}
        }
        const passwodConvert = await compare(password, existEmail.password)
        if(!passwodConvert){
            return {'Erro':'Senha incorreta!'}
        }
        const token = sign({
            name:existEmail.name,
            email:existEmail.email
        },process.env.JWT_SECRET,{
            subject:existEmail.id,
            expiresIn:'15d'
        })
        try{
            const userPedidosFeitos = await prismaClient.user.findFirst({
                where:{
                    id:existEmail.id
                },
                select:{
                    id:true,
                    role:true
                }
            })
            return userPedidosFeitos
        }catch(err){
            return err
        }
    }
}
export { AuthUserClientService}