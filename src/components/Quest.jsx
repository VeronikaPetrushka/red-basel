import React, { useState, useEffect } from "react"
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, ScrollView , Modal} from "react-native"
import LinearGradient from "react-native-linear-gradient";
import { useNavigation } from "@react-navigation/native";

const { height } = Dimensions.get('window');

const Quest = () => {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [index, setIndex] = useState(0);

    const nextStep = () => {
        setIndex((prevIndex) => prevIndex + 1);
        if(index === 1) {
            setModalVisible(false);
        }
    };    

    // useEffect(() => {
    //     setModalVisible(true);
    // }, []);

    return (
        <LinearGradient colors={["#000", "#300202"]} style={{width: '100%', height: '100%'}}>
            <View style={styles.container}>

                <Text style={styles.title}>Game-quest</Text>

                <ScrollView style={{width: '100%', marginTop: height * -0.2}}>
                    <Image source={require('../assets/quest/quest.png')} style={{width: '90%', alignSelf: 'center', resizeMode: 'contain'}} />
                    <View style={{width: '100%', borderColor: '#fff', borderWidth: 2, borderStyle: 'dashed', position: 'absolute', bottom: height + height * 0.2}} />
                    <Text style={[styles.title, {fontSize: 32, lineHeight: 36, marginBottom: 20, textAlign: 'center', position: 'absolute', bottom: height + height * 0.1, alignSelf: 'center'}]}>Finish</Text>
                    <Image source={require('../assets/decor/big-guy.png')} style={{width: '100%', resizeMode: 'contain', marginTop: height * -0.6}} />
                </ScrollView>

                {/* <Modal
                    visible={modalVisible}
                    transparent
                    animationType="fade"
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <Text style={styles.title}>Game-quest</Text>
                        <Text style={[styles.title, {fontSize: 32, lineHeight: 36, textAlign: 'center'}]}>It's a quest game!</Text>
                        <Image source={require('../assets/decor/left-guy.png')} style={{width: 600, height: 700, resizeMode: 'contain', position: 'absolute', top: 0, left: -90}} />
                        {
                            index === 0 && (
                                <>
                                    <Text style={[styles.title, {position: 'absolute', bottom: height * 0.3, alignSelf: 'center'}]}>Try to visit all the places</Text>
                                    <Text style={[styles.title, {opacity: 0.5, position: 'absolute', bottom: height * 0.25, alignSelf: 'center'}]}>And discover all the locations</Text>
                                </>
                            )
                        }
                        {
                            index === 1 && (
                                <>
                                    <Image source={require('../assets/decor/quest-route.png')} style={{width: '100%', height: '100%', resizeMode: 'contain', position: 'absolute', top: 50, right: 0}} />
                                    <Text style={[styles.title, {position: 'absolute', bottom: height * 0.43, right: -20, alignSelf: 'flex-end', width: '80%'}]}>Open new locations gradually</Text>
                                    <Text style={[styles.title, {opacity: 0.5, position: 'absolute', bottom: height * 0.22, alignSelf: 'center'}]}>It's interesting and fun!</Text>
                                </>
                            )
                        }
                        <View style={styles.dotsContainer}>
                            {[0, 1].map((dot) => (
                                <View 
                                    key={dot}
                                    style={[
                                        styles.dot,
                                        index === dot ? styles.activeDot : null
                                    ]}
                                />
                            ))}
                        </View>
                        <TouchableOpacity 
                            style={styles.nextBtn}
                            onPress={nextStep}
                            >
                            <Text style={styles.nextBtnText}>Next</Text>
                        </TouchableOpacity>
                    </View>
                </Modal> */}

            </View>
        </LinearGradient>
    )
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        paddingTop: height * 0.07,
        paddingHorizontal: 35,
    },

    title: {
        fontWeight: '700',
        fontSize: 24,
        color: '#fff',
        marginBottom: height * 0.03,
        lineHeight: 26
    },

    modalContainer: {
        flex: 1,
        paddingTop: height * 0.07,
        paddingHorizontal: 35,
        backgroundColor: "rgba(0, 0, 0, 0.95)"
    },

    nextBtn: {
        padding: 16,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#cf0000',
        borderRadius: 12,
        position: 'absolute',
        bottom: 80,
        left: 35
    },

    nextBtnText: {
        fontWeight: '700',
        fontSize: 20,
        color: '#fff',
        lineHeight: 21
    },

    dotsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: height * 0.19,
        alignSelf: 'center'
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

})

export default Quest;