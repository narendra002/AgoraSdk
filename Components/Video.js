import React, {useEffect, useRef, useState} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import {PermissionsAndroid, Platform} from 'react-native';
import {
  ClientRoleType,
  createAgoraRtcEngine,
  IRtcEngine,
  RtcSurfaceView,
  ChannelProfileType,
} from 'react-native-agora';
import {generateRandomNumber} from './Random';
import {agoraConfig} from '../utils/constants';

function VideoCall({setScreen}) {
  const {appId, channelName, token} = agoraConfig;
  const uid = generateRandomNumber();
  const agoraEngineRef = useRef(); // Agora engine instance
  const [isJoined, setIsJoined] = useState(false); // Indicates if the local user has joined the channel
  const [remoteUid, setRemoteUid] = useState(0); // Uid of the remote user
  const [message, setMessage] = useState(''); // Message to the user
  const getPermission = async () => {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        PermissionsAndroid.PERMISSIONS.CAMERA,
      ]);
    }
  };

  function showMessage(msg) {
    setMessage(msg);
  }

  const setupVideoSDKEngine = async () => {
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
          console.log(`Local user uid:` + uid);
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
        channelProfile: ChannelProfileType.ChannelProfileLiveBroadcasting,
      });
      agoraEngine.enableVideo();
      join();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    // Initialize Agora engine when the app starts
    setupVideoSDKEngine();
  });

  const join = async () => {
    console.log(isJoined);

    if (isJoined) {
      return;
    }
    try {
      agoraEngineRef.current?.setChannelProfile(
        ChannelProfileType.ChannelProfileCommunication,
      );
      agoraEngineRef.current?.startPreview();
      agoraEngineRef.current?.joinChannel(token, channelName, uid, {
        clientRoleType: ClientRoleType.ClientRoleBroadcaster,
      });
      console.log('test');
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
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.main}>
      {isJoined && remoteUid !== 0 ? (
        <View key={remoteUid} style={styles.videoContainer}>
          <RtcSurfaceView canvas={{uid: remoteUid}} style={styles.videoView} />
        </View>
      ) : (
        <View style={styles.message}>
          <ActivityIndicator />
          <Text>Waiting for a remote user to join</Text>
        </View>
      )}
      {isJoined && remoteUid !== 0 ? (
        <View key={0} style={styles.videoContainer}>
          <RtcSurfaceView canvas={{uid: 0}} style={styles.videoView} />
        </View>
      ) : (
        <Text style={styles.infoText}>Join a channel</Text>
      )}

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
}

const styles = StyleSheet.create({
  main: {flex: 1, backgroundColor: '#000000', position: 'relative'},
  videoContainer: {
    width: '100%',
    flex: 1,
  },
  videoView: {width: '100%', height: '100%'},

  smallView: {
    width: '40%',
    height: '50%',
    position: 'absolute',
    marginLeft: 'auto',
    top: 0,

    zIndex: 50,
  },

  head: {fontSize: 20},
  info: {color: 'red'},
  btnContainer: {
    position: 'absolute',
    bottom: 40,
    marginHorizontal: '44%',
  },
  callDisconnectIcon: {
    width: 60,
    height: 60,
  },
  infoText: {
    textAlign: 'center',
  },
  message: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
});

export default VideoCall;
