import { User } from "_/domain/models"

export const mockedLoggedUser: User = {
    email: "any_email",
    id: "any_id",
    username: "any_username",
    photoUrl: "any_url",
    techs: ["tech_1", "tech_2"]
}

export const mockedParticipant: User = {
    email: "any_email2",
    id: "any_id2",
    username: "any_username2",
    photoUrl: "any_url2",
    techs: ["tech_2", "tech_3"]
}