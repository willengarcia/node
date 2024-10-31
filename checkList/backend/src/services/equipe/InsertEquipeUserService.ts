import prismaClient from "../../prisma";
interface inforUserTeam{
    userId:string,
    teamId:string
}
class InsertEquipeUserService{
    async execute({userId, teamId}:inforUserTeam){
        const userIsTeam = await prismaClient.userTeam.findFirst({
            where:{
                userId:userId,
                teamId:teamId
            }
        })
        if(userIsTeam){
            return {error:'Usuário já faz parte da equipe selecionada'}
        }
        try {
            const insert = await prismaClient.userTeam.create({
                data:{
                    userId:userId,
                    teamId:teamId,
                }
            })
            return {sucess:'Adicionado na equipe com sucesso!'}
        } catch (error) {
            return error
        }
    }
}
export { InsertEquipeUserService }