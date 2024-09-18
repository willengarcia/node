import prismaClient from "../../prisma";
interface superUser{
    userId:string;
}
class UpdateUserService{
    async execute({userId}:superUser){
        const res = await prismaClient.user.update({
            where:{
                id:userId,
            },
            data:{
                superUser:true,
            },
        })
        return res
    }
}
export {UpdateUserService}