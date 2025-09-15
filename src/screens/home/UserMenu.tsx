import React, { useCallback } from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScreenNames } from '../../constants/screens.ts';
import { useNavigation } from '@react-navigation/native';
import { screenWidth } from '../../utils/screen.ts';


type  MenuItemType = {
  name: string,
  screen: string | null,
  icon:string
}





const UserMenu = () => {
  const MenuItems:MenuItemType[] = [
    {
      name: 'Chat',
      screen: ScreenNames.CHAT,
      icon: '💬'
    },
    {
      name: 'Video Call',
      screen: null,
      icon:'📹'
    },
    {
      name: 'Audio Call',
      screen: null,
      icon:'📞'
    },
    {
      name: 'Live Stream',
      screen: null,
      icon:'🔴'
    },
    {
      name: 'Group Chat',
      screen: null,
      icon:'🧑‍🧑‍🧒‍🧒'
    },
    {
      name: '2050 Space',
      screen: null,
      icon:'🪐'
    },

  ];

  const navigation = useNavigation();

  const renderItem = useCallback(({item}:{item:MenuItemType}) => {
    return <TouchableOpacity style={style.cell}
    onPress={()=>{
      if(!item.screen){
        Alert.alert('Not implemented');
        return;
      }
      navigation.navigate(item.screen);
    }}
    >
      <Text style={style.cellIcon}>{item.icon}</Text>
      <Text>{item.name}</Text>
    </TouchableOpacity>
  },[navigation]);

  return (
    <View style={style.wrapper}>
      <Text style={style.title}>Start Whisper</Text>
      <FlatList
        data={MenuItems}
        renderItem={renderItem}
        numColumns={3}/>
    </View>
  );
};
export default UserMenu;

const style = StyleSheet.create({
  wrapper:{
    justifyContent:'center',
    alignItems:'center',
    gap:10
  },
  title:{
    fontSize:25
  },

  cell:{
    backgroundColor:'white',
    justifyContent:'center',
    alignItems:'center',
    borderWidth:1,
    borderColor:'#efefef',
    width: screenWidth * 0.25,
    height: screenWidth * 0.25,
    borderRadius:26,
    margin:10

  },
cellIcon:{
    fontSize:30,
  marginBottom:4
},
});