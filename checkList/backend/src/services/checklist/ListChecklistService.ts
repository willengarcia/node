import prismaClient from "../../prisma";
class ListChecklistService{
    async execute(){
        try {
            const execute = await prismaClient.checklist.findMany({
                select:{
                    id:true,
                    status:true,
                    finalizedAt:true,
                    team:{
                        select:{
                            name:true
                        }
                    }
                }
            })
            return execute
        } catch (error) {
            return {error:error}
        }
    }
}
export { ListChecklistService }