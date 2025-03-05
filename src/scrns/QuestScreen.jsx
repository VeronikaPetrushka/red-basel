import { View } from "react-native"
import Quest from "../cmpnts/Quest"
import Menu from "../cmpnts/Menu";

const QuestScreen = () => {
    return (
        <View style={styles.container}>
            <Quest />
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

export default QuestScreen;