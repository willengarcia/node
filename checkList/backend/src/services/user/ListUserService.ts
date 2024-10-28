import prismaClient from "../../prisma";
class ListUserService{
    async execute(){
        const list = await prismaClient.user.findMany({
            select:{
                id:true,
                name:true,
            },
        })
        return list
    }
}
export { ListUserService }