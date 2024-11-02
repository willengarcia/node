import prismaClient from "../../prisma";
interface infoEntry{
    categoryId:string
}
class ListEntryService{
    async execute({categoryId}:infoEntry){
        try {
            const execute = await prismaClient.entry.findMany({
                where:{
                    category:{
                        checklistId:categoryId
                    }
                },
                select:{
                    title:true,
                    value:true,
                    description:true,
                    imageUrl:true
                },
            })
            return execute
        } catch (error) {
            return {sucess:false, message:error}
        }
    }
}
export { ListEntryService }