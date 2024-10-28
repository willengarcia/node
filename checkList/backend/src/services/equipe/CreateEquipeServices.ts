import prismaClient from "../../prisma";
interface infoTeam{
    name:string,
    location:string,
}
class CreateEquipeService{
    async execute({name, location}:infoTeam){
        try {
            const team = await prismaClient.team.create({
                data: {
                    name,
                    location,
                },
            });
            return team
        } catch (error) {
            return error
        }
    }
}
export {CreateEquipeService}