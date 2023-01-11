import { COLORS, SCREEN_WIDTH } from "_/presentation/constants"
import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    container: {
        width: SCREEN_WIDTH,
        position: "absolute",
        bottom: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    input: {
        width: "80%",
        backgroundColor: COLORS.WHITE,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        fontSize: 16
    },
    sendButton: {
        backgroundColor: COLORS.PRIMARY,
        marginLeft: 10,
        padding: 10,
        borderRadius: 50
    }
})

export default styles