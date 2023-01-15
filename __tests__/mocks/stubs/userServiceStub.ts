
import { User } from "_/domain/models";
import { UsersUseCase } from "_/domain/usecases/users";
import { mockedLoggedUser, mockedParticipant } from "../models";

export class UserServiceStub implements UsersUseCase {
    async listUsersByTech(tech: string): Promise<User[]> {
        return Promise.resolve([mockedLoggedUser, mockedParticipant])
    }
}