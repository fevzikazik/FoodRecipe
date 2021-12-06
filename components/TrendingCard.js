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

const RecipeCardDetails = ({ recipeItem }) => {
    return (
        <View
            style={{
                flex: 1,
            }}
        >
            {/* Name & Bookmark */}
            <View
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}
            >
                <Text
                    style={{
                        width: '70%',
                        color: COLORS.white,
                        ...FONTS.h3,
                        fontSize: 15
                    }}
                >
                    {recipeItem.name}
                </Text>

                <Image
                    source={recipeItem.isBookmark ? icons.bookmarkFilled : icons.bookmark}
                    style={{
                        width: 20,
                        height: 20,
                        marginRight: SIZES.base,
                        tintColor: COLORS.darkGreen
                    }}
                />
            </View>
            {/* Duration & Serving */}
            <Text
                style={{
                    color: COLORS.lightGray,
                    ...FONTS.body5
                }}
            >
                {recipeItem.duration} | {recipeItem.serving} Serving
            </Text>


        </View>
    )
}

const RecipeCardInfo = ({ recipeItem }) => {
    if (Platform.OS === 'ios') {
        return (
            <BlurView
                tint="default"
                intensity={150}
                style={styles.recipeCardContainer}
            >
                <RecipeCardDetails
                    recipeItem={recipeItem}
                />
            </BlurView>
        )
    } else {
        return (
            <View
                style={{
                    ...styles.recipeCardContainer,
                    backgroundColor: COLORS.transparentBlack5
                }}
            >
                <RecipeCardDetails
                    recipeItem={recipeItem}
                />
            </View>
        )
    }

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