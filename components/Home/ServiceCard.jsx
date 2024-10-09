import { View, Text, StyleSheet, Pressable, Image, ImageBackground } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";



export default function ServiceCard({ postData }) {
    const handlePress = () => {
        console.log('ServiceCard pressed');
    }
    return (
        <Pressable onPress={handlePress}>
            <View style={styles.card}>
                <View style={styles.imageContainer}>
                    <Image
                        source={require('../../assets/images/male-wearing-apron-female-white-t-shirt-smiling-broadly-being-glad-clean.png')}
                        style={styles.image}
                    />
                    <View style={styles.priceTag}>
                        <FontAwesome5 name="dollar-sign" size={12} color="white" />
                        <Text style={styles.priceText}>{postData.tarif.amount}</Text>
                    </View>
                    <View style={styles.durationTag}>
                        <FontAwesome5 name="clock" size={12} color="white" />
                        <Text style={styles.durationText}>{postData.tarif.unity}</Text>
                    </View>
                </View>
                <Text style={styles.title}>{postData.title}</Text>
                <Text style={styles.description}>{postData.description}</Text>
                <View style={styles.ratingContainer}>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <FontAwesome
                            key={star}
                            name={star <= Math.round(postData.like) ? "star" : "star-o"}
                            size={20}
                            color={star <= Math.round(postData.like) ? "#FFD700" : "#CCCCCC"}
                            style={styles.starIcon}
                        />
                    ))}
                    <Text style={styles.ratingText}>({postData.like.toFixed(1)})</Text>
                </View>
                <Pressable style={styles.reserveButton}>
                    <Text style={styles.reserveButtonText}>Réserver</Text>
                </Pressable>
            </View>
        </Pressable>
    )
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
        margin: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    imageContainer: {
        position: 'relative',
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 10,
    },
    priceTag: {
        position: 'absolute',
        left: 10,
        top: 10,
        backgroundColor: '#4a90e2',
        padding: 5,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    priceText: {
        color: 'white',
        marginLeft: 5,
    },
    durationTag: {
        position: 'absolute',
        right: 10,
        top: 10,
        backgroundColor: '#4a90e2',
        padding: 5,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    durationText: {
        color: 'white',
        marginLeft: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
    },
    description: {
        marginTop: 5,
        color: 'gray',
    },
    ratingContainer: {
        flexDirection: 'row',
        marginTop: 5,
    },
    starIcon: {
        marginRight: 2,
    },
    reserveButton: {
        backgroundColor: '#4a90e2',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    reserveButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});
