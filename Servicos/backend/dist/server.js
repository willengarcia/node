"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./routes");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000', // Remova a barra final
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(express_1.default.json());
app.use(routes_1.rotas);
app.use((err, req, res, next) => {
    if (err instanceof Error) {
        // se for uma instancia do tipo erro
        return res.status(400).json({
            error: err.message
        });
    }
    return res.status(500).json({
        status: 'error',
        message: 'Erro Interno'
    });
});
app.listen(3333, () => { console.log('Servidor Online'); });
//# sourceMappingURL=server.js.map