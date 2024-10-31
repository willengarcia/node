import prismaClient from "../../prisma";

interface infoCheck {
    name: string;
    teamId: string;
    userTeamId: string;
}

class CreateChecklistService {
    async execute({ name, teamId, userTeamId }: infoCheck) {
        try {
            // Verificar se o teamId e o userTeamId existem
            const teamExists = await prismaClient.team.findUnique({
                where: { id: teamId }
            });

            const userExists = await prismaClient.userTeam.findUnique({
                where: { id: userTeamId }
            });

            if (!teamExists) {
                return { success: false, error: "O ID da equipe não existe. TeamId: " + teamId};
            }

            if (!userExists) {
                return { success: false, error: "O ID do usuário não existe. UserTeamId: " + userTeamId};
            }

            // Criar o checklist se ambos os IDs forem válidos
            const checklist = await prismaClient.checklist.create({
                data: {
                    name: name,
                    teamId: teamId,
                    userTeamId: userTeamId,
                },
                select: {
                    name: true,
                }
            });
            return { success: true, checklist };
        } catch (error) {
            console.error("Erro ao criar checklist:", error);
            return { success: false, error: "Erro ao criar checklist" };
        }
    }
}

export { CreateChecklistService };
