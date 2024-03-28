import React, {useEffect, useRef, useState} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import VoiceCall from './Components/Voice';
import VideoCall from './Components/Video';
import ChatApp from './ChatApp';

function App() {
  const [screen, setScreen] = useState('home');

  return (
    <SafeAreaView style={styles.main}>
      {screen === 'home' ? <Category setScreen={setScreen} /> : null}
      {screen === 'Voice' ? <VoiceCall setScreen={setScreen} /> : null}
      {screen === 'Video' ? <VideoCall setScreen={setScreen} /> : null}
      {screen === 'Chat' ? <ChatApp setScreen={setScreen} /> : null}
    </SafeAreaView>
  );
}

function Category({setScreen}) {
  return (
    <View style={[styles.btnContainer, styles.main]}>
      <Button
        title="Voice Call"
        style={styles.btn}
        onPress={() => setScreen('Voice')}
      />
      <Button
        title="Video Call"
        style={styles.btn}
        onPress={() => setScreen('Video')}
      />
      <Button
        title="Chat"
        style={styles.btn}
        onPress={() => setScreen('Chat')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  scroll: {
    width: '100%',
    height: '100%',
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },

  btn: {
    height: 50,
  },
});

export default App;
