import prismaClient from "../../prisma";
interface infoIdUser{
    idUser:string
}
class ListEquipeToUserService {
    async execute({idUser}:infoIdUser) {
        const existIdUserEquipe = await prismaClient.userTeam.findFirst({
            where:{
                userId:idUser
            }
        })
        if(!existIdUserEquipe){
            return {sucess:false, message:'Usuário não está inserido em uma Equipe!'}
        }
        try {
            // Busca todas as equipes com seus ids e dados básicos
            const teams = await prismaClient.userTeam.findMany({
                where:{
                    userId:idUser
                },
                select: {
                    id:true,
                    team:{
                        select:{
                            id:true,
                            name:true,
                            location:true,
                            createdAt:true,
                        }
                    }
                },
            });

            return teams;
        } catch (error) {
            console.error("Erro ao listar equipes e usuários:", error);
            return { error: "Erro ao listar equipes e usuários" };
        }
    }
}

export { ListEquipeToUserService };
