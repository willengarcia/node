import prismaClient from "../../prisma";

interface CreateStorage {
  name: string;
  location?: string;
  userId: string; // ID do usuário que será associado à loja
}

class CreateStorageService {
  async execute({ name, location, userId }: CreateStorage) {
    // Validação básica
    if (!name) {
      throw new Error('Erro ao inserir o nome');
    }

    // Validação do userId
    if (!userId) {
      throw new Error('Erro ao inserir o ID do usuário');
    }

    // Criar a loja e associar o usuário diretamente
    const store = await prismaClient.store.create({
      data: {
        name: name,
        location: location,
        users: {
          connect: [{ id: userId }], // Corrigido: Passa um array para `connect`
        },
      },
      select: {
        id: true,
        name: true,
        location: true,
      },
    });

    // Retorna a loja criada com os dados selecionados
    return store;
  }
}

export { CreateStorageService };
