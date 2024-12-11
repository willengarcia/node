import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import {sign} from "jsonwebtoken" // Gerar token
interface Auth {
    email: string;
    password: string;
}

class AuthUserService {
    async execute({ email, password }: Auth) {
        // Buscar usuário pelo e-mail
        const user = await prismaClient.user.findFirst({
            where: {
                email: email,
            },
        });

        // Verificar se o usuário existe
        if (!user) {
            return { success: false, error: "Usuário não encontrado!" };
        }

        // Comparar senha fornecida com a senha armazenada
        const passwordMatch = await compare(password, user.password);
        if (!passwordMatch) {
            return { success: false, error: "Senha incorreta!" };
        }

        // Validar a existência da variável de ambiente JWT
        const jwtSecret = process.env.JWT;
        if (!jwtSecret) {
            throw new Error("A variável de ambiente JWT não está definida.");
        }

        // Gerar token JWT
        const token = sign(
            {
            name: user.name, // dados do payload
            email:user.email
        }, process.env.JWT, { // chave secreta
            subject: user.id,
            expiresIn:'30d' // expira em 30 dias
        })

        // Retornar o token e informações do usuário
        return {
            success: true,
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        };
    }
}

export { AuthUserService };
