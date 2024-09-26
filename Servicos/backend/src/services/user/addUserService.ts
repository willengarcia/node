import { Role } from "@prisma/client";
import prismaClient from "../../prisma";
import { hash } from "bcryptjs";
interface User{
    name: string
    passwordUser: string
    emailUser: string
    celularUser:string,
    tipo: "CLIENT" | "EMPLOYEE" | "SUPERUSER";
}
class AddUserService{
    async execute({name, passwordUser, emailUser, celularUser, tipo}:User){
        const existUser = await prismaClient.user.findFirst({
            where:{
                email:emailUser
            }
        })
        if(existUser){
            return {'error':"email já cadastrado"}
        }
        try{
            const passwordHash = await hash(passwordUser, 8)
            const addUser = await prismaClient.user.create({
                data:{
                    name:name,
                    celular:celularUser,
                    email:emailUser,
                    password:passwordHash,
                    role:tipo as any,
                },
                select:{
                    id:true,
                    name:true,
                    celular:true,
                    role:true
                }
            })
            return addUser
        }catch(err){
            return err
        }
    }
}
export {AddUserService}