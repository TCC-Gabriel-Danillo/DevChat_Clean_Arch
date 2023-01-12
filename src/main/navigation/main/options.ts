import { LogoutButton } from "_/presentation/components";
import { COLORS } from "_/presentation/constants";

export const mainOptions = {
    headerStyle: {
        backgroundColor: COLORS.PRIMARY, 
    }, 
    headerTintColor: COLORS.WHITE, 
    headerRight: LogoutButton
}