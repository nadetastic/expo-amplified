import AsyncStorage from '@react-native-async-storage/async-storage';

const MYSTORAGE_KEY_PREFIX = '@MyStorage:';
let dataMemory = {};

class MyStorage {
  static syncPromise = null;

  static setItem(key, value) {
    console.log('MyStorage: setItem -', key, value)
    AsyncStorage.setItem(MYSTORAGE_KEY_PREFIX + key, value);
    dataMemory[key] = value;
    return dataMemory[key];
  }

  static async getItem(key) {
    console.log('MyStorage: getItem -', key)
    try {
      if (Object.prototype.hasOwnProperty.call(dataMemory, key)) {
        return dataMemory[key];
      }
      let currentItem = await AsyncStorage.getItem(MYSTORAGE_KEY_PREFIX + key);
      if (!currentItem) {
        currentItem = await AsyncStorage.getItem(key);
        if (!currentItem) return undefined;
        dataMemory[key] = currentItem;
        return dataMemory[key];
      }
      dataMemory[key] = currentItem;
      return dataMemory[key];
    } catch (error) {
        console.log('MyStorage: getItem error -', error)
      return undefined;
    }
  }
  static removeItem(key) {
    console.log('MyStorage: removeItem -', key)
    AsyncStorage.removeItem(MYSTORAGE_KEY_PREFIX + key);
    return delete dataMemory[key];
  }

  static clear() {
    console.log('MyStorage: clear')
    dataMemory = {};
    return dataMemory;
  }

  static sync() {
    if (!MyStorage.syncPromise) {
      MyStorage.syncPromise = new Promise((res, rej) => {
        AsyncStorage.getAllKeys((errKeys, keys) => {
          if (errKeys) rej(errKeys);
          const memoryKeys = keys.filter((key) =>
            key.startsWith(MYSTORAGE_KEY_PREFIX)
          );
          AsyncStorage.multiGet(memoryKeys, (err, stores) => {
            if (err) rej(err);
            stores.map((result, index, store) => {
              const key = store[index][0];
              const value = store[index][1];
              const memoryKey = key.replace(MYSTORAGE_KEY_PREFIX, '');
              dataMemory[memoryKey] = value;
            });
            res();
          });
        });
      });
    }
    return MyStorage.syncPromise;
  }
}

export default MyStorage;