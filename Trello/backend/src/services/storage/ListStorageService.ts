import prismaClient from "../../prisma";
class ListStorageService{
    async execute(){
        const userWithStore = await prismaClient.store.findMany({
            include:{
                users:true
            }
        })
        return userWithStore
    }
}
export {ListStorageService}