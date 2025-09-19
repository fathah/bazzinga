import React from 'react';
import { Chat } from 'stream-chat-react-native';
import streamIoClient from './instance.ts';

type ChatAuthProps = {
  children: React.ReactNode;
};

const ChatAuth = ({ children }: ChatAuthProps) => {
  return (
    <Chat client={streamIoClient} enableOfflineSupport>
      {children}
    </Chat>
  );
};
export default ChatAuth;
