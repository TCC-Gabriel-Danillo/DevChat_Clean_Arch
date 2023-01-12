import { UserService } from "_/data/usecases/user";
import { UsersUseCase } from "_/domain/usecases/users";
import { FirebaseDatabaseRepository } from "_/infra/repositories";
import { FIREBASE_COLLECTION } from "_/presentation/constants";

export const makeUserService = (): UsersUseCase => {
    const usesDatabaseRepository = new FirebaseDatabaseRepository(FIREBASE_COLLECTION.USERS); 
    return new UserService(usesDatabaseRepository)
}