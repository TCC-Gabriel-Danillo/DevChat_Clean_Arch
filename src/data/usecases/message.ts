import { Message, User } from "_/domain/models";
import { MessageUseCase } from "_/domain/usecases/message";
import { DatabaseMessageDTO, DatabaseUserDto, mapDatabaseMessageToMessage, mapDatabaseUserToUser, mapMessageToDatabaseMessage } from "../protocols/dto/database";
import { DatabaseRepository } from "../protocols/repositories/databaseRepository";
import { ORDER } from "../protocols/repositories/options";
import { RealtimeDatabaseRepository, VoidCallback } from "../protocols/repositories/realtimeDatabaseRepository";

export class MessageService implements MessageUseCase {
    constructor(
        private readonly messageDatabaseRepository: DatabaseRepository,
        private readonly messageRealtimeDatabaseRepository: RealtimeDatabaseRepository,
        private readonly userDatabaseRepository: DatabaseRepository
    ) { }

    async sendMessage(message: Message): Promise<void> {
        const databaseMessage = mapMessageToDatabaseMessage(message)
        await this.messageDatabaseRepository.createOrReplace(databaseMessage, databaseMessage.id)
    }

    async updateMessage(message: Message): Promise<void> {
        const databaseMessage = mapMessageToDatabaseMessage(message)
        await this.messageDatabaseRepository.update(databaseMessage, databaseMessage.id);
    }

    listenMessages(cb: VoidCallback<Message>): void {
        const orderArgs = {
            field: "createdAt",
            order: ORDER.ASC
        }

        const args = { orderArgs }
        this.messageRealtimeDatabaseRepository.watch<DatabaseMessageDTO>(async (databaseMessages) => {
            const messages = await Promise.all(databaseMessages.map((databaseMessage) => this.parseMessage(databaseMessage)))
            cb(messages)
        }, args)
    }
    unlistenMessages(): void {
        this.messageRealtimeDatabaseRepository.unwatch()
    }

    private async parseMessage(databaseMessage: DatabaseMessageDTO): Promise<Message> {
        const user = await this.getUserFromMessage(databaseMessage.senderId);
        return mapDatabaseMessageToMessage(databaseMessage, user);
    }

    private async getUserFromMessage(userId: string): Promise<User> {
        const databaseUser = await this.userDatabaseRepository.getOneById<DatabaseUserDto>(userId);
        return mapDatabaseUserToUser(databaseUser)
    }

}