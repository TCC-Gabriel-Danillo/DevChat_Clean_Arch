import { Unsubscribe } from '@firebase/util';
import { 
    getFirestore, 
    Firestore, 
    onSnapshot,  
} from 'firebase/firestore';
import { QueryOptions } from '_/data/protocols/repositories/options';
import { RealtimeDatabaseRepository } from '_/data/protocols/repositories/realtimeDatabaseRepository';
import { VoidCallback } from '_/domain/types/voidCallback';
import { getRefFromArgs, parseCollection, parseFirebaseSnapshot } from '../helpers';


export class FirebaseRealtimeDatabaseRepository  implements RealtimeDatabaseRepository {
    private unsubscribeFunction?: Unsubscribe

    private readonly firestore: Firestore = getFirestore()
    private readonly collections: string[]

    constructor(...collections: string[]){
        this.collections = collections
    }

    watch<T>(cb: VoidCallback<T>, args: QueryOptions): void {
        const collection = parseCollection(this.collections, this.firestore)
        const q = getRefFromArgs(collection, args);
        this.unsubscribeFunction = onSnapshot(q, (querySnapShot) => {
            const docs = parseFirebaseSnapshot<T>(querySnapShot)
            cb(docs)
        });
    }

    unwatch(): void{
        this.unsubscribeFunction?.()
    }
}