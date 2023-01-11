import { COLORS } from "_/presentation/constants"
import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    container: { 
        backgroundColor: COLORS.SECONDARY, 
        height: 30,
        width: 30 ,
        borderRadius: 30, 
        justifyContent: "center", 
        alignItems: "center" 
    }
})

export default styles