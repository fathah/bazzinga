import React, { useCallback, useEffect } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AppBar from '../../components/common/AppBar.tsx';
import { useAppSelector } from '../../redux/types/core.ts';
import UserMenu from './UserMenu.tsx';
import { APP_COLORS } from '../../constants/colors.ts';
import { setUser } from '../../redux/slices/userSlice.ts';
import { USERS } from '../../constants/tokens.ts';
import { useDispatch } from 'react-redux';
import ChatController from '../../stream/connect.ts';

const Home = () => {
  const curUserId = useAppSelector(state => state.user.userId);
  const dispatch = useDispatch();

  const onLogin = useCallback((userId:string, token:string)=>{
    console.log("Loggin in", userId);
    ChatController.loginUser(userId, token).then((res)=>{
      console.log("res==>",res);
    }).catch((er)=>{
      console.log("Error==>",er);
    })
    dispatch(
    setUser({
      token,
      name: userId,
      userId,
    }));
  },[dispatch]);


  useEffect(() => {
    if (curUserId) {
      const user = USERS.find(user=>user.userid === curUserId);
      if(user){
        ChatController.loginUser(user.userid, user.token).then((res)=>{
          console.log("res==>",res);
        }).catch((er)=>{
          console.log("Error==>",er);
        })
      }

    }
  }, []);

  const renderItem = useCallback(({item}) => {
    return (<TouchableOpacity
      onPress={()=>onLogin(item.userid, item.token)}
      style={style.cell}> <Text>{item.userid??""}</Text></TouchableOpacity>);
  },[onLogin]);

  return (
    <View  style={style.wrapper} >
      <AppBar title="2050 Whisper"/>
      <View  style={style.container}>
        {curUserId ? <UserMenu/>: <View style={style.loginContainer}>
          <Text style={style.title}>Select an user to Login</Text>

          <FlatList data={USERS} numColumns={3} renderItem={renderItem}/>

        </View>}
      </View>

    </View>
  );
};
export default Home;


const style = StyleSheet.create({
  wrapper:{
    flex:1,

  },
  container:{
    flex:1, justifyContent:'center', alignItems:'center',
    padding: 20
  },
  loginContainer:{
    width:'100%',
    justifyContent:'center', alignItems:'center',gap:10,
  },
  title:{
    fontSize: 20
  },
  cell:{
    paddingHorizontal: 20,
    paddingVertical: 10, borderWidth:1,
    borderColor:APP_COLORS.PRIMARY, margin:10,
    borderRadius:50
  }
});