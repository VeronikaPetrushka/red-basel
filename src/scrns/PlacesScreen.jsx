import { View } from "react-native"
import Places from "../cmpnts/Places"
import Menu from "../cmpnts/Menu";

const PlacesScreen = () => {
    return (
        <View style={styles.container}>
            <Places />
            <View style={styles.menu}>
                <Menu />
            </View>
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    },
    menu: {
        position: 'absolute',
        bottom: 15,
        left: 0,
        right: 0,
        zIndex: 10
    }
}

export default PlacesScreen;