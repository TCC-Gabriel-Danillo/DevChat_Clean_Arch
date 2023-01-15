import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AUTH_SCREENS } from '_/presentation/constants';
import { AuthScreen } from '_/presentation/screens';

const Stack =  createNativeStackNavigator()

export function AuthNavigation(){
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={AUTH_SCREENS.AUTH_SCREEN} component={AuthScreen}/>
        </Stack.Navigator>
    )
}