
import { HttpClient } from "_/data/protocols/http/httpClient"
import { DatabaseRepository } from "_/data/protocols/repositories/databaseRepository"
import { AuthenticationService } from "_/data/usecases/authentication"
import { AuthUseCase } from "_/domain/usecases/authentication"
import { AxiosHttpClient } from "_/infra/http/axiosHttpClient"
import { GITHUB_URL } from "_/presentation/constants"
import * as gitMock from "../../mocks/http/github"
import { DatabaseRepositoryStub } from "../../mocks/stubs"


type SutTypes = {
    authService: AuthUseCase
} 

const makeSut = (): SutTypes  => {
    const gitApiHttp = new AxiosHttpClient(GITHUB_URL.API_BASE_URL)
    const gitAuthHttp = new AxiosHttpClient(GITHUB_URL.AUTH_BASE_URL)
    const userDbRepositoryStub = new DatabaseRepositoryStub()
    const authService = new AuthenticationService(gitAuthHttp, gitApiHttp, userDbRepositoryStub)

    return { authService }
}

describe('authService', () => {

    beforeAll(() => {
        gitMock.mockAuthTokenRequest()
        gitMock.mockReposRequest()
        gitMock.mockUserRequest()
    })

    it("should return a user", async () => {

        const { authService } = makeSut()

        const credentials = {
            code: "any_code",
            client_id: "any_client_id",
            client_secret: "any_client_secret"
        }
        const user = await authService.authenticateGithub(credentials)
        expect(user).toEqual({
            email: "email",
            id: "id",
            photoUrl: "url",
            username: "username",
            techs: ["language1"]
        })
    })

    it("should return empty if auth token request returns empty", async () => {
        gitMock.mockAuthTokenRequestEmpty()

        const { authService } = makeSut()

        const credentials = {
            code: "any_code",
            client_id: "any_client_id",
            client_secret: "any_client_secret"
        }
        const user = await authService.authenticateGithub(credentials)

        expect(user).toBeFalsy()
    })

    it("should return empty if repositories request returns empty", async () => {
        gitMock.mockReposRequestEmpty()
        gitMock.mockAuthTokenRequest()
        gitMock.mockUserRequest()

        const { authService } = makeSut()

        const credentials = {
            code: "any_code",
            client_id: "any_client_id",
            client_secret: "any_client_secret"
        }
        const user = await authService.authenticateGithub(credentials)

        expect(user).toBeFalsy()
    })

    it("should throw an error if repo request returns 401", async () => {
        gitMock.mockReposRequestForbidden()
        gitMock.mockAuthTokenRequest()
        gitMock.mockUserRequest()
        
        const { authService } = makeSut()

        const credentials = {
            code: "any_code",
            client_id: "any_client_id",
            client_secret: "any_client_secret"
        }
        const user = authService.authenticateGithub(credentials)

        await expect(user).rejects.toThrow()
    })
})