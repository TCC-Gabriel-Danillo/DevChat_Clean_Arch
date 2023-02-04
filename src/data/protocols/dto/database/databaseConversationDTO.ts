import { Timestamp } from "@firebase/firestore";
import { Conversation, User } from "_/domain/models";

export interface DatabaseConversationDTO {
    id: string
    unreadNumber: number
    users: string[]
    createdAt: Timestamp
    updatedAt: Timestamp
    tech: string
    lastSenderId: string
}

export const mapDatabaseConversationToConversation = (
    databaseConversation: DatabaseConversationDTO,
    users: User[]
): Conversation => {
    return {
        id: databaseConversation.id,
        unreadNumber: databaseConversation.unreadNumber,
        users,
        createdAt: databaseConversation.createdAt.toDate(),
        updatedAt: databaseConversation.updatedAt.toDate(),
        tech: databaseConversation.tech,
        lastSenderId: databaseConversation.lastSenderId
    }
}

export const mapConversationToDatabaseConversation = (conversation: Conversation): DatabaseConversationDTO => {
    return {
        id: conversation.id,
        tech: conversation.tech,
        unreadNumber: conversation.unreadNumber,
        users: conversation.users.map(user => user.id),
        createdAt: Timestamp.fromDate(conversation.createdAt),
        updatedAt: Timestamp.fromDate(conversation.updatedAt),
        lastSenderId: conversation.lastSenderId
    }
}