import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { APP_COLORS } from '../../constants/colors.ts';
import { useNavigation } from '@react-navigation/native';
import { ScreenNames } from '../../constants/screens.ts';
import { ChannelList } from 'stream-chat-react-native';
import ChatController from '../../stream/connect.ts';
import AppWrapper from '../../components/layouts/AppWrapper.tsx';
import { USERS } from '../../constants/tokens.ts';
import { useUserId } from '../../hooks/useUserId.ts';
import { ChannelOptions } from 'stream-chat';
import { ChannelPreviewStatus } from './CustomStatus.tsx';

const ChatIndex = () => {
  const navigation = useNavigation();
  const me = useUserId();

  const sort = {
    last_message_at: -1,
  };

  const options: ChannelOptions = {
    presence: true,
    state: true,
    watch: true,
  };

  const filters = {
    type: 'messaging',
    members: { $in: [me] },
  };

  const users = USERS;
  return (
    <AppWrapper title="Chats">
      <ChannelList
        sort={sort}
        filters={filters}
        options={options}
        PreviewStatus={ChannelPreviewStatus}
        enableOfflineSupport
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

      <Text
        style={{
          fontWeight: 'bold',
          margin: 20,
        }}
      >
        New Chat
      </Text>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}
      >
        {users.map(u => (
          <TouchableOpacity
            onPress={async () => {
              if (!u.userid || !me) return;
              const channel = ChatController.instance.channel('messaging', {
                members: [u.userid, me],
              });
              let resp;
              try {
                resp = await channel.create();
              } catch (e) {
                console.log('Create Channel Error ', e);
              }

              if (channel.id || resp.channel.id) {
                navigation.navigate(ScreenNames.CONVERSATION, {
                  channel: channel ?? resp.channel,
                });
              }
            }}
            style={{
              padding: 20,
            }}
          >
            <Text>{u.userid}</Text>
          </TouchableOpacity>
        ))}
      </View>
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
