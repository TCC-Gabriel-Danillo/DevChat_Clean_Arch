import { Message } from "_/domain/models"
import { VoidCallback } from "_/domain/types/voidCallback"
import { MessageUseCase } from "_/domain/usecases/message"
import { mockedMessages } from "../models"

export class MessageServiceStub implements MessageUseCase {
    sendMessage(message: Message): Promise<void> {
        return Promise.resolve()
    }
    updateMessage(message: Message): Promise<void> {
        return Promise.resolve()
    }
    listenMessages(cb: VoidCallback<Message>): void {
        cb(mockedMessages)
    }
    unlistenMessages(): void {
        return
    }
}