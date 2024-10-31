import prismaClient from "../../prisma";
interface infoEntry{
    categoryId:string, 
    title:string, 
    value:number, 
    description:string
}
class CreateEntryService{
    async execute({categoryId, title, value, description}:infoEntry){
        const existCategory = await prismaClient.category.findFirst({
            where:{
                id:categoryId
            }
        })
        if(!existCategory){
            return {sucess:false, message:'Categoria não existe!'}
        }
        const existTitle = await prismaClient.entry.findFirst({
            where:{
                categoryId:categoryId,
                title:title,
            },
        })
        if(existTitle){
            return {sucess:false, message:'Titulo para essa Categoria já existe!'}
        }
        try {
            const execute = await prismaClient.entry.create({
                data:{
                    categoryId:categoryId,
                    title:title,
                    value:value,
                    description:description
                },
                select:{
                    title:true,
                    value:true,
                    description:true,
                },
            })
            return execute
        } catch (error) {
            return {sucess:false, message:error}
        }
    }
}
export { CreateEntryService }