import { UsersContextProvider } from "_/presentation/contexts";
import { makeUserService } from "../factories";

interface Props {
    children: JSX.Element
}

export function UsersProviderComposer({ children }: Props){
    const usersService = makeUserService()
    return(
        <UsersContextProvider usersService={usersService}>
            {children}
        </UsersContextProvider>
    )
}