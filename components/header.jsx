import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Caput() {
    const handlePhonePress = () => {
        Linking.openURL('tel:+243971736244');
    };

    return (
        <View style={styles.header}>
            <View style={styles.container}>
                <View style={styles.row}>
                    {/* <View style={styles.infoContainer}>
                        <Icon name="home" size={20} color="#4f83d1" style={styles.icon} />
                        <Text style={styles.text}>Le meilleur Service de Pressing d'Afrique</Text>
                    </View> */}

                    <TouchableOpacity onPress={handlePhonePress} style={styles.phoneContainer}>
                        <Icon name="logo-whatsapp" size={20} color="#4f83d1" style={styles.icon} />
                        <Text style={styles.phoneText}>+243 971 736 244</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#f2f2f2',
        padding: 10,
        marginBottom: 0,
    },
    container: {
        alignItems: 'center',
    },
    row: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        justifyContent: 'center',
    },
    icon: {
        marginRight: 5,
    },
    text: {
        color: '#717275',
        textAlign: 'center',
    },
    bold: {
        fontWeight: 'bold',
    },
    phoneContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    phoneText: {
        color: '#4f83d1',
        textDecorationLine: 'underline',
        textAlign: 'center',
    },
});
