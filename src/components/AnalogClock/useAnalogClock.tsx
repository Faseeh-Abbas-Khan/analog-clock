import { useWindowDimensions } from 'react-native'
import { useEffect, useState } from 'react'

const useAnalogClock = (timeZone?: string) => {
    const { width, height } = useWindowDimensions();
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timerId = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => {
            clearInterval(timerId);
        };
    }, []);

    const clockSize = Math.min(width, height) * 0.6;
    const targetZone = timeZone || Intl.DateTimeFormat().resolvedOptions().timeZone;

    let hours = time.getHours();
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();

    try {
       const formatter = new Intl.DateTimeFormat('en-US', {
            timeZone: targetZone,
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: false, 
        });

        const parts = formatter.formatToParts(time);
        parts.forEach(part => {
            if (part.type === 'hour') hours = parseInt(part.value, 10);
            if (part.type === 'minute') minutes = parseInt(part.value, 10);
            if (part.type === 'second') seconds = parseInt(part.value, 10);
        });
        if (hours === 24) hours = 0;
    } catch (error) {
        console.warn("Invalid timezone string, falling back to local time:", targetZone, error);
    }

    const ampm = hours >= 12 ? 'PM' : 'AM';
    const secDegrees = seconds * 6;
    const minDegrees = (minutes * 6) + (seconds * 0.1);
    const hourDegrees = ((hours % 12) * 30) + (minutes * 0.5);


    return {
        clockSize,
        hourDegrees,
        minDegrees,
        secDegrees,
        ampm
    }
}

export default useAnalogClock