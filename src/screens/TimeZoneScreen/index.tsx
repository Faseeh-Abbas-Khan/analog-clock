import React, { useMemo } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import TimeZoneList from '../../components/TimeZoneList';
import useTimezone from './useTimezone';
import styles from './styles';


const TimeZoneScreen = () => {

  const { timeZones, isLoading, handleZoneSelect } = useTimezone()


  const timeZoneItems = useMemo(() => {
    return timeZones.map(zone => ({
      id: zone.zoneName,
      title: `${zone.zoneName} (GMT${zone.gmtOffset >= 0 ? '+' : ''}${zone.gmtOffset / 3600})`
    }));
  }, [timeZones]);

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2c3e50" />
        <Text style={styles.loadingText}>Syncing Time Zones...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TimeZoneList onItemPress={handleZoneSelect}  items={timeZoneItems} />
    </View>
  );
};

export default TimeZoneScreen;