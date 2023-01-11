import { Image } from 'react-native'
import { Container } from "../Container"
import { Text } from "../Text"
import loadingImg from "@ui/assets/loading.png"

import styles from './styles'

export function Loading(){
    return (
        <Container style={styles.container}>
            <Image source={loadingImg} style={styles.loadingImg} />
            <Text fontType="h2">Carregando...</Text>
        </Container>
    )
}