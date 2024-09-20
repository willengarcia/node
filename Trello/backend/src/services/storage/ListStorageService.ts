import prismaClient from "../../prisma";
class ListStorageService{
    async execute(){
        let userWithStore = await prismaClient.store.findMany({
            include:{
                users:true
            },
        })
        // Processamento manual para ordenar por número
        userWithStore = userWithStore.sort((a, b) => {
            const numA = parseInt(a.name.replace(/\D/g, ''), 10); // Extrai números de a.name
            const numB = parseInt(b.name.replace(/\D/g, ''), 10); // Extrai números de b.name
            return numA - numB; // Ordena de forma crescente
        });
      
        return userWithStore
    }
}
export {ListStorageService}