import {PrayerData} from '@lib/interfaces';
import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  Vibration,
  View,
  TouchableOpacity,
} from 'react-native';
import {Form, Field} from 'react-final-form';
import {
  LongPressGestureHandler,
  State,
  Swipeable,
  TextInput,
} from 'react-native-gesture-handler';

const PrayerPreview: React.FC<{prayer: PrayerData}> = ({prayer}) => {
  const [isVisibleInput, setIsVisibleInput] = useState(false);

  const renderRightActions = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          //   dispatch(deleteColumn(column.id));
          Vibration.vibrate([0, 50]);
        }}>
        <Text style={[styles.delete]}>Delete</Text>
      </TouchableOpacity>
    );
  };

  return (
    <>
      {isVisibleInput ? (
        <Form
          onSubmit={value => {
            const {title} = value;
            if (title.trim()) {
              //   dispatch(
              //     updateColumn({
              //       id: column.id,
              //       title: title,
              //       description: column.description,
              //     }),
              //   );
            }
          }}
          initialValues={{title: prayer.title}}
          render={({form}) => (
            <Field name="title">
              {({input}) => (
                <TextInput
                  style={styles.prayerInput}
                  placeholder="Column title..."
                  onSubmitEditing={() => form.submit()}
                  onBlur={() => setIsVisibleInput(!isVisibleInput)}
                  onChangeText={input.onChange}
                  value={input.value}
                  placeholderTextColor="#9C9C9C"
                  selectionColor="#72A8BC"
                  autoFocus
                />
              )}
            </Field>
          )}
        />
      ) : (
        <Swipeable renderRightActions={renderRightActions}>
          <LongPressGestureHandler
            onHandlerStateChange={({nativeEvent}) => {
              if (nativeEvent.state === State.ACTIVE) {
                setIsVisibleInput(!isVisibleInput);
                Vibration.vibrate([0, 50]);
              }
            }}
            minDurationMs={500}>
            <View style={styles.prayer}>
              <Text onPress={() => {}} style={styles.prayerText}>
                {prayer.title}
              </Text>
            </View>
          </LongPressGestureHandler>
        </Swipeable>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  prayer: {
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    backgroundColor: 'white',
  },
  prayerText: {
    fontSize: 17,
    fontFamily: 'SFUIText-Light',
  },
  prayerInput: {
    fontSize: 17,
    fontFamily: 'SFUIText-Light',
  },
  delete: {
    height: '100%',
    paddingHorizontal: 20,
    alignSelf: 'center',
    paddingVertical: 26,
    color: 'white',
    fontSize: 13,
    backgroundColor: 'rgb(172, 82, 83)',
    fontFamily: 'SFUIText-Light',
  },
});

export default PrayerPreview;
