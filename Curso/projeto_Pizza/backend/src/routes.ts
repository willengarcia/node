import { Router} from "express";
import { CreateUserController } from "./controllers/users/CreateUserController";
import { AuthUserController } from "./controllers/users/AuthUserController";

const router = Router()
// ROUTER USER 
router.post('/users', new CreateUserController().handle) // chama o metodo handle da classe CreateUserController, e nela já vai o body, que por sua vez é inserido no metodo execute da classe CreateUserService, usando o interface, e o retorno da classe CreateUserController é o retorno de CreateUserService

router.post('/session', new AuthUserController().handle)
export {router}