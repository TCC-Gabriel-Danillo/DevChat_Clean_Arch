import { useContext } from "react"
import { AlertContext } from "../contexts"

export const useAlert = () => useContext(AlertContext)