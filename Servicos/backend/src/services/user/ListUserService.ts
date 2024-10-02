import prismaClient from "../../prisma";
interface UserId{
    id:string
}
class ListUserService{
    async execute({id}:UserId){
        const validar = await prismaClient.user.findFirst({
            where:{
                id:id
            }
        })
        if(!validar){
            return {'error':'Usuário não encontrado!'}
        }
        try{
            const userPedidosFeitos = await prismaClient.user.findFirst({
                where: {
                  id: validar.id,  // O ID do usuário que fez os pedidos
                },
                select: {
                  ordersAsClient: {
                    select: {
                      id: true,
                      service: {
                        select: {
                          name: true,
                          description: true,
                          price:true,
                        },
                      },
                      employee: {
                        select: {
                          name: true,
                          email: true
                        },
                      },
                      status: true,
                      createdAt: true,
                      updatedAt: true,
                    },
                  },
                },
            });
            return userPedidosFeitos
        }catch(err){
            err
        }
    }
}
export {ListUserService}