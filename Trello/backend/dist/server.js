"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router_1 = require("./router");
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: 'https://seu-frontend.com', // Substitua pelo domínio do seu front-end
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(router_1.router);
app.use('/files', express_1.default.static(path_1.default.resolve(__dirname, '..', 'tmp'))); // criar uma rota estática para exibir as fotos
app.listen(process.env.PORT, () => { console.log('Server Online!!'); });
//# sourceMappingURL=server.js.map