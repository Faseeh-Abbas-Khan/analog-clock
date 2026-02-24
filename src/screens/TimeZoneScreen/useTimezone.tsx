import { useEffect, useState, useCallback } from 'react';
import {
    createTables,
    getDBConnection,
    getTimeZonesFromDB,
    saveTimeZonesToDB,
    saveUserSelectedZone,
    TimeZone
} from '../../service/OfflineService';
import { API_URL } from '../../constant';
import { useNavigation } from '@react-navigation/native';

const useTimezone = () => {
    const [timeZones, setTimeZones] = useState<TimeZone[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigation = useNavigation();

    const initializeData = useCallback(async () => {
        try {
            const db = await getDBConnection();
            await createTables(db);
            const cachedZones = await getTimeZonesFromDB(db);
            if (cachedZones.length > 0) {
                setTimeZones(cachedZones);
            } else {
                setIsLoading(true);
                const response = await fetch(API_URL);
                const data = await response.json();

                if (data.status === 'OK' && data.zones) {
                    const fetchedZones: TimeZone[] = data.zones.map((zone: any) => ({
                        zoneName: zone.zoneName,
                        gmtOffset: zone.gmtOffset
                    }));

                    await saveTimeZonesToDB(db, fetchedZones);
                    setTimeZones(fetchedZones);
                } else {
                    console.error("API returned an error:", data.message);
                }
            }
        } catch (error) {
            console.error("Data initialization failed:", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        initializeData();
    }, [initializeData]);

    const handleZoneSelect = async (item: any) => {
        try {
            const db = await getDBConnection();
            await saveUserSelectedZone(db, item);
            navigation.goBack();
        } catch (error) {
            console.error("Failed to save timezone preference:", error);
        }
    };
    return {
        timeZones,
        isLoading,
        handleZoneSelect
    };
};

export default useTimezone;