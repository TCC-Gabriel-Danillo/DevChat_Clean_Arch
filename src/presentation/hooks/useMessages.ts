import { useContext } from "react"
import { MessageContext } from "../contexts"

export const useMessages = () => useContext(MessageContext)