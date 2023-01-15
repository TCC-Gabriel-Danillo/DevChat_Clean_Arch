import { QueryOptions } from "_/data/protocols/repositories/options";
import { RealtimeDatabaseRepository, VoidCallback } from "_/data/protocols/repositories/realtimeDatabaseRepository";

export class RealtimeDatabaseRepositoryStub implements RealtimeDatabaseRepository {
    watch<T>(cb: VoidCallback<T>, args?: QueryOptions | undefined): void {
        cb([])
    }
    unwatch(): void {
        throw new Error("Method not implemented.");
    }
}