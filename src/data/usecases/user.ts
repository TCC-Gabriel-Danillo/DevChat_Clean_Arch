import { User } from "_/domain/models";
import { UsersUseCase } from "_/domain/usecases/users";
import { FirebaseUserDto, mapFirebaseToUser } from "../protocols/dto/firebase";
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
        const fUsers  = await this.userDatabaseRepository.getAll<FirebaseUserDto>({ filterArgs })
        return fUsers.map(fUser => mapFirebaseToUser(fUser)); 
    }
}