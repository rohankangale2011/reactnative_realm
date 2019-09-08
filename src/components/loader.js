import React from 'react';
import {ActivityIndicator, View, StyleSheet} from 'react-native';

function Loader(props) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#333" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#333',
    zIndex: 99999,
    opacity: 0.5,
  },
});

export default Loader;
