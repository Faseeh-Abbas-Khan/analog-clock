import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import useAnalogClock from './useAnalogClock';

interface AnalogClockProps {
    timeZone?: string; 
}

const AnalogClock: React.FC<AnalogClockProps> = ({ timeZone }) => {
    const { clockSize, hourDegrees, minDegrees, secDegrees, ampm } = useAnalogClock(timeZone);
    const clockNumbers = Array.from({ length: 12 }, (_, i) => i + 1);

    return (
        <View style={[styles.clockFace, { width: clockSize, height: clockSize, borderRadius: clockSize / 2 }]}>
            
            {/* Render the Numbers */}
            {clockNumbers.map((num) => (
                <View 
                    key={num} 
                    style={[
                        styles.numberContainer, 
                        { transform: [{ rotate: `${num * 30}deg` }] }
                    ]}
                >
                    <Text style={[
                        styles.numberText, 
                        { transform: [{ rotate: `${-num * 30}deg` }] },
                        { fontSize: clockSize * 0.08 } 
                    ]}>
                        {num}
                    </Text>
                </View>
            ))}

            <View style={styles.ampmContainer}>
                <Text style={[styles.ampmText, { fontSize: clockSize * 0.06 }]}>
                    {ampm}
                </Text>
            </View>

            {/* Hands */}
            <View style={[styles.hand, styles.hourHand, { transform: [{ rotate: `${hourDegrees}deg` }] }]} />
            <View style={[styles.hand, styles.minuteHand, { transform: [{ rotate: `${minDegrees}deg` }] }]} />
            <View style={[styles.hand, styles.secondHand, { transform: [{ rotate: `${secDegrees}deg` }] }]} />
            
            {/* Center Dot */}
            <View style={styles.centerDot} />
        </View>
    );
};

export default AnalogClock;