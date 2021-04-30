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
import {authSingUp} from '@store/sagas';

type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};

type NavigationProps = StackScreenProps<RootStackParamList, 'SignUp'>;

const SignUp = ({navigation}: NavigationProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const dispatch = useAppDispatch();

  const onSignUp = () => {
    if (password.trim() && name.trim() && email.trim()) {
      dispatch(authSingUp({email, password, name}));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />

      <TextInput
        style={styles.loginInput}
        onChangeText={setEmail}
        value={email}
        placeholder="Email"
      />
      <TextInput
        style={styles.loginInput}
        onChangeText={setName}
        value={name}
        placeholder="Name"
      />
      <TextInput
        onChangeText={setPassword}
        value={password}
        secureTextEntry={true}
        style={styles.loginInput}
        placeholder="Password"
      />
      <TouchableOpacity style={styles.loginButton} onPress={onSignUp}>
        <Text style={styles.loginButtonText}>SING UP</Text>
      </TouchableOpacity>
      <View style={styles.singIn}>
        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.singInText}>Sing In</Text>
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
    fontFamily: 'SFUIText-Bold',
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
