import {Button} from '@components/ui';
import React from 'react';
import {View, Text, Modal, StyleSheet, TouchableOpacity} from 'react-native';

interface ModalProps {
  onCloseModal(): void;
  isVisible: boolean;
  onLogout(): void;
}

const LogoutModal: React.FC<ModalProps> = ({
  onCloseModal,
  isVisible,
  onLogout,
}) => {
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        onRequestClose={onCloseModal}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Are you sure you want to logout?
            </Text>
            <Button
              onPress={() => {
                onLogout();
                onCloseModal();
              }}>
              LOGOUT
            </Button>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={onCloseModal}>
              <Text style={styles.textStyle}>CANCEL</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '80%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 7,
  },
  buttonClose: {
    backgroundColor: '#AC5253',
    marginTop: 10,
  },
  textStyle: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'SFUIText-Bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 17,
    fontFamily: 'SFUIText-Regular',
  },
});

export default LogoutModal;
