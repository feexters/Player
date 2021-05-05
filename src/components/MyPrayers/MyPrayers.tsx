import {PlusIcon} from '@assets/images/svg/PlusIcon';
import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {FlatList, TextInput} from 'react-native-gesture-handler';
import {Form, Field} from 'react-final-form';
import {SafeAreaView} from 'react-native-safe-area-context';
import {PrayerPreview} from './components/PrayerPreview';
import {Button} from '@components/ui';

const MyPrayers = () => {
  const [isHide, setIsHide] = useState(false);

  const prayers = {
    list: [
      {
        id: 1,
        description: '2131',
        title: 'Some Prayer',
        checked: false,
      },
      {
        id: 2,
        description: '2131',
        title: 'Some Prayer 2',
        checked: true,
      },
      {
        id: 3,
        description: '2131',
        title: 'Some Prayer 3 hjbibbhliubulib',
        checked: false,
      },
      {
        id: 4,
        description: '2131',
        title: 'Some Prayer 4',
        checked: false,
      },
    ],
  };

  return (
    <SafeAreaView style={styles.body}>
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
                    selectionColor="#72A8BC"
                  />
                )}
              </Field>
            </View>
          )}
        />

        <View style={styles.prayerList}>
          <FlatList
            data={prayers.list.filter(item => !item.checked)}
            removeClippedSubviews={false}
            renderItem={({item}) => (
              <PrayerPreview
                key={item.id}
                prayer={item}
                // onPress={() => onPress(item)}
              />
            )}
          />
        </View>

        <View style={styles.answered}>
          {isHide ? (
            <View style={styles.answeredButton}>
              <Button onPress={() => setIsHide(!isHide)}>
                SHOW ANSWERED PRAYERS
              </Button>
            </View>
          ) : (
            <>
              <View style={styles.answeredButton}>
                <Button onPress={() => setIsHide(!isHide)}>
                  HIDE ANSWERED PRAYERS
                </Button>
              </View>
              <View style={styles.answeredLine} />
              <View style={styles.prayerList}>
                <FlatList
                  data={prayers.list.filter(item => item.checked)}
                  removeClippedSubviews={false}
                  renderItem={({item}) => (
                    <PrayerPreview
                      key={item.id}
                      prayer={item}
                      // onPress={() => onPress(item)}
                    />
                  )}
                />
              </View>
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  prayerInput: {
    flex: 1,
    fontSize: 17,
    fontFamily: 'SFUIText-Regular',
  },
  prayerForm: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'rgb(229, 229, 229)',
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: 15,
    marginVertical: 16,
  },
  inputButton: {
    paddingHorizontal: 14,
  },
  prayerList: {
    width: '100%',
  },
  answered: {
    flex: 1,
    width: '100%',
  },
  answeredButton: {
    paddingVertical: 21,
  },
  answeredLine: {
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    marginHorizontal: 15,
  },
});

export default MyPrayers;
