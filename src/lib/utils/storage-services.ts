import AsyncStorage from '@react-native-community/async-storage';

class StorageService {
  public USER = 'user';
  public COLUMNS = 'columns';
  public PLAYERS = 'players';
  public COMMENTS = 'comments';

  async getUser() {
    return await AsyncStorage.getItem(this.USER)!;
  }

  async getPlayers() {
    return await AsyncStorage.getItem(this.PLAYERS);
  }

  async getColumns() {
    return await AsyncStorage.getItem(this.COLUMNS);
  }

  async getComments() {
    return AsyncStorage.getItem(this.COMMENTS);
  }

  async addUser(value: string) {
    return await AsyncStorage.setItem(this.USER, value);
  }
}

export default new StorageService();
