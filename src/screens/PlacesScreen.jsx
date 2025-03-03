import { View } from "react-native"
import Places from "../components/Places"
import Menu from "../components/Menu";

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
        right: 0
    }
}

export default PlacesScreen;