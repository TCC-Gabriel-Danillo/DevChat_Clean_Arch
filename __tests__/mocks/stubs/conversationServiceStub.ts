
import { Conversation } from "_/domain/models"
import { VoidCallback } from "_/domain/types/voidCallback"
import { ConversationUseCase } from "_/domain/usecases/conversation"
import { mockedConversation } from "../models"

export class ConversationServiceStub implements ConversationUseCase {
    updateConversationById(conversation: Conversation): Promise<void> {
        return Promise.resolve()
    }
    createConversation(conversation: Conversation): Promise<void> {
        return Promise.resolve()
    }
    deleteConversation(conversation: Conversation): Promise<void> {
        return Promise.resolve()
    }
    listenConversationsByUserId(userId: string, cb: VoidCallback<Conversation>): void {
        cb([mockedConversation])
    }
    unlistenConversationsByUserId(): void {
        return
    }
}