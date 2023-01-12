
import { createContext, useCallback, useState } from "react"
import { User } from "_/domain/models"
import { UsersUseCase } from "_/domain/usecases/users"
import { useAuth } from "../hooks/useAuth"

interface Props {
    children: JSX.Element
    usersService: UsersUseCase
}

interface UsersContextData {
    users: User[]
    getUsersByTech(tech: string): void
    isLoadingUsers: boolean
}


export const UsersContext = createContext<UsersContextData>({} as UsersContextData)

export function UsersContextProvider({ children, usersService }: Props){

    const [isLoadingUsers, setLoadingUsers] = useState(true)
    const [users, setUsers] = useState<User[]>([])
    const { user } = useAuth()

    const getUsersByTech = useCallback(async (tech: string) => {
        const response = await usersService.listUsersByTech(tech)
        const usersWithoutLoggedUser = response.filter(responseUser => responseUser.id !== user?.id)
        setUsers(usersWithoutLoggedUser)
        setLoadingUsers(false)
    }, [])

    return(
        <UsersContext.Provider value={{ getUsersByTech, users, isLoadingUsers }}>
            {children}
        </UsersContext.Provider>
    )
}