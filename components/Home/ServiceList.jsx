import { FlatList, StyleSheet } from "react-native";
import services from "../../assets/datas/service-data.json";
import ServiceItem from "./ServiceItem";


export default function ServiceList() {
    return (
        <FlatList
            data={services}
            contentContainerStyle={styles.flatListContainer}
            showsHorizontalScrollIndicator={false}
            horizontal
            keyExtractor={
                (item) => item.hover.toLocaleLowerCase().toString() + Math.floor(Math.random() * 1000)
            }
            renderItem={({item}) => <ServiceItem item={item} />}
        />
    );
}

const styles = StyleSheet.create({
    flatListContainer: {
        gap: 20,
        marginLeft: 15,
        paddingRight: 20,
    },
});