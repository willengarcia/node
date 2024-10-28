import prismaClient from "../../prisma";

interface superUser {
    userId: string;
}

class UpdateUserService {
    async execute({ userId }: superUser) {
        // Busca o usuário para verificar o valor atual de superUser
        const user = await prismaClient.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                superUser: true,
            },
        });

        // Se o usuário não for encontrado, lança um erro
        if (!user) {
            throw new Error('Usuário não encontrado');
        }

        // Alterna o valor de superUser (se true vira false, se false vira true)
        const updatedUser = await prismaClient.user.update({
            where: {
                id: userId,
            },
            data: {
                superUser: !user.superUser, // Inverte o valor atual de superUser
            },
        });

        return updatedUser;
    }
}

export { UpdateUserService };
