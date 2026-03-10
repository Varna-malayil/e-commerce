import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";


import { useLogin } from "../Hooks/useHooks";
import { AuthContext } from "../context/AuthContext";


const LoginScreen = ({ navigation }) => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const { mutate, isPending } = useLogin();
  const { login } = useContext(AuthContext);

  const handleLogin = () => {
    if (!identifier || !password) {
      Alert.alert("Error", "All fields are required");
      return;
    }

    mutate(
      { identifier, password },
      {
        onSuccess: (data) => {
          console.log("Login response:", data);
          const token = data?.token || data?.access_token || data?.data?.token || null;
          if (token) {
            Alert.alert("Success", "Login successful");
            login(token);
          } else {
            Alert.alert("Error", "Login succeeded but no token returned");
          }
        },
        onError: (err) => {
          console.log("Login error:", err);
          Alert.alert("Error", err?.response?.data?.message || err.message || "Login failed");
        },
      }
    );
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Login</Text>

      <TextInput
        placeholder="Email or Phone"
        value={identifier}
        onChangeText={setIdentifier}
        style={styles.input}
        placeholderTextColor="#888"
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
        placeholderTextColor="#888"
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        {isPending ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.btnText}>Login</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={styles.link}>New user? Register</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#404051",
  },
  input: {
    borderWidth: 1,
    borderRadius: 6,
    padding: 12,
    marginBottom: 12,
    color:'black',
  },
  button: {
    backgroundColor: "#404051",
    padding: 14,
    borderRadius: 6,
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    fontWeight: "600",
  },
  link: {
    marginTop: 16,
    textAlign: "center",
    color: "#404051",
  },
});

export default LoginScreen;
