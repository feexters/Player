import {PlusIcon} from '@assets/images/svg/PlusIcon';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {Form, Field} from 'react-final-form';

const MyPrayers = () => {
  return (
    <View style={styles.container}>
      <Form
        onSubmit={value => {
          const {title} = value;
          if (title.trim()) {
            console.log(title);
            // dispatch(createPrayer({...}));
          }
        }}
        initialValues={{title: ''}}
        render={({form}) => (
          <View style={styles.prayerForm}>
            <TouchableOpacity
              style={styles.inputButton}
              onPress={() => {
                form.submit();
                form.change('title', '');
              }}>
              <PlusIcon />
            </TouchableOpacity>

            <Field name="title">
              {({input}) => (
                <TextInput
                  style={styles.prayerInput}
                  placeholder="Add a prayer..."
                  onChangeText={input.onChange}
                  onSubmitEditing={() => form.submit()}
                  placeholderTextColor="#9C9C9C"
                />
              )}
            </Field>
          </View>
        )}
      />
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
