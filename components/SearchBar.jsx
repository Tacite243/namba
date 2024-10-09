import { StyleSheet, View, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";


export default function SearchBar() {
    return (
        <View style={styles.searchBarContainer}>
            <Text style={styles.searchBarText}>Rechercher</Text>
            <AntDesign name="search1" size={30} color="black" />
        </View>
    );
}

const styles = StyleSheet.create({
    searchBarContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 15,
        marginTop: 0,
        marginBottom: 30,
    },

    searchBarText: {
        fontSize: 30,
        fontWeight: "semibold",
    },
});
