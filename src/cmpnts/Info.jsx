import React, { useState } from "react"
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, ImageBackground } from "react-native"
import { useNavigation } from "@react-navigation/native";

const { height } = Dimensions.get('window');

const Info = () => {
    const navigation = useNavigation();
    const [index, setIndex] = useState(0);  

    const nextStep = () => {
        setIndex((prevIndex) => (prevIndex + 1) % 3);

        if(index === 2) {
            navigation.navigate('HomeScreen')
        }
    };    

    return (
        <ImageBackground source={require('../ass/back/1.png')} style={{flex: 1}}>
            <View style={styles.container}>

                <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', zIndex: 10}}>
                    <View style={{backgroundColor: '#fff', borderRadius: 100, paddingHorizontal: 20}}>
                        <Image source={require('../ass/decor/logo.png')} style={{width: 144, height: 40, resizeMode: 'contain'}} />
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
                        <Text style={styles.skipText}>S k i p</Text>
                    </TouchableOpacity>
                </View>    

                {
                    index === 0 &&
                    (
                        <>
                            <Image source={require('../ass/guide/1/map.png')} style={{width: 326, height: height * 0.14, position: 'absolute', top: height * 0.18, left: -70, resizeMode: 'contain'}} />
                            <Image source={require('../ass/guide/1/item.png')} style={{width: 326, height: height * 0.14, position: 'absolute', top: height * 0.35, right: 35, resizeMode: 'contain'}} />
                        </>
                    )
                }
                {
                    index === 1 && (
                        <>
                            <Image source={require('../ass/decor/left-guy.png')} style={{width: 326, height: '100%', position: 'absolute', top: -100, left: 0, resizeMode: 'contain'}} />
                            <Image source={require('../ass/decor/mini-quest.png')} style={{width: 326, height: '100%', position: 'absolute', top: -150, right: 35, resizeMode: 'contain'}} />
                        </>
                    )
                }
                {
                    index === 2 && (
                        <>
                            <Image source={require('../ass/guide/3/right.png')} style={{width: 342, height: height * 0.23, position: 'absolute', top: height * 0.15, right: -100, resizeMode: 'contain'}} />
                            <Image source={require('../ass/guide/3/left.png')} style={{width: 342, height: height * 0.23, position: 'absolute', top: height * 0.27, left: -100, resizeMode: 'contain'}} />
                        </>
                    )
                }

                <View style={styles.infoContainer}>
                    <Text style={styles.title}>
                        {
                            index === 0 ? 'Plan your events' 
                            : index === 1 ? 'Go on a mini-quest game' 
                            : index === 2 ? 'Read the encyclopedia of places' 
                            : ''
                        }
                    </Text>

                    <Text style={styles.text}>
                        {
                            index === 0 ? 'Create the event you want, select a location on the map and enter details'
                            : index === 1 ? 'Go through each event step by step, keep track of your progress' 
                            : index === 2 ? 'See information about interesting places, attractions, read interesting facts about them, learn more!'
                            : ''
                        }
                    </Text>

                    <View style={styles.dotsBox}>
                        {[0, 1, 2].map((dot) => (
                            <View 
                                key={dot}
                                style={[
                                    styles.dot,
                                    index === dot ? styles.activeDot : null
                                ]}
                            />
                        ))}
                    </View>

                    <TouchableOpacity style={styles.btn} onPress={nextStep}>
                        <Text style={styles.btnText}>Next</Text>
                    </TouchableOpacity>
                </View>
                    
                </View>
        </ImageBackground>
    )
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: height * 0.07,
        paddingHorizontal: 35,
    },

    skipText: {
        fontWeight: '700',
        fontSize: 20,
        color: '#fff',
        lineHeight: 21
    },

    infoContainer: {
        width: '100%',
        alignItems: 'center',
        position: 'absolute',
        bottom: 50
    },

    title: {
        fontWeight: '700',
        fontSize: 24,
        color: '#fff',
        textAlign: 'center',
        marginBottom: height * 0.03,
        lineHeight: 26
    },

    text: {
        fontWeight: '600',
        fontSize: 14,
        color: '#fff',
        marginBottom: height * 0.06,
        lineHeight: 21
    },

    dotsBox: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: height * 0.03
    },

    dot: {
        width: 12,
        height: 12,
        margin: 5,
        borderRadius: 30,
        backgroundColor: '#cf0000',
        opacity: 0.7
    },

    activeDot: {
        width: 44,
        height: 8,
        borderRadius: 0,
        borderTopLeftRadius: 30,
        borderBottomRightRadius: 30,
        opacity: 1
    },

    btn: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        backgroundColor: '#a40000',
        padding: 15
    },

    btnText: {
        fontWeight: '700',
        fontSize: 20,
        color: '#fff',
        lineHeight: 21
    },

})

export default Info;