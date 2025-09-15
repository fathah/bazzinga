import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { APP_COLORS } from '../../constants/colors.ts';
import { screenWidth } from '../../utils/screen.ts';


type  FilledButtonProps = {
  text: string;
  onPress: () => void;
}

 const FilledButton = ({text, onPress}:FilledButtonProps) => {
  return (
    <View style={style.wrapper}>
      <TouchableOpacity onPress={onPress} style={style.button}>
        <Text style={style.label}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};


 export  default FilledButton;

 const style = StyleSheet.create({
   wrapper:{
     justifyContent:'center',
   },
   button:{
     backgroundColor: APP_COLORS.PRIMARY,
     width: screenWidth * 0.9,
     height: 50,
     justifyContent:'center',
     alignItems:'center',

   },
   label:{
     color:'white'
   }
 });