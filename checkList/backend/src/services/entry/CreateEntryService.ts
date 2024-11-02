import cloudinary from "../../config/cloudinary";
import prismaClient from "../../prisma";
import { Readable } from 'stream';
interface infoEntry{
    categoryId:string, 
    title:string, 
    value:number, 
    description:string,
    imageBuffer?:Buffer
}
class CreateEntryService{
    async execute({categoryId, title, value, description, imageBuffer}:infoEntry){
        const existCategory = await prismaClient.category.findFirst({
            where:{
                id:categoryId
            }
        })
        if(!existCategory){
            return {sucess:false, message:'Categoria não existe!'}
        }
        const existTitle = await prismaClient.entry.findFirst({
            where:{
                categoryId:categoryId,
                title:title,
            },
        })
        if(existTitle){
            return {sucess:false, message:'Titulo para essa Categoria já existe!'}
        }
        try {
            let imageUrl: string | undefined;

            if (imageBuffer) {
                imageUrl = await new Promise<string>((resolve, reject) => {
                    const uploadStream = cloudinary.uploader.upload_stream({
                        resource_type: 'image',
                    }, (error, result) => {
                        if (error) return reject(error);
                        resolve(result?.secure_url || '');
                    });

                    const stream = Readable.from([imageBuffer]);
                    stream.pipe(uploadStream).on('error', (error) => reject(error));
                });
            }

            const execute = await prismaClient.entry.create({
                data:{
                    categoryId:categoryId,
                    title:title,
                    value:value,
                    description:description,
                    imageUrl:imageUrl
                },
                select:{
                    title:true,
                    value:true,
                    description:true,
                },
            })
            return execute
        } catch (error) {
            return {sucess:false, message:error}
        }
    }
}
export { CreateEntryService }