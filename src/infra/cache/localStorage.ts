import { default as RnAsyncStorage } from '@react-native-async-storage/async-storage'
import { LocalStorage } from '_/data/protocols/cache/localStorage'

export class AsyncStorage implements LocalStorage {
  async getItem<T>(key: string): Promise<T | undefined> {
    const data = await RnAsyncStorage.getItem(key)
    if (!data) return
    const dataObj = JSON.parse(data)
    return dataObj
  }
  async setItem(key: string, data: any): Promise<void> {
    if (typeof data === 'string') {
      await RnAsyncStorage.setItem(key, data)
      return
    }
    const dataStr = JSON.stringify(data)
    await RnAsyncStorage.setItem(key, dataStr)
  }
  async removeItem(key: string): Promise<void> {
    await RnAsyncStorage.removeItem(key)
  }
}