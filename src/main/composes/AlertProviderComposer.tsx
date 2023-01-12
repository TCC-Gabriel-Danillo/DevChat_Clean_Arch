import { AlertContextProvider } from "_/presentation/contexts"

interface Props { children: JSX.Element }
export const AlertProviderComposer: React.FC<Props> = (props) => {
    return(
        <AlertContextProvider>
            {props.children}
        </AlertContextProvider>
    )
}