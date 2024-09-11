import prismaClient from "../../prisma";
interface IdCategory{
    id_category:string
}
class FilterCategoryService{
    async execute({id_category}:IdCategory){
        const list = await prismaClient.product.findMany({ // pesquisa por chave primaria
            where:{
                id:id_category,
            },
        })
        return list
    }
}
export {FilterCategoryService}