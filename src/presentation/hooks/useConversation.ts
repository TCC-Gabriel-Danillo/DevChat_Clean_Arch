
import { useContext } from "react"
import { ConversationContext } from "../contexts"

export const useConversation = () => useContext(ConversationContext)