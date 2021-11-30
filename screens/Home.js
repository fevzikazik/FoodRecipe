import React from 'react';
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CategoryCard } from '../components'

import { FONTS, COLORS, SIZES, icons, images, dummyData } from '../constants'

const Home = ({ navigation }) => {
    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: COLORS.white
            }}
        >
            <FlatList
                data={dummyData.categories}
                keyExtractor={item => `${item.id}`}
                keyboardDismissMode='on-drag'
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <View></View>
                }
                renderItem={({ item }) => {
                    return (
                        <CategoryCard
                           categoryItem={item} 
                        />
                    )
                }}
                ListFooterComponent={
                    <View
                        style={{
                            marginBottom: 100
                        }}
                    >

                    </View>
                }
            />
        </SafeAreaView>
    )
}

export default Home;