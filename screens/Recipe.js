import React, { useRef } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Animated,
    Platform
} from 'react-native';

import { BlurView } from 'expo-blur'

import { SIZES, FONTS, COLORS, icons} from '../constants'

const HEADER_HEIGHT = SIZES.height/2.5;

const Recipe = ({ navigation, route }) => {

    const [selectedRecipe, setSelectedRecipe] = React.useState(null);

    const scrollY = useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        let { recipe } = route.params
        setSelectedRecipe(recipe)
    })

    function renderRecipeCardHeader() {
        return (
            <View
                style={{
                    marginTop: -1000,
                    paddingTop: 1000,
                    alignItems: 'center',
                    overflow: 'hidden'
                }}
            >
                {/* Background Image */}
                <Animated.Image 
                    source={selectedRecipe?.image}
                    resizeMode="contain"
                    style={{
                        height: HEADER_HEIGHT,
                        width: "200%",
                        transform: [
                            {
                                translateY: scrollY.interpolate({
                                    inputRange: [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
                                    outputRange: [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
                               })
                            },
                            {
                                scale: scrollY.interpolate({
                                    inputRange: [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
                                    outputRange: [2, 1, 0.75]
                                })
                            }
                        ]
                    }}
                />
                {/* Recipe Creator Card */}

            </View>
        )
    }

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: COLORS.white
            }}
        >
            <Animated.FlatList
                data={selectedRecipe?.ingredients}
                keyExtractor={item => `${item.id}`}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <View>
                        {/* Header */}
                        {renderRecipeCardHeader()}
                        {/* Info */}

                        {/* ingredient Title */}
                        
                    </View>
                }
                scrollEventThrottle={16}
                onScroll={Animated.event([
                    { nativeEvent: { contentOffset: { y: scrollY } } }
                ], { useNativeDriver: true })}
                renderItem={({ item }) => (
                    <View
                        style={{
                            flexDirection: 'row',
                            paddingHorizontal: 30,
                            marginVertical: 5,
                        }}
                    >
                        {/* Item */}
                        <View
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: 50,
                                width: 50,
                                borderRadius: 5,
                                background: COLORS.lightGray,
                            }}
                        >
                            <Image
                                source={item.icon}
                                style={{
                                    height: 40,
                                    width: 40,
                                }}
                            />
                        </View>

                        {/* Description */}
                        <View
                            style={{
                               flex: 1,
                               paddingHorizontal: 20,
                               justifyContent: 'center' 
                            }}
                        >
                            <Text
                                style={{
                                    ...FONTS.body3
                                }}
                            >
                                {item.description}
                            </Text>
                        </View>

                        {/* Quantity */}
                        <View
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <Text
                                style={{
                                    ...FONTS.body3
                                }}
                            >
                                {item.quantity}
                            </Text>
                        </View>


                    </View>
                )}
            />
        </View>
    )
}

export default Recipe;