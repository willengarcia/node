import { Router } from "express";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { isAuthenticated } from "./middlwares/isAuthenticated";
import { CreateStorageController } from "./controllers/storage/CreateStorageController";
import { ListStorageController } from "./controllers/storage/ListStorageController";
import { UpdateStorageController } from "./controllers/storage/UpdateStorageController";
import { AddImagesController } from "./controllers/images/AddImagesController";
import { ListImagesController } from "./controllers/images/ListImagesController";
import { ValidImageController } from "./controllers/images/ValidImageController";
import { ListUserController } from "./controllers/user/ListUserController";
import { UpdateUserController } from "./controllers/user/UpdateUserController";
import cloudinary from './config/cloudinary';
import multer from 'multer';

// Configurar o multer
const upload = multer({ dest: 'tmp/' }); // O destino pode ser qualquer pasta temporária

const router = Router();

// ROTA USUÁRIO
router.post('/cadastrar/usuario', new CreateUserController().handle);
router.post('/login', new AuthUserController().handle);
router.get('/list/user', isAuthenticated, new ListUserController().handle);
router.put('/update/user/:userId', isAuthenticated, new UpdateUserController().handle);

// ROTA LOJA
router.post('/cadastrar/loja', isAuthenticated, new CreateStorageController().handle);
router.get('/listar/loja', isAuthenticated, new ListStorageController().handle);
router.post('/update/user_loja', isAuthenticated, new UpdateStorageController().handle);

// ROTA IMAGENS
router.post('/add/imagens', isAuthenticated, upload.single('file'), async (req, res) => {
    try {
        const { userId, storeId } = req.body;
        const file = req.file;

        if (!file) {
            return res.status(400).json({ error: 'Arquivo não encontrado.' });
        }

        // Upload direto para o Cloudinary usando a stream
        const uploadResponse = await cloudinary.uploader.upload_stream((error, result) => {
            if (error) {
                return res.status(500).json({ error: error.message });
            }
            return result; // Retorna o resultado do upload
        });

        const stream = require('stream');
        const bufferStream = new stream.PassThrough();
        bufferStream.end(file.buffer); // file.buffer deve conter os dados do arquivo

        bufferStream.pipe(uploadResponse);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/list/imagens', isAuthenticated, new ListImagesController().handle);
router.put('/list/imagens/validate/:id', isAuthenticated, new ValidImageController().handle);

export { router };
