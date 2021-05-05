import React from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';

const Loader = () => {
  return (
    <ActivityIndicator
      style={styles.loader}
      size="large"
      color="#72A8BC"
      animating={true}
    />
  );
};

const styles = StyleSheet.create({
  loader: {
    position: 'absolute',
    zIndex: 10,
    backgroundColor: 'rgba(255, 255, 255, .6)',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default Loader;
