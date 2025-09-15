import React, { useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { APP_COLORS } from '../../constants/colors.ts';
import { useAppSelector } from '../../redux/types/core.ts';
import { useDispatch } from 'react-redux';
import { clearUser } from '../../redux/slices/userSlice.ts';


type Props = {
  title?: string
}

const AppBar = ({title}:Props) => {
  const insets = useSafeAreaInsets();
  const userId = useAppSelector(state=>state.user).userId;
  const dispatch = useDispatch();

  const logout = useCallback(()=>{
    dispatch(clearUser())
  },[dispatch]);

  return (
    <View style={style.wrapper}>
      <View/>
      <View
        style={{
          height: insets.top,
        }}
      />
      <Text style={style.title}>{title}</Text>

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
    fontSize:18, fontWeight:'bold'
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
  }
});