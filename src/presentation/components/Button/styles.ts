import { StyleSheet } from "react-native"
import { COLORS } from "_/presentation/constants"

export const styles = StyleSheet.create({
    button: {
        width: "100%", 
        height: 40, 
        justifyContent: "center", 
        alignItems: "center",
        padding: 10, 
        borderRadius: 5, 
        flexDirection: 'row'
    }, 
    primary: {
        backgroundColor: COLORS.PRIMARY, 
    }, 
    secondary: {
        backgroundColor: COLORS.SECONDARY, 

    },
    buttonTextPrimary: {
        color: COLORS.WHITE, 
    }, 
    buttonTextSecondary: {
        color: COLORS.DARK, 
    }, 
    icon: {
        marginRight: 8
    }
})