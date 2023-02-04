import { Timestamp } from "@firebase/firestore";
import { Message, User } from "_/domain/models";

export interface DatabaseMessageDTO {
    id: string
    message: string 
    read: boolean
    senderId: string
    createdAt: Timestamp
}

export const mapDatabaseMessageToMessage = (databaseMessage: DatabaseMessageDTO, user: User): Message => {
    return {
        createdAt: databaseMessage.createdAt.toDate(), 
        id: databaseMessage.id, 
        message: databaseMessage.message, 
        read: databaseMessage.read, 
        sender: user
    }
}

export const mapMessageToDatabaseMessage = (message: Message): DatabaseMessageDTO  => {
    return {
        id: message.id, 
        createdAt: Timestamp.fromDate(message.createdAt), 
        message: message.message, 
        read: message.read, 
        senderId: message.sender.id
    }
}