import { TouchableWithoutFeedback, Modal as RnModal, TouchableOpacity, View } from "react-native"
import styles from "./styles"

interface Props {
    isOpen: boolean
    children: JSX.Element
    onPressOutside?: () => void
    onCloseRequest?: () => void
}

export function Modal({ children, onCloseRequest, onPressOutside, isOpen }: Props) {
    return (

        <RnModal
            visible={isOpen}
            transparent
            animationType="fade"
            onRequestClose={() => onCloseRequest?.()}
        >
            <TouchableOpacity
                activeOpacity={1}
                style={styles.container}
                onPress={() => onPressOutside?.()}
            >
                <TouchableWithoutFeedback>
                    <View style={styles.content}>
                        {children}
                    </View>
                </TouchableWithoutFeedback>
            </TouchableOpacity>
        </RnModal>
    )
}