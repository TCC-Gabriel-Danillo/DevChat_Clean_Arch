import { 
    CollectionReference,
    DocumentData,
    query, 
    where, 
    Query,
    orderBy
} from 'firebase/firestore';
import { ORDER, QueryOptions } from '_/data/protocols/repositories/options';


export const getRefFromArgs = (collection: CollectionReference<DocumentData>, options?: QueryOptions): Query<DocumentData> => {
    if(options?.filterArgs && options?.orderArgs) {
        const { field: filterField, op, value  } = options.filterArgs
        const { field: orderField, order } = options.orderArgs
        return query(collection, where(filterField, op, value), orderBy(orderField, order || ORDER.ASC)); 
    }

    if(options?.filterArgs){
        const { field: filterField, op, value  } = options.filterArgs
        return query(collection, where(filterField, op, value)); 
    }

    if(options?.orderArgs){
        const {field: orderField, order } = options.orderArgs
        return query(collection, orderBy(orderField, order)); 
    }

    return query(collection);
}