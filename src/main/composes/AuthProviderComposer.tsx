import { AsyncStorage } from "_/infra/cache/localStorage"
import { useAuthPrompt } from "_/presentation/hooks"
import { AuthContextProvider } from "_/presentation/contexts"
import { makeAuthService } from "../factories/usecases/authServiceFactory"

interface Props {
    children: JSX.Element
}

export function AuthProviderComposer({ children }: Props){
    const authPromptService = useAuthPrompt()
    const authService = makeAuthService()
    const localStorageRepository = new AsyncStorage()

    return(
      <AuthContextProvider 
        authPromptService={authPromptService}
        authService={authService}
        localStorageRepository={localStorageRepository}
      >
        {children}
      </AuthContextProvider>
    )
}