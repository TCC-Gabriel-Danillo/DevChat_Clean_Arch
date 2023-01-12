

import { useNavigation, NavigationProp } from "@react-navigation/native"
import { MAIN_SCREEN_ARGS } from "_/main/navigation/main/args"

export const useMainNavigation = () => useNavigation<NavigationProp<MAIN_SCREEN_ARGS>>()