import { AuthenticationService } from "_/data/usecases/authentication";
import { AuthUseCase } from "_/domain/usecases/authentication";
import { AxiosHttpClient } from "_/infra/http/axiosHttpClient";
import { MongoDatabaseRepository } from "_/infra/repositories/mongoDatabaseRepository";
import { GITHUB_URL, MONGO_COLLECTION } from "_/presentation/constants";

export const makeAuthService = (): AuthUseCase => {
    const gitAuthHttp = new AxiosHttpClient(GITHUB_URL.AUTH_BASE_URL)
    const gitApiHttp = new AxiosHttpClient(GITHUB_URL.API_BASE_URL)
    const userDatabaseRepository = new MongoDatabaseRepository(MONGO_COLLECTION.USERS);
    return new AuthenticationService(gitAuthHttp, gitApiHttp, userDatabaseRepository)
}