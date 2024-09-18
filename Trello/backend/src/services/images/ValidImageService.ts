import prismaClient from "../../prisma";

interface ValidImage {
  imageId: string;
}

class ValidImageService {
  async execute({ imageId }: ValidImage) {
    console.log(imageId);

    try {
      // Passo 1: Encontrar o UserStore associado à imagem com o id da imagem
      const userStore = await prismaClient.userStore.findFirst({
        where: {
          images: {
            some: {
              id: imageId,
            },
          },
        },
      });

      if (!userStore) {
        throw new Error('UserStore não encontrado para a imagem fornecida.');
      }

      // Passo 2: Atualizar o campo isVerified no UserStore
      const updatedUserStore = await prismaClient.userStore.update({
        where: {
          id: userStore.id, // Usar o id do UserStore encontrado
        },
        data: {
          isVerified: true,
        },
        select: {
          isVerified: true,
        },
      });

      return updatedUserStore;
    } catch (error) {
      console.error("Erro ao atualizar o UserStore:", error.message);
      throw new Error(error.message || "Erro ao atualizar o UserStore");
    }
  }
}

export { ValidImageService };
