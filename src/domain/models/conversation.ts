import { User } from "./user"

export interface Conversation {
    id: string
    users: Array<User>
    lastSenderId: string
    unreadNumber: number
    createdAt: Date
    updatedAt: Date
    tech: string
}