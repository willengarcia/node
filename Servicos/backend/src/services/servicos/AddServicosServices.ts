import prismaClient from "../../prisma";

interface AddServicos {
    name: string;
    description: string;
    price: number;
    funcionarioID: string;
}

class AddServicosServices {
    async execute({ name, description, price, funcionarioID }: AddServicos) {
        try {
            // Verifica se o funcionário existe
            const employee = await prismaClient.user.findUnique({
                where: { id: funcionarioID },
            });
            console.log(employee.role)
            if (!employee || employee.role !== 'EMPLOYEE') {
                throw new Error('Employee not found or not an EMPLOYEE.');
            }

            // Cria o serviço associado ao funcionário
            const newService = await prismaClient.service.create({
                data: {
                    name,
                    description,
                    price,
                    employeeId: funcionarioID,
                },
            });

            return newService; // Retorna o serviço criado
        } catch (error) {
            console.error(error);
            throw new Error('An error occurred while creating the service: '+error);
        }
    }
}

export { AddServicosServices };
