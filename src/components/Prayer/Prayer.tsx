import {StackScreenProps} from '@react-navigation/stack';
import {BackIcon} from '@assets/images/svg/BackIcon';
import {RootStackParamList} from 'lib/types';
import React from 'react';
import {View, Text, StyleSheet, Pressable, StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {HandsIcon} from '@assets/images/svg/HandsIcon';
import {PlusSmallIcon} from '@assets/images/svg/PlusSmallIcon';
import {Comments} from './components/Comments';
import {useAppSelector} from '@lib/hooks';

type NavigationProps = StackScreenProps<RootStackParamList, 'Prayer'>;

const Prayer: React.FC<NavigationProps> = ({route, navigation}) => {
  const {prayer} = route.params;
  const {prayers} = useAppSelector(state => state);
  const prayerDate = Date.parse(prayers.date);
  const date = new Date(prayerDate);

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const dateFormat = `${
    monthNames[date.getMonth()]
  } ${date.getDate()} ${date.getFullYear()}`;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: '',
      headerStyle: styles.header,
      cardShadowEnabled: false,
      headerLeft: () => (
        <Pressable onPress={navigation.goBack}>
          <BackIcon />
        </Pressable>
      ),
      headerRight: () => (
        <Pressable onPress={navigation.goBack}>
          <HandsIcon color="white" />
        </Pressable>
      ),
      headerLeftContainerStyle: {marginLeft: 15},
      headerRightContainerStyle: {marginRight: 15},
    });
  }, [navigation, prayer.title]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'#BFB393'} barStyle={'light-content'} />

      <View style={styles.headerWrap}>
        <Text style={styles.headerTitle}>{prayer.title}</Text>
      </View>

      <View style={[styles.prayedLast, styles.borderBottom]}>
        <View style={styles.prayedLine} />
        <Text style={styles.text}>Last prayed 8 min ago</Text>
      </View>

      <View style={[styles.prayerInfoRow, styles.borderBottom]}>
        <View style={[styles.prayerItemDate, styles.borderRight]}>
          <Text style={styles.prayerDateText}>{dateFormat}</Text>
          <Text style={styles.prayerInfoText}>Date Added</Text>
          <Text style={[styles.prayerInfoText, styles.prayerOpened]}>
            Opened for 4 days
          </Text>
        </View>
        <View style={[styles.prayerItem, styles.borderRight]}>
          <Text style={styles.prayerInfoNumber}>123</Text>
          <Text style={styles.prayerInfoText}>Times Prayed Total</Text>
        </View>
      </View>

      <View style={[styles.prayerInfoRow, styles.borderBottom]}>
        <View style={[styles.prayerItem, styles.borderRight]}>
          <Text style={styles.prayerInfoNumber}>63</Text>
          <Text style={styles.prayerInfoText}>Times Prayed by Me</Text>
        </View>
        <View style={[styles.prayerItem, styles.borderRight]}>
          <Text style={styles.prayerInfoNumber}>60</Text>
          <Text style={styles.prayerInfoText}>Times Prayed by Others</Text>
        </View>
      </View>

      <View style={[styles.mainWrap, styles.borderBottom]}>
        <View>
          <Text style={styles.mainTitle}>MEMBERS</Text>
          <View style={styles.memberList}>
            <View style={styles.memberImage}>
              <PlusSmallIcon color="white" />
            </View>
          </View>
        </View>
        <Text style={styles.mainTitle}>COMMENTS</Text>
      </View>

      <Comments prayer={prayer} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  header: {
    backgroundColor: '#BFB393',
    elevation: 0,
    shadowOpacity: 0,
  },
  headerWrap: {
    backgroundColor: '#BFB393',
    paddingHorizontal: 15,
    paddingBottom: 23,
  },
  headerTitle: {
    fontSize: 17,
    fontFamily: 'SFUIText-Light',
    color: 'white',
    lineHeight: 27,
  },
  text: {
    fontSize: 17,
    fontFamily: 'SFUIText-Regular',
  },
  prayedLast: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  borderBottom: {
    borderBottomColor: '#E5E5E5',
    borderBottomWidth: 1,
  },
  borderRight: {
    borderRightColor: '#E5E5E5',
    borderRightWidth: 1,
  },
  prayedLine: {
    height: 22,
    width: 3,
    marginRight: 10,
    borderRadius: 5,
    backgroundColor: '#AC5253',
  },
  prayerDateText: {
    color: '#BFB393',
    fontFamily: 'SFUIText-Regular',
    fontSize: 22,
    lineHeight: 26,
    marginBottom: 6,
  },
  prayerItemDate: {
    flex: 1,
    paddingTop: 32,
    paddingBottom: 11,
    paddingHorizontal: 15,
  },
  prayerItem: {
    flex: 1,
    paddingTop: 26,
    paddingBottom: 27,
    paddingHorizontal: 15,
  },
  prayerInfoRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  prayerInfoText: {
    fontSize: 13,
    lineHeight: 15,
  },
  prayerOpened: {
    color: '#72A8BC',
  },
  prayerInfoNumber: {
    color: '#BFB393',
    fontFamily: 'SFUIText-Light',
    fontSize: 32,
    lineHeight: 37,
  },
  mainWrap: {
    paddingTop: 20,
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  mainTitle: {
    color: '#72A8BC',
    fontFamily: 'SFUIText-Medium',
    fontSize: 13,
    lineHeight: 15,
  },
  memberImage: {
    backgroundColor: '#BFB393',
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  memberList: {
    marginTop: 15,
    marginBottom: 30,
  },
});

export default Prayer;
