import { User } from "_/domain/models"

export interface DatabaseUserDto {
    username: string 
    id: string
    photoUrl?: string
    email: string
    techs?: Array<string>
}

export const mapDatabaseUserToUser = (databaseUser: DatabaseUserDto): User => {
    return {
        email: databaseUser.email, 
        id: databaseUser.id, 
        username: databaseUser.username, 
        photoUrl: databaseUser.photoUrl, 
        techs: databaseUser.techs
    }
}

export const mapUserToDatabaseUser = (user: User): DatabaseUserDto => {
    return {
        email: user.email, 
        id: user.id, 
        username: user.username, 
        photoUrl: user.photoUrl, 
        techs: user.techs
    }
}