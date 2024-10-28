"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateEquipeController = void 0;
const CreateEquipeServices_1 = require("../../services/equipe/CreateEquipeServices");
class CreateEquipeController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, location } = req.body;
            if ((!name) || (!location)) {
                return res.status(401).json({ error: 'Atributos undefined' });
            }
            try {
                const createEquipeService = new CreateEquipeServices_1.CreateEquipeService();
                const execute = createEquipeService.execute({ name, location });
                res.status(201).json(execute);
            }
            catch (error) {
                res.status(500).json({ error: 'Erro ao criar equipe' });
            }
        });
    }
}
exports.CreateEquipeController = CreateEquipeController;
//# sourceMappingURL=CreateEquipeController.js.map