import { Card, Container, Text } from "_/presentation/components";
import { COLORS, APP_SCREENS, TEST_ID, ICONS } from "_/presentation/constants";
import { useAuth, useMainNavigation } from "@ui/src/hooks";
import styles from "./styles"
import { FlatList } from "react-native";


export function TechScreen() {
    const { user } = useAuth()
    const navigation = useMainNavigation()

    const navigateToUsersScreen = (tech: string) => navigation.navigate(APP_SCREENS.Main.UsersScreen, { tech })

    return (
        <Container>
            <Text fontType="h2" style={styles.title}>Escolha uma de suas tecnologias para iniciar sua conversa: </Text>
            <FlatList
                data={user?.techs}
                renderItem={({ item: tech }) => {
                    return (
                        <Card
                            testID={TEST_ID.TECH_CARD}
                            onPress={() => navigateToUsersScreen(tech)}
                            key={tech}
                            icon={<ICONS.CARRET_RIGHT color={COLORS.GREY} />}
                            style={styles.card}
                        >
                            <Text style={styles.tech}>{tech}</Text>
                        </Card>
                    )
                }}
            />
        </Container>
    )
}