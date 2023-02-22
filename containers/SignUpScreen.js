import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";

import { useState } from "react";

import axios from "axios";
import { useNavigation } from "@react-navigation/native";

export default function SignUpScreen({ setToken }) {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [pwd, setPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");

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
        <Text style={styles.title}>Sign Up</Text>
      </View>

      <View>
        <TextInput
          style={styles.txtInput}
          autoComplete="email"
          autoCapitalize="none"
          placeholder="email"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <TextInput
          style={styles.txtInput}
          placeholder="Username"
          onChangeText={(text) => setUsername(text)}
          value={username}
        />
        <TextInput
          style={styles.txtBoxInput}
          multiline
          numberOfLines={4}
          maxLength={100}
          placeholder="Describe yourself in few words ..."
          onChangeText={(text) => setDescription(text)}
          value={description}
        />
        <TextInput
          style={styles.txtInput}
          autoCapitalize="none"
          secureTextEntry={true}
          placeholder="password"
          onChangeText={(text) => setPwd(text)}
          value={pwd}
        />
        <TextInput
          style={styles.txtInput}
          autoCapitalize="none"
          secureTextEntry={true}
          placeholder="confirm password"
          onChangeText={(text) => setConfirmPwd(text)}
          value={confirmPwd}
        />

        <View style={styles.ctaZone}>
          {checkInput === "empty" ? (
            <Text style={styles.badInfo}>
              Vous avez du oublier de remplir un champ =/
            </Text>
          ) : checkInput === "badPwd" ? (
            <Text style={styles.badInfo}>
              Les mots de passe ne sont pas identiques
            </Text>
          ) : checkInput === "alreadyExisting" ? (
            <Text style={styles.badInfo}>Cet email existe déjà</Text>
          ) : null}
          <TouchableOpacity
            style={styles.btn}
            disabled={isLoading}
            onPress={async () => {
              if (!confirmPwd || !pwd || !username || !email || !description) {
                setCheckInput("empty");
              } else if (pwd !== confirmPwd) {
                setCheckInput("badPwd");
              } else {
                setCheckInput("");

                try {
                  setIsLoading(true);
                  const response = await axios.post(
                    "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/sign_up",
                    {
                      email: email,
                      username: username,
                      description: description,
                      password: pwd,
                    }
                  );
                  setToken(response.data.token);
                  setIsLoading(false);
                  alert("Votre compte a bien été créé :)");
                } catch (e) {
                  console.log(e.message);
                  if (e.message === "Request failed with status code 400") {
                    setCheckInput("alreadyExisting");
                  }
                  setIsLoading(false);
                }
              }
            }}
          >
            <Text style={styles.btn__txt}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.push("SignIn")}>
            <Text style={styles.btntxt}>Already have an account ? Sign In</Text>
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

  txtBoxInput: {
    height: "20%",
    borderWidth: 1,
    borderColor: "hsl(359, 100%, 68%)",
    padding: 10,
    marginBottom: 20,
  },

  container: {
    marginHorizontal: "10%",
    // alignItems: "center",
  },

  ctaZone: {
    marginTop: 10,
    alignItems: "center",
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

  badInfo: {
    color: "hsl(359, 100%, 68%)",
  },
});
