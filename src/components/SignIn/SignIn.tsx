import {StackScreenProps} from '@react-navigation/stack';
import {useAppDispatch, useAppSelector} from '@lib/hooks';
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
import {Loader} from '@components/ui/Loader';
import {Button} from '@components/ui';
import {validateEmail} from '@lib/utils';

type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};

type NavigationProps = StackScreenProps<RootStackParamList, 'SignIn'>;

const SignIn = ({navigation}: NavigationProps) => {
  const dispatch = useAppDispatch();
  const {isLoading} = useAppSelector(state => state.loader);

  const onSignIn = (email: string, password: string) => {
    if (password.trim() && email.trim()) {
      dispatch(authSingIn({email, password}));
    }
  };

  const onValidate = (email: string, password: string) => {
    const errors = {
      email: '',
      password: '',
    };

    if (!email) {
      errors.email = 'Required';
    } else if (!validateEmail(email)) {
      errors.email = 'Invalid address';
    }

    if (!password) {
      errors.password = 'Required';
    }

    if (errors.email || errors.password) {
      return errors;
    }

    return {};
  };

  return (
    <SafeAreaView style={styles.body}>
      <View style={styles.container}>
        <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />

        {isLoading && <Loader />}

        <Form
          onSubmit={value => onSignIn(value.email, value.password)}
          validate={value => onValidate(value.email, value.password)}
          initialValues={{email: '', password: ''}}
          render={({form}) => (
            <>
              <Field name="email">
                {({input, meta}) => (
                  <View
                    style={[
                      styles.inputWrap,
                      meta.touched && meta.error && styles.validationBorder,
                    ]}>
                    <TextInput
                      style={styles.loginInput}
                      onChangeText={input.onChange}
                      value={input.value}
                      placeholder="Email"
                      autoCapitalize="none"
                      placeholderTextColor="#9C9C9C"
                      selectionColor="#72A8BC"
                    />
                    <Text style={styles.validation}>
                      {meta.touched && meta.error}
                    </Text>
                  </View>
                )}
              </Field>
              <Field name="password">
                {({input, meta}) => (
                  <View
                    style={[
                      styles.inputWrap,
                      meta.touched && meta.error && styles.validationBorder,
                    ]}>
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
                    <Text style={styles.validation}>
                      {meta.touched && meta.error}
                    </Text>
                  </View>
                )}
              </Field>
              <Button onPress={form.submit}>SING IN</Button>
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
  inputWrap: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: 'rgb(229, 229, 229)',
    borderWidth: 1,
    borderRadius: 10,
    padding: 8,
    marginBottom: 10,
  },
  loginInput: {
    flex: 1,
    fontSize: 17,
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
  validation: {
    color: '#AC5253',
    fontSize: 17,
    fontFamily: 'SFUIText-Medium',
  },
  validationBorder: {
    borderColor: '#AC5253',
  },
});

export default SignIn;
