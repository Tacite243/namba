import { Text, TouchableOpacity, View, StyleSheet, Dimensions, Animated } from "react-native";
import { colors } from "@/constants/Colors";
import { fonts } from "@/constants/fonts";
import { useState } from "react";

const { height, width } = Dimensions.get('window');

export default function NavMenu() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuAnimation = useState(new Animated.Value(-width))[0];

    const toggleMenu = () => {
        Animated.timing(menuAnimation, {
            toValue: isMenuOpen ? -width * 0.6 : 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            <View style={styles.header}>
                <Text style={styles.logo}>NAMBA</Text>
                <TouchableOpacity onPress={toggleMenu}>
                    <Text style={styles.menuIcon}>≡</Text>
                </TouchableOpacity>
            </View>

            {/* Ombre plus claire */}
            {isMenuOpen && (
                <TouchableOpacity style={styles.overlay} onPress={toggleMenu} />
            )}

            {/* Menu avec largeur ajustée */}
            <Animated.View
                style={[
                    styles.menu,
                    { transform: [{ translateX: menuAnimation }] },
                ]}
            >
                <TouchableOpacity style={styles.menuItem}>
                    <Text style={styles.menuText}>Accueil</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem}>
                    <Text style={styles.menuText}>Services</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem}>
                    <Text style={styles.menuText}>À propos</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem}>
                    <Text style={styles.menuText}>Contact</Text>
                </TouchableOpacity>
            </Animated.View>
        </>
    )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 15,
        backgroundColor: colors.tertiary,
    },
    logo: {
        fontSize: 20,
        fontFamily: fonts.bold,
        color: colors.secondary,
    },
    menuIcon: {
        fontSize: 34,
        fontWeight: 'bold',
        color: colors.secondary,
    },
    menu: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: width * 0.6, // Largeur réduite pour éviter qu'il prenne trop d'espace
        height: height,
        backgroundColor: colors.primary,
        paddingTop: 80,
        paddingHorizontal: 20,
        zIndex: 2,
    },
    menuItem: {
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: colors.secondary,
    },
    menuText: {
        fontSize: 18,
        fontFamily: fonts.regular,
        color: colors.secondary,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: width,
        height: height,
        backgroundColor: 'rgba(0, 0, 0, 0.3)', // Opacité plus légère pour éviter de trop cacher le contenu
        zIndex: 1,
    }
});