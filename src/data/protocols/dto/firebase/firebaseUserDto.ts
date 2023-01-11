import { User } from "_/domain/models"

export interface FirebaseUserDto {
    username: string 
    id: string
    photoUrl?: string
    email: string
    techs?: Array<string>
}

export const mapFirebaseToUser = (firebaseUser: FirebaseUserDto): User => {
    return {
        email: firebaseUser.email, 
        id: firebaseUser.id, 
        username: firebaseUser.username, 
        photoUrl: firebaseUser.photoUrl, 
        techs: firebaseUser.techs
    }
}

export const mapUserToFirebaseUser = (user: User): FirebaseUserDto => {
    return {
        email: user.email, 
        id: user.id, 
        username: user.username, 
        photoUrl: user.photoUrl, 
        techs: user.techs
    }
}