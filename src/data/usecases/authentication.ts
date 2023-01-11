import { mapUserToFirebaseUser } from "_/data/protocols/dto/firebase";
import { GitRepository, GitTokenDto, GitUser, mapGitUserToUser } from "_/data/protocols/dto/git";
import { HttpClient } from "_/data/protocols/http/httpClient";
import { DatabaseRepository } from "_/data/protocols/repositories/databaseRepository";
import { User } from "_/domain/models";
import { AuthUseCase, Credentials } from "_/domain/usecases/authentication";

export class Authentication implements AuthUseCase {
  constructor(
        private readonly gitAuthHttp: HttpClient,
        private readonly gitApiHttp: HttpClient,
        private readonly userDatabaseRepository: DatabaseRepository
    ) { }

    async authenticateGithub(credentials: Credentials): Promise<User | undefined> {
        const tokenResponse = await this.exchangeCredentials(credentials)
        if (!tokenResponse) return

        const { access_token } = tokenResponse

        const [gitUser, gitRepos] = await Promise.all([
            this.getUserInfo(access_token),
            this.getUserRepos(access_token)
        ])

        if (!gitUser || !gitRepos) return

        const techs = this.getTechsInfoFromGitRepos(gitRepos)

        const newUser = mapGitUserToUser(gitUser, techs)
        await this.createUserIfNotExists(newUser)
        return newUser
    }

    async exchangeCredentials(credentials: Credentials) {
        return this.gitAuthHttp.post<GitTokenDto>('/access_token', credentials, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
    }

    async getUserInfo(token: string): Promise<GitUser | undefined> {
        return this.gitApiHttp.get<GitUser>('/user', {
            headers: { authorization: `Bearer ${token}` }
        });
    }

    async getUserRepos(token: string): Promise<GitRepository[] | undefined> {
        return this.gitApiHttp.get<GitRepository[]>('/user/repos', {
            headers: { authorization: `Bearer ${token}` }
        });
    }

    getTechsInfoFromGitRepos(repos: GitRepository[]): string[] {
        const techs: Array<string> = []
        repos.forEach(repo => {
            const isNewTech = !techs.find((tech) => repo.language == tech)
            if (isNewTech && repo.language) {
                techs.push(repo.language)
            }
        })
        return techs
    }

    async createUserIfNotExists(user: User) {
        const firebaseUser = mapUserToFirebaseUser(user);
        await this.userDatabaseRepository.createOrReplace(firebaseUser, firebaseUser.id)
    }
    
}