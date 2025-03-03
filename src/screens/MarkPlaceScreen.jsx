import { View } from "react-native"
import MarkPlace from "../components/MarkPlace"

const MarkPlaceScreen = ({ route }) => {
    const { quest } = route.params;

    return (
        <View style={styles.container}>
            <MarkPlace quest={quest} />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default MarkPlaceScreen;