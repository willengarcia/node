import prismaClient from "../../prisma";
interface Status{
    funcionarioId: string
}
class ListOrdersToFuncionarioService {
    async execute({funcionarioId}:Status) {
        // Listando pedidos e incluindo dados do serviço
        try{
        
            const orders = await prismaClient.order.findMany({
                where:{
                    employeeId:funcionarioId,
                },
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
                    status:"asc",
                },
            });
            return orders
        }catch(err){
            return err
        }
    }
}

export { ListOrdersToFuncionarioService };
