import React, { useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, TextInput, Alert, ScrollView, Image } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";

const { height } = Dimensions.get('window');

const CreateHike = () => {
    const navigation = useNavigation();
    const [name, setName] = useState(null);
    const [time, setTime] = useState(new Date());
    const [date, setDate] = useState(new Date());
    const [location, setLocation] = useState(null);
    const [region, setRegion] = useState({
        latitude: 47.5596,
        longitude: 7.5886,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
    });
    
    const [marker, setMarker] = useState({
        latitude: 47.5596,
        longitude: 7.5886,
    });

    const [address, setAddress] = useState(null);
    
    const handleMapPress = async (event) => {
        const { latitude, longitude } = event.nativeEvent.coordinate;
        setMarker({ latitude, longitude });
    
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&accept-language=en`
            );
            const data = await response.json();
    
            if (data.display_name) {
                setAddress(data.display_name);
                setLocation({ latitude, longitude, address: data.display_name });
            } else {
                setAddress("Address not found");
                setLocation({ latitude, longitude, address: "Address not found" });
            }
        } catch (error) {
            console.error("Geocoding error:", error);
            Alert.alert("Error", "Failed to retrieve address.");
        }
    };
    
    const [showPickTime, setShowPickTime] = useState(false);
    const [showPickDate, setShowPickDate] = useState(false);
    const [completed, setCompleted] = useState(false);

    const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    const formattedDate = `${date.getDate().toString().padStart(2, "0")}.${(date.getMonth() + 1).toString().padStart(2, "0")}.${date.getFullYear()}`;

    const handleTimeShow = () => {
        if(showPickTime) {
            setShowPickTime(false)
        } else {
            setShowPickTime(true)
        }
    };

    const onChangeTime = (event, selectedTime) => {
        setShowPickTime(Platform.OS === "ios");
        if (selectedTime) setTime(selectedTime);
    };

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

    const handleCreateHike = async () => {
        if (!name || !time || !date || !location) return;
    
        const noteData = {
            name,
            time,
            date,
            location,
            address
        };
        
        try {
            const existingNotes = await AsyncStorage.getItem('hikes');
            const notesArray = existingNotes ? JSON.parse(existingNotes) : [];
    
            notesArray.push(noteData);
            await AsyncStorage.setItem('hikes', JSON.stringify(notesArray));

            console.log(notesArray)

            setCompleted(true);

        } catch (error) {
            Alert.alert("Error", "Failed to save hike. Please try again.");
        }
    }

    return (
            <View style={styles.container}>

                {
                    completed ? (
                        <View style={{width: '100%', flexGrow: 1, paddingHorizontal: 35}}>
                            <Text style={styles.title}>Complete!</Text>
                            <Text style={[styles.title, {fontSize: 20, opacity: 0.5, textAlign: 'center', marginTop: height * 0.05}]}>You can look in current or later in history</Text>
                            <Image source={require('../ass/decor/big-guy.png')} style={{width: '100%', height: height * 0.6, resizeMode: 'contain'}} />
                            <TouchableOpacity 
                                style={styles.nextBtn}
                                onPress={() => navigation.navigate('HomeScreen')}
                                >
                                <Text style={styles.nextBtnText}>Back to home</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <>
                            <MapView
                                style={{ width: '100%', height: height * 0.3 }}
                                initialRegion={region}
                                onPress={handleMapPress}
                            >
                                <Marker coordinate={marker} />
                            </MapView>

                            <ScrollView style={{width: '100%', paddingHorizontal: 35, marginTop: 20}}>
                                <Text style={styles.title}>Add plan you hike</Text>

                                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack('')}>
                                    <Text style={styles.backBtnText}>Back</Text>
                                </TouchableOpacity>

                                <Text style={styles.label}>Name</Text>
                                <TextInput
                                    style={styles.input}
                                    value={name}
                                    onChangeText={setName}
                                    autoFocus
                                    placeholder="Enter the text..."
                                    placeholderTextColor="rgba(255, 255, 255, 0.5)"
                                />

                                <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                    <View style={{width: '48%'}}>
                                        <Text style={styles.label}>Time</Text>
                                        <TouchableOpacity style={styles.btn} onPress={handleTimeShow}>
                                            <Text style={styles.btnText}>{formattedTime}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{width: '48%'}}>
                                        <Text style={styles.label}>Date</Text>
                                        <TouchableOpacity style={styles.btn} onPress={handleDateShow}>
                                            <Text style={styles.btnText}>{formattedDate}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                {showPickTime && (
                                    <DateTimePicker 
                                        value={time} 
                                        mode="time" 
                                        display="spinner" 
                                        themeVariant="dark"
                                        onChange={onChangeTime} 
                                    />
                                )}

                                {showPickDate && (
                                    <DateTimePicker 
                                        value={date} 
                                        mode="date" 
                                        display="spinner" 
                                        themeVariant="dark"
                                        onChange={onChangeDate} 
                                    />
                                )}

                                <Text style={styles.label}>Maps</Text>
                                <TextInput
                                    style={styles.input}
                                    value={address || "Tap on the map to select location"}
                                    editable={false}
                                    placeholder="Tap on the map to select location"
                                    placeholderTextColor="rgba(255, 255, 255, 0.5)"
                                />

                                <TouchableOpacity 
                                    style={[styles.nextBtn, (!name || !time || !date || !location) && {opacity: 0.5}]}
                                    onPress={handleCreateHike}
                                    disabled={!name || !time || !date || !location}
                                    >
                                    <Text style={styles.nextBtnText}>Next</Text>
                                </TouchableOpacity>

                                <View style={{height: 50}} />
                            </ScrollView>
                        </>
                    )
                }

            </View>
    )
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#8f0307'
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
        marginBottom: 15
    },

    backBtnText: {
        fontWeight: '700',
        fontSize: 16,
        color: '#cf0000',
        lineHeight: 19.5
    },

    input: {
        width: '100%',
        padding: 14,
        borderRadius: 12,
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
    }

})

export default CreateHike;