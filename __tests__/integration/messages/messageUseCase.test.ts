
import { mapMessageToFirebaseMessage } from "_/data/protocols/dto/firebase";
import { DatabaseRepository } from "_/data/protocols/repositories/databaseRepository";
import { RealtimeDatabaseRepository } from "_/data/protocols/repositories/realtimeDatabaseRepository";
import { MessageService } from "_/data/usecases/message";
import { Message, User } from "_/domain/models";
import { MessageUseCase } from "_/domain/usecases/message";
import { sleep } from "_/presentation/utils";
import { DatabaseRepositoryStub, RealtimeDatabaseRepositoryStub } from "../../mocks/stubs";


type SutTypes = {
    messageDatabaseRepositoryStub: DatabaseRepository
    messageRealtimeDatabaseRepositorySub: RealtimeDatabaseRepository
    userDatabaseRepositoryStub: DatabaseRepository
    messageService: MessageUseCase
}
const makeSut = (): SutTypes => {
    const messageDatabaseRepositoryStub = new DatabaseRepositoryStub()
    const messageRealtimeDatabaseRepositorySub = new RealtimeDatabaseRepositoryStub()
    const userDatabaseRepositoryStub = new DatabaseRepositoryStub()

    const messageService = new MessageService(
        messageDatabaseRepositoryStub,
        messageRealtimeDatabaseRepositorySub,
        userDatabaseRepositoryStub,
    )
    return {
        messageService,
        messageDatabaseRepositoryStub,
        messageRealtimeDatabaseRepositorySub,
        userDatabaseRepositoryStub
    }
}

const mockedMessage: Message = {
    createdAt: new Date(),
    id: "any_id",
    message: "any_message",
    read: false,
    sender: { id: "any_id" } as User
}

describe("messageService", () => {
    it("should call update with the right parameters", async () => {
        const { messageService, messageDatabaseRepositoryStub } = makeSut()
        const spy = jest.spyOn(messageDatabaseRepositoryStub, "update")
        await messageService.updateMessage(mockedMessage)
        expect(spy).toHaveBeenCalledWith(mapMessageToFirebaseMessage(mockedMessage), mockedMessage.id)
    })

    it("should call create with the right parameters", async () => {
        const { messageService, messageDatabaseRepositoryStub } = makeSut()
        const spy = jest.spyOn(messageDatabaseRepositoryStub, "createOrReplace")
        await messageService.sendMessage(mockedMessage)
        expect(spy).toHaveBeenCalledWith(mapMessageToFirebaseMessage(mockedMessage), mockedMessage.id)
    })

    it("should trigger for callback when listening for messages", async () => {
        const { messageService } = makeSut()
        const mockedCallback = jest.fn()
        messageService.listenMessages(mockedCallback);
        await sleep(100)
        expect(mockedCallback).toHaveBeenCalled()
    })
})