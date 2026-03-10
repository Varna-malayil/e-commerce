import React, { useContext, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ActivityIndicator, View } from "react-native";
import { AuthContext, AuthProvider } from "./src/context/AuthContext";
import { store } from "./src/redux/store";
import { Provider } from "react-redux";
import ProductDetailScreen from "./src/Pages/ProductDetails";
import { BottomTab } from "./src/tab/BottomTab";
import LoginScreen from "./src/Pages/LoginScreen";
import RegisterScreen from "./src/Pages/RegisterScreen";
import MyComponent from "./src/Pages/PaperNavigation";
import SplashScreen from "react-native-splash-screen";
import useInternetListener from "./src/utils/InternetInfo";
import Form from "./src/Pages/ReactHookForm";


const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

const AppNavigator = () => {
  const { userToken, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={userToken ? "MainTabs" : "Login"}
    >
      {userToken ? (
        <>
          <Stack.Screen name='MainTabs' component={BottomTab} />
          <Stack.Screen name="ProductDetails" component={ProductDetailScreen} />
          <Stack.Screen name="PaperBottomTab" component={MyComponent} />
          <Stack.Screen name="Form" component={Form}/>
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      )}
      {/* <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} /> 
          <Stack.Screen name="Cart" component={CartScreen} /> */}
    </Stack.Navigator>
  );
};

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  useInternetListener()
  return (

    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <AuthProvider>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </AuthProvider>
      </Provider>
    </QueryClientProvider>
  );
};

export default App;