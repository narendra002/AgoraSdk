import React, {useRef, useState, useEffect} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {PermissionsAndroid, Platform} from 'react-native';
import {
  ClientRoleType,
  createAgoraRtcEngine,
  IRtcEngine,
  ChannelProfileType,
} from 'react-native-agora';
import {generateRandomNumber} from './Random';
import {agoraConfig} from '../utils/constants';
import Timer from './Timer';

const VoiceCall = ({setScreen}) => {
  const {appId, channelName, token} = agoraConfig;
  const uid = generateRandomNumber();
  const agoraEngineRef = useRef(); // Agora engine instance
  const [isJoined, setIsJoined] = useState(false); // Indicates if the local user has joined the channel
  const [remoteUid, setRemoteUid] = useState(0); // Uid of the remote user
  const [message, setMessage] = useState(''); // Message to the user
  const [timer, setTimer] = useState(false);
  const getPermission = async () => {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ]);
    }
  };

  function showMessage(msg) {
    setMessage(msg);
  }
  useEffect(() => {
    // Initialize Agora engine when the app starts
    setupVoiceSDKEngine();
  });

  const setupVoiceSDKEngine = async () => {
    try {
      // use the helper function to get permissions
      if (Platform.OS === 'android') {
        await getPermission();
      }
      agoraEngineRef.current = createAgoraRtcEngine();
      const agoraEngine = agoraEngineRef.current;
      agoraEngine.registerEventHandler({
        onJoinChannelSuccess: () => {
          console.log('Successfully joined the channel ' + channelName);
          setIsJoined(true);
        },
        onUserJoined: (_connection, Uid) => {
          console.log('Remote user joined with uid ' + Uid);
          setRemoteUid(Uid);
        },
        onUserOffline: (_connection, Uid) => {
          console.log('Remote user left the channel. uid: ' + Uid);
          setRemoteUid(0);
        },
      });
      agoraEngine.initialize({
        appId: appId,
      });
      join();
    } catch (e) {
      console.log(e);
    }
  };

  console.log(isJoined);

  const join = async () => {
    if (isJoined) {
      return;
    }
    try {
      agoraEngineRef.current?.setChannelProfile(
        ChannelProfileType.ChannelProfileCommunication,
      );
      agoraEngineRef.current?.joinChannel(token, channelName, uid, {
        clientRoleType: ClientRoleType.ClientRoleBroadcaster,
      });
      setTimer(true);
    } catch (e) {
      console.log(e);
    }
  };
  const leave = () => {
    try {
      agoraEngineRef.current?.leaveChannel();
      setRemoteUid(0);
      setIsJoined(false);
      showMessage('You left the channel');
      setScreen('home');
      setTimer(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.main}>
      {!isJoined ? <Text>Join a channel</Text> : null}
      {isJoined && remoteUid !== 0 ? (
        <View style={styles.timer}>
          <Text>Call Connected </Text>
          <Timer isRunning={timer} />
        </View>
      ) : (
        <View style={styles.message}>
          <ActivityIndicator />
          <Text>Waiting for a remote user to join</Text>
        </View>
      )}
      <Text>{message}</Text>

      <View style={styles.btnContainer}>
        {isJoined ? (
          <TouchableOpacity onPress={leave}>
            <Image
              source={require('../assets/circle.png')}
              style={styles.callDisconnectIcon}
            />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#000000',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  infoText: {
    textAlign: 'center',
  },
  btnContainer: {
    position: 'absolute',
    bottom: 40,
    marginHorizontal: '44%',
  },
  callDisconnectIcon: {
    width: 60,
    height: 60,
  },
  message: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  timer: {
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default VoiceCall;
