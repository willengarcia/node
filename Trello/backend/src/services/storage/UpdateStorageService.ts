import prismaClient from "../../prisma";

interface AddUserToStore {
  storeId: string; // ID da loja à qual o usuário será adicionado
  userId: string;  // ID do usuário que será adicionado à loja
}

class UpdateStorageService {
  async execute({ storeId, userId }: AddUserToStore) {
    console.log(storeId, userId)
    // Verificar se a loja existe
    if (!storeId || !userId) {
      throw new Error('O ID da loja e do usuário são obrigatórios');
    }

    const store = await prismaClient.store.findUnique({
      where: {
        id: storeId, // Passar o ID corretamente
      },
    });

    if (!store) {
      throw new Error('Loja não encontrada');
    }

    // Verificar se o usuário existe
    const user = await prismaClient.user.findUnique({
      where: {
        id: userId, // Passar o ID corretamente
      },
    });

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    // Adicionar o usuário à loja na tabela intermediária
    const userStoreRelation = await prismaClient.userStore.create({
      data: {
        userId: userId,
        storeId: storeId,
      },
    });

    return userStoreRelation;
  }
}

export { UpdateStorageService };
