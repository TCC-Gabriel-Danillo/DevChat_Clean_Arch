import { Message } from "_/domain/models";
import { mockedLoggedUser, mockedParticipant } from "./user";

export const mockedMessages: Message[] = [
    { createdAt: new Date(), id: "any_id", message: "any_message", read: false, sender: mockedLoggedUser },
    { createdAt: new Date(), id: "any_id2", message: "any_message2", read: false, sender: mockedLoggedUser },
    { createdAt: new Date(), id: "any_id3", message: "any_message3", read: false, sender: mockedParticipant }
]