import { LocalStorage } from "_/data/protocols/cache/localStorage";

export class LocalStorageRepositoryStub implements LocalStorage {
    async getItem<T>(key: string): Promise<T | undefined> {
        return Promise.resolve({} as T);
    }
    async setItem(key: string, data: any): Promise<void> {
        return Promise.resolve()
    }
    async removeItem(key: string): Promise<void> {
        return Promise.resolve()
    }
}