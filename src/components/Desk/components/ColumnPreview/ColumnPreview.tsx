import {useAppDispatch} from '@lib/hooks';
import {ColumnData} from '@lib/interfaces';
import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, Vibration} from 'react-native';
import {
  LongPressGestureHandler,
  State,
  Swipeable,
  TextInput,
} from 'react-native-gesture-handler';
import {deleteColumn, updateColumn} from '@store/sagas';
import {Form, Field} from 'react-final-form';

interface ColumnPreviewProps {
  onPress(): void;
  column: ColumnData;
}

const ColumnPreview: React.FC<ColumnPreviewProps> = ({onPress, column}) => {
  const [isVisibleInput, setIsVisibleInput] = useState(false);
  const dispatch = useAppDispatch();

  const renderRightActions = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          dispatch(deleteColumn(column.id));
          Vibration.vibrate([0, 50]);
        }}>
        <Text style={[styles.column, styles.delete]}>Delete</Text>
      </TouchableOpacity>
    );
  };

  const onUpdateColumn = (title: string) => {
    if (title.trim()) {
      dispatch(
        updateColumn({
          id: column.id,
          title: title,
          description: column.description,
        }),
      );
    }
  };

  return (
    <>
      {isVisibleInput ? (
        <Form
          onSubmit={value => onUpdateColumn(value.title)}
          initialValues={{title: column.title}}
          render={({form}) => (
            <Field name="title">
              {({input}) => (
                <TextInput
                  style={[styles.column, styles.columnInput]}
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
            <Text onPress={() => onPress()} style={styles.column}>
              {column.title}
            </Text>
          </LongPressGestureHandler>
        </Swipeable>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  column: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    flexDirection: 'row',
    borderColor: 'rgb(229, 229, 229)',
    borderWidth: 1,
    borderRadius: 4,
    marginTop: 10,
    fontSize: 17,
    backgroundColor: 'white',
    fontFamily: 'SFUIText-Medium',
  },
  columnInput: {
    borderColor: 'rgb(114, 168, 188)',
    borderWidth: 1,
  },
  delete: {
    color: 'white',
    fontSize: 17,
    backgroundColor: 'rgb(172, 82, 83)',
    fontFamily: 'SFUIText-Medium',
  },
});

export default ColumnPreview;
