import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

const Button: React.FC<{onPress(): void}> = ({onPress, children}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'rgb(191, 179, 147)',
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 5,
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 12,
    textAlign: 'center',
    color: 'rgb(255, 255, 255)',
    fontFamily: 'SFUIText-Bold',
  },
});

export default Button;
