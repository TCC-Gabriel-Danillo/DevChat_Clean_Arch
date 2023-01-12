import { useState, useEffect, useCallback } from 'react';
import { LocalStorage } from '_/data/protocols/cache/localStorage';


export function usePersistentState<T>(key: string, initalValue: T, storage: LocalStorage) {
    const [value, setValue] = useState(initalValue);
    const [isCheckingState, setIsCheckingState] = useState(true);

    useEffect(() => {
        checkForStorageValue()
    }, []);

    const checkForStorageValue = useCallback(async () => {
        setIsCheckingState(true)
        const storageValue = await storage.getItem<T>(key)
        if(storageValue) setValue(storageValue)
        setIsCheckingState(false)
    },[storage])

    const setPersistentState = useCallback(async (newValue: T): Promise<void> => {
        await storage.setItem(key, newValue);
        setValue(newValue);
    },[storage]);


    return [value, setPersistentState, isCheckingState] as const;
}