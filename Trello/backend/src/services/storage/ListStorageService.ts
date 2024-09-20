import prismaClient from "../../prisma";
class ListStorageService{
    async execute(){
        const userWithStore = await prismaClient.store.findMany({
            include:{
                users:true
            },
            orderBy:{
                name:'asc',
            },
        })
      
        return userWithStore
    }
}
export {ListStorageService}