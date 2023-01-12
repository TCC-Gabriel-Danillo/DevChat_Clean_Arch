import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { APP_SCREENS } from '_/presentation/constants';
import { AuthScreen } from '_/presentation/screens';

const Stack =  createNativeStackNavigator()

export function AuthNavigation(){
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={APP_SCREENS.Auth.AushScreen} component={AuthScreen}/>
        </Stack.Navigator>
    )
}