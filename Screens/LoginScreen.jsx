import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const LoginScreen = () => {
  const handleLoginWithProvider = provider => {
    // Handle authentication with the selected provider
  };

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleLoginWithProvider('facebook')}>
          <Icon name="facebook" size={40} color="#ffffff" />
          <Text style={styles.buttonText}>Login with Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleLoginWithProvider('google')}>
          <Icon name="google" size={40} color="#ffffff" />
          <Text style={styles.buttonText}>Login with Google</Text>
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleLoginWithProvider('apple')}>
          <Icon name="apple" size={40} color="#ffffff" />
          <Text style={styles.buttonText}>Login with Apple ID</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleLoginWithProvider('microsoft')}>
          <Icon name="windows" size={40} color="#ffffff" />
          <Text style={styles.buttonText}>Login with Microsoft</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#000',
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 18,
    marginBottom: 5,
  },
  infoText: {
    marginBottom: 20,
  },
  button: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    width: 100,
    marginLeft: 10,
    marginTop: 10,
    textAlign: 'center',
  },
});

export default LoginScreen;
