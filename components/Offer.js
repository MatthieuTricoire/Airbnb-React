import { useNavigation } from "@react-navigation/native";
import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";

const Offer = ({ offer, navigation }) => {
  console.log("photo n1 de chaque annonce : " + offer.photos[0].url);

  const ratingValue = (offer) => {
    let a = "";
    for (let i = 0; i < offer.ratingValue; i++) {
      a += "⭐️";
    }
    return a;
  };
  return (
    <TouchableOpacity
      style={styles.offer}
      onPress={() => navigation.navigate("OfferScreen", { id: "test" })}
    >
      <Image
        source={{ uri: offer.photos[0].url }}
        style={styles.offer__image}
        alt="test"
      />
      <Text style={styles.offer__title}>{offer.title}</Text>
      <View style={styles.row}>
        <Text>{ratingValue(offer)}</Text>
        <Text>Reviews : {offer.reviews}</Text>
      </View>
    </TouchableOpacity>
  );
};
export default Offer;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },

  offer__image: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
  },

  offer__title: {
    fontSize: 18,
  },
});
