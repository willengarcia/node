import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import {sign} from 'jsonwebtoken' // gerar token
interface AuthRequest{
    email: string;
    password: string;
}
class AuthUserService{
    async execute({email, password}:AuthRequest){
        // Verficar se o email existe 
        const user = await prismaClient.user.findFirst({
            where:{
                email:email,
            }
        })
        if(!user){
            throw new Error('Usuário/Senha está incorreto')
        }

        // precisa verificar se a senha está correta
        const passwordMatch = await compare(password, user.password)
        if(!passwordMatch){
            throw new Error('Usuário/Senha está incorreto')
        }

        const token = sign(
            {
            name: user.name, // dados do payload
            email:user.email
        }, process.env.JWT_SECRET, { // chave secreta
            subject: user.id,
            expiresIn:'30d' // expira em 30 dias
        })
        
        // Verifica se o usuário já tem alguma loja cadastrada
        const locaCadastradaUser = await prismaClient.userTeam.findFirst({
            where:{
                userId:user.id
            }
        })
        if(!locaCadastradaUser){
            return {
                superUser:user.superUser,
                id:user.id,
                name: user.name,
                email: user.email,
                token: token,
                storeId:null
            }
        }

        // Gerar um token JWT (Json Web Token: autenticar o usuário, e aplicações REST) e devolver os dados do usuário
        // Se deu tudo certo, é só gerar o token pro usuário

        return {
            superUser:user.superUser,
            id:user.id,
            name: user.name,
            email: user.email,
            token: token,
            teamId:locaCadastradaUser.teamId
        }
    }
}
export {AuthUserService}