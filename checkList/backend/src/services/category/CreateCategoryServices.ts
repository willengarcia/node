import { StreamingProfiles } from "cloudinary";
import prismaClient from "../../prisma";
import { PrismaClientRustPanicError } from "@prisma/client/runtime/library";
interface infoCategory{
    name:string,
    checklistId:string
}
class CreateCategoryService{
    async execute({name, checklistId}:infoCategory){
        try {
            const category = await prismaClient.category.create({
                data: {
                    name,
                    checklist: { connect: { id: checklistId } },
                },
            });
            return category
        } catch (error) {
            return error
        }
    }
}
export {CreateCategoryService}