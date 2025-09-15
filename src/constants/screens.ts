import Home from '../screens/home';
import ChatIndex from '../screens/chat';
import ConversationIndex from '../screens/conversation';


export  const ScreenNames = {
  HOME: 'Home',
  CHAT: 'Chat',
  CONVERSATION: 'Conversation'
};

export  const Screens = [
  {name:ScreenNames.HOME, screen: Home},
  {name:ScreenNames.CHAT, screen: ChatIndex},
  {name:ScreenNames.CONVERSATION, screen: ConversationIndex},
];