import { COLORS, SCREEN_HEIGHT, SCREEN_WIDTH } from "_/presentation/constants"
import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: "center",
        alignItems: "center"
    },
    content: {
        backgroundColor: COLORS.WHITE,
        borderRadius: 5,
        width: SCREEN_WIDTH * .9,
        height: SCREEN_HEIGHT * .2,
        justifyContent: "center",
        alignItems: "center"
    }
})

export default styles