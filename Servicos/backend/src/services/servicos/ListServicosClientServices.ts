import prismaClient from "../../prisma";

class ListOrdersService {
    async execute() {
        // Ordem desejada dos status
        const statusOrder = ['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELED'];

        // Listando pedidos e incluindo dados do serviço
        const orders = await prismaClient.order.findMany({
            include: {
                service: {
                    select: {
                        name: true,
                        description: true,
                    },
                },
                client:{
                    select:{
                        name:true
                    }
                }
            },
            orderBy: {
                // Ordenando pelo status usando um método alternativo
                status:"asc"
            },
        });

        return orders;
    }
}

export { ListOrdersService };
