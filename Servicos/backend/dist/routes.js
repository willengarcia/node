"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rotas = void 0;
const express_1 = require("express");
const AddUserController_1 = require("./controller/user/AddUserController");
const AuthUserClientController_1 = require("./controller/user/AuthUserClientController");
const ListUserController_1 = require("./controller/user/ListUserController");
const AddServicosController_1 = require("./controller/servicos/AddServicosController");
const AddServicosUserController_1 = require("./controller/user/AddServicosUserController");
const ListUserFuncioController_1 = require("./controller/user/ListUserFuncioController");
const ListServicosController_1 = require("./controller/servicos/ListServicosController");
const ListServicosClientController_1 = require("./controller/servicos/ListServicosClientController");
const UpdateOrderPedidosController_1 = require("./controller/pedidos/UpdateOrderPedidosController");
const rotas = (0, express_1.Router)();
exports.rotas = rotas;
// Usários
rotas.post('/cadastroUsuario', new AddUserController_1.AddUserController().handle); // cadastra usuario, e no front coloca o tipo
rotas.post('/loginClient', new AuthUserClientController_1.AuthUserClientController().handle); // loga o usuario e no front redireciona por tipo
rotas.post('/listUser', new ListUserFuncioController_1.ListUserFuncioController().handle); // lista os usuários confome o filtro colocado
// Servicos
rotas.post('/createService', new AddServicosUserController_1.AddServicosUserController().handle); // o client cria um serviço
rotas.post('/addServiceFuncio', new AddServicosController_1.AddServicoController().handle); // Adiciona função/cargo do funcionário
rotas.get('/listServiceClient/:id', new ListUserController_1.ListUserController().handle); // lista os servicos pedidos pelo client
rotas.get('/listServices', new ListServicosController_1.ListServicosController().handle);
rotas.get('/orders/:status', new ListServicosClientController_1.ListOrdersController().handle);
// Order
rotas.post('/updateOrder', new UpdateOrderPedidosController_1.UpdateOrderPedidosController().handle);
//# sourceMappingURL=routes.js.map