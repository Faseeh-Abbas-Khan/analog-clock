import React, { useCallback } from 'react';
import { Button } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import TimeZoneScreen from '../screens/TimeZoneScreen';
import { useNavigation } from '@react-navigation/native';

const Stack = createNativeStackNavigator();


const TimeZoneButton = () => {

    const navigation = useNavigation()

    const handlePress = useCallback(() => {
        navigation.navigate('TimeZones' as never)
    }, [navigation])

    return (
        <Button onPress={handlePress} title="Timezones" />
    )
}

const AppRouter = () => {


    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    title: 'Clock',
                    headerRight: TimeZoneButton,
                }}
            />

            <Stack.Screen
                name="TimeZones"
                component={TimeZoneScreen}
                options={{
                    title: 'Time Zones',
                }}
            />
        </Stack.Navigator>
    );
};

export default AppRouter;