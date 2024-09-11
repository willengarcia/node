import { Response, Request } from "express";
import { CreateProductService } from "../../services/products/CreateProductService";

class CreateProductController{
    async handle(req: Request, res:Response){

        const {name, price, description, category_id} = req.body;

        const createProductService = new CreateProductService()
        if(!req.file){
            throw new Error('Erro ao colocar a imagem')
        }else{
            const {filename:banner} = req.file
            const items = await createProductService.execute({name, price, description, banner, category_id})

            return res.json(items)
        }

        

    }
}
export {CreateProductController}
