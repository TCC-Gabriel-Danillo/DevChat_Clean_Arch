import { COLORS } from "_/presentation/constants";
import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
    },
    containerReciever: {
        justifyContent: "flex-start",
    },
    balloon: {
        padding: 30,
        width: 250,
        backgroundColor: COLORS.SECONDARY,
        marginBottom: 10,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15,
        marginRight: 10

    },
    ballonReciever: {
        backgroundColor: COLORS.LIGHT_GREY,
        marginLeft: 10

    },
    info: {
        position: "absolute",
        zIndex: 1,
        bottom: 5,
        flexDirection: "row",
        right: 10,
    },
    infoReciever: {
        left: 10,
    },
    date: { fontSize: 12, marginHorizontal: 10 },
    arrow: {
        position: "absolute",
        zIndex: 4,
        width: 20,
        height: 20,
        right: 5,
        backgroundColor: COLORS.SECONDARY,
        transform: [{ rotate: "45deg" }]
    },
    arrowReciever: {
        left: 5,
        transform: [{ rotate: "45deg" }],
        backgroundColor: COLORS.LIGHT_GREY,
    }
})

export default styles;