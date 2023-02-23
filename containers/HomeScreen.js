import { useNavigation } from "@react-navigation/core";
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from "react-native";

import axios from "axios";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import Offer from "../components/Offer";

export default function HomeScreen({}) {
  const navigation = useNavigation();

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms"
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
      <FlatList
        data={data}
        renderItem={({ item }) => <Offer offer={item} keyExtractor={item.id} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },

  offer__image: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
  },
});
