import prismaClient from "../../prisma";
interface infor{
    orderId: string,
    clientId: string,
    urlPix?: string,
    linkPix?: string;
}
class UpdateOrderPagamentoService{
    async execute({orderId, clientId, urlPix, linkPix}:infor){
        const existService = await prismaClient.order.findFirst({
            where:{
                id:orderId
            }
        })
        if(!existService){
            throw new Error('Serviço não encontrado');
        }
        const isConfirmed = await prismaClient.order.findFirst({
            where:{
                id:existService.id,
                status:'CONFIRMED',
                clientId:clientId,
            },
        })
        if(!isConfirmed){
            throw new Error('surto')
        }
        try{
            const update = await prismaClient.order.update({
                where:{
                    id:existService.id,
                    AND:{
                        clientId:clientId,
                    },
                },
                data:{
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
                    urlPix:true,
                    linkPix:true,
                },
            })
            return update
        }catch(err){
            throw new Error('Erro ao inserir a url do pagamento: '+err)
        }


    }
}
export { UpdateOrderPagamentoService }