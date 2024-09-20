import prismaClient from "../../prisma";
class ListStorageService{
    async execute(){
        let userWithStore = await prismaClient.store.findMany({
            include:{
                users:true
            },
            orderBy: {
                name: 'asc' // Ordena alfabéticamente, mas você pode sobrescrever depois
            }
        })
        // Processamento manual para ordenar por número
        userWithStore = userWithStore.sort((a, b) => {
            const numA = parseInt(a.name.replace(/\D/g, ''), 10); // Remove as letras e pega os números
            const numB = parseInt(b.name.replace(/\D/g, ''), 10);
            return numA - numB;
        });
  
        return userWithStore
    }
}
export {ListStorageService}