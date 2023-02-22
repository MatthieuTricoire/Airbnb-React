import { useNavigation } from "@react-navigation/core";
import { Button, Text, View, FlatList } from "react-native";

import axios from "axios";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import Offer from "../components/Offer";

export default function HomeScreen({ navigation }) {
  // const navigation = useNavigation();

  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms"
      );
      setData(response.data);
    };
    fetchData();
  }, []);

  return (
    <SafeAreaView>
      <FlatList
        data={data}
        renderItem={({ item }) => <Offer offer={item} keyExtractor={item.id} />}
      />
    </SafeAreaView>
  );
}
