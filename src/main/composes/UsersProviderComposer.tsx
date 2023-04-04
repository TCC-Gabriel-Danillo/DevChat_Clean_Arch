import { UsersContextProvider } from "_/presentation/contexts";
import { makeUserService } from "../factories";

interface Props {
    children: JSX.Element
    tech: string
}

export function UsersProviderComposer({ children, tech }: Props){
    const usersService = makeUserService()
    return(
        <UsersContextProvider usersService={usersService} tech={tech}>
            {children}
        </UsersContextProvider>
    )
}