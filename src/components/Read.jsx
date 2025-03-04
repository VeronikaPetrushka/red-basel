import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, ScrollView } from "react-native"
import LinearGradient from "react-native-linear-gradient";
import { useNavigation } from "@react-navigation/native";

const { height } = Dimensions.get('window');

const Read = ({ place }) => {
    const navigation = useNavigation();

    return (
        <LinearGradient colors={["#000", "#300202"]} style={{width: '100%', height: '100%'}}>
            <View style={styles.container}>

                <View style={{width: '100%', borderBottomLeftRadius: 24, borderBottomRightRadius: 24, overflow: 'hidden', marginBottom: 29}}>
                    <Image source={typeof place.image === "string" ? { uri: place.image } : place.image} style={styles.image} />
                    <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack('')}>
                        <Text style={styles.backBtnText}>Back</Text>
                    </TouchableOpacity>
                    <View style={styles.nameContainer}>
                        <Text style={styles.name}>{place.name}</Text>
                    </View>
                </View>

                {place.date && <Text style={styles.subTitle}>Visited - {place.date}</Text>}

                <ScrollView style={{width: '100%', paddingHorizontal: 35}}>
                    {place.description && <Text style={[styles.desc, {marginBottom: 12}]}>{place.description}</Text>}
                    {place.comment && <Text style={[styles.desc, {marginBottom: 12}]}>{place.comment}</Text>}

                    {
                        place.context && (
                            <>
                                <Text style={styles.subTitle}>History</Text>
                                {
                                    place.context.map((item, index) => (
                                        <View key={index} style={{width: '100%', marginBottom: 20}}>
                                            <Text style={styles.subTitle}>{item.title}</Text>
                                            <Text style={styles.desc}>{item.text}</Text>
                                        </View>
                                    ))
                                }
                            </>
                        )
                    }
                </ScrollView>

            </View>
        </LinearGradient>
    )
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },

    image: {
        width: '100%',
        height: 278,
        resizeMode: 'cover'
    },

    nameContainer: {
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 22,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0
    },

    name: {
        fontWeight: '700',
        fontSize: 24,
        color: '#fff',
        lineHeight: 26
    },

    backBtn: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: 120,
        backgroundColor: '#fff',
        borderRadius: 12,
        position: 'absolute',
        right: 10,
        bottom: 80
    },

    backBtnText: {
        fontWeight: '700',
        fontSize: 16,
        color: '#cf0000',
        lineHeight: 19.5
    },

    subTitle: {
        fontWeight: '700',
        fontSize: 18,
        color: '#fff',
        lineHeight: 22,
        marginBottom: 12,
        textAlign: 'center'
    },

    desc: {
        fontWeight: '500',
        fontSize: 17,
        color: '#fff',
        lineHeight: 21,
        textAlign: 'center'
    }

})

export default Read;