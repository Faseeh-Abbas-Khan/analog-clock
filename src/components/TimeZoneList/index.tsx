import React, { useState, useMemo, useCallback } from 'react';
import { Text, TextInput, View, TouchableOpacity } from 'react-native';
import styles from './styles';
import { LegendList } from '@legendapp/list';

interface TimeZoneItem {
    id: string;
    title: string;
}

interface TimeZoneListProps {
    items: TimeZoneItem[];
    onItemPress: (item: any) => void;
}

const TimeZoneList: React.FC<TimeZoneListProps> = ({ items, onItemPress }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredItems = useMemo(() => {
        if (!searchQuery.trim()) return items;
        const lowerCaseQuery = searchQuery.toLowerCase();
        return items.filter(item =>
            item.title.toLowerCase().includes(lowerCaseQuery)
        );
    }, [items, searchQuery]);

    const renderItem = useCallback(({ item }: { item: TimeZoneItem }) => {
       
        return <TouchableOpacity
            style={[styles.itemContainer]}
            onPress={() => onItemPress(item)}
        >
            <Text style={styles.itemText}>{item.title}</Text>
        </TouchableOpacity>;
    }, [onItemPress]);

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Search time zone..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholderTextColor="#95a5a6"
                autoCorrect={false}
                clearButtonMode="while-editing"
            />

            <LegendList
                data={filteredItems}
                renderItem={renderItem}
                keyExtractor={(item: TimeZoneItem) => item.id}
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={styles.listContent}
                recycleItems
            />
        </View>
    );
};

export default TimeZoneList;