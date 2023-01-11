import { ViewStyle, TouchableOpacity, TouchableOpacityProps } from "react-native"
import styles from "./styles"

interface Props extends TouchableOpacityProps {
    children: JSX.Element;
    icon?: JSX.Element;
    style?: ViewStyle;

}

export function Card({ children, icon, style, onPress, ...rest }: Props) {
    return (
        <TouchableOpacity
            activeOpacity={onPress ? 0 : 1}
            style={[styles.container, style]}
            onPress={onPress}
            {...rest}
        >
            {children}
            {icon}
        </TouchableOpacity>
    )
}