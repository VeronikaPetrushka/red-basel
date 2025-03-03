import { View } from "react-native"
import CreateHike from "../components/CreateHike"

const CreateHikeScreen = () => {
    return (
        <View style={styles.container}>
            <CreateHike />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default CreateHikeScreen;