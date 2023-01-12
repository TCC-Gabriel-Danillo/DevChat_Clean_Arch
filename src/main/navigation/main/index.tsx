import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MAIN_SCREEN_ARGS } from './args';
import { HomeScreen, TechScreen, UsersScreen, MessagesScreen } from '_/presentation/screens';
import { mainOptions } from "./options";
import { MAIN_SCREENS } from '_/presentation/constants';
import { ConvesationProviderComposer, MessageProviderComposer, UsersProviderComposer } from '_/main/composes';

const Stack = createNativeStackNavigator<MAIN_SCREEN_ARGS>()

export function MainNavigation() {

    return (
        <ConvesationProviderComposer>
            <Stack.Navigator screenOptions={mainOptions}>
                <Stack.Screen
                    name={MAIN_SCREENS.HOME_SCREEN}
                    component={HomeScreen}
                    options={{ title: "Conversas" }}
                />
                <Stack.Screen
                    name={MAIN_SCREENS.TECH_SCREEN}
                    component={TechScreen}
                    options={{ title: "Suas tecnologias" }}
                />
                <Stack.Screen
                    name={MAIN_SCREENS.USERS_SCREEN}
                    options={{ title: "Usuários" }}
                >
                    {() => {
                        return (
                            <UsersProviderComposer>
                                <UsersScreen />
                            </UsersProviderComposer>
                        )
                    }}
                </Stack.Screen>
                <Stack.Screen
                    name={MAIN_SCREENS.MESSAGE_SCREEN}
                    options={({ route }) => ({ title: route.params.participant.username })}
                >
                    {({ route }) => {
                        const { conversation } = route.params
                        return (
                            <MessageProviderComposer conversation={conversation}>
                                <MessagesScreen />
                            </MessageProviderComposer>
                        )
                    }}
                </Stack.Screen>
            </Stack.Navigator>
        </ConvesationProviderComposer>
    )
}