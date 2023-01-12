import { ICONS, TEST_ID, COLORS } from "_/presentation/constants"
import React from "react"
import { IconButton } from "../IconButton"
import { useAuth } from "_/presentation/hooks"

export function LogoutButton(){
    const { logout } = useAuth()

    return (
        <IconButton 
            testID={TEST_ID.LOGOUT}
            onPress={logout} 
            icon={ <ICONS.LOGOUT size={24} color={COLORS.WHITE} /> } 
        />
    )
}