import { View } from "react-native"
import Home from "../cmpnts/Home"
import Menu from "../cmpnts/Menu";

const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <Home />
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
        // zIndex: 10
    }
}

export default HomeScreen;