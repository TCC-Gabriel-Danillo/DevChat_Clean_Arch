import { User } from "_/domain/models";
import { AuthUseCase, Credentials } from "_/domain/usecases/authentication";

export class AuthServiceStub implements AuthUseCase {
    async authenticateGithub(
        credentials: Credentials
    ): Promise<User | undefined> {
        return Promise.resolve({
            email: "test@test.com",
            id: "123",
            username: "test",
            photoUrl: "photo_url",
            techs: ["tech1", "tech2", "tech3"],
        });
    }
}