import "./config/firebase"

import { View } from "react-native"

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { useCustomFonts } from "_/presentation/hooks"
import { AlertProviderComposer, AuthProviderComposer } from "./composes"
import { Navigation } from "./navigation"

const queryClient = new QueryClient()

export const Main = () => {
    const [isLoaded] = useCustomFonts()

    if(!isLoaded) return <View />

    return (
        <QueryClientProvider client={queryClient}>
            <AlertProviderComposer>
                <AuthProviderComposer>
                    <Navigation />
                </AuthProviderComposer>
            </AlertProviderComposer>
        </QueryClientProvider>
    )
}