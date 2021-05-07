import {SignIn} from '@components/SignIn';
import {SignUp} from '@components/SignUp';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Desk} from '@components/Desk';
import {useAppSelector} from '@lib/hooks';
import React from 'react';
import {Column} from '@screens/Column';
import {StyleSheet} from 'react-native';
import {Prayer} from '@components/Prayer';

const Stack = createStackNavigator();

const Home = () => {
  const {authorized} = useAppSelector(state => state.auth);

  return (
    <>
      {authorized ? (
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerTitleStyle: styles.headerTitle,
              headerLeft: () => null,
              headerStyle: styles.header,
            }}>
            <Stack.Screen
              name="Desk"
              component={Desk}
              options={{headerShown: false}}
            />
            <Stack.Screen name="Column" component={Column} />
            <Stack.Screen
              name="Prayer"
              component={Prayer}
              // options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      ) : (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="SignIn"
              component={SignIn}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUp}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'white',
    shadowOpacity: 0,
    elevation: 0,
  },
  headerTitle: {
    alignSelf: 'center',
    fontSize: 17,
  },
});

export default Home;
