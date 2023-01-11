import { QueryOptions } from "./options"

export type VoidCallback<T>= (data: T[]) => void; 

export interface RealtimeDatabaseRepository {
    watch<T>(cb: VoidCallback<T>, args?: QueryOptions): void 
    unwatch(): void
}