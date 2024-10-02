import prismaClient from "../../prisma";
interface InforReview{
    clientId:string
    rating:number
    comment?:string
    orderId:string
}
class AddReviewServices{
    async execute({clientId, rating, comment, orderId}:InforReview){
        const existPedido = await prismaClient.order.findMany({
            where:{
                id:orderId,
            },
        })
        if(!existPedido){
            return {erro:'Pedido não existe!'}
        }
        try {
            const review = await prismaClient.review.create({
                data:{
                    clientId:clientId,
                    rating:rating,
                    comment:comment,
                    orderId:orderId
                },
                select:{
                    rating:true,
                    comment:true
                }
            })
            return review
        } catch (error) {
            return {'Erro:':error}
        }
    }
}
export {AddReviewServices}