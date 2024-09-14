// Configura oq onde e como salvar uma imagem
import crypto from 'crypto';
import multer from "multer";
import {extname, resolve} from 'path';

export default{
    upload(folder:string){ // define qual o nome da pasta que vai salvar 
        return {
            storage: multer.diskStorage({
                destination:resolve(__dirname, '..', '..', folder), // dirname: diretorio que a gente está, '..' volta uma pasta, e por fim a pasta
                filename:(request, file, callback)=>{
                    const fileHash = crypto.randomBytes(16).toString("hex")
                    const fileName = `${fileHash}-${file.originalname}`
                    return callback(null, fileName)
                }
            })
        }
    }
}