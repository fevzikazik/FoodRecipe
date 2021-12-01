import React from 'react';
import {
    View,
    TouchableOpacity,
    Image,
    Text,
    Platform,
    StyleSheet
} from 'react-native';

import { SIZES, COLORS, FONTS, icons } from '../constants'

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
        </TouchableOpacity>
    )
}

export default TrendingCard;