// // using AsyncStorage 



// import React, { createContext, useEffect, useState } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [userToken, setUserToken] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Load token on app start
//   useEffect(() => {
//     const loadToken = async () => {
//       const token = await AsyncStorage.getItem("token");
//       setUserToken(token);
//       setLoading(false);
//     };
//     loadToken();
//   }, []);

//   const login = async (token) => {
//     await AsyncStorage.setItem("token", token);
//     setUserToken(token);
//     console.log("Token stored:", token);
//   };

//   const logout = async () => {
//     await AsyncStorage.removeItem("token");
//     setUserToken(null);
//   };

//   return (
//     <AuthContext.Provider value={{ userToken, login, logout, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// key chain storage 

import * as Keychain from "react-native-keychain"
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {

  const [userToken, setUserToken] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadToken = async () => {
      const credentials = await Keychain.getGenericPassword()
      if (credentials) {
        setUserToken(credentials.password)
      }
      setLoading(false)
    }
    loadToken()
  }, [])

  const login = async (token) => {
    await Keychain.setGenericPassword('userToken', token)
    setUserToken(token)
    console.log("Token stored securely:", token);
  }
  const logout = async (token) => {
    await Keychain.resetGenericPassword()
    setUserToken(null)
  }
  return (
    <AuthContext.Provider value={{ userToken, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )

}