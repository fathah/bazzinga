import React, { useCallback, useMemo } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AppBar from '../../components/common/AppBar.tsx';
import { USERS, UserType } from '../../constants/tokens.ts';
import { APP_COLORS } from '../../constants/colors.ts';
import { useNavigation } from '@react-navigation/native';
import { ScreenNames } from '../../constants/screens.ts';
import useUserId from '../../hooks/useUserId.ts';

const ChatIndex = () => {
const navigation = useNavigation();
  const curUserId = useUserId();

  const filteredUsers = useMemo(()=>USERS.filter(user=>user.userid !== curUserId),[curUserId]);

  const renderItem = useCallback(({item}:{item:UserType}) => {
    return <TouchableOpacity style={styles.row} onPress={()=>{
      navigation.navigate(ScreenNames.CONVERSATION, {userid:item.userid});

    }}>
      <View style={styles.profilePic}>
        <Text style={styles.profileText}>{item.userid[0].toUpperCase()}</Text>
      </View>
        <Text>{item.userid}</Text>
    </TouchableOpacity>
  },[navigation]);

  return (
    <View>
      <AppBar title="Chat Screen"/>
      <FlatList data={filteredUsers} renderItem={renderItem}/>
    </View>
  );
};
export default ChatIndex;

const styles = StyleSheet.create({
  row :{
    borderBottomWidth:0.2,
    borderBottomColor:APP_COLORS.GREY,
    flexDirection:'row',
    alignItems:'center',
    gap:10,
    paddingHorizontal:20,
    paddingVertical:10
  },
  profilePic:{
    width:45, height:45,
    borderRadius:25,
    backgroundColor: APP_COLORS.PRIMARY,
    justifyContent:'center',
    alignItems:'center'

  },
  profileText:{
    color: APP_COLORS.TINT, fontSize:20, fontWeight:'bold'
  }
});