import { ConversationContextProvider } from "_/presentation/contexts"
import { makeConversationService } from "../factories"


interface Props {
    children: JSX.Element
}
export function ConvesationProviderComposer({ children }: Props){
    const conversationService = makeConversationService()

    return(
        <ConversationContextProvider conversationService={conversationService}>
            {children}
        </ConversationContextProvider>
    )
}