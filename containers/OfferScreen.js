import { useRoute } from "@react-navigation/native";
import {
  Text,
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

import { Dimensions } from "react-native";

import MapView, { Marker } from "react-native-maps";

import axios from "axios";

import { useState, useEffect } from "react";

import { SwiperFlatList } from "react-native-swiper-flatlist";

const OfferScreen = () => {
  const route = useRoute();
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [displayTxt, setDisplayTxt] = useState(false);

  const ratingValue = (offer) => {
    let a = "";
    for (let i = 0; i < offer.ratingValue; i++) {
      a += "⭐️";
    }
    return a;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // setIsLoading(true);
        const response = await axios.get(
          `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms/${route.params.id}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <View>
      <Text>Loading</Text>
    </View>
  ) : (
    <SafeAreaView>
      <View style={styles.offer}>
        <View>
          <SwiperFlatList
            index={0}
            showPagination
            data={data.photos}
            renderItem={({ item }) => (
              <View style={styles.child}>
                <Image
                  style={{ width, height: 300 }}
                  source={{ uri: item.url }}
                />
              </View>
            )}
          />
        </View>
        <View style={{ position: "relative" }}>
          <View style={styles.price}>
            <Text style={{ color: "white", fontSize: 20 }}>{data.price} €</Text>
          </View>
        </View>
        <View style={[styles.row, styles.caption, styles.container]}>
          <View style={styles.col_txt}>
            <Text numberOfLines={1} style={styles.offer__title}>
              {data.title}
            </Text>
            <View style={[styles.rating, styles.row]}>
              <Text>{ratingValue(data)}</Text>
              <Text>Reviews : {data.reviews}</Text>
            </View>
          </View>

          <Image
            style={styles.col_image}
            source={{ uri: data.user.account.photo.url }}
          />
        </View>
        <View style={[styles.container]}>
          <Text
            style={styles.offer__description}
            numberOfLines={displayTxt ? 0 : 3}
          >
            {data.description}
          </Text>
          <TouchableOpacity
            onPress={() => {
              setDisplayTxt(!displayTxt);
            }}
          >
            <Text>{displayTxt ? "Show less" : "Show more"}</Text>
          </TouchableOpacity>
        </View>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: data.location[1],
            longitude: data.location[0],
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker
            coordinate={{
              latitude: data.location[1],
              longitude: data.location[0],
            }}
          />
        </MapView>
      </View>
    </SafeAreaView>
  );
};

export default OfferScreen;

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },

  container: {
    marginHorizontal: "5%",
  },

  offer__image: {
    width: "100%",
    height: 300,
  },

  offer__title: {
    fontSize: 24,
  },

  price: {
    position: "absolute",
    bottom: 10,
    left: 10,
    backgroundColor: "black",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },

  caption: {
    marginTop: 10,
    alignItems: "center",
    height: 80,
  },

  col_txt: {
    flex: 1,
    height: "100%",
    paddingVertical: 10,
    marginRight: 20,
    justifyContent: "space-between",
  },

  col_image: {
    width: 80,
    height: 80,
    resizeMode: "cover",
    borderRadius: "50%",
  },

  offer__description: {
    marginTop: 10,
  },

  child: { width, justifyContent: "center" },

  test: {
    width: 400,
    height: 400,
  },

  map: {
    width: width,
    height: 300,
  },
});
