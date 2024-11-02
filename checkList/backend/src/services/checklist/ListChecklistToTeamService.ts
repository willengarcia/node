import prismaClient from "../../prisma";
interface infoIdTeam{
    idTeam:string
}
class ListChecklistToTeamService{
    async execute({idTeam}:infoIdTeam){
        try {
            const execute = await prismaClient.checklist.findMany({
                where:{
                    team:{
                        id:idTeam,
                    },
                },
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
export { ListChecklistToTeamService }