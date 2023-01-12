import { useState, createContext } from "react"
import { Modal, Text } from "../components"

interface Props {
    children: JSX.Element
}

type Options = {
    message: string
}

export interface AlertContextData {
    openAlert(options: Options): void
    closeAlert(): void
}

export const AlertContext = createContext<AlertContextData>({} as AlertContextData)

export function AlertContextProvider({ children }: Props) {
    const [isOpen, setOpen] = useState(false)
    const [message, setMessage] = useState("")

    const openAlert = (options: Options) => {
        setMessage(options.message)
        setOpen(true)
    }
    const closeAlert = () => {
        setOpen(false)
        setMessage("")
    }

    return (
        <AlertContext.Provider value={{ openAlert, closeAlert }}>
            <Modal
                isOpen={isOpen}
                onPressOutside={closeAlert}
                onCloseRequest={closeAlert}
            >
                <Text>{message}</Text>
            </Modal>
            {children}
        </AlertContext.Provider>
    )
}