import prismaClient from "../../prisma";
import { hash } from "bcryptjs";
interface User{
    name: string
    email:string
    password:string
}
class CreateUserService{
    async execute({name, email, password}:User){
        const existUser = await prismaClient.user.findFirst({
            where:{
                email:email
            }
        })
        if(existUser){
            return {sucess:false, error:'E-mail já cadastrado!'}
        }
        try {
            const passwordHash = await hash(password, 8)
            const createUser = prismaClient.user.create({
                data:{
                    name:name,
                    email:email,
                    password:passwordHash,
                },
                select:{
                    id:true,
                    name:true,
                    email:true,
                },
            })
            return {sucess:true, data:createUser}
        } catch (error) {
            return {sucess:false, error:error}
        }
    }
}
export { CreateUserService }