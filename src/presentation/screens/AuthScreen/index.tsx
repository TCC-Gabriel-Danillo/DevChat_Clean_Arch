import { Image } from 'react-native'
// import { useAuth } from '@ui/src/hooks'
import { Button, Container, Text } from "_/presentation/components"
import chatImg from '@ui/assets/chat.png'
import { styles } from './styles';
import { TEST_ID, COLORS, ICONS } from '_/presentation/constants';

export function AuthScreen(){
    // const { loginWithGithub } = useAuth()
    
    return(
        <Container style={styles.container} testID={TEST_ID.AUTH}>
            <Text fontType='h1' fontWeight='bold'>Bem vindo ao DevChat!</Text>
            <Text style={styles.subtitle}>Encontre incríveis desenvolvedores e troque experiências.</Text>
            <Image source={chatImg} style={styles.image}/>
            <Button 
                style={styles.loginBtn}
                // onPress={loginWithGithub} 
                icon={<ICONS.GIT_HUB size={24} color={COLORS.WHITE} />}
            >
                Entrar com Github
            </Button>
        </Container>
    )
}