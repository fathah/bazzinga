import React from 'react';
import { Alert, StyleSheet } from 'react-native';
import { APP_COLORS } from '../../constants/colors.ts';
import { useNavigation } from '@react-navigation/native';
import { ScreenNames } from '../../constants/screens.ts';
import { ChannelList } from 'stream-chat-react-native';
import ChatController from '../../stream/connect.ts';
import AppWrapper from '../../components/layouts/AppWrapper.tsx';

const ChatIndex = () => {
  const navigation = useNavigation();

  const sort = {
    last_message_at: -1,
  };

  const options = {
    presence: true,
    state: true,
    watch: true,
  };

  return (
    <AppWrapper title="Chats">
      <ChannelList
        sort={sort}
        options={options}
        onSelect={channel => {
          const channelInst = ChatController.instance.channel(
            'messaging',
            channel.id,
          );

          if (!channel) {
            Alert.alert('Channel not found');
          }

          navigation.navigate(ScreenNames.CONVERSATION, {
            channel: channelInst,
          });
        }}
      />
    </AppWrapper>
  );
};
export default ChatIndex;

const styles = StyleSheet.create({
  row: {
    borderBottomWidth: 0.2,
    borderBottomColor: APP_COLORS.GREY,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  profilePic: {
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: APP_COLORS.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileText: {
    color: APP_COLORS.TINT,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
