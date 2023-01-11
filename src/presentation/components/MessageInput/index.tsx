import { COLORS, ICONS, TEST_ID } from "_/presentation/constants"
import { useState } from "react"
import { View, TextInput, TouchableOpacity } from "react-native"
import styles from "./styles"

interface Props {
    onSendMessage: (message: string) => Promise<void>
}

export function MessageInput({ onSendMessage }: Props) {
    const [message, setMessage] = useState("")

    const onMessageChange = (message: string) => setMessage(message)
    const onSend = () => {
        onSendMessage(message)
        setMessage("")
    }

    return (
        <View style={styles.container}>
            <TextInput
                testID={TEST_ID.MESSAGE_INPUT}
                style={styles.input}
                placeholder="Escreva uma mensagem"
                onChangeText={onMessageChange}
                value={message}
            />
            <TouchableOpacity onPress={onSend} style={styles.sendButton} testID={TEST_ID.SEND_BUTTON}>
                <ICONS.SEND size={20} color={COLORS.WHITE} />
            </TouchableOpacity>
        </View>
    )
}