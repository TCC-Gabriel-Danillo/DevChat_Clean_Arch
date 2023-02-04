import { User } from "_/domain/models";
import { UsersUseCase } from "_/domain/usecases/users";
import { DatabaseUserDto, mapDatabaseUserToUser } from "../protocols/dto/database";
import { DatabaseRepository } from "../protocols/repositories/databaseRepository";
import { OP } from "../protocols/repositories/options";


export class UserService implements UsersUseCase {

    constructor(private readonly userDatabaseRepository: DatabaseRepository){}

    async listUsersByTech(tech: string): Promise<User[]> {
        const filterArgs = {
            field: "techs", 
            op: OP.CONTAINS, 
            value: tech
        }
        const databaseUsers  = await this.userDatabaseRepository.getAll<DatabaseUserDto>({ filterArgs })
        return databaseUsers.map(databaseUser => mapDatabaseUserToUser(databaseUser)); 
    }
}