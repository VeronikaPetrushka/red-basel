import { View } from "react-native"
import Info from "../cmpnts/Info"

const InfoScreen = () => {
    return (
        <View style={styles.container}>
            <Info />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default InfoScreen;