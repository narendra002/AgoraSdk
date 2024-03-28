import React, {useState, useEffect} from 'react';
import {Text, View} from 'react-native';
export default function Timer({isRunning}) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds + 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [isRunning]);

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return (
    <View>
      <Text>
        {hours.toString().padStart(2, '0')}:
        {minutes.toString().padStart(2, '0')}:
        {remainingSeconds.toString().padStart(2, '0')}
      </Text>
    </View>
  );
}
