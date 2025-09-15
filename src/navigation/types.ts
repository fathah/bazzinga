import { ScreenNames } from '../constants/screens.ts';

export type RootStackParamList = {
  [ScreenNames.HOME]: undefined;
  [ScreenNames.CHAT]: undefined;
  [ScreenNames.CONVERSATION]: {userid:string}
};