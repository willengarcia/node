import prismaClient from "../../prisma";
interface ListStorage{
    userId:string
}
class ListStorageService{
    async execute({userId}:ListStorage){
        if(!userId){
            throw new Error('Erro ao buscar dados!')
        }
        const userWithStore = await prismaClient.user.findMany({
            where:{
                id: userId,
            },
            include:{
                stores:true
            }
        })
        return userWithStore
    }
}
export {ListStorageService}