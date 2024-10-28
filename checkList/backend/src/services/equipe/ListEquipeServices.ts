import prismaClient from "../../prisma";
class ListEquipeService{
    async execute(){
        try {
            const team = await prismaClient.team.findMany({
                select:{
                    id:true,
                    name:true,
                    location:true,
                    createdAt:true,
                }
            });
            return team
        } catch (error) {
            return error
        }
    }
}
export {ListEquipeService}