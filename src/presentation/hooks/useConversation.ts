
import { useContext } from "react"
import { ConversationContext } from "../contexts/conversationContext"

export const useConversation = () => useContext(ConversationContext)