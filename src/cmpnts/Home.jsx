import React, { useState, useEffect } from "react"
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, ScrollView, Modal, ImageBackground } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";

const { height } = Dimensions.get('window');

const Home = () => {
    const navigation = useNavigation();
    const [planned, setPlanned] = useState([]);
    const [history, setHistory] = useState([]);
    const [type, setType] = useState('plan');
    const [region, setRegion] = useState({
        latitude: 47.5596,
        longitude: 7.5886,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
    });

    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        setModalVisible(true);
    }, []);

    useEffect(() => {
        const fetchHikes = async () => {
            try {
                const storedHikes = await AsyncStorage.getItem('hikes');
                if (storedHikes) {
                    const hikes = JSON.parse(storedHikes);
                    const today = new Date();

                    const futureHikes = hikes.filter(hike => new Date(hike.date) >= today);
                    const pastHikes = hikes.filter(hike => new Date(hike.date) < today);

                    setPlanned(futureHikes);
                    setHistory(pastHikes);
                }
            } catch (error) {
                Alert.alert("Error", "Failed to load hikes.");
            }
        };

        fetchHikes();
    }, []);

    const items = (type === "plan" ? planned : history) || [];

    const hasHikes = items.length > 0;

    return (
        <ImageBackground source={require('../ass/back/2.png')} style={{flex: 1}}>
            <View style={styles.container}>

                <Text style={styles.title}>Home</Text>

                <View style={{ width: '100%', height: 140, borderRadius: 12, overflow: 'hidden', alignSelf: 'center', marginBottom: 20}}>
                    {hasHikes && (
                        <>
                            <View style={{ width: '100%', height: 140, borderRadius: 12, overflow: 'hidden', alignSelf: 'center', marginBottom: 20 }}>
                                <MapView
                                    style={{ width: '100%', height: '100%' }}
                                    initialRegion={region}
                                >
                                    {items.map((item, index) => (
                                        item?.location ? (
                                            <Marker
                                                key={index}
                                                coordinate={{
                                                    latitude: item.location.latitude,
                                                    longitude: item.location.longitude,
                                                }}
                                                title={item.name || "Unknown Location"}
                                                description={item.address || ""}
                                            />
                                        ) : null
                                    ))}
                                </MapView>
                            </View>
                            <Text style={[styles.subTitle, {textAlign: 'right'}]}>Map</Text>
                        </>
                    )}
                </View>

                <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 25, zIndex: 10}}>
                    <TouchableOpacity 
                        style={[styles.typeBtn, type === 'plan' && {backgroundColor: '#fff'}]} 
                        onPress={() => setType('plan')}
                        >
                        <Text style={[styles.typeBtnText, type === 'plan' && {color: '#cf0000', opacity: 0.5}]}>Plan a hike</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.typeBtn, type === 'history' && {backgroundColor: '#fff'}]} 
                        onPress={() => setType('history')}
                        >
                        <Text  style={[styles.typeBtnText, type === 'history' && {color: '#cf0000', opacity: 0.5}]}>History</Text>
                    </TouchableOpacity>
                </View>

                <Text style={[styles.subTitle, {textAlign: 'center'}]}>Plan your hike</Text>

                {
                    hasHikes ? (
                        <View style={{width: '100%', alignItems: 'center'}}>
                            <TouchableOpacity style={styles.createBtn} onPress={() => navigation.navigate('CreateHikeScreen')}>
                                <Text style={styles.createBtnText}>Create</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View style={{width: '100%', flexGrow: 1}}>
                            <Text style={[styles.noText, {textAlign: 'right', marginRight: 30, marginTop: 50}]}>Add the first event</Text>
                            <Text style={[styles.noText, {textAlign: 'right'}]}>While your place is empty</Text>

                            <Image source={require('../ass/decor/left-guy.png')} style={styles.guyImg} />

                            <TouchableOpacity 
                                style={[styles.noCreateBtn, 
                                { bottom: height > 700 ? height * 0.28 : height * 0.17}]} 
                                onPress={() => navigation.navigate('CreateHikeScreen')}
                                >
                                <Text style={styles.createBtnText}>Create</Text>
                            </TouchableOpacity>
                        </View>
                    )
                }

                {
                    items.length > 0 && (
                        <ScrollView style={{width: '100%', marginTop: height * 0.03}}>
                            {items.map((item, index) => {
                            const hikeDate = new Date(item.date);
                            const hikeTime = new Date(item.time);

                            const formattedDate = `${hikeDate.getDate().toString().padStart(2, "0")}.${(hikeDate.getMonth() + 1).toString().padStart(2, "0")}.${hikeDate.getFullYear()}`;
                            const formattedTime = hikeTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

                            return (
                                    <View key={index} style={{width: '100%', marginBottom: 20}}>
                                        <View style={styles.hikeItem}>
                                            <Text style={styles.hikeName}>{item.name}</Text>
                                            <Text style={styles.hikeDetails}>{formattedDate}</Text>
                                            <Text style={styles.hikeDetails}>{formattedTime}</Text>
                                            <Image source={require('../ass/decor/right-guy.png')} style={{width: '100%', height: 120, position: 'absolute', bottom: 0, right: 0}} />
                                        </View>
                                        <Text style={styles.hikeAddress}>{item.address}</Text>
                                    </View>
                                );
                            })}

                            <View style={{height: 120}} />
                        </ScrollView>
                    )
                }

                <Modal
                    visible={modalVisible}
                    transparent
                    animationType="fade"
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <Text style={styles.title}>Hello, dear user!</Text>
                        <Text style={[styles.title, {textDecorationLine: 'underline', alignSelf: 'flex-end'}]}>My name is Martin.</Text>
                        <Image source={require('../ass/decor/big-guy.png')} style={{width: '100%', height: '100%', resizeMode: 'contain', position: 'absolute'}} />
                        <Text style={[styles.title, {position: 'absolute', top: height - height * 0.24, alignSelf: 'center'}]}>I'm your guide to the app</Text>
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <Image source={require('../ass/decor/big-arrow.png')} style={{width: 102, height: 50, resizeMode: 'contain', position: 'absolute', top: height - height * 0.35, alignSelf: 'center'}} />
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
        lineHeight: 26,
        zIndex: 10
    },

    subTitle: {
        fontWeight: '700',
        fontSize: 18,
        color: '#fff',
        marginBottom: height * 0.02,
        lineHeight: 21
    },

    typeBtn: {
        width: '46%',
        padding: 12,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 12
    },

    typeBtnText: {
        fontWeight: '600',
        fontSize: 18,
        color: '#fff',
        lineHeight: 21
    },

    noText: {
        fontWeight: '700',
        fontSize: 18,
        color: '#fff',
        marginBottom: height * 0.02,
        lineHeight: 21,
        opacity: 0.6,
        zIndex: 10
    },

    guyImg: {
        width: 600,
        height: height * 0.6,
        position: 'absolute',
        top: -100,
        left: -35,
        zIndex: 1
    },

    createBtn: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: 162,
        backgroundColor: '#fff',
        borderRadius: 12,
    },

    noCreateBtn: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: 162,
        backgroundColor: '#fff',
        borderRadius: 12,
        position: 'absolute', 
        right: 30,
        zIndex: 10
    },

    createBtnText: {
        fontWeight: '700',
        fontSize: 20,
        color: '#cf0000',
        lineHeight: 24.4,
    },

    hikeItem: {
        width: '100%',
        paddingVertical: 17,
        paddingHorizontal: 14,
        backgroundColor: '#cf0000',
        minHeight: 120,
        borderRadius: 12,
        marginBottom: 4,
        overflow: 'hidden'
    },

    hikeName: {
        fontWeight: '700',
        fontSize: 17,
        color: '#fff',
        lineHeight: 21,
        marginBottom: 5,
        width: '70%',
        textAlign: 'left'
    },

    hikeDetails: {
        fontWeight: '600',
        fontSize: 18,
        color: '#fff',
        lineHeight: 21,
        marginBottom: 5
    },

    hikeAddress: {
        fontWeight: '600',
        fontSize: 14,
        color: '#fff',
        lineHeight: 21,
        opacity: 0.6,
        textAlign: 'justify'
    },

    modalContainer: {
        flex: 1,
        paddingTop: height * 0.07,
        paddingHorizontal: 35,
        backgroundColor: "rgba(143, 3, 7, 0.95)"
    },

})

export default Home;