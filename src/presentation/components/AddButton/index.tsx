import { 
    TouchableOpacity, 
    ViewStyle, 
    TouchableOpacityProps 
} from "react-native"

import { Text } from "../Text"

import styles from "./styles"

type ButtonType = "primary" | "secondary"

interface Props extends TouchableOpacityProps {
    style?: ViewStyle
    type?: ButtonType 
}

export function AddButton({ style, type="primary", ...rest }: Props){

    const styleByType = styles[type]

    return(
        <TouchableOpacity style={[ styles.button, styleByType ,style ]} {...rest} >
            <Text style={styleByType}>+</Text>
        </TouchableOpacity>
    )
}