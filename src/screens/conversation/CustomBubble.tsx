// CustomMessageSimpleWithStatus.tsx

import React, { useMemo, useState } from 'react';
import {
  FileAttachment,
  Gallery,
  MessageStatus,
  useMessageContext,
  useTranslationContext,
} from 'stream-chat-react-native';

import { StyleSheet, Text, View } from 'react-native';

export const CustomMessage = () => {
  const { message, isMyMessage, showAvatar } = useMessageContext();
  const { tDateTimeParser } = useTranslationContext();

  const [_, setContentWidth] = useState(0);

  const formattedDate = tDateTimeParser(message.created_at).format('h:mm A');

  const parentStyle = useMemo(
    () => ({
      alignSelf: isMyMessage ? 'flex-end' : 'flex-start',
      backgroundColor: isMyMessage ? '#000' : '#ededed',
    }),
    [isMyMessage],
  );

  const textStyle = useMemo(
    () => ({
      color: isMyMessage ? '#fff' : '#000',
    }),
    [isMyMessage],
  );

  const hasAttachments = useMemo(
    () => message?.attachments ?? [].length > 0,
    [message.attachments],
  );

  const fileAttachments = useMemo(
    () =>
      (message?.attachments ?? []).filter(
        attachment => attachment.type === 'file',
      ),
    [message.attachments],
  );

  if (message.deleted_at !== null) {
    return null;
  }

  return (
    <View style={[styles.wrapper, parentStyle]}>
      {hasAttachments && <Gallery />}
      {fileAttachments &&
        fileAttachments.map((attachment, index) => (
          <FileAttachment
            key={index}
            attachment={attachment}
            styles={{
              details: {
                margin: 0,
                padding: 0,
              },
            }}
          />
        ))}

      <Text style={textStyle}>{message.text}</Text>
      <View style={styles.metaRow}>
        <Text style={styles.time}>{formattedDate}</Text>
        <MessageStatus />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 10,
    paddingVertical: 5,

    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
    gap: 5,
  },
  time: {
    fontSize: 10,
    color: '#999',
  },
});
