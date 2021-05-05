import React, {useState} from 'react';
import {
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
import {ColumnPreview} from './components/ColumnPreview';
import {createColumn, getAllPrayers} from '@store/sagas';
import {ColumnData} from '@lib/interfaces';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '@lib/types';
import {Form, Field} from 'react-final-form';
import {Loader} from '@components/Loader';
import {PlusSmallIcon} from '@assets/images/svg/PlusSmallIcon';

type NavigationProps = StackScreenProps<RootStackParamList, 'Desk'>;

const Desk: React.FC<NavigationProps> = ({navigation}) => {
  const [isVisibleInput, setIsVisibleInput] = useState(false);
  const dispatch = useAppDispatch();
  const {columns} = useAppSelector(state => state);

  const onPress = (column: ColumnData) => {
    dispatch(getAllPrayers());
    navigation.navigate('Column', {
      column,
    });
  };

  const onCreate = (title: string) => {
    if (title.trim()) {
      dispatch(createColumn({title: title, description: ''}));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />

      <Loader />

      <View style={styles.header}>
        {!isVisibleInput ? (
          <>
            <Text style={styles.headerText}>My Desk</Text>
            <TouchableOpacity
              style={styles.headerPlus}
              onPress={() => setIsVisibleInput(!isVisibleInput)}>
              <PlusSmallIcon />
            </TouchableOpacity>
          </>
        ) : (
          <Form
            onSubmit={value => onCreate(value.title)}
            initialValues={{title: ''}}
            render={({form}) => (
              <Field name="title">
                {({input}) => (
                  <TextInput
                    style={styles.deskInput}
                    placeholder="Add a desk..."
                    onChangeText={input.onChange}
                    onSubmitEditing={() => form.submit()}
                    onBlur={() => setIsVisibleInput(!isVisibleInput)}
                    placeholderTextColor="#9C9C9C"
                    selectionColor="#72A8BC"
                    autoFocus
                  />
                )}
              </Field>
            )}
          />
        )}
      </View>

      <View style={styles.listTodo}>
        <FlatList
          data={columns.list}
          removeClippedSubviews={false}
          renderItem={({item}) => (
            <ColumnPreview
              key={item.id}
              column={item}
              onPress={() => onPress(item)}
            />
          )}
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
    fontFamily: 'SFUIText-Medium',
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
    fontFamily: 'SFUIText-Medium',
  },
  loader: {
    position: 'absolute',
    zIndex: 10,
  },
});

export default Desk;
