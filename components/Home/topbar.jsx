import { Text, View, StyleSheet, Image } from "react-native"


export default function TopBar() {
    return (
        <View style={styles.topBarContainer}>
            {/* <Image source={require('../../assets/images/logo.png')} style={styles.logo} /> */}
            <Text>Logo</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    topBarContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 0,
        marginTop: 0,
        marginBottom: 30,
        backgroundColor: '#fff',
        height: 60,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    }
})