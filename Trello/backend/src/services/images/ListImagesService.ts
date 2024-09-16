import prismaClient from "../../prisma";
interface StoreId{
    storeId: string;
}
class ListImageService{
    async execute({storeId}:StoreId){
        console.log('ID DA LOJA'+storeId)
        const userWithStore = await prismaClient.userStore.findMany({
            where:{
                storeId:storeId
            },
            select:{
                userId:true,
                user:{
                    include:{
                        images:true,
                    },
                },
            },
        })
        return userWithStore
    }
}
export {ListImageService}