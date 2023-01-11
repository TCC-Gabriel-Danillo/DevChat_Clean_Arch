import { View, Image, ViewStyle } from "react-native"
import { Text } from "../Text"
import styles from "./styles"

interface Props {
    photoUrl?: string
    title: string
    subtile?: string
    style?: ViewStyle
}

export function UserCard({ photoUrl, style, title, subtile }: Props){
    return(
        <View style={[styles.container, style]}>
            <Image source={{ uri: photoUrl }} style={styles.image}/>
            <View style={styles.textContainer}>
                <Text fontWeight="bold">{title}</Text>
                <Text style={styles.subtitle}>{subtile}</Text>
            </View>
        </View>
    )
}