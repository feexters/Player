import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Button, Loader} from '@components/ui';
import {useAppSelector} from '@lib/hooks';
import {ColumnData} from '@lib/interfaces';
import {PrayerPreview} from '@components/PrayerPreview';

const MyPrayers: React.FC<{column: ColumnData}> = () => {
  const [isHide, setIsHide] = useState(false);
  const {isLoading} = useAppSelector(state => state.loader);

  const columnPrayers = [
    {
      id: 1,
      title: 'Some Prayer 1',
      checked: false,
      description: '',
    },
    {
      id: 2,
      title: 'Some Prayer 2',
      checked: true,
      description: '',
    },
    {
      id: 3,
      title: 'Some Prayer 3',
      checked: false,
      description: '',
    },
    {
      id: 4,
      title: 'Some Prayer 4',
      checked: true,
      description: '',
    },
  ];

  return (
    <SafeAreaView style={styles.body}>
      {isLoading && <Loader />}
      <View style={styles.container}>
        <View style={styles.prayerList}>
          <FlatList
            data={columnPrayers.filter(item => !item.checked)}
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
                  data={columnPrayers.filter(item => item.checked)}
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
