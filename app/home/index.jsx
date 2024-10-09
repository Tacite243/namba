import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import ServiceList from "../../components/Home/ServiceList";
import TopBar from "../../components/Home/topbar";
import ServiceCard from "../../components/Home/ServiceCard";
import services from "../../assets/datas/service-data.json";
import ClientWitness from "../../components/Home/ClientWitness";
import clientData from "../../assets/datas/clients-data.json";
import CompaniesThatTrustInUs from "../../components/Home/CompaniesThatTrustInUs";



export default function Home() {
    const trustedCompanies = [
        { name: 'Toprak Leasing', logo: require('../../assets/images/partners/toprak-leasing.svg') },
        { name: 'Glorix', logo: require('../../assets/images/partners/glorix.svg') },
        { name: 'Woo', logo: require('../../assets/images/partners/woocommerce.svg') },
        { name: 'Rolf Leasing', logo: require('../../assets/images/partners/rolf-leasing.svg') },
        { name: 'Unilabs', logo: require('../../assets/images/partners/unilabs.svg') },
    ];
    return (
        <View style={styles.appContainer}>
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <TopBar />
                <ServiceList />
                <View style={styles.container}>
                    <Text style={styles.title}>Une équipe heureuse et prete à vous servir !</Text>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo nobis dignissimos ut quas, illum hic non quam laudantium aliquid dolores unde praesentium at accusantium ratione! Nostrum temporibus veritatis est vero!</Text>
                        <br />
                    </View>
                </View>
                <View style={styles.imageContainer}>
                    <Image
                        source={require('../../assets/images/male-wearing-apron-female-white-t-shirt-smiling-broadly-being-glad-clean.png')}
                        style={styles.image}
                    />
                </View>
                <View>
                    <Text style={styles.servicesTitle}>Nos Services</Text>
                    <ServiceCard postData={services[0]} />
                    <ServiceCard postData={services[1]} />
                    <ServiceCard postData={services[2]} />
                    <ServiceCard postData={services[3]} />
                </View>
                <View>
                    <Text style={styles.servicesTitle}>Nos clients témoignent</Text>
                    <ClientWitness clientData={clientData} />
                </View>
                <View>
                    <CompaniesThatTrustInUs companies={trustedCompanies} />
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    servicesTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        marginVertical: 10,
        marginHorizontal: 15,
        textAlign: 'center',
        color: '#005e7f',
    },
    container: {
        alignItems: "center",
        padding: 15,
        paddingBottom: 30,
        marginTop: 0,
        backgroundColor: "#f1f1f1",
    },
    appContainer: {
        flex: 1,
    },
    title: {
        fontSize: 25,
        marginBottom: 20,
        paddingBottom: 10,
        textAlign: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        }
    },
    textContainer: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    text: {
        textAlign: 'center',
        marginBottom: 10,
        fontSize: 16,
        lineHeight: 20,
    },
    imageContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    image: {
        width: 400,
        height: 250,
    }
});