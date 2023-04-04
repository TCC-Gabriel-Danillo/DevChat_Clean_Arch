
import { createContext, useMemo } from "react"
import { User } from "_/domain/models"
import { UsersUseCase } from "_/domain/usecases/users"
import { useAuth } from "../hooks/useAuth"
import { useQuery } from "@tanstack/react-query"

interface Props {
    children: JSX.Element
    usersService: UsersUseCase
    tech: string
}

interface UsersContextData {
    users: User[]
    isLoadingUsers: boolean
    tech: string
}

export const UsersContext = createContext<UsersContextData>({} as UsersContextData)

export function UsersContextProvider({ children, usersService, tech }: Props){
    
    const { user } = useAuth()
    
    const { isLoading: isLoadingUsers, data: users } = useQuery(
        ['users', user?.id], 
        () => usersService.listUsersByTech(tech), 
        { enabled: !!user, initialData: [] }
    )

    const usersWithoutLoggedUser = useMemo(() => users.filter(_user => _user.id !== user?.id), [user, users])

    return(
        <UsersContext.Provider value={{ users: usersWithoutLoggedUser, isLoadingUsers, tech }}>
            {children}
        </UsersContext.Provider>
    )
}