import { Router } from "express";
import multer from "multer";
import { isAuthenticated } from "./middlewares/isAthenticade";
import { AddUserController } from "./controller/user/AddUserController";
import { AuthUserClientController } from "./controller/user/AuthUserClientController";
import { ListUserController } from "./controller/user/ListUserController";
import { AddServicoController} from "./controller/servicos/AddServicosController";
import { AddServicosUserController } from "./controller/user/AddServicosUserController";
import { ListUserFuncioController } from "./controller/user/ListUserFuncioController";
import { ListServicosController } from "./controller/servicos/ListServicosController";
import { ListOrdersController } from "./controller/servicos/ListServicosClientController";
import { UpdateOrderPedidosController } from "./controller/pedidos/UpdateOrderPedidosController";
const rotas = Router()

// Usários
rotas.post('/cadastroUsuario', new AddUserController().handle) // cadastra usuario, e no front coloca o tipo
rotas.post('/loginClient', new AuthUserClientController().handle) // loga o usuario e no front redireciona por tipo
rotas.post('/listUser', new ListUserFuncioController().handle) // lista os usuários confome o filtro colocado

// Servicos
rotas.post('/createService', new AddServicosUserController().handle) // o client cria um serviço
rotas.post('/addServiceFuncio', new AddServicoController().handle) // Adiciona função/cargo do funcionário
rotas.get('/listServiceClient/:id', new ListUserController().handle) // lista os servicos pedidos pelo client
rotas.get('/listServices', new ListServicosController().handle)
rotas.get('/orders/:status?', new ListOrdersController().handle);

// Order
rotas.post('/updateOrder', new UpdateOrderPedidosController().handle)
export {rotas}