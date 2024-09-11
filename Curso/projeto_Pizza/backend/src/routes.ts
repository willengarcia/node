import { Router} from "express";
import multer from "multer";
import { CreateUserController } from "./controllers/users/CreateUserController";
import { AuthUserController } from "./controllers/users/AuthUserController";
import { DetailUserController } from "./controllers/users/DetailUserController";
import { isAuthenticated } from "./middlwares/isAuthenticated";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";
import { CreateProductController } from "./controllers/products/CreateProductController";
import uploadConfig from './config/multer'
import { FilterCategoryController } from "./controllers/filter/FilterCategoryController";

const router = Router()
const upload = multer(uploadConfig.upload("./tmp")) // nome do arquivo para salvar a imagem
// ROUTER USER 
router.post('/users', new CreateUserController().handle) // chama o metodo handle da classe CreateUserController, e nela já vai o body, que por sua vez é inserido no metodo execute da classe CreateUserService, usando o interface, e o retorno da classe CreateUserController é o retorno de CreateUserService
router.post('/session', new AuthUserController().handle) // gera o token
router.get('/info', isAuthenticated, new DetailUserController().handle) // quando chamada a rota, chama primeiro o middleware, que pega o token e faz a verrificação, e depois retorna os dados do usuário

// ROUTER CATEGORY
router.post('/categoria', isAuthenticated, new CreateCategoryController().handle) // Cria uma nova categoria, des de que alguém esteja logado
router.get("/list", isAuthenticated, new ListCategoryController().handle) // retorna uma lista de categorias

// ROUTER PRODUCT
router.post('/product', isAuthenticated, upload.single('file'), new CreateProductController().handle) // Cria um novo produto, de acordo com o id da categoria, e a foto é recebida somente com a chave file, e não banner

// ROUTER LISTING PRODUCTS
router.get('/filter', isAuthenticated, new FilterCategoryController().handle)
export {router}