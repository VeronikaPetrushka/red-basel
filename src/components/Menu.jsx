import React, { useEffect, useState } from 'react';
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Icons from './Icons';

const Menu = () => {
    const navigation = useNavigation();
    const [activeButton, setActiveButton] = useState('HomeScreen');

    const handleNavigate = (screen) => {
        setActiveButton(screen);
        navigation.navigate(screen)
    };    

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            const currentRoute = navigation.getState().routes[navigation.getState().index].name;
            setActiveButton(currentRoute);
        });

        return unsubscribe;
    }, [navigation]);

    return (
        <View style={styles.container}>

            <TouchableOpacity 
                style={[styles.button, activeButton === 'HomeScreen' && {backgroundColor: '#fff', marginTop: -40}]} 
                onPress={() => handleNavigate('HomeScreen')}>
                <Icons type={'1'} active={activeButton === 'HomeScreen'}/>
            </TouchableOpacity>

            <TouchableOpacity 
                style={[styles.button, activeButton === 'QuestScreen' && {backgroundColor: '#fff', marginTop: -40}]} 
                onPress={() => handleNavigate('QuestScreen')}>
                <Icons type={'2'} active={activeButton === 'QuestScreen'}/>
            </TouchableOpacity>

            <TouchableOpacity 
                style={[styles.button, activeButton === 'PlacesScreen' && {backgroundColor: '#fff', marginTop: -40}]} 
                onPress={() => handleNavigate('PlacesScreen')}>
                <Icons type={'3'} active={activeButton === 'PlacesScreen'}/>
            </TouchableOpacity>

            <TouchableOpacity 
                style={[styles.button, activeButton === 'SettingsScreen' && {backgroundColor: '#fff', marginTop: -40}]} 
                onPress={() => handleNavigate('SettingsScreen')}>
                <Icons type={'4'} active={activeButton === 'SettingsScreen'}/>
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        justifyContent: "space-between",
        alignItems: "center",
        alignSelf: 'center',
        flexDirection: 'row',
        padding: 20,
    },
    
    button: {
        width: 80,
        height: 52,
        paddingVertical: 8,
        paddingHorizontal: 22,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        backgroundColor: 'rgba(255, 255, 255, 0.3)'
    },

});

export default Menu;
