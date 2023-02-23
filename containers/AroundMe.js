import { Text, View, StyleSheet } from "react-native";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/core";

import axios from "axios";

import MapView, { Marker } from "react-native-maps";

import { useState, useEffect } from "react";

const AroundMe = () => {
  const [locationIsLoading, setLocationIsLoading] = useState(true);

  const [locationError, setLocationError] = useState();
  const [location, setLocation] = useState();
  const [offers, setOffers] = useState();
  const [offersIsLoading, setOffersIsLoading] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms/around?latitude=${location.latitude}&longitude=${location.longitude}`
        );
        setOffers(response.data);
        setOffersIsLoading(false);
        console.log(offers);
      } catch (error) {
        console.log(error.response);
      }
    };

    const askPermission = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status === "granted") {
        let location = await Location.getCurrentPositionAsync({});
        const obj = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };
        setLocation(obj);
      } else {
        setLocationError(true);
      }
      setLocationIsLoading(false);
    };
    askPermission().then(() => fetchData());
  }, []);

  return locationError ? (
    <Text>Connexion refusée</Text>
  ) : locationIsLoading || offersIsLoading ? (
    <View>
      <Text>Chargemeent</Text>
    </View>
  ) : (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.08,
        longitudeDelta: 0.08,
      }}
    >
      {offers.map((offer) => {
        return (
          <Marker
            onPress={() =>
              navigation.navigate("OfferScreen", { id: offer._id })
            }
            key={offer.location[1]}
            coordinate={{
              latitude: offer.location[1],
              longitude: offer.location[0],
            }}
          />
        );
      })}
    </MapView>
  );
};

export default AroundMe;

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});
