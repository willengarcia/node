import { Router } from "express";
import multer from "multer";
import { isAuthenticated } from "./middlewares/isAthenticade";
import { AddUserController } from "./controller/user/addUserController";
import { AuthUserClientController } from "./controller/user/AuthUserClientController";
import { ListUserController } from "./controller/user/ListUserController";
import { AddServicoController} from "./controller/servicos/AddServicosController";
import { AddServicosUserController } from "./controller/user/AddServicosUserController";
import { ListUserFuncioController } from "./controller/user/ListUserFuncioController";
import { ListServicosController } from "./controller/servicos/ListServicosController";
import { ListOrdersController } from "./controller/servicos/ListServicosClientController";
import { UpdateOrderPedidosController } from "./controller/pedidos/UpdateOrderPedidosController";
import { AddReviewController } from "./controller/avaliacao/AddReviewController";
import { ListReviewController } from "./controller/avaliacao/ListReviewController";
import { ListOrdersToFuncionarioController } from "./controller/servicos/ListOrderToFuncionarioController";
import { Payment } from "mercadopago";
import { PutApiPagamento } from "./pagamento/PutApiPagamento";
import { GetApiPagamento } from "./pagamento/GetApiPagamento";
import { PostApiPagamento } from "./pagamento/PostApiPagamento";
const rotas = Router()

// Configurar o multer para armazenar em memória
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Usários
rotas.post('/cadastroUsuario', new AddUserController().handle) // cadastra usuario, e no front coloca o tipo
rotas.post('/loginClient', new AuthUserClientController().handle) // loga o usuario e no front redireciona por tipo
rotas.post('/listUser', isAuthenticated, new ListUserFuncioController().handle) // lista os usuários confome o filtro colocado

// Servicos
rotas.post('/createService', isAuthenticated, upload.single('image'), new AddServicosUserController().handle) // o client cria um serviço
rotas.post('/addServiceFuncio', isAuthenticated, new AddServicoController().handle) // Adiciona função/cargo do funcionário
rotas.get('/listServiceClient/:id', isAuthenticated, new ListUserController().handle) // lista os servicos pedidos pelo client
rotas.get('/listServices', isAuthenticated, new ListServicosController().handle)

// Order
rotas.post('/updateOrder', isAuthenticated, new UpdateOrderPedidosController().handle) // atulaiza para confirmar pedido
rotas.get('/orders/:status?', isAuthenticated, new ListOrdersController().handle); // lista os pedidos por status opcionalmente
rotas.get('/orders/funcionario/:funcionarioId', isAuthenticated, new ListOrdersToFuncionarioController().handle); // lista os pedidos por status opcionalmente

//Review
rotas.post('/addReview', isAuthenticated, new AddReviewController().handle) // Adiciona uma avaliação
rotas.get('/listReview/:funcionarioId', isAuthenticated, new ListReviewController().handle) // lista as avaliações por funcionário

rotas.get('/returnPagamento', isAuthenticated, new GetApiPagamento().handle)
rotas.put('/createPagamento', isAuthenticated, new PutApiPagamento().handle)
rotas.post('/atualizadoPagamento', isAuthenticated, new PostApiPagamento().handle)
export {rotas}