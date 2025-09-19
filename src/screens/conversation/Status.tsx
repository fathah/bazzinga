// components/CustomMessageStatus.tsx

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useMessageContext } from 'stream-chat-react-native';
import { CheckIcon, DoubleCheck, TripleCheck } from '../../svg/svg.tsx';

export const CustomMessageStatus = () => {
  const { message, readBy } = useMessageContext();

  const isRead = readBy === true || readBy > 1;

  if (message.status === 'sending') {
    return <Text style={styles.status}>🕓 </Text>;
  }

  if (message.status === 'failed') {
    return <Text style={styles.status}>❌</Text>;
  }

  // Check readBy list (users who have read the message)

  if (isRead) {
    return (
      <View style={styles.wrapper}>
        <TripleCheck />
      </View>
    );
  }

  if (message.status === 'received') {
    return (
      <View style={styles.wrapper}>
        <DoubleCheck />
      </View>
    );
  }

  if (message.status === 'sent') {
    return (
      <View style={styles.wrapper}>
        <CheckIcon />
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  status: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  wrapper: {
    height: 20,
    width: 20,
    marginRight: 10,
  },
});
