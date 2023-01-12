import { AuthenticationService } from "_/data/usecases/authentication";
import { AuthUseCase } from "_/domain/usecases/authentication";
import { AxiosHttpClient } from "_/infra/http/axiosHttpClient";
import { FirebaseDatabaseRepository } from "_/infra/repositories";
import { FIREBASE_COLLECTION, GITHUB_URL } from "_/presentation/constants";

export const makeAuthService = (): AuthUseCase => {
    const gitAuthHttp = new AxiosHttpClient(GITHUB_URL.AUTH_BASE_URL)
    const gitApiHttp = new AxiosHttpClient(GITHUB_URL.API_BASE_URL)
    const userDbRepository = new FirebaseDatabaseRepository(FIREBASE_COLLECTION.USERS)
    return new AuthenticationService(gitAuthHttp, gitApiHttp, userDbRepository)
}