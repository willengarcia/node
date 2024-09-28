import prismaClient from "../../prisma";
interface Status{
    status?: string
}
class ListOrdersService {
    async execute({status}:Status) {
        // Listando pedidos e incluindo dados do serviço
        try{
        
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
                    },
                    employee:{
                        select:{
                            name:true,
                            id:true,
                        },
                    },
                },
                orderBy: {
                    // Ordenando pelo status usando um método alternativo
                    status:status as any??"asc",
                },
            });
            return orders
        }catch(err){
            return err
        }
    }
}

export { ListOrdersService };
