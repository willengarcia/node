import prismaClient from "../../prisma";
interface ListStorage{
    name:string
}
class ListStorageService{
    async execute({name}:ListStorage){
        if(!name){
            throw new Error('Erro ao buscar dados!')
        }
        const userWithStore = await prismaClient.store.findMany({
            where:{
                name: name,
            },
            include:{
                users:true
            }
        })
        return userWithStore
    }
}
export {ListStorageService}