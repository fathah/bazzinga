import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppBar from '../common/AppBar.tsx';
import { APP_COLORS } from '../../constants/colors.ts';

type AppWrapperProps = {
  title?: string;
  children: React.ReactNode;
  hasBackButton?: boolean;
};

const AppWrapper = ({ title, hasBackButton, children }: AppWrapperProps) => {
  return (
    <SafeAreaView style={style.wrapper}>
      <AppBar title={title} hasBackButton={hasBackButton} />
      <View style={style.children}>{children}</View>
    </SafeAreaView>
  );
};
export default AppWrapper;

const style = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: APP_COLORS.PRIMARY,
  },
  children: {
    flex: 1,
    backgroundColor: APP_COLORS.BG,
  },
});
