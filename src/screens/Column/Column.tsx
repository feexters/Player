import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '@lib/types';
import React from 'react';
import {MyPrayers} from '@components/MyPrayers';
import {SubscribedPrayers} from '@components/SubscribedPrayers';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {StyleSheet, Text, View} from 'react-native';
import {SettingsIcon} from '@assets/images/svg/SettingsIcon';
import {useAppSelector} from '@lib/hooks';
import {Loader} from '@components/ui';

type NavigationProps = StackScreenProps<RootStackParamList, 'Column'>;

const Tab = createMaterialTopTabNavigator();

const Column: React.FC<NavigationProps> = ({route, navigation}) => {
  const {column} = route.params;
  const {isLoading} = useAppSelector(state => state.loader);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: column.title,
      headerLeft: () => <View />,
      headerRight: () => <SettingsIcon />,
      headerRightContainerStyle: {marginRight: 15},
    });
  }, [navigation, column.title]);

  return (
    <>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: 'rgb(114, 168, 188)',
          inactiveTintColor: 'rgb(200, 200, 200)',
          indicatorStyle: {
            backgroundColor: 'rgb(114, 168, 188)',
          },
          labelStyle: styles.label,
          style: styles.header,
          showIcon: true,
        }}>
        <Tab.Screen name="MyPrayers" options={{title: 'My Prayers'}}>
          {() => (
            <>
              {isLoading && <Loader />}
              <MyPrayers column={column} />
            </>
          )}
        </Tab.Screen>
        <Tab.Screen
          name="SubscribedPrayers"
          component={SubscribedPrayers}
          options={{
            tabBarLabel: ({color}) => {
              return (
                <View style={styles.label}>
                  <Text style={{color: color}}>SUBSCRIBED</Text>
                  <View style={styles.notifications}>
                    <Text style={styles.counter}>11</Text>
                  </View>
                </View>
              );
            },
          }}
        />
      </Tab.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 13,
    fontFamily: 'SFUIText-Medium',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: 'white',
    shadowOpacity: 0,
    elevation: 0,
    borderBottomColor: 'rgb(229, 229, 229)',
    borderBottomWidth: 1,
  },
  notifications: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginLeft: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(172, 82, 83)',
  },
  counter: {
    fontFamily: 'SFUIText-Medium',
    color: 'white',
    fontSize: 9,
    textAlign: 'center',
  },
});

export default Column;
