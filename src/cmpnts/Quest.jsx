import React, { useState, useEffect, useCallback } from "react"
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, ScrollView , Modal} from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import quest from "../const/quest";

const { height } = Dimensions.get('window');

const Quest = () => {
    const navigation = useNavigation();
    const [questStatuses, setQuestStatuses] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [index, setIndex] = useState(0);

    useFocusEffect(
        useCallback(() => {
            loadQuestStatuses();
        }, [])
    );

    const loadQuestStatuses = async () => {
        try {
            const storedData = await AsyncStorage.getItem('questStatuses');
            if (storedData) {
                setQuestStatuses(JSON.parse(storedData));
            } else {
                const initialStatuses = quest.map((q, index) => ({
                    level: q.level,
                    current: index === 0,
                    completed: false
                }));
                setQuestStatuses(initialStatuses);
                await AsyncStorage.setItem('questStatuses', JSON.stringify(initialStatuses));
            }
        } catch (error) {
            console.error("Error loading quest statuses:", error);
        }
    };

    const nextStep = () => {
        setIndex((prevIndex) => prevIndex + 1);
        if(index === 1) {
            setModalVisible(false);
        }
    };    

    useEffect(() => {
        setModalVisible(true);
    }, []);

    const getImageSource = (status) => {
        if (status?.completed) {
            return require('../ass/quest/completed.png');
        } else if (status?.current) {
            return require('../ass/quest/current.png');
        } else {
            return require('../ass/quest/locked.png');
        }
    };

    return (
            <View style={styles.container}>

                <Text style={styles.title}>Game-quest</Text>

                <ScrollView style={{width: '100%'}}>
                    <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap'}}>
                        {quest.map((q, index) => {
                            const status = questStatuses.find(item => item.level === q.level);
                            return (
                                <TouchableOpacity 
                                    key={q.level} 
                                    style={styles.questBtn}
                                    disabled={!status?.current}
                                    onPress={() => navigation.navigate('MarkPlaceScreen', { quest: q })}
                                    >
                                    <Image source={getImageSource(status)} style={styles.btnImg} />
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                    <View style={{width: '100%', borderColor: '#fff', borderWidth: 2, borderStyle: 'dashed', marginVertical: 20}} />
                    <Text style={[styles.title, {fontSize: 32, lineHeight: 36, marginBottom: 20, textAlign: 'center'}]}>Finish</Text>
                    <Image source={require('../ass/quest/guy.png')} style={{width: '100%', resizeMode: 'contain'}} />
                    <View style={{height: 120}} />
                </ScrollView>

                <Modal
                    visible={modalVisible}
                    transparent
                    animationType="fade"
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <Text style={styles.title}>Game-quest</Text>
                        <Text style={[styles.title, {fontSize: 32, lineHeight: 36, textAlign: 'center'}]}>It's a quest game!</Text>
                        <Image source={require('../ass/decor/left-guy.png')} style={{width: 600, height: 700, resizeMode: 'contain', position: 'absolute', top: 0, left: -90}} />
                        {
                            index === 0 && (
                                <>
                                    <Text style={[styles.title, {position: 'absolute',  bottom: height > 700 ? height * 0.3 : height * 0.34, alignSelf: 'center'}]}>Try to visit all the places</Text>
                                    <Text style={[styles.title, {opacity: 0.5, position: 'absolute', bottom: height > 700 ? height * 0.23 : height * 0.24, alignSelf: 'center', textAlign: height > 700 ? 'center' : 'right'}]}>And discover all the locations</Text>
                                </>
                            )
                        }
                        {
                            index === 1 && (
                                <>
                                    <Image source={require('../ass/decor/quest-route.png')} style={{width: '100%', height: '100%', resizeMode: 'contain', position: 'absolute', top: 50, right: 0}} />
                                    <Text style={[styles.title, {position: 'absolute', bottom: height > 700 ? height * 0.42 : height * 0.4, right: -20, alignSelf: 'flex-end', width: '80%'}]}>Open new locations gradually</Text>
                                    <Text style={[styles.title, {opacity: 0.5, position: 'absolute', bottom: height > 700 ? height * 0.22 : height * 0.2, alignSelf: 'center'}]}>It's interesting and fun!</Text>
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
                </Modal>

            </View>
    )
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        paddingTop: height * 0.07,
        paddingHorizontal: 35,
        backgroundColor: '#8f0307'
    },

    title: {
        fontWeight: '700',
        fontSize: 24,
        color: '#fff',
        marginBottom: height * 0.03,
        lineHeight: 26
    },

    questBtn: {
        width: '50%',
        marginVertical: 20,
        alignItems: 'center',
         justifyContent: 'center'
    },

    btnImg: {
        width: 55,
        height: 55,
        resizeMode: 'contain'
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
        bottom: height * 0.08,
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