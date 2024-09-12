import prismaClient from "../../prisma";

interface CreateStorage {
  name: string;
  location?: string;
  userId?: string; // `userId` agora é opcional
}

class CreateStorageService {
  async execute({ name, location, userId }: CreateStorage) {
    // Validação básica
    if (!name) {
      throw new Error('Erro ao inserir o nome');
    }

    // Criar a loja
    const store = await prismaClient.store.create({
      data: {
        name: name,
        location: location,
      },
      select: {
        id: true,
        name: true,
        location: true,
        users:{
          select:{
            id:true,
            user:{
              select:{
                id:true,
                name:true,
              },
            },
          },
        },
      },
    });

    // Se `userId` for fornecido, adiciona a conexão com o usuário através da tabela intermediária
    if (userId) {
      await prismaClient.userStore.create({
        data: {
          user: { connect: { id: userId } },
          store: { connect: { id: store.id } },
        },
      });
    }

    // Retorna a loja criada
    return store;
  }
}

export { CreateStorageService };
