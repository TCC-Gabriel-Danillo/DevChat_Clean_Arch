import "./config/firebase"

import { View } from "react-native"
import { useCustomFonts } from "_/presentation/hooks"
import { AuthProviderComposer } from "./composes"
import { Navigation } from "./navigation"

export const Main = () => {
    const [isLoaded] = useCustomFonts()

    if(!isLoaded) return <View />

    return (
        <AuthProviderComposer>
            <Navigation />
        </AuthProviderComposer>
    )
}