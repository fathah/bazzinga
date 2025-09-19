import streamIoClient from './instance.ts';
import { StreamChat } from 'stream-chat';

export default class ChatController {
  static instance: StreamChat = streamIoClient;

  static loginUser(id: string, token: string) {
    return streamIoClient.connectUser(
      {
        id,
      },
      token,
    );
  }

  static async logout() {
    await streamIoClient.disconnectUser();
    await streamIoClient.offlineDb?.resetDB();
  }
}
