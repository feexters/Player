import {SignIn} from '@components/SignIn';
import {SignUp} from '@components/SignUp';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Desk} from '@components/Desk';
import {useAppSelector} from '@lib/hooks';
import React from 'react';

const Stack = createStackNavigator();

const Home = () => {
  const {authorized} = useAppSelector(state => state.auth);

  return (
    <>
      {authorized ? (
        <Desk />
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

export default Home;
