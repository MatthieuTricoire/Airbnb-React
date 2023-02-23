import { useState } from "react";
import { useNavigation } from "@react-navigation/core";

import axios from "axios";

import {
  Button,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";

export default function SignInScreen({ setToken }) {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [checkInput, setCheckInput] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/logo_airbnb.png")}
        style={styles.logo}
        resizeMode="contain"
      ></Image>
      <View style={styles.center}>
        <Text style={styles.title}>Sign In</Text>
      </View>
      <View>
        <TextInput
          placeholder="email"
          autoCapitalize="none"
          style={styles.txtInput}
          onChangeText={(text) => {
            setEmail(text);
          }}
          value={email}
        />
        <TextInput
          autoCapitalize="none"
          placeholder="password"
          secureTextEntry={true}
          style={styles.txtInput}
          onChangeText={(text) => {
            setPassword(text);
          }}
          value={password}
        />

        <View style={styles.ctaZone}>
          {checkInput === "NotEmpty" ? (
            <Text style={styles.badInfo}>
              Le mail et le mot de passe ne doivent pas être vide.
            </Text>
          ) : checkInput === "401" ? (
            <Text style={styles.badInfo}>
              Les logins renseignés sont incorrects
            </Text>
          ) : (
            ""
          )}
          <TouchableOpacity
            style={styles.btn}
            disabled={isLoading}
            onPress={async () => {
              if (!password.length || !email.length) {
                setCheckInput("NotEmpty");
              } else {
                setCheckInput("");
                try {
                  setIsLoading(true);
                  const response = await axios.post(
                    "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/log_in",
                    {
                      email: email,
                      password: password,
                    }
                  );
                  const userToken = response.data.token;
                  setToken(userToken);
                  setCheckInput("");
                  setIsLoading(false);
                  alert("Connexion réussie");
                } catch (e) {
                  if (e.message === "Request failed with status code 401") {
                    setCheckInput("401");
                    setIsLoading(false);
                  }
                }
              }
            }}
          >
            <Text style={styles.btn__txt}>Sign-in</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.push("SignUp");
            }}
          >
            <Text style={styles.btntxt}>Create an account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    marginVertical: "10%",
    width: "100%",
    height: 140,
  },

  title: {
    fontSize: 32,
    color: "hsl(0, 0%, 48%)",
    marginBottom: 10,
  },

  center: {
    alignItems: "center",
  },

  txtInput: {
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderBottomColor: "hsl(359, 100%, 68%)",
    borderWidth: 1,
    marginBottom: 20,
    paddingVertical: 5,
  },

  container: {
    marginHorizontal: "10%",
  },

  btn: {
    width: "50%",
    borderColor: "hsl(359, 100%, 68%)",
    borderWidth: 3,
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
  },

  btn__txt: {
    fontSize: 18,
    color: "hsl(0, 0%, 48%)",
  },

  btntxt: {
    marginTop: 10,
    fontSize: 14,
    color: "hsl(0, 0%, 48%)",
  },

  ctaZone: {
    marginTop: 10,
    alignItems: "center",
  },

  badInfo: {
    color: "hsl(359, 100%, 68%)",
  },
});
