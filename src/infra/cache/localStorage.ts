import AsyncStorage from '@react-native-async-storage/async-storage'
import { LocalStorage } from '_/data/protocols/cache/localStorage'

export class LocalStorageImp implements LocalStorage {
  async getItem<T>(key: string): Promise<T | undefined> {
    const data = await AsyncStorage.getItem(key)
    if (!data) return
    const dataObj = JSON.parse(data)
    return dataObj
  }
  async setItem(key: string, data: any): Promise<void> {
    if (typeof data === 'string') {
      await AsyncStorage.setItem(key, data)
      return
    }
    const dataStr = JSON.stringify(data)
    await AsyncStorage.setItem(key, dataStr)
  }
  async removeItem(key: string): Promise<void> {
    await AsyncStorage.removeItem(key)
  }
}