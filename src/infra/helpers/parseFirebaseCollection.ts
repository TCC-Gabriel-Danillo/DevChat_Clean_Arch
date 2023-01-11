import { 
    Firestore, 
    collection, 
    CollectionReference,
    DocumentData,
} from 'firebase/firestore';

export const parseCollection = (collections: string[], firestore: Firestore): CollectionReference<DocumentData> => {
    if(collection.length > 1){
        return collection.apply(null, [firestore, ...collections])
    }

    return collection(firestore, collections[0])
}