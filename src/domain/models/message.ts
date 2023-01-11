import { User } from "./user"

export interface Message {
    id: string
    sender: User 
    createdAt: Date
    message: string
    read: boolean
}