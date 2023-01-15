import { Conversation } from "_/domain/models";
import { mockedLoggedUser, mockedParticipant } from "./user";

export const mockedConversation: Conversation = {
    id: "any_id",
    createdAt: new Date(),
    lastSenderId: "any_senderId",
    tech: "any_tech",
    unreadNumber: 0,
    updatedAt: new Date(),
    users: [mockedLoggedUser, mockedParticipant]
}