import {StackScreenProps} from '@react-navigation/stack';
import {useAppDispatch} from '@lib/hooks';
import React, {useState} from 'react';
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

type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};

type NavigationProps = StackScreenProps<RootStackParamList, 'SignIn'>;

const SignIn = ({navigation}: NavigationProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();

  const onSignIn = () => {
    if (password.trim() && email.trim()) {
      dispatch(authSingIn({email, password}));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
      <TextInput
        style={styles.loginInput}
        onSubmitEditing={() => {}}
        onChangeText={setEmail}
        value={email}
        placeholder="Email"
      />
      <TextInput
        style={styles.loginInput}
        onSubmitEditing={() => {}}
        onChangeText={setPassword}
        value={password}
        secureTextEntry={true}
        placeholder="Password"
      />

      <TouchableOpacity style={styles.loginButton} onPress={onSignIn}>
        <Text style={styles.loginButtonText}>SING IN</Text>
      </TouchableOpacity>

      <View style={styles.singUp}>
        <Text style={styles.text}>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={[styles.singUpText, styles.text]}>Sing up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
  },
  singUp: {
    marginTop: 15,
    flexDirection: 'row',
  },
  singUpText: {
    color: 'rgb(191, 179, 147)',
    textDecorationLine: 'underline',
  },
  text: {
    fontSize: 17,
  },
});

export default SignIn;
