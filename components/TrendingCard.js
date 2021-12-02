import React from 'react';
import {
    View,
    TouchableOpacity,
    Image,
    Text,
    Platform,
    StyleSheet
} from 'react-native';

import { SIZES, COLORS, FONTS, icons } from '../constants';

import { BlurView } from 'expo-blur'

const RecipeCardInfo = ({recipeItem}) => {
    return (
        <BlurView
            blurType="dark"
            style={styles.recipeCardContainer}
        >

        </BlurView>
    )
}

const TrendingCard = ({ containerStyle, recipeItem, onPress }) => {
    return (
        <TouchableOpacity
            style={{
                width: 200,
                height: 280,
                marginTop: SIZES.radius,
                marginRight: 10,
                borderRadius: SIZES.radius,
                ...containerStyle
            }}
            onPress={onPress}
        >
            {/* Background Image */}
            <Image
                source={recipeItem.image}
                resizeMode="cover"
                style={{
                    width: 200,
                    height: 280,
                    borderRadius: SIZES.radius,
                }}
            />

            {/* Category */}
            <View
                style={{
                    position: "absolute",
                    top: 16,
                    left: 12,
                    paddingHorizontal: SIZES.radius,
                    paddingVertical: 5,
                    backgroundColor: COLORS.transparentGray,
                    borderRadius: SIZES.radius
                }}
            >
                <Text
                    style={{
                        color: COLORS.white,
                        ...FONTS.h4
                    }}
                >
                    {recipeItem.category}
                </Text>
            </View>

            {/* Card Info */}
            <RecipeCardInfo
                recipeItem={recipeItem}
            />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    recipeCardContainer: {
        position: 'absolute',
        bottom: 10,
        left: 10,
        right: 10,
        height: 100,
        paddingVertical: SIZES.radius,
        paddingHorizontal: SIZES.base,
        borderRadius: SIZES.radius
    }
})

export default TrendingCard;