import { createContext, useCallback, useState } from 'react'
import { STORAGE_KEYS } from '../constants';
import { AuthPromptService, useAlert } from '../hooks';
import { LocalStorage } from '_/data/protocols/cache/localStorage';
import { AuthUseCase } from '_/domain/usecases/authentication';
import { User } from '_/domain/models';
import { usePersistentState } from '../hooks/usePersistentState';

interface Props {
    children: JSX.Element
    authPromptService: AuthPromptService
    authService: AuthUseCase
    localStorageRepository: LocalStorage
}

interface AuthInfo {
    loginWithGithub: () => Promise<void>
    logout: () => void
    user?: User
    isAuthenticated: boolean
    isAuthenticating: boolean
}

export const AuthContext = createContext<AuthInfo>({} as AuthInfo)

export function AuthContextProvider({
    children,
    authService,
    localStorageRepository,
    authPromptService
}: Props) {

    const [user, setUser, isCheckingState] = usePersistentState<User>(STORAGE_KEYS.USERS, {} as User, localStorageRepository)
    const [isAuthenticating, setAuthenticating] = useState<boolean>(false)
    const { promptAuth } = authPromptService
    const { openAlert } = useAlert()

    const loginWithGithub = useCallback(async () => {
        try {
            setAuthenticating(true)
            const credentials = await promptAuth();
            const userResponse = await authService.authenticateGithub(credentials)
            if (!userResponse) throw new Error("Algo deu errado ao tentar logar.")
            await setUser(userResponse)

        } catch (error) {
            console.error(error)
            openAlert({ message: "Erro ao logar com o git." })
        } finally {
            setAuthenticating(false)
        }
    }, [promptAuth])

    const logout = () => {
        setUser({} as User)
    }

    return (
        <AuthContext.Provider value={{
            loginWithGithub,
            logout,
            user,
            isAuthenticating: isAuthenticating || isCheckingState,
            isAuthenticated: !!user.id
        }}>
            {children}
        </AuthContext.Provider>
    )
}