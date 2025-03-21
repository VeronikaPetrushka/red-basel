import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Linking, ImageBackground } from "react-native"
import Icons from "./Icons";

const { height } = Dimensions.get('window');

const Settings = () => {

    const openTerms = () => {
        const url = "https://www.termsfeed.com/live/4adf32db-c1a2-4aff-afe8-05665a149d11";
        Linking.openURL(url).catch((err) => console.error("Failed to open URL", err));
    };

    const rateApp = () => {
        const appStoreUrl = "https://apps.apple.com/us/app/red-basel/id6742760266";
        Linking.openURL(appStoreUrl).catch((err) => console.error("Failed to open URL", err));
    };    

    return (
        <ImageBackground source={require('../ass/back/2.png')} style={{flex: 1}}>
            <View style={styles.container}>

                <Text style={styles.title}>Settings</Text>

                <View style={{width: '100%', marginVertical: 'auto'}}>
                    <View style={styles.btn}>
                        <Text style={styles.btnText}>Terms of use</Text>
                        <TouchableOpacity style={styles.arrowBtn} onPress={openTerms}>
                            <Icons type={'arrow'} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.btn}>
                        <Text style={styles.btnText}>Rate us</Text>
                        <TouchableOpacity style={styles.arrowBtn} onPress={rateApp}>
                            <Icons type={'arrow'} />
                        </TouchableOpacity>
                    </View>
                </View>

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

    btn: {
        width: '100%',
        padding: 5,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 24,
        marginBottom: 36
    },

    btnText: {
        fontWeight: '700',
        fontSize: 16,
        color: '#cf0000',
        lineHeight: 21,
        marginLeft: 10
    },

    arrowBtn: {
        width: 42,
        height: 42,
        padding: 12,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        backgroundColor: '#cf0000'
    }

})

export default Settings;