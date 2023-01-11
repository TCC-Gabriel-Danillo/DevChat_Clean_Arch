import { 
    DocumentData,
    QuerySnapshot
} from 'firebase/firestore';

export const parseFirebaseSnapshot = <T>(snap: QuerySnapshot<DocumentData>): T[] => { 
    return snap.docs.map(d => ({...d.data(), id: d.id})) as T[]
}