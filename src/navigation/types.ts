import { ScreenNames } from '../constants/screens.ts';
import { Channel } from 'stream-chat';

export type RootStackParamList = {
  [ScreenNames.HOME]: undefined;
  [ScreenNames.CHAT]: undefined;
  [ScreenNames.CONVERSATION]: { channel: Channel };
};
