import { COLORS } from "_/presentation/constants"
import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.WHITE, 
        padding: 15, 
        borderRadius: 5 , 
        flexDirection: "row", 
        justifyContent: "space-between", 
        alignItems: "center"
    }
})

export default styles