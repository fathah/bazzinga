import React, { useCallback, useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import AppBar from '../../components/common/AppBar.tsx';
import { RouteProp, useRoute } from '@react-navigation/core';
import { RootStackParamList } from '../../navigation/types.ts';
import { ScreenNames } from '../../constants/screens.ts';
import ChatController from '../../stream/connect.ts';
import useUserId from '../../hooks/useUserId.ts';
import { APP_COLORS } from '../../constants/colors.ts';
import { screenWidth } from '../../utils/screen.ts';

type ProfileScreenRouteProp = RouteProp<RootStackParamList,ScreenNames.CONVERSATION>;

type MessageType  ={
  message: object;
  user: object;
}

const ConversationIndex = () => {
  const route = useRoute<ProfileScreenRouteProp>();
  const curUserId = useUserId();
  const {userid} = route.params;


  const channel = ChatController.instance.channel("messaging",{
    members: [curUserId, userid]
  });

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [userTyping, setUserTyping] = useState(false);


  const ListFooter = useCallback(()=>
   <View>
     {userTyping && <Text style={{
       paddingHorizontal: 10, color:'red',marginVertical:5
     }}>Typing...</Text>}</View> ,[userTyping]);


  useEffect(() => {
    // channel.create().then((res)=>{
    //   console.log("Channel Create Res==>",res);
    // }).catch((err)=>{
    //   console.log("Channel Create Err==>",err);
    // });
    channel.watch();

    const handleNewMessage = (event) => {
      console.log("Event==>",event);

     if(event.type === "message.new"){
       setMessages(prev=>[...prev, {
         message: event.message,
         user: event.user
       }]);
     }else if(event.type.includes("typing.") && event.user.id !== curUserId){
       setUserTyping(event.type === "typing.start");
     }
      // update your state with event.message if needed
    };

    // Add listener
    channel.on(handleNewMessage);

    // Cleanup
    return () => {
      channel.off(handleNewMessage);
    };

  }, []);

  const handleChangeText = async (text) => {
    setInput(text);

    if (text.length > 0) {
      await channel.keystroke(); // 🔑 send typing.start
    } else {
      await channel.stopTyping(); // 🔑 send typing.stop if cleared
    }
  };



  const renderItem = useCallback(({item}:{item:MessageType})=>{
    const isMe = item.user.id === curUserId;
    return <View style={{
      width: screenWidth,
      alignItems: isMe ? 'flex-end' : 'flex-start',
      marginTop:2,


    }}>
      <View style={{
       maxWidth: screenWidth * 0.4,
        backgroundColor: isMe ? APP_COLORS.PRIMARY : APP_COLORS.GREY,
        paddingHorizontal:10,
        paddingVertical:10,
        borderRadius: 6,
        marginHorizontal:10
      }}>
        <Text
        style={{
          color: isMe ? 'white' : 'black',
        }}
        >{item.message.text}</Text>

      </View>
    </View>
  },[]);

  const onSendMessage = useCallback(()=>{
    channel.sendMessage({
      text: input
    });
    setInput("")
  },[channel, input]);

  if(!userid) return <View>User Not Found</View>;





  return (
    <View style={styles.wrapper}>
      <AppBar title={userid}/>

      <FlatList style={styles.flatList} data={messages} renderItem={renderItem}
      ListFooterComponent={ListFooter}
      />
     <View style={styles.inputWrapper}>
       <TextInput
         onChangeText={handleChangeText}
         value={input}
         placeholderTextColor={"grey"}
         placeholder={"Type here..."}
         style={styles.input}
       /> <Button title={"Send"} onPress={onSendMessage}/>

     </View>
     </View>
  );
};
export default ConversationIndex;


const styles = StyleSheet.create({
  wrapper:{
    flex:1,
  },
  flatList:{
    flex:0.9
  },
  inputWrapper:{
   width:'100%',
    flexDirection:'row',
    justifyContent:'space-between',
    paddingBottom: 50,
    paddingHorizontal:10
  },
  input:{
    flex:1,

    borderWidth:0.5, borderColor:APP_COLORS.GREY,
    padding:15
  }
});