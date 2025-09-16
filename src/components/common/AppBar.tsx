import React, { useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { APP_COLORS } from '../../constants/colors.ts';
import { useAppSelector } from '../../redux/types/core.ts';
import { useDispatch } from 'react-redux';
import { clearUser } from '../../redux/slices/userSlice.ts';
import {useNavigation} from "@react-navigation/native";


type Props = {
  title?: string;
  hasBackButton?: boolean
}

const AppBar = ({title,hasBackButton}:Props) => {
  const userId = useAppSelector(state=>state.user).userId;
  const dispatch = useDispatch();
  const navigator = useNavigation();

  const logout = useCallback(()=>{
    dispatch(clearUser())
  },[dispatch]);

  const goBack = useCallback(()=>navigator.goBack(),[navigator]);

  return (
    <View style={style.wrapper}>


      <View style={style.row}>

        {hasBackButton ? <TouchableOpacity onPress={goBack}>
          <Text style={style.backBtnLabel}>&larr;</Text>
        </TouchableOpacity>:<View/>}
        <Text style={style.title}>{title}</Text>
        <View/>
      </View>

      <TouchableOpacity onPress={logout} style={style.userId}>
        <Text style={style.text}>{userId??'Not Logged'}</Text>
      </TouchableOpacity>
    </View>
  );
};
export default AppBar;

const style = StyleSheet.create({
  wrapper:{
    backgroundColor:APP_COLORS.PRIMARY,
    justifyContent:'center',
    alignItems:'center',
    paddingVertical: 15,
    position:'relative'
  },
  title:{
    color:'white',
    fontSize:18,
    fontWeight:'bold',
    textAlign:'left'
  },
  userId:{
    position:'absolute',
    bottom:12,
    right:15
  },
  text:{
    color:'white',
    fontSize:12,
    borderWidth:1, borderColor:'grey',
    paddingVertical:5,
    paddingHorizontal:10,
    borderRadius:5
  },
  row:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    width:'100%',
    paddingHorizontal:20
  },
  backBtn :{},
  backBtnLabel:{
    color:'white',
    fontSize:20
  }
});