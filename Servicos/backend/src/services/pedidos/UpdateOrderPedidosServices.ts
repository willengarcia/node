import { link } from "fs";
import prismaClient from "../../prisma";
interface OrderId{
    orderId:string,
    employeeId:string,
    status: "PENDING" | "CONFIRMED" | "CANCELED" | "CONCLUID",
    urlPix?: string,
    linkPix?: string;
}
class UpdateOrderPedidosService{
    async execute({orderId, employeeId, status, urlPix, linkPix}:OrderId){
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
                    status: status as any,
                    linkPix:linkPix,
                    urlPix:urlPix,
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
            throw new Error(err)
        }


    }
}
export { UpdateOrderPedidosService }