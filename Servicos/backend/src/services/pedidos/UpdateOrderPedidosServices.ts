import { Or } from "@prisma/client/runtime/library";
import prismaClient from "../../prisma";
import { OrderStatus } from "@prisma/client";
interface OrderId{
    orderId:string,
    employeeId:string,
    status: OrderStatus
}
class UpdateOrderPedidosService{
    async execute({orderId, employeeId, status}:OrderId){
        const existService = await prismaClient.order.findFirst({
            where:{
                id:orderId
            }
        })
        if(!existService){
            return {erro:'Serviço não existe na base de dados'}
        }
        const existFuncionario = await prismaClient.user.findMany({
            where:{
                role:"EMPLOYEE",
                id:employeeId
            }
        })
        if(!existFuncionario){
            return {erro:'Usuário não foi achado, ou não é funcionário!'}
        }

        try{
            const update = await prismaClient.order.update({
                where:{
                    id:existService.id,
                },
                data:{
                    employeeId:employeeId,
                    status: status
                },
                select:{
                    client:{
                        select:{
                            name:true,
                            email:true,
                            celular:true,
                        },
                    },
                },
            })
            return update
        }catch(err){
            return {erro:err}
        }


    }
}
export { UpdateOrderPedidosService }