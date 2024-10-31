import prismaClient from "../../prisma";

class ListEquipeService {
    async execute() {
        try {
            // Busca todas as equipes com seus ids e dados básicos
            const teams = await prismaClient.team.findMany({
                select: {
                    id: true,
                    name: true,
                    location: true,
                    createdAt: true,
                },
            });

            // Itera sobre cada equipe para buscar os userTeams associados
            const teamsWithUserIds = await Promise.all(
                teams.map(async (team) => {
                    const userTeams = await prismaClient.userTeam.findMany({
                        where: {
                            teamId: team.id,
                        },
                        select: {
                            id: true, // ID do UserTeam
                            userId: true, // ID do usuário associado
                        },
                    });

                    return { 
                        teamId: team.id, // ID da equipe
                        teamName: team.name, 
                        teamLocation: team.location,
                        userTeams: userTeams.map((userTeam) => ({
                            userTeamId: userTeam.id,
                            userId: userTeam.userId
                        })),
                    };
                })
            );

            return teamsWithUserIds;
        } catch (error) {
            console.error("Erro ao listar equipes e usuários:", error);
            return { error: "Erro ao listar equipes e usuários" };
        }
    }
}

export { ListEquipeService };
