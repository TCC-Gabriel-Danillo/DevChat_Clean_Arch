import { User } from "../models"

export interface UsersUseCase {
    listUsersByTech: (tech: string) => Promise<User[]>
}