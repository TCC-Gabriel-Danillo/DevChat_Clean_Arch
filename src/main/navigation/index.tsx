import { NavigationContainer } from '@react-navigation/native';
import { Loading } from '_/presentation/components';
import { useAuth } from '_/presentation/hooks';
import { AuthNavigation } from './auth';
import { MainNavigation } from './main';


export function Navigation() {
  const { isAuthenticated, isAuthenticating } = useAuth()
  
    if(isAuthenticating) return <Loading />
    
    return (
      <NavigationContainer>
        {
          isAuthenticated ? <MainNavigation /> : <AuthNavigation/> 
        }
      </NavigationContainer>
    );
}