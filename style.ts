// styles.ts

import { faMediumM } from '@fortawesome/free-brands-svg-icons';
import { Dimensions } from 'react-native';
const { width } = Dimensions.get('window');
import Svg, {  Defs, LinearGradient, Stop } from 'react-native-svg';

export const colors = {
    primary: '#000',
    secondary: '#FFBE2C', //Yellow
    theriary: '#FFFF',
    textPrimary: '#D9D9D9', //Gray 
    textSecondary: '#EA635C', //Red 
    textTheriary: '#f8c145', //Yellow
    gradientPrimary: ['#FF4242', '#992727'], // Gradiente Rojo
    gradientBlack: ['#cccccc'], // Gradiente Rojo
  };
  
 // Function to calculate responsive numbers
const responsiveValue = (value: number) => {
    const baseWidth = 375; // Ancho base (puedes ajustar esto según tus necesidades)
    return (value / baseWidth) * width;
  };
  
  export const spacing = {
    tiny: responsiveValue(5),
    small: responsiveValue(10),
    medium: responsiveValue(20),
    large: responsiveValue(50),
    xl: responsiveValue(90),
  };
  
  export const fontSizes = {
    xs: responsiveValue(5),
    tiny: responsiveValue(10),
    smtiny: responsiveValue(12),
    small: responsiveValue(14),
    smedium: responsiveValue(20),
    medium: responsiveValue(24),
    large: responsiveValue(32),
    xl: responsiveValue(40),
  };
  
  export const fonts = {
    bold: 'Inter-Bold',
  };

