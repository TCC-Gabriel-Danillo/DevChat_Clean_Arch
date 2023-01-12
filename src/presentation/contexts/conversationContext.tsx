import { createContext, useState, useEffect, ReactNode } from 'react'
import { Conversation, User } from '_/domain/models'
import { ConversationUseCase } from '_/domain/usecases/conversation'
import { useAuth } from '../hooks'
import { generateRandomId } from '../utils'



interface ConversationContextInfo {
    conversations?: Conversation[]
    isLoadingConversations: boolean
    createNewConversation: (users: User[], tech: string) => Promise<Conversation>
    updateConversationInfo: (newConversation: Conversation) => Promise<void>
}

export const ConversationContext = createContext<ConversationContextInfo>({} as ConversationContextInfo)

interface Props {
    children: ReactNode
    conversationService: ConversationUseCase
}

export function ConversationContextProvider({
    children,
    conversationService
}: Props) {

    const { user } = useAuth()
    const userId = user?.id

    const [conversations, setConversations] = useState<Conversation[]>([])
    const [isLoadingConversations, setLoadingConversations] = useState(true)

    useEffect(() => {
        if (!userId) return
        conversationService.listenConversationsByUserId(userId, onConversationChanged)
        return () => conversationService.unlistenConversationsByUserId()

    }, [userId])

    const onConversationChanged = (newConversations: Conversation[]) => {
        setConversations(newConversations)
        setLoadingConversations(false)
    }


    const updateConversationInfo = async (newConversation: Conversation) => {
        await conversationService.updateConversationById(newConversation)
    }

    const createNewConversation = async (users: User[], tech: string) => {
        const newConversation: Conversation = {
            id: generateRandomId(),
            createdAt: new Date(),
            updatedAt: new Date(),
            unreadNumber: 0,
            tech,
            users,
            lastSenderId: ""
        }
        await conversationService.createConversation(newConversation)
        return newConversation
    }

    return (
        <ConversationContext.Provider value={{
            conversations,
            isLoadingConversations,
            createNewConversation,
            updateConversationInfo
        }}>
            {children}
        </ConversationContext.Provider>
    )
}