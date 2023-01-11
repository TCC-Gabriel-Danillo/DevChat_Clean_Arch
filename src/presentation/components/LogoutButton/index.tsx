import { ICONS, TEST_ID, COLORS } from "_/presentation/constants"
import React from "react"
import { IconButton } from "../IconButton"


type Props = {
    onPress: () => void
}

export function LogoutButton({ onPress }: Props){

    return (
        <IconButton 
            testID={TEST_ID.LOGOUT}
            onPress={onPress} 
            icon={ <ICONS.LOGOUT size={24} color={COLORS.WHITE} /> } 
        />
    )
}