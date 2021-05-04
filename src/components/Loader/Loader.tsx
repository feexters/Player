import {useAppSelector} from '@lib/hooks';
import React from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';

const Loader = () => {
  const {loading} = useAppSelector(state => state.loader);
  return (
    <>
      {loading && (
        <ActivityIndicator
          style={styles.loader}
          size="large"
          color="#72A8BC"
          animating={loading}
        />
      )}
    </>
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
