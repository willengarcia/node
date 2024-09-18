import prismaClient from "../../prisma/index";
import { hash } from "bcryptjs";
interface CreateUser{
    name:string;
    email: string;
    senha: string;
    superUser:boolean;
}
class CreateUserService{
    async execute({name, email, senha, superUser}:CreateUser){
        // verifica se envou o email
        if(!email){
            return {erro:"Email incorreto ou há existe"}
        }
        // verifica se o email já existe
        const userAlreadyExists = await prismaClient.user.findFirst({
            where:{
                email:email // o metodo findFirst busca se há alguem igual 
            }
        })
        if(userAlreadyExists){
            throw new Error('Email já cadastrado')
        }
        // verifica se enviou o nome 
        if(!name){
            return {erro:"Nome incorreto"}
        }
        // verifica se enviou a senha
        if(!senha){
            return {erro:"Senha Inválida"}
        }
        const passwordHash = await hash(senha, 8)
        const bd = await prismaClient.user.create({
            data:{
                name:name,
                email:email,
                password:passwordHash,
                superUser:superUser,
            },
            select:{
                name:true,
                id:true,
                superUser:true,
            },
        })

        return bd
    }
}
export {CreateUserService}