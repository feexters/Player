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
import {UserIcon} from '@assets/images/svg/UserIcon';
import {HandsIcon} from '@assets/images/svg/HandsIcon';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {VectorIcon} from '@assets/images/svg/VectorIcon';
import {deletePrayer, updatePrayer} from '@store/sagas';
import {useAppDispatch} from '@lib/hooks';

const PrayerPreview: React.FC<{prayer: PrayerData}> = ({prayer}) => {
  const [isVisibleInput, setIsVisibleInput] = useState(false);
  const dispatch = useAppDispatch();

  const renderRightActions = () => {
    return (
      <TouchableOpacity onPress={() => onDelete(prayer.id)}>
        <View style={styles.delete}>
          <Text style={styles.deleteText}>Delete</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const onChecked = (checked: boolean) => {
    dispatch(
      updatePrayer({
        id: prayer.id,
        title: prayer.title,
        description: prayer.description,
        checked: checked,
      }),
    );
  };

  const onChangeTitle = (title: string) => {
    if (title.trim()) {
      dispatch(
        updatePrayer({
          id: prayer.id,
          title: title,
          description: prayer.description,
          checked: prayer.checked,
        }),
      );
    }
  };

  const onDelete = (id: number) => {
    dispatch(deletePrayer(id));
    Vibration.vibrate([0, 50]);
  };

  return (
    <>
      {isVisibleInput ? (
        <Form
          onSubmit={value => onChangeTitle(value.title)}
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
            <View style={styles.wrap}>
              <View style={styles.prayer}>
                <View style={styles.prayerItemsWrap}>
                  <View style={styles.prayerLine} />

                  <Form
                    onSubmit={value => onChecked(value.checked)}
                    initialValues={{checked: prayer.checked}}
                    render={({form}) => (
                      <Field name="checked">
                        {({input}) => (
                          <BouncyCheckbox
                            size={22}
                            fillColor="#FFF"
                            unfillColor="#FFF"
                            isChecked={input.value}
                            iconStyle={styles.prayerCheckbox}
                            onPress={value => {
                              input.onChange(value);
                              form.submit();
                            }}
                            ImageComponent={() => <VectorIcon />}
                            disableText
                          />
                        )}
                      </Field>
                    )}
                  />

                  {!prayer.checked ? (
                    <Text
                      onPress={() => {}}
                      numberOfLines={1}
                      style={styles.prayerText}>
                      {prayer.title}
                    </Text>
                  ) : (
                    <Text
                      onPress={() => {}}
                      numberOfLines={1}
                      style={[styles.prayerText, styles.prayerTextLine]}>
                      {prayer.title}
                    </Text>
                  )}
                </View>

                <View style={styles.prayerIconsWrap}>
                  <View style={styles.prayerIcon}>
                    <UserIcon />
                    <Text style={styles.prayerIconText}>3</Text>
                  </View>
                  <View style={styles.prayerIcon}>
                    <HandsIcon />
                    <Text style={styles.prayerIconText}>123</Text>
                  </View>
                </View>
              </View>
            </View>
          </LongPressGestureHandler>
        </Swipeable>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    backgroundColor: 'white',
  },
  prayer: {
    flex: 1,
    paddingVertical: 24,
    borderBottomWidth: 1,
    marginHorizontal: 15,
    borderBottomColor: '#E5E5E5',
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  prayerItemsWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  prayerIconsWrap: {
    flexDirection: 'row',
  },
  prayerText: {
    width: '70%',
    fontSize: 17,
    fontFamily: 'SFUIText-Regular',
    marginLeft: 15,
  },
  prayerTextLine: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
  prayerCheckbox: {
    borderColor: '#514D47',
    borderRadius: 4,
    marginLeft: 15,
  },
  prayerInput: {
    fontSize: 17,
    fontFamily: 'SFUIText-Regular',
    paddingVertical: 24,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#72A8BC',
  },
  delete: {
    height: '100%',
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(172, 82, 83)',
  },
  deleteText: {
    color: 'white',
    fontSize: 13,
    fontFamily: 'SFUIText-Regular',
  },
  prayerLine: {
    height: 22,
    width: 3,
    borderRadius: 5,
    backgroundColor: '#AC5253',
  },
  prayerIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
  },
  prayerIconText: {
    fontSize: 12,
    fontFamily: 'SFUIText-Regular',
    marginLeft: 5,
  },
});

export default PrayerPreview;
