import prismaClient from "../../prisma";
interface ReviewId{
    funcionarioId:string
}
class ListReviewService{
    async execute({funcionarioId}:ReviewId){

        try {
            const reviewsForEmployee = await prismaClient.review.findMany({
                where: {
                  order: {
                    employeeId: funcionarioId, // Filtra pelo funcionário
                  },
                },
                include: {
                  client: true,  // Inclui informações do cliente
                  order: {
                    include: {
                      service: true,  // Inclui informações do serviço
                    },
                  },
                },
            });
            return reviewsForEmployee
        } catch (error) {
            throw new Error('Erro '+error)
        }
    }
}
export { ListReviewService }