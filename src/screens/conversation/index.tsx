import React from 'react';
import { RouteProp, useRoute } from '@react-navigation/core';
import { RootStackParamList } from '../../navigation/types.ts';
import { ScreenNames } from '../../constants/screens.ts';
import {
  Channel as ChannelView,
  MessageInput,
  MessageList,
  useChatContext,
} from 'stream-chat-react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AppWrapper from '../../components/layouts/AppWrapper.tsx';
import { Channel } from 'stream-chat';

type ProfileScreenRouteProp = RouteProp<
  RootStackParamList,
  ScreenNames.CONVERSATION
>;

const ConversationIndex = () => {
  const route = useRoute<ProfileScreenRouteProp>();
  const navigation = useNavigation();
  const channel: Channel = route.params.channel;

  if (!channel) {
    return (
      <View>
        <Text style={{ color: 'white' }}>No Channel</Text>
      </View>
    );
  }

  console.log('Channel is==>', channel);

  return (
    <AppWrapper title={'Conversation'} hasBackButton>
      <ContextChecker />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ChannelView
          channel={channel}
          enableOfflineSupport
          audioRecordingEnabled
        >
          <MessageList />
          <MessageInput />
        </ChannelView>
      </GestureHandlerRootView>
    </AppWrapper>
  );
};
export default ConversationIndex;

function ContextChecker() {
  const chatContext = useChatContext();

  console.log('Chat Context==>', chatContext);
  return (
    <View>
      <Text>Context Checker</Text>
    </View>
  );
}
