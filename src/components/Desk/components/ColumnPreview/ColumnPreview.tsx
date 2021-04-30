import {ColumnData} from 'lib/interfaces';
import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {
  LongPressGestureHandler,
  State,
  Swipeable,
  TextInput,
} from 'react-native-gesture-handler';

const ColumnPreview: React.FC<{column: ColumnData}> = ({column}) => {
  const [isVisibleInput, setIsVisibleInput] = useState(false);
  const [title, setTitle] = useState(column.title);

  const renderLeftActions = () => {
    return (
      <TouchableOpacity onPress={() => {}}>
        <Text style={[styles.todo, styles.delete]}>Delete</Text>
      </TouchableOpacity>
    );
  };

  return (
    <>
      {isVisibleInput ? (
        <TextInput
          style={styles.todo}
          placeholder="Desk title..."
          onSubmitEditing={() => {}}
          onBlur={() => setIsVisibleInput(!isVisibleInput)}
          onChangeText={setTitle}
          value={title}
          autoFocus
        />
      ) : (
        <Swipeable renderRightActions={renderLeftActions}>
          <LongPressGestureHandler
            onHandlerStateChange={({nativeEvent}) => {
              if (nativeEvent.state === State.ACTIVE) {
                setIsVisibleInput(!isVisibleInput);
              }
            }}
            minDurationMs={500}>
            <Text style={styles.todo}>{column.title}</Text>
          </LongPressGestureHandler>
        </Swipeable>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  todo: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    flexDirection: 'row',
    borderColor: 'rgb(229, 229, 229)',
    borderWidth: 1,
    borderRadius: 4,
    marginTop: 10,
    fontSize: 17,
    backgroundColor: 'white',
  },
  delete: {
    color: 'white',
    fontSize: 17,
    backgroundColor: 'rgb(172, 82, 83)',
  },
});

export default ColumnPreview;
