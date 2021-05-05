import {StackScreenProps} from '@react-navigation/stack';
import {useAppDispatch} from '@lib/hooks';
import React from 'react';
import {
  SafeAreaView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  StatusBar,
} from 'react-native';
import {authSingIn} from '@store/sagas';
import {Form, Field} from 'react-final-form';
import {Loader} from '@components/Loader';
import {Button} from '@components/ui';

type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};

type NavigationProps = StackScreenProps<RootStackParamList, 'SignIn'>;

const SignIn = ({navigation}: NavigationProps) => {
  const dispatch = useAppDispatch();

  return (
    <SafeAreaView style={styles.body}>
      <View style={styles.container}>
        <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />

        <Loader />

        <Form
          onSubmit={value => {
            const {email, password} = value;
            if (password.trim() && email.trim()) {
              dispatch(authSingIn({email, password}));
            }
          }}
          initialValues={{email: '', password: ''}}
          render={({form}) => (
            <>
              <Field name="email">
                {({input}) => (
                  <TextInput
                    style={styles.loginInput}
                    onChangeText={input.onChange}
                    value={input.value}
                    placeholder="Email"
                    autoCapitalize="none"
                    placeholderTextColor="#9C9C9C"
                    selectionColor="#72A8BC"
                  />
                )}
              </Field>
              <Field name="password">
                {({input}) => (
                  <TextInput
                    onChangeText={input.onChange}
                    value={input.value}
                    secureTextEntry={true}
                    style={styles.loginInput}
                    placeholder="Password"
                    autoCapitalize="none"
                    placeholderTextColor="#9C9C9C"
                    selectionColor="#72A8BC"
                  />
                )}
              </Field>
              <Button onPress={() => form.submit()}>SING IN</Button>
            </>
          )}
        />

        <View style={styles.signUp}>
          <Text style={styles.text}>Don’t have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={[styles.signUpText, styles.text]}>Sign up</Text>
          </TouchableOpacity>
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
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 10,
  },
  loginInput: {
    width: '100%',
    borderColor: 'rgb(229, 229, 229)',
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    fontSize: 17,
  },
  loginButton: {
    backgroundColor: 'rgb(191, 179, 147)',
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginTop: 10,
  },
  loginButtonText: {
    fontSize: 17,
    color: 'rgb(255, 255, 255)',
    fontFamily: 'SFUIText-Bold',
  },
  signUp: {
    marginTop: 15,
    flexDirection: 'row',
  },
  signUpText: {
    color: 'rgb(191, 179, 147)',
    textDecorationLine: 'underline',
  },
  text: {
    fontSize: 17,
    fontFamily: 'SFUIText-Light',
  },
});

export default SignIn;
