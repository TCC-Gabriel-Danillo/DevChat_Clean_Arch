import { TouchableOpacity, TouchableOpacityProps } from "react-native"

interface Props extends TouchableOpacityProps {
    icon: any; 
}
export function IconButton({icon, ...rest}: Props){
    return(  
        <TouchableOpacity
            {...rest}
        >
            {icon}
        </TouchableOpacity>
    )
}