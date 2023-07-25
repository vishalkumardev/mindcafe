import {StyleSheet, Text, View, Modal, ActivityIndicator} from 'react-native';
import React from 'react';

const Loader = ({Loading}) => {
  return (
    <Modal transparent={true} visible={Loading}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <ActivityIndicator color="#121A3A" size={'large'} />
        </View>
      </View>
    </Modal>
  );
};

export default Loader;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    opacity: 0.5,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
  },
});
