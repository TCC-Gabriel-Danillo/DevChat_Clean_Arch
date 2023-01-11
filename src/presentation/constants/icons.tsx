import { 
    FontAwesome, 
    AntDesign, 
    MaterialCommunityIcons, 
    Ionicons, 
    Entypo
} from '@expo/vector-icons';

import { COLORS } from './colors';

interface IconProps {
    size?: number
    color?: string
}
export const ICONS = {
    CARRET_RIGHT: ({color = COLORS.DARK, size = 24}: IconProps) =>  <FontAwesome name="caret-right" size={size} color={color} />, 
    GIT_HUB: ({color = COLORS.DARK, size = 24}: IconProps) =>  <AntDesign name="github" size={size} color={color} />, 
    LOGOUT: ({color = COLORS.DARK, size = 24}: IconProps) => <MaterialCommunityIcons name="logout" size={size} color={color} />, 
    SEND: ({color = COLORS.DARK, size = 24}: IconProps) => <Ionicons name="send" size={size} color={color} />, 
    EYE: ({color = COLORS.DARK, size = 24}: IconProps) => <Entypo name="eye" size={size} color={color} />, 
}   

export type ICON =  typeof ICONS[keyof typeof ICONS]