import prismaClient from "../../prisma";
interface infoIdChecklist{
    idChecklist:string
}
class ListCategoryToChecklistService{
    async execute({idChecklist}:infoIdChecklist){
        const existId = await prismaClient.category.findFirst({
            where:{
                checklistId:idChecklist
            }
        })
        if(!existId){
            return {sucess:false, message:'Não existe checklist para essa categoria!'}
        }
        try {
            const execute = await prismaClient.category.findMany({
                where:{
                    checklistId:idChecklist
                },
                select:{
                    id:true,
                    name:true,
                    entries:true
                }
            })
            return execute
        } catch (error) {
            return {sucess:false, message:error}
        }
    }
}
export {ListCategoryToChecklistService}