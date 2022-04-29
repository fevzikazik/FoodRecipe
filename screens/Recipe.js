import React, { useRef } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Animated,
    Platform,
    StyleSheet
} from 'react-native';

import { BlurView } from 'expo-blur'

import { SIZES, FONTS, COLORS, icons } from '../constants'

const HEADER_HEIGHT = SIZES.height / 2.5;

const RecipeCreatorCardDetail = ({selectedRecipe}) => {
    return (
        <View
            style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center'
            }}
        >
            {/* Profile Photo */}
            <View
                style={{
                    width: 40,
                    height: 40,
                    marginLeft: 20
                }}
            >
                <Image 
                    source={selectedRecipe?.author?.profilePic}
                    style={{
                        width: 45,
                        height: 45,
                        borderRadius: 20
                    }}
                />
            </View>

            {/* Labels */}
            <View
                style={{
                    flex: 1,
                    marginHorizontal: 20,
                }}
            >
                <Text style={{color: COLORS.lightGreen1, ...FONTS.body4}}>Recipe by:</Text>
                <Text style={{color: COLORS.white2, ...FONTS.h3}}>{selectedRecipe?.author?.name}</Text>
            </View>

            {/* Button */}
            <TouchableOpacity
                style={{
                    width: 30,
                    height: 30,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 20,
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: COLORS.lightGreen1
                }}
                onPress={() => console.log('View Profile')}
            >
                <Image 
                    source={icons.rightArrow}
                    style={{
                        width: 15,
                        height: 15,
                        tintColor: COLORS.lightGreen1
                    }}
                />
            </TouchableOpacity>

        </View>
    )
}

const RecipeCreatorCardInfo = ({ selectedRecipe }) => {
    if (Platform.OS === 'ios') {
        return (
            <BlurView
                tint="default"
                intensity={150}
                style={styles.recipeCardContainer}
            >
                <RecipeCreatorCardDetail
                    selectedRecipe={selectedRecipe}
                />
            </BlurView>
        )
    } else {
        return (
            <View
                style={{
                    ...styles.recipeCardContainer,
                    backgroundColor: COLORS.transparentGray
                }}
            >
                <RecipeCreatorCardDetail
                    selectedRecipe={selectedRecipe}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    recipeCardContainer: {
        position: 'absolute',
        bottom: 10,
        left: 10,
        right: 10,
        height: 80,
        paddingVertical: SIZES.radius,
        paddingHorizontal: SIZES.base,
        borderRadius: SIZES.radius
    }
})

const Recipe = ({ navigation, route }) => {

    const [selectedRecipe, setSelectedRecipe] = React.useState(null);

    const scrollY = useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        let { recipe } = route.params
        setSelectedRecipe(recipe)
    }, [])

    function renderHeaderBar() {
        return (
            <View
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 60,
                    flexDirection: 'row',
                    alignItems: 'flex-end',
                    justifyContent: 'space-between',
                    paddingHorizontal: SIZES.padding,
                    paddingBottom: 10
                }}
            >
                {/* Screen Overlay */}
                <Animated.View
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: COLORS.transparent,
                        opacity: scrollY.interpolate({
                            inputRange: [-HEADER_HEIGHT -100, HEADER_HEIGHT - 70],
                            outputRange: [0, 1]
                        }),
                    }}
                />

                {/* Header Button Title */}
                <Animated.View
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        paddingBottom: 10,
                        opacity: scrollY.interpolate({
                            inputRange: [HEADER_HEIGHT - 100, HEADER_HEIGHT - 50],
                            outputRange: [0, 1]
                        }),
                        transform: [{
                            translateY: scrollY.interpolate({
                                inputRange: [HEADER_HEIGHT - 100, HEADER_HEIGHT - 50],
                                outputRange: [50, 0],
                                extrapolate: 'clamp'
                            })
                        }]
                    }}
                >
                    <Text style={{color: COLORS.lightGray2, ...FONTS.body4 }}>Recipe by:</Text>
                    <Text style={{color: COLORS.white2, ...FONTS.h3 }}>{selectedRecipe?.author?.name}</Text>
                </Animated.View>

                {/* Back Button */}
                <TouchableOpacity
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 35,
                        width: 35,
                        borderRadius: 18,
                        borderWidth: 1,
                        borderColor: COLORS.lightGray,
                        backgroundColor: COLORS.transparentBlack5 
                    }}
                   onPress={() => navigation.goBack()} 
                >
                    <Image 
                        source={icons.back}
                        style={{
                            width: 15,
                            height: 15,
                            tintColor: COLORS.lightGray
                        }}
                    />
                </TouchableOpacity>

                {/* Bookmark */}
                <TouchableOpacity
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 35,
                        width: 35
                    }}
                >
                    <Image 
                        source={selectedRecipe?.isBookmark ? icons.bookmarkFilled : icons.bookmark}
                        style={{
                            width: 30,
                            height: 30,
                            tintColor: COLORS.darkGreen
                        }}
                    />
                </TouchableOpacity>
                


            </View>
        )
    }

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
                <Animated.View
                    style={{
                        position: 'absolute',
                        bottom: 10,
                        left: 10,
                        right: 10,
                        transform: [
                            {
                                translateY: scrollY.interpolate({
                                    inputRange: [0, 170, 250],
                                    outputRange: [0, 0, 100],
                                    extrapolate: 'clamp'
                                })
                            }
                        ]
                    }}
                >
                    <RecipeCreatorCardInfo
                        selectedRecipe={selectedRecipe}
                    />
                </Animated.View>

            </View>
        )
    }

    function renderRecipeInfo() {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    height: 130,
                    width: SIZES.width,
                    paddingHorizontal: 30,
                    paddingVertical: 20,
                    alignItems: 'center',
                }}
            >
                {/* Recipe */}
                
                {/* Viewers */}

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
                        {renderRecipeInfo()}

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

            {/* Header Bar */}
            {renderHeaderBar()}

        </View>
    )
}

export default Recipe;