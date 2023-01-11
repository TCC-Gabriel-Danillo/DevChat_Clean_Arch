import React, { ReactNode } from 'react';
import { View, ViewStyle, ViewProps } from 'react-native';
import { styles } from './styles'

type Props =  {
    children: ReactNode   
} & ViewProps

export const Container: React.FC<Props> = ({ children, style, ...rest }) => {
  return(
    <View style={[styles.container, style]} {...rest}>
        {children}
    </View>
  )
}