/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  View,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import {useAppDispatch, useAppSelector} from '@lib/hooks';
import ColumnPreview from './components/ColumnPreview/ColumnPreview';
import {createColumn} from '@store/sagas';

const Desk = () => {
  const [isVisibleInput, setIsVisibleInput] = useState(false);
  const dispatch = useAppDispatch();
  const {columns} = useAppSelector(state => state);

  const onCreateColumn = (value: string) => {
    if (value.trim()) {
      dispatch(createColumn({title: value, description: ''}));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
      <View style={styles.header}>
        {!isVisibleInput ? (
          <>
            <Text style={styles.headerText}>My Desk</Text>
            <TouchableOpacity
              style={styles.headerPlus}
              onPress={() => setIsVisibleInput(!isVisibleInput)}>
              <Image source={require('@assets/images/plus.png')} />
            </TouchableOpacity>
          </>
        ) : (
          <TextInput
            style={styles.deskInput}
            placeholder="Add a desk..."
            onSubmitEditing={event => onCreateColumn(event.nativeEvent.text)}
            onBlur={() => setIsVisibleInput(!isVisibleInput)}
            autoFocus
          />
        )}
      </View>
      <View style={styles.listTodo}>
        <FlatList
          data={columns.list}
          renderItem={({item}) => <ColumnPreview key={item.id} column={item} />}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'flex-end',
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  header: {
    width: '100%',
    minHeight: 64,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    borderBottomWidth: 1,
    backgroundColor: 'white',
    borderBottomColor: 'rgb(229, 229, 229)',
  },
  headerText: {
    fontFamily: 'SFUIDisplay-Medium',
    fontSize: 17,
  },
  headerPlus: {
    position: 'absolute',
    right: 15,
    width: 16,
    height: 16,
  },
  listTodo: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  deskInput: {
    flex: 1,
    borderColor: 'rgb(229, 229, 229)',
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 17,
    padding: 10,
  },
});

export default Desk;
