import { useRoute, RouteProp } from "@react-navigation/native"
import { MAIN_SCREEN_ARGS } from "_/main/navigation/main/args"

export const useMainRoute = <T extends keyof MAIN_SCREEN_ARGS>() => useRoute<RouteProp<MAIN_SCREEN_ARGS, T>>()