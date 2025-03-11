import React, { useState, useEffect, useCallback } from "react"
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, ScrollView , Modal, ImageBackground } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import places from "../const/places";

const { height } = Dimensions.get('window');

const Places = () => {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [completedQuests, setCompletedQuests] = useState([]);

    const loadCompletedQuests = async () => {
        try {
            const storedData = await AsyncStorage.getItem("completedQuest");
            if (storedData) {
                setCompletedQuests(JSON.parse(storedData));
            }
        } catch (error) {
            console.error("Error retrieving completed quests:", error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            loadCompletedQuests();
        }, [])
    );

    useEffect(() => {
        setModalVisible(true);
    }, []);

    return (
        <ImageBackground source={require('../ass/back/2.png')} style={{flex: 1}}>
            <View style={styles.container}>

                <Text style={styles.title}>Places encyclopedia </Text>

                <ScrollView style={{width: '100%'}}>
                    {
                        places.map((place, index) => (
                            <View key={index} style={styles.card}>
                                <Image source={place.image} style={styles.cardImage} />
                                <Text style={styles.cardName}>{place.name}</Text>
                                <Text style={styles.cardDesc} numberOfLines={1} ellipsizeMode="tail">{place.description}</Text>
                                <TouchableOpacity onPress={() => navigation.navigate('ReadScreen' , {place: place})}>
                                    <Text style={styles.cardBtn}>Read more</Text>
                                </TouchableOpacity>
                            </View>
                        ))
                    }
                    {
                        completedQuests.map((place, index) => (
                            <View key={index} style={styles.card}>
                                <Image source={{uri: place.image}} style={styles.cardImage} />
                                <Text style={styles.cardName}>{place.name}</Text>
                                <Text style={styles.cardDesc} numberOfLines={1} ellipsizeMode="tail">{place.comment}</Text>
                                <TouchableOpacity onPress={() => navigation.navigate('ReadScreen' , {place: place})}>
                                    <Text style={styles.cardBtn}>Read more</Text>
                                </TouchableOpacity>
                            </View>
                        ))
                    }
                    <View style={{height: 120}} />
                </ScrollView>

                <Modal
                    visible={modalVisible}
                    transparent
                    animationType="fade"
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <Text style={styles.title}>Places encyclopedia</Text>
                        <Text style={[styles.title, {opacity: 0.5, fontSize: 20}]}>There will be interesting places in the city of Basel</Text>
                        <Text style={[styles.title, {opacity: 0.5, fontSize: 20}]}>Interesting facts about them</Text>
                        <Text style={[styles.title, {opacity: 0.5, fontSize: 20}]}>And much more</Text>
                        <Image source={require('../ass/decor/left-guy.png')} style={{width: 600, height: 700, resizeMode: 'contain', position: 'absolute', top: 100, left: -90}} />
                        <Text  style={[styles.title, {marginTop: 80, alignSelf: 'flex-end'}]}>What's there ?</Text>
                        <Image source={require('../ass/decor/arrow.png')} style={{width: '100%', height: 745, resizeMode: 'contain', position: 'absolute', top: 270, right: 0}} />
                        <TouchableOpacity 
                            style={styles.nextBtn}
                            onPress={() => setModalVisible(false)}
                            >
                            <Text style={styles.nextBtnText}>Next</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>

            </View>
        </ImageBackground>
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

    card: {
        width: '100%',
        padding: 16,
        borderRadius: 20,
        backgroundColor: '#fff',
        marginBottom: 26
    },

    cardImage: {
        width: '100%',
        height: 125,
        resizeMode: 'cover',
        borderRadius: 20,
        marginBottom: 16
    },

    cardName: {
        fontWeight: '700',
        fontSize: 14,
        color: '#000',
        marginBottom: 6,
        lineHeight: 17
    },

    cardDesc: {
        fontWeight: '400',
        fontSize: 12,
        color: '#000',
        marginBottom: 6,
        lineHeight: 14.63,
        width: '100%'
    },

    cardBtn: {
        fontWeight: '700',
        fontSize: 12,
        color: '#cf0000',
        lineHeight: 14.63
    },

    modalContainer: {
        flex: 1,
        paddingTop: height * 0.07,
        paddingHorizontal: 35,
        backgroundColor: "rgba(143, 3, 7, 0.95)"
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
    }

})

export default Places;