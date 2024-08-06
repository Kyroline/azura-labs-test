import { useState, useEffect } from 'react'

const useLocalStorage = (key) => {
    const [storedValue, setStoredValue] = useState(() => localStorage.getItem(key));

    useEffect(() => {
        const handleStorageChange = () => {
            setStoredValue(localStorage.getItem(key));
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [key]);

    return storedValue;
}

export default useLocalStorage;