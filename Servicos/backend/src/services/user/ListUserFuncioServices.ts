import prismaClient from "../../prisma";
interface ListUser{
    tipo:"CLIENT" | "EMPLOYEE" | "SUPERUSER"
}
class ListUserFuncioSerices{
    async execute({tipo}:ListUser){
        try{
            const list = await prismaClient.user.findMany({
                where:{
                    role:tipo as any,
                },
                select:{
                    name:true,
                    id:true,
                    celular:true,
                    email:true,
                },
            })
            return list
        }catch(err){
            return err
        }
    }
}
export { ListUserFuncioSerices }