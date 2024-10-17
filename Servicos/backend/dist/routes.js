"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rotas = void 0;
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const isAthenticade_1 = require("./middlewares/isAthenticade");
const addUserController_1 = require("./controller/user/addUserController");
const AuthUserClientController_1 = require("./controller/user/AuthUserClientController");
const ListUserController_1 = require("./controller/user/ListUserController");
const AddServicosController_1 = require("./controller/servicos/AddServicosController");
const AddServicosUserController_1 = require("./controller/user/AddServicosUserController");
const ListUserFuncioController_1 = require("./controller/user/ListUserFuncioController");
const ListServicosController_1 = require("./controller/servicos/ListServicosController");
const ListServicosClientController_1 = require("./controller/servicos/ListServicosClientController");
const UpdateOrderPedidosController_1 = require("./controller/pedidos/UpdateOrderPedidosController");
const AddReviewController_1 = require("./controller/avaliacao/AddReviewController");
const ListReviewController_1 = require("./controller/avaliacao/ListReviewController");
const ListOrderToFuncionarioController_1 = require("./controller/servicos/ListOrderToFuncionarioController");
const PutApiPagamento_1 = require("./pagamento/PutApiPagamento");
const GetApiPagamento_1 = require("./pagamento/GetApiPagamento");
const PostApiPagamento_1 = require("./pagamento/PostApiPagamento");
const UpdateOrderPagamentoController_1 = require("./controller/pagamento/UpdateOrderPagamentoController");
const rotas = (0, express_1.Router)();
exports.rotas = rotas;
// Configurar o multer para armazenar em memória
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage: storage });
// Usários
rotas.post('/cadastroUsuario', new addUserController_1.AddUserController().handle); // cadastra usuario, e no front coloca o tipo
rotas.post('/loginClient', new AuthUserClientController_1.AuthUserClientController().handle); // loga o usuario e no front redireciona por tipo
rotas.post('/listUser', isAthenticade_1.isAuthenticated, new ListUserFuncioController_1.ListUserFuncioController().handle); // lista os usuários confome o filtro colocado
// Servicos
rotas.post('/createService', isAthenticade_1.isAuthenticated, upload.single('image'), new AddServicosUserController_1.AddServicosUserController().handle); // o client cria um serviço
rotas.post('/addServiceFuncio', isAthenticade_1.isAuthenticated, new AddServicosController_1.AddServicoController().handle); // Adiciona função/cargo do funcionário
rotas.get('/listServiceClient/:id', isAthenticade_1.isAuthenticated, new ListUserController_1.ListUserController().handle); // lista os servicos pedidos pelo client
rotas.get('/listServices', isAthenticade_1.isAuthenticated, new ListServicosController_1.ListServicosController().handle);
// Order
rotas.post('/updateOrder', isAthenticade_1.isAuthenticated, new UpdateOrderPedidosController_1.UpdateOrderPedidosController().handle); // atulaiza para confirmar pedido
rotas.get('/orders/:status?', isAthenticade_1.isAuthenticated, new ListServicosClientController_1.ListOrdersController().handle); // lista os pedidos por status opcionalmente
rotas.get('/orders/funcionario/:funcionarioId', isAthenticade_1.isAuthenticated, new ListOrderToFuncionarioController_1.ListOrdersToFuncionarioController().handle); // lista os pedidos por status opcionalmente
rotas.post('/updatePagamento', isAthenticade_1.isAuthenticated, new UpdateOrderPagamentoController_1.UpdateOrderPagamentoController().handle);
//Review
rotas.post('/addReview', isAthenticade_1.isAuthenticated, new AddReviewController_1.AddReviewController().handle); // Adiciona uma avaliação
rotas.get('/listReview/:funcionarioId', isAthenticade_1.isAuthenticated, new ListReviewController_1.ListReviewController().handle); // lista as avaliações por funcionário
rotas.get('/returnPagamento', new GetApiPagamento_1.GetApiPagamento().handle);
rotas.put('/createPagamento', new PutApiPagamento_1.PutApiPagamento().handle);
rotas.post('/atualizadoPagamento', new PostApiPagamento_1.PostApiPagamento().handle);
//# sourceMappingURL=routes.js.map