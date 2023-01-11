import { SCREEN_WIDTH } from "_/presentation/constants"
import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    container: { 
        flexDirection: 'row', 
        alignItems: "center", 
        width: SCREEN_WIDTH * 0.7 
    }, 
    image:  { width: 60, height: 60, borderRadius: 60 }, 
    textContainer: { marginLeft: 10 }, 
    subtitle: { fontSize: 14 }
})  

export default styles