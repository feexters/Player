import {StackScreenProps} from '@react-navigation/stack';
import {useAppDispatch} from '@lib/hooks';
import React from 'react';
import {Form, Field} from 'react-final-form';
import {
  SafeAreaView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  StatusBar,
} from 'react-native';
import {authSingUp} from '@store/sagas';
import {Loader} from '@components/Loader';
import {Button} from '@components/ui';

type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};

type NavigationProps = StackScreenProps<RootStackParamList, 'SignUp'>;

const SignUp = ({navigation}: NavigationProps) => {
  const dispatch = useAppDispatch();

  const onSignUp = (email: string, password: string, name: string) => {
    if (password.trim() && name.trim() && email.trim()) {
      dispatch(authSingUp({email, password, name}));
    }
  };

  return (
    <SafeAreaView style={styles.body}>
      <View style={styles.container}>
        <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
        <Loader />

        <Form
          onSubmit={value => onSignUp(value.email, value.password, value.name)}
          initialValues={{email: '', name: '', password: ''}}
          render={({form}) => (
            <>
              <Field name="email">
                {({input}) => (
                  <TextInput
                    style={styles.loginInput}
                    onChangeText={input.onChange}
                    value={input.value}
                    autoCapitalize="none"
                    placeholder="Email"
                    placeholderTextColor="#9C9C9C"
                    selectionColor="#72A8BC"
                  />
                )}
              </Field>
              <Field name="name">
                {({input}) => (
                  <TextInput
                    style={styles.loginInput}
                    onChangeText={input.onChange}
                    value={input.value}
                    placeholder="Name"
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
                    autoCapitalize="none"
                    placeholder="Password"
                    placeholderTextColor="#9C9C9C"
                    selectionColor="#72A8BC"
                  />
                )}
              </Field>
              <Button onPress={() => form.submit()}>SING UP</Button>
            </>
          )}
        />

        <View style={styles.singIn}>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text style={styles.singInText}>Sing In</Text>
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
    padding: 10,
    backgroundColor: 'white',
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
  singIn: {
    marginTop: 15,
    flexDirection: 'row',
  },
  singInText: {
    color: 'rgb(191, 179, 147)',
    textDecorationLine: 'underline',
    fontSize: 17,
    fontFamily: 'SFUIText-Light',
  },
});

export default SignUp;
