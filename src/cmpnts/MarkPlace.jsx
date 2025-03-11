import React, { useState, useEffect } from "react"
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, TextInput, Alert, ScrollView, Image, Modal, ImageBackground } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import { launchImageLibrary } from "react-native-image-picker";
import { useNavigation } from "@react-navigation/native";

const { height } = Dimensions.get('window');

const MarkPlace = ({ quest }) => {
    const navigation = useNavigation();
    const [image, setImage] = useState(null);
    const [comment, setComment] = useState(null);
    const [date, setDate] = useState(new Date());
    const [showPickDate, setShowPickDate] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        setModalVisible(true);
    }, []);

    const formattedDate = `${date.getDate().toString().padStart(2, "0")}.${(date.getMonth() + 1).toString().padStart(2, "0")}.${date.getFullYear()}`;

    const handleDateShow = () => {
        if(showPickDate) {
            setShowPickDate(false)
        } else {
            setShowPickDate(true)
        }
    };

    const onChangeDate = (event, selectedDate) => {
        setShowPickDate(Platform.OS === "ios");
        if (selectedDate) setDate(selectedDate);
    };

    const imageUpload = async () => {
        try {
            const result = await new Promise((resolve, reject) => {
                launchImageLibrary({ mediaType: "photo", quality: 0.8 }, ({ assets, errorMessage }) => {
                    if (errorMessage) reject(errorMessage);
                    else resolve(assets?.[0]?.uri || null);
                });
            });
    
            if (result) setImage(result);
        } catch (error) {
            Alert.alert("Error", "Failed to select image.");
        }
    };

    const handleMarkPlace = async () => {
        if (!image || !comment || !date) return;
    
        try {
            const storedData = await AsyncStorage.getItem('questStatuses');
            let questStatuses = storedData ? JSON.parse(storedData) : [];
    
            const index = questStatuses.findIndex(q => q.level === quest.level);
            if (index !== -1) {
                questStatuses[index].completed = true;
                questStatuses[index].current = false;
    
                if (index + 1 < questStatuses.length) {
                    questStatuses[index + 1].current = true;
                }
    
                await AsyncStorage.setItem('questStatuses', JSON.stringify(questStatuses));
            }
    
            const completedQuest = {
                name: quest.place,
                image,
                comment,
                date: formattedDate
            };
    
            const storedCompleted = await AsyncStorage.getItem('completedQuest');
            let completedQuests = storedCompleted ? JSON.parse(storedCompleted) : [];
            completedQuests.push(completedQuest);
    
            await AsyncStorage.setItem('completedQuest', JSON.stringify(completedQuests));

            navigation.goBack('')
    
        } catch (error) {
            Alert.alert("Error", "Failed to update quest status. Please try again.");
        }
    };
    
    return (
        <ImageBackground source={require('../ass/back/1.png')} style={{flex: 1}}>
            <View style={styles.container}>

                <ScrollView style={{width: '100%', paddingHorizontal: 35}}>
                    <Text style={styles.title}>{quest.place}</Text>

                    <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack('')}>
                        <Text style={styles.backBtnText}>Back</Text>
                    </TouchableOpacity>

                    <Text style={styles.label}>Add a photo</Text>
                    <TouchableOpacity style={styles.imageContainer} onPress={imageUpload}>
                        {
                            image ? <Image source={{uri: image}} style={{width: '100%', height: '100%', resizeMode: 'cover'}} />
                            : <Image source={require('../ass/decor/image.png')} style={{width: 72, height: 72}} />
                        }
                    </TouchableOpacity>

                    <Text style={styles.label}>Add a comment</Text>
                    <TextInput
                        style={styles.input}
                        value={comment}
                        onChangeText={setComment}
                        autoFocus
                        multiline
                        placeholder="Enter the text..."
                        placeholderTextColor="rgba(255, 255, 255, 0.5)"
                    />

                    <View style={{width: '48%'}}>
                        <Text style={styles.label}>Date</Text>
                        <TouchableOpacity style={styles.btn} onPress={handleDateShow}>
                            <Text style={styles.btnText}>{formattedDate}</Text>
                        </TouchableOpacity>
                    </View>

                    {showPickDate && (
                        <DateTimePicker 
                            value={date} 
                            mode="date" 
                            display="spinner" 
                            themeVariant="dark"
                            onChange={onChangeDate} 
                        />
                    )}

                    <TouchableOpacity 
                        style={[styles.nextBtn, (!comment || !date) && {opacity: 0.5}]}
                        onPress={handleMarkPlace}
                        disabled={!comment || !date}
                        >
                        <Text style={styles.nextBtnText}>Next</Text>
                    </TouchableOpacity>
                    
                    <View style={{height: 50}} />
                </ScrollView>

                <Modal
                    visible={modalVisible}
                    transparent
                    animationType="fade"
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <Text style={[styles.title, {opacity: 0.5, textAlign: 'center', lineHeight: 36}]}>{quest.task}</Text>
                        <Text style={styles.title}>{quest.place}</Text>
                        <TouchableOpacity 
                            style={[styles.backBtn, {width: 272}]}
                            onPress={() => setModalVisible(false)}
                            >
                            <Text style={[styles.backBtnText, {fontSize: 20, lineHeight: 24}]}>I've been there!</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[styles.backBtn, {width: 210}]}
                            onPress={() => navigation.goBack('')}
                            >
                            <Text style={[styles.backBtnText, {fontSize: 20, lineHeight: 24}]}>Back</Text>
                        </TouchableOpacity>
                        <Text style={[styles.title, {opacity: 0.5, fontSize: 20, textAlign: 'center', lineHeight: 36}]}>See if you can find it, and then move on.</Text>
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
    },

    title: {
        fontWeight: '700',
        fontSize: 24,
        color: '#fff',
        marginBottom: 22,
        lineHeight: 26
    },

    label: {
        fontWeight: '600',
        fontSize: 18,
        color: '#fff',
        marginBottom: 13,
        lineHeight: 21
    },

    backBtn: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: 120,
        backgroundColor: '#fff',
        borderRadius: 12,
        marginBottom: 30
    },

    backBtnText: {
        fontWeight: '700',
        fontSize: 16,
        color: '#cf0000',
        lineHeight: 19.5
    },

    imageContainer: {
        width: '100%',
        height: 160,
        borderRadius: 24,
        overflow: 'hidden',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20
    },

    input: {
        width: '100%',
        minHeight: 160,
        padding: 14,
        borderRadius: 24,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        color: '#fff',
        fontSize: 15,
        fontWeight: '600',
        marginBottom: 20
    },

    btn: {
        width: '100%',
        padding: 14,
        borderRadius: 12,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20
    },

    btnText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '600',
        lineHeight: 21
    },

    nextBtn: {
        padding: 16,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#cf0000',
        borderRadius: 12,
    },

    nextBtnText: {
        fontWeight: '700',
        fontSize: 20,
        color: '#fff',
        lineHeight: 21
    },

    modalContainer: {
        flex: 1,
        paddingTop: height * 0.07,
        paddingHorizontal: 35,
        backgroundColor: "rgba(143, 3, 7, 0.95)",
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },

})

export default MarkPlace;