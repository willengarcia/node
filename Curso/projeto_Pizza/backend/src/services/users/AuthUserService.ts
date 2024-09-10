import prismaClient from "../../prisma";
import { compare } from "bcryptjs";

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
        
        return {ok:true}
    }
}
export {AuthUserService}