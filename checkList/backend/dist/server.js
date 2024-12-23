"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router_1 = require("./router");
const cors_1 = __importDefault(require("cors"));
require("dotenv/config"); // Carregar variáveis de ambiente
const app = (0, express_1.default)();
const porta = process.env.PORT || 4000;
// Middleware para permitir CORS
const corsOptions = {
    origin: ['https://checklist-khaki.vercel.app', 'http://localhost:3000'], // Remova a barra final
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    credentials: true, // Permite cookies e credenciais, se necessário
};
app.use((0, cors_1.default)(corsOptions));
// Middleware para processar JSON
app.use(express_1.default.json());
// Defina suas rotas aqui
app.use(router_1.router);
// Iniciar o servidor
app.listen(porta, () => {
    console.log('Server Online!!');
});
//# sourceMappingURL=server.js.map