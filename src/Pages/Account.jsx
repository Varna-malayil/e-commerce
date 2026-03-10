import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
  TextInput,
  Alert,
} from "react-native";
import { UseGetUser, UseUpdateUser } from "../Hooks/useHooks";
import { AuthContext } from "../context/AuthContext";

const AccountScreen = () => {
  const { data: user } = UseGetUser();
  const { logout } = useContext(AuthContext);
  const { mutate: updateUser, isLoading: isUpdating } = UseUpdateUser();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user && user.full_name) setName(user.full_name);
    if (user && user.email) setEmail(user.email);
  }, [user]);

  const handleSave = () => {
    // basic validation
    if (!name || name.trim().length === 0) {
      return Alert.alert("Validation", "Full name cannot be empty.");
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return Alert.alert("Validation", "Please enter a valid email address.");
    }
    if (password && password.length > 0 && password.length < 6) {
      return Alert.alert("Validation", "Password must be at least 6 characters.");
    }

    const payload = { full_name: name, email };
    if (password && password.length > 0) payload.password = password;

    updateUser(
      { user_id: user.id, payload },
      {
        onSuccess: () => {
          Alert.alert("Success", "Profile updated successfully.");
          setPassword("");
        },
        onError: (err) => {
          const msg = err?.message || "Failed to update profile.";
          Alert.alert("Error", msg);
        },
      }
    );
  };
 
  
  //  const user ={id: 6, full_name: 'Varna M', email: 'varna@gmail.com', phone: '8888877777', role: 3, role_name: 'USER'}
  if (!user) {
    return (
      <View style={[styles.bg, styles.center]}>
        <Text style={styles.loading}>Loading user data...</Text>
          <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
          <Text style={styles.logoutText}> Logout</Text>
        </TouchableOpacity>
        
      </View>
    );
  }

  return (
    <View style={styles.bg}>
      <View style={styles.bgLayer1} />
      <View style={styles.bgLayer2} />

      <StatusBar barStyle="light-content" backgroundColor="#0a0a1a" />

      {/* Avatar */}
      <View style={styles.avatarContainer}>
        <View style={styles.avatarRing}>
          <Image
            source={{
              uri:
                "https://ui-avatars.com/api/?background=0a0a1a&color=fff&name=" +
                encodeURIComponent(user.full_name || ""),
            }}
            style={styles.avatar}
          />
        </View>
        <TextInput
          value={name}
          onChangeText={setName}
          style={[styles.username, styles.input]}
          placeholder="Full name"
          placeholderTextColor="rgba(255,255,255,0.5)"
          autoCapitalize="words"
        />
        <TextInput
          value={email}
          onChangeText={setEmail}
          style={[styles.value, styles.input]}
          placeholder="Email"
          placeholderTextColor="rgba(255,255,255,0.5)"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          style={[styles.value, styles.input]}
          placeholder="New password "
          placeholderTextColor="rgba(255,255,255,0.5)"
          secureTextEntry={true}
        />
       
      </View>

      {/* User Info Card */}
      <View style={styles.card}>
        <InfoRow label="Phone" value={user.phone} />
        <InfoRow label="Role" value={user.role} />
        <InfoRow label="User ID" value={user.id} />
        <TouchableOpacity
          style={[styles.logoutBtn, styles.saveBtn]}
          onPress={handleSave}
          disabled={isUpdating}
        >
          <Text style={styles.logoutText}>{isUpdating ? "Saving..." : "Save Changes"}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
          <Text style={styles.logoutText}>👤 Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const InfoRow = ({ label, value }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: "#141430",
    paddingHorizontal: 16,
  },

  bgLayer1: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "60%",
    backgroundColor: "#0f0f2a",
    opacity: 0.6,
  },

  bgLayer2: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "50%",
    backgroundColor: "#141430",
    opacity: 0.5,
  },

  center: {
    justifyContent: "center",
    alignItems: "center",
  },

  loading: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 15,
    fontWeight: "600",
  },

  avatarContainer: {
    alignItems: "center",
    marginTop: 70,
    marginBottom: 30,
  },

  avatarRing: {
    padding: 4,
    borderRadius: 60,
    backgroundColor: "rgba(233,69,96,0.5)",
  },

  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "#1a1a2e",
  },

  username: {
    fontSize: 20,
    fontWeight: "800",
    color: "#fff",
    marginTop: 14,
    letterSpacing: 0.3,
  },
  input: {
    width: "80%",
    textAlign: "center",
    paddingVertical: 6,
  },

  email: {
    fontSize: 13,
    color: "rgba(255,255,255,0.5)",
    marginTop: 4,
  },

  card: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  row: {
    marginBottom: 14,
  },

  label: {
    fontSize: 12,
    color: "rgba(255,255,255,0.45)",
    marginBottom: 2,
  },

  value: {
    fontSize: 15,
    fontWeight: "700",
    color: "#fff",
  },

  logoutBtn: {
    marginTop: 22,
    backgroundColor: "#e94560",
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
  },
  saveBtn: {
    backgroundColor: "#9ea3ab",
  },

  logoutText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 14,
    letterSpacing: 0.4,
  },
});

export default AccountScreen;