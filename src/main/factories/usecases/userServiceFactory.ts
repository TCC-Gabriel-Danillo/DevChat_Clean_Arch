import { UserService } from "_/data/usecases/user";
import { UsersUseCase } from "_/domain/usecases/users";
import { MongoDatabaseRepository } from "_/infra/repositories/mongoDatabaseRepository";
import { MONGO_COLLECTION } from "_/presentation/constants";

export const makeUserService = (): UsersUseCase => {
    const usesDatabaseRepository = new MongoDatabaseRepository(MONGO_COLLECTION.USERS); 
    return new UserService(usesDatabaseRepository)
}