import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
    createTables,
    getDBConnection,
    getUserSelectedZone,
} from '../../service/OfflineService';

const useHome = () => {
    const [timeZone, setTimeZone] = useState<string>(Intl.DateTimeFormat().resolvedOptions().timeZone);

    const initializeData = useCallback(async () => {
        try {
            const db = await getDBConnection();
            await createTables(db);
            const savedZone = await getUserSelectedZone(db);
            console.log("🚀 ~ useHome ~ savedZone:", savedZone);
            
            if (savedZone && savedZone.id) {
                setTimeZone(savedZone.id);
            } else {
                setTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone);
            }
        } catch (error) {
            console.error("Data initialization failed:", error);
            setTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            initializeData();
        }, [initializeData])
    );

    return {
        timeZone,
    };
};

export default useHome;