import prismaClient from "../../prisma"; // importando para ter acesso ao banco de dados
import { hash } from "bcryptjs";
interface UserRequest{
    name: string;
    email:string;
    password:string;
} // recebe do CreateUserController, se não passar os dados, vai dar erro
class CreateUserService{
    async execute({name, email, password}:UserRequest){
        
        //verificar se enviou o email
        if(!email){
            throw new Error('Email esta´ incorreto')
        }
        // verificar se o email já está cadastrado na plataforma
        const userAlreadyExists = await prismaClient.user.findFirst({
            where:{
                email:email // o metodo findFirst busca se há alguem igual 
            }
        })
        if(userAlreadyExists){
            throw new Error(`Usuário com esse email: ${email} já existe!`)
        }
        // Se passou de todas as condições, é só fazer o cadastro
        const passwordHash = await hash(password, 8) // variável a ser criptografada, e o salto da criptografia
        const user = await prismaClient.user.create({
            data:{ // o que eu quero inserir
                name:name,
                email:email,
                password:passwordHash, // senha criptografada
            },
            select:{ // o que eu quero devolver
                id:true,
                name:true,
                email:true,
            }
        })

        return user
    }
}
export {CreateUserService}

// o interface é como uma requisição que tem como colocar em um metodo, e quando chamada, tem que haver o que tiver dentro de interface

// aui é onde faz a comunição com o banco de dados