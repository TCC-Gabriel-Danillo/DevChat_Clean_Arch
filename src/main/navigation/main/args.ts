import { Conversation, User } from "_/domain/models"
import { MAIN_SCREENS } from "_/presentation/constants"

 export type MAIN_SCREEN_ARGS = {
    [MAIN_SCREENS.HOME_SCREEN]: undefined
    [MAIN_SCREENS.TECH_SCREEN]: undefined
    [MAIN_SCREENS.MESSAGE_SCREEN]: {
        conversation: Conversation
        participant: User
    }
    [MAIN_SCREENS.USERS_SCREEN]: { tech: string }
}