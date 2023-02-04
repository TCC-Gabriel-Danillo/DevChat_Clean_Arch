import { Conversation, User } from "_/domain/models";
import { ConversationUseCase } from "_/domain/usecases/conversation";
import { DatabaseConversationDTO, DatabaseUserDto, mapConversationToDatabaseConversation, mapDatabaseConversationToConversation, mapDatabaseUserToUser } from "../protocols/dto/database";
import { DatabaseRepository } from "../protocols/repositories/databaseRepository";
import { OP, ORDER } from "../protocols/repositories/options";
import { RealtimeDatabaseRepository, VoidCallback } from "../protocols/repositories/realtimeDatabaseRepository";

export class ConversationService implements ConversationUseCase {
    constructor(
        private readonly conversationDatabaseRepository: DatabaseRepository,
        private readonly userDatabaseRepository: DatabaseRepository,
        private readonly conversationRealtimeDatabaseRepository: RealtimeDatabaseRepository
    ) { }

    async updateConversationById(conversation: Conversation): Promise<void> {
        const fConversation = mapConversationToDatabaseConversation(conversation);
        await this.conversationDatabaseRepository.update(fConversation, fConversation.id)
    }

    async createConversation(conversation: Conversation): Promise<void> {
        const fConversation = mapConversationToDatabaseConversation(conversation);
        await this.conversationDatabaseRepository.createOrReplace(fConversation, fConversation.id)
    }

    async deleteConversation(conversation: Conversation): Promise<void> {
        await this.conversationDatabaseRepository.delete(conversation.id)
    }

    listenConversationsByUserId(userId: string, cb: VoidCallback<Conversation>): void {
        const filterArgs = {
            field: 'users',
            op: OP.CONTAINS,
            value: userId
        }

        const orderArgs = {
            field: "updatedAt",
            order: ORDER.DESC
        }

        const args = { filterArgs, orderArgs }

        this.conversationRealtimeDatabaseRepository.watch<DatabaseConversationDTO>(async (fConversations) => {
            const conversations = await Promise.all(fConversations.map((fconversation) => this.parseConversation(fconversation)))
            cb(conversations)
        }, args)

    }

    unlistenConversationsByUserId(): void {
        this.conversationRealtimeDatabaseRepository.unwatch()
    }

    private async parseConversation(fconversation: DatabaseConversationDTO): Promise<Conversation> {
        const users = await this.getUsersFromConversation(fconversation.users);
        return mapDatabaseConversationToConversation(fconversation, users);
    }

    private async getUsersFromConversation(userIds: Array<string>): Promise<Array<User>> {
        const filterArgs = {
            field: 'id',
            op: OP.IN,
            value: userIds
        }
        const args = { filterArgs }
        const databaseUsers = await this.userDatabaseRepository.getAll<DatabaseUserDto>(args);
        return databaseUsers.map(databaseUser => mapDatabaseUserToUser(databaseUser));
    }

}