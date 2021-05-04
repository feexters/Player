import {PlusIcon} from '@assets/images/svg/PlusIcon';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';

const MyPrayers = () => {
  const onCreatePrayer = (value: string) => {
    if (value.trim()) {
      // dispatch(createColumn({title: value, description: ''}));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.prayerForm}>
        <TouchableOpacity style={styles.inputButton}>
          <PlusIcon />
        </TouchableOpacity>
        <TextInput
          style={styles.prayerInput}
          placeholder="Add a prayer..."
          placeholderTextColor="#9C9C9C"
          onSubmitEditing={event => onCreatePrayer(event.nativeEvent.text)}
          selectionColor="#72A8BC"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
  },
  prayerInput: {
    flex: 1,
    fontSize: 17,
    fontFamily: 'SFUIText-Medium',
  },
  prayerForm: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'rgb(229, 229, 229)',
    borderWidth: 1,
    borderRadius: 10,
  },
  inputButton: {
    paddingHorizontal: 14,
  },
});

export default MyPrayers;
