import AsyncStorage from '@react-native-community/async-storage';

class Auth {
  public TOKEN = 'auth_token';

  constructor() {
    AsyncStorage.setItem(this.TOKEN, '');
  }

  async setToken(token: string) {
    await AsyncStorage.setItem(this.TOKEN, token);
  }

  async getToken() {
    return await AsyncStorage.getItem(this.TOKEN);
  }

  async clearToken() {
    return await AsyncStorage.setItem(this.TOKEN, '');
  }
}

export default new Auth();
