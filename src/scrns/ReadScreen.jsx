import { View } from "react-native"
import Read from "../cmpnts/Read"

const ReadScreen = ({ route }) => {
    const { place } = route.params;

    return (
        <View style={styles.container}>
            <Read place={place} />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default ReadScreen;