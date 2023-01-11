import { Conversation } from "../models";
import { VoidCallback } from "../types/voidCallback";

export interface ConversationUseCase {
    updateConversationById(conversation: Conversation): Promise<void>
    createConversation(conversation: Conversation): Promise<void>
    deleteConversation(conversation: Conversation): Promise<void>
    listenConversationsByUserId(userId: string, cb: VoidCallback<Conversation>): void
    unlistenConversationsByUserId(): void
}