"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = isAuthenticated;
const jsonwebtoken_1 = require("jsonwebtoken");
function isAuthenticated(req, res, next) {
    console.log('Chamou esse Middleware');
    // Receber o Token
    const authToken = req.headers.authorization;
    if (!authToken) {
        return res.status(401).end(); // barra o usuário
    }
    const [, token] = authToken.split(' ');
    console.log('Token: ' + token);
    try {
        // validar o token
        const { sub } = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET); // argumentos: token do usuário, chave que eu coloquei e retorna o id do banco de dados
        // recuperar o ID do token e colocar dentro de uma variável e colocar dentro do Request
        req.userId = sub;
        return next();
    }
    catch (err) {
        return res.status(401).end();
    }
}
//# sourceMappingURL=isAuthenticated.js.map