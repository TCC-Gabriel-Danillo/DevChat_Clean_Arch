import { Conversation } from "_/domain/models";
import { MessageContextProvider } from "_/presentation/contexts";
import { makeMessageService } from "../factories";

interface Props {
    children: JSX.Element
    conversation: Conversation
}

export function MessageProviderComposer({ children, conversation }: Props) {
    const messageService = makeMessageService(conversation)

    return (
        <MessageContextProvider
            messageService={messageService}
            conversation={conversation}
        >
            {children}
        </MessageContextProvider>
    )
}