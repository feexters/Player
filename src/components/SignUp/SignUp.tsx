import {StackScreenProps} from '@react-navigation/stack';
import {useAppDispatch, useAppSelector} from '@lib/hooks';
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
import {Loader} from '@components/ui/Loader';
import {Button} from '@components/ui';
import {validateEmail} from '@lib/utils';

type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};

type NavigationProps = StackScreenProps<RootStackParamList, 'SignUp'>;

const SignUp = ({navigation}: NavigationProps) => {
  const dispatch = useAppDispatch();
  const {isLoading} = useAppSelector(state => state.loader);

  const onSignUp = (email: string, password: string, name: string) => {
    dispatch(
      authSingUp({
        email: email.trim(),
        password: password.trim(),
        name: name.trim(),
      }),
    );
  };

  const onValidate = (email: string, password: string, name: string) => {
    const errors = {
      email: '',
      password: '',
      name: '',
    };

    if (!email || email.trim()) {
      errors.email = 'Required';
    } else if (!validateEmail(email)) {
      errors.email = 'Invalid address';
    }

    if (!password || password.trim()) {
      errors.password = 'Required';
    }

    if (!name || name.trim()) {
      errors.name = 'Required';
    }

    if (errors.email || errors.password || errors.name) {
      return errors;
    } else {
      return {};
    }
  };

  return (
    <SafeAreaView style={styles.body}>
      <View style={styles.container}>
        <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
        {isLoading && <Loader />}

        <Form
          onSubmit={value => onSignUp(value.email, value.password, value.name)}
          initialValues={{email: '', name: '', password: ''}}
          validate={value =>
            onValidate(value.email, value.password, value.name)
          }
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
                      autoCapitalize="none"
                      placeholder="Email"
                      placeholderTextColor="#9C9C9C"
                      selectionColor="#72A8BC"
                    />
                    <Text style={styles.validation}>
                      {meta.touched && meta.error}
                    </Text>
                  </View>
                )}
              </Field>
              <Field name="name">
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
                      placeholder="Name"
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
                      autoCapitalize="none"
                      placeholder="Password"
                      placeholderTextColor="#9C9C9C"
                      selectionColor="#72A8BC"
                    />
                    <Text style={styles.validation}>
                      {meta.touched && meta.error}
                    </Text>
                  </View>
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
  validation: {
    color: '#AC5253',
    fontSize: 17,
    fontFamily: 'SFUIText-Medium',
  },
  validationBorder: {
    borderColor: '#AC5253',
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
