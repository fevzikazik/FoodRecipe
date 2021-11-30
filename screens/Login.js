import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground
} from 'react-native';

import { StatusBar } from 'expo-status-bar'; //<StatusBar style="auto" />
//import LinearGradient from "react-native-linear-gradient";
import { LinearGradient } from "expo-linear-gradient";

import { images, COLORS, SIZES, FONTS } from '../constants'
import { CustomButton } from '../components'


const Login = ({ navigation }) => {
    function renderHeader() {
        return (
            <View
                style={{
                    height: SIZES.height > 700 ? '65%' : '60%'
                }}
            >
                <ImageBackground
                    source={images.loginBackground}
                    style={{
                        flex: 1,
                        justifyContent: 'flex-end'
                    }}
                    resizeMode='cover'
                >
                    <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        colors={[
                            COLORS.transparent,
                            COLORS.black
                        ]}
                        style={{
                            height: 200,
                            justifyContent: 'flex-end',
                            paddingHorizontal: SIZES.padding
                        }}
                    >
                        <Text
                            style={{
                                width: "80%",
                                color: COLORS.white,
                                ...FONTS.largeTitle,
                                lineHeight: 45
                            }}
                        >
                            Cooking a Delicious Food Easily
                        </Text>
                    </LinearGradient>
                </ImageBackground>
            </View>
        )
    }
    
    function renderDetail() {
        return (
            <View
                style={{
                    flex: 1,
                    paddingHorizontal: SIZES.padding
                }}
            >
                {/* Description */}
                <Text
                    style={{
                        marginTop: SIZES.radius,
                        width: "70%",
                        color: COLORS.gray,
                        ...FONTS.body3
                    }}
                >
                    Discover more than 1200 food recipes in your hands and cooking it easily!
                </Text>
                {/* Buttons */}
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                    }}
                >
                    {/* Login */}
                    <CustomButton
                        buttonText="Login"
                        buttonContainerStyle={{
                            paddingVertical: 18,
                            borderRadius: 20
                        }}
                        colors={[COLORS.darkGreen, COLORS.lime]}
                        onPress={() => navigation.replace("Home")}
                    />
    
                    {/* Sign Up */}
                    <CustomButton
                        buttonText="Sign Up"
                        buttonContainerStyle={{
                            marginTop: 18,
                            paddingVertical: 18,
                            borderRadius: 20,
                            borderColor: COLORS.darkLime,
                            borderWidth: 1
                        }}
                        colors={[]}
                        onPress={() => navigation.replace("Home")}
                    />
    
                </View>
    
            </View>
        )
    }
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: COLORS.black,
            }}
        >
            <StatusBar style="light" />
            {/* Header */}
            {renderHeader()}

            {/* Detail */}
            {renderDetail()}

        </View>
    )
}

export default Login;