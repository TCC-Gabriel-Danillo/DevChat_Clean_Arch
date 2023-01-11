import { Message } from "../models";
import { VoidCallback } from "../types/voidCallback";

export interface MessageUseCase {
    sendMessage(message:Message): Promise<void>
    updateMessage(message: Message): Promise<void>
    listenMessages(cb: VoidCallback<Message>): void
    unlistenMessages(): void
}