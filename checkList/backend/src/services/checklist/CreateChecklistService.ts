import prismaClient from "../../prisma";
interface infoCheck{
    teamId:string,
    userTeamId:string
}
class CreateChecklistService{
    async execute({teamId, userTeamId}:infoCheck){
        try {
            const checklist = await prismaClient.checklist.create({
                data: {
                    team: { connect: { id: teamId } },
                    userTeam: { connect: { id: userTeamId } },
                },
            });
            return checklist
        } catch (error) {
            return error
        }
    }
}
export {CreateChecklistService}