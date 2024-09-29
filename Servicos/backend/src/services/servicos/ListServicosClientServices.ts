import prismaClient from "../../prisma";
import { OrderStatus } from "@prisma/client"; // Importe o enum correspondente

interface Status {
    status?: OrderStatus; // Use o tipo de enum em vez de string
}

class ListOrdersService {
    async execute({ status }: Status) {
        try {
            const orders = await prismaClient.order.findMany({
                where: {
                    ...(status && { status }), // Usando o enum diretamente
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
                    status: "asc",
                },
            });
            return orders;
        } catch (err) {
            return err;
        }
    }
}

export { ListOrdersService };
