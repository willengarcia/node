import prismaClient from "../../prisma";

class ListServicosService {
    async execute(): Promise<{ name: string; id: string; price: number; employeeId: string }[]> {
        try {
            const servicos = await prismaClient.service.findMany({
                select: {
                    name: true,
                    id: true,
                    price: true,
                    employeeId: true
                }
            });
            return servicos;
        } catch (err) {
            // Lançar um erro para que o controlador possa tratar
            throw new Error(`Erro ao listar serviços: ${err.message}`);
        }
    }
}

export { ListServicosService };
