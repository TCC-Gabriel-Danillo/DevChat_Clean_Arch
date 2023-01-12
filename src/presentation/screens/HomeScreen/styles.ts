import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
    addButton: {
        position: "absolute",
        bottom: 30,
        right: 30
    },
    userCard: {
        marginTop: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    unreadNumber: { marginRight: 5 },
    empty: { flex: 1, justifyContent: "center", alignItems: "center" }
})