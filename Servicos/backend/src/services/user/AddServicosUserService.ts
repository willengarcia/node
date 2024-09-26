import prismaClient from "../../prisma";
interface AddService{
    servicoId: string, 
    description:string, 
    dataTime:string, 
    hora:string,
    userId:string
}
class AddServicosUserService{
    async execute({servicoId, description, dataTime, hora, userId}:AddService){
        if((!servicoId)||(!description)||(!dataTime)||(!hora)){
            return {erro:'Faltou colocar as entradas'}
        }
        try{
            const data = await prismaClient.order.create({
                data:{
                    clientId:userId,
                    serviceId:servicoId,
                    data: dataTime,
                    hota:hora,
                    description:description,
                    status:'PENDING'
                },
                select:{
                    id:true,
                    service:true,
                    description:true,
                    data:true,
                    status:true
                }
            })
            return data
        }catch(err){
            return err
        }
    }
}
export { AddServicosUserService }