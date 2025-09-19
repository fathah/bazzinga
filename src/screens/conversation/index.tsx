import React from 'react';
import { RouteProp, useRoute } from '@react-navigation/core';
import { RootStackParamList } from '../../navigation/types.ts';
import { ScreenNames } from '../../constants/screens.ts';
import {
  AttachButton,
  Channel,
  MessageInput,
  MessageList,
  useChannelContext,
} from 'stream-chat-react-native';
import {
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AppWrapper from '../../components/layouts/AppWrapper.tsx';
import { useUserId } from '../../hooks/useUserId.ts';
import Svg, { Path } from 'react-native-svg';
import { CustomMessageStatus } from './Status.tsx';

type ProfileScreenRouteProp = RouteProp<
  RootStackParamList,
  ScreenNames.CONVERSATION
>;

const ConversationIndex = () => {
  const route = useRoute<ProfileScreenRouteProp>();
  const navigation = useNavigation();
  const channel = route.params.channel;
  const myUserName = useUserId();

  if (!channel) {
    return (
      <View>
        <Text style={{ color: 'white' }}>No Channel</Text>
      </View>
    );
  }

  // channel.sendMessage({
  //   text: `Hey this is direct message from ${myUserName}`,
  // });

  return (
    <AppWrapper title={'Conversation'} hasBackButton>
      <KeyboardAvoidingView
        behavior="position"
        style={{
          flex: 1,
        }}
        keyboardVerticalOffset={112}
      >
        <Channel
          channel={channel}
          disableKeyboardCompatibleView
          InputButtons={InputButtons}
          allowThreadMessagesInChannel={false}
          enforceUniqueReaction={true}
          MessageStatus={CustomMessageStatus}
        >
          <MessageList />
          <MessageInput audioRecordingEnabled={true} />
        </Channel>
      </KeyboardAvoidingView>
    </AppWrapper>
  );
};
export default ConversationIndex;

const InputButtons = () => {
  const { channel: currentChannel } = useChannelContext();
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <AttachButton />
      <TouchableOpacity onPress={() => {}} style={{ marginRight: 10 }}>
        <ShareLocationIcon />
      </TouchableOpacity>
    </View>
  );
};

const ShareLocationIcon = props => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M12 12c-1.654 0-3-1.345-3-3 0-1.654 1.346-3 3-3s3 1.346 3 3c0 1.655-1.346 3-3 3zm0-4a1.001 1.001 0 101 1c0-.551-.449-1-1-1z"
      fill="#000"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 22s7-5.455 7-12.727C19 5.636 16.667 2 12 2S5 5.636 5 9.273C5 16.545 12 22 12 22zm1.915-4.857C15.541 15.032 17 12.277 17 9.273c0-1.412-.456-2.75-1.27-3.7C14.953 4.664 13.763 4 12 4s-2.953.664-3.73 1.573C7.456 6.523 7 7.86 7 9.273c0 3.004 1.459 5.759 3.085 7.87.678.88 1.358 1.614 1.915 2.166a21.689 21.689 0 001.915-2.166zm-.683 3.281s0 .001 0 0z"
      fill="#000"
    />
  </Svg>
);
