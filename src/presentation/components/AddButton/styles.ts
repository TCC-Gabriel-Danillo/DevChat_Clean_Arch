import { COLORS } from "_/presentation/constants"
import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    button: {
        width: 50, 
        height: 50, 
        borderRadius: 50, 
        justifyContent: "center", 
        alignItems: "center"
    }, 
    primary: {
        backgroundColor: COLORS.PRIMARY, 
        color: COLORS.WHITE,
        fontSize: 30
    }, 
    secondary: {
        backgroundColor: COLORS.SECONDARY, 
        color: COLORS.DARK, 
        fontSize: 30
    }
})

export default styles