import { ReactNode } from 'react';
import { Text as RnText, TextProps } from 'react-native';
import { styles } from "./styles"

type Props = {
    fontType?: 'h1' | 'h2' | 'p'
    fontWeight?: 'bold' | 'semibold' | 'regular'
    children: ReactNode
} & TextProps

export const Text: React.FC<Props> = ({
    fontType = 'p', 
    fontWeight = 'regular',
    style,
    children, 
    ...rest
 }) => {
  const fontTypeStyle = styles[fontType]; 
  const fontWeightStyle = styles[fontWeight];
  return(
    <RnText style={[fontTypeStyle, fontWeightStyle, style]} {...rest}>
        {children}
    </RnText>
  )
}