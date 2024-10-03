import prismaClient from "../../prisma";
import { OrderStatus } from "@prisma/client"; // Importe o enum correspondente

interface Status {
    status?: OrderStatus;
}

class ListOrdersService {
    async execute({ status }: Status) {
        // Listando pedidos e incluindo dados do serviço
        try {
            const orders = await prismaClient.order.findMany({
                where: {
                    // Se o status for fornecido, faça a filtragem por status, caso contrário, busque todos
                    ...(status ? { status } : {}),
                },
                include: {
                    service: {
                        select: {
                            name: true,
                            description: true,
                        },
                    },
                    client: {
                        select: {
                            name: true,
                        },
                    },
                    employee: {
                        select: {
                            name: true,
                            id: true,
                        },
                    },
                },
                orderBy: {
                    status: "asc", // Ordenação crescente
                },
            });
            return orders;
        } catch (err) {
            return err;
        }
    }
}

export { ListOrdersService };
