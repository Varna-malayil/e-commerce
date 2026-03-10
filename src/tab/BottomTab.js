import Fontisto from "@react-native-vector-icons/fontisto";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../Pages/Home";
import AccountScreen from "../Pages/Account";
import CartScreen from "../Pages/Cart";
import { Components } from "../Pages/Components";


const Tab = createBottomTabNavigator();
export const BottomTab = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: () => {
                    let iconName = "";
                    if (route.name === 'Home') {
                        iconName = "home";
                    } else if (route.name === 'Cart') {
                        iconName = "shopping-bag";
                    } else if (route.name ==='Components'){
                        iconName = "Android";
                    }
                     else iconName = "person";
                    return <Fontisto name={iconName} size={20} color={"#a54949"} />
                },
                tabBarActiveTintColor: "#a54949",
                tabBarInactiveTintColor: "gray",
                tabBarStyle: {
                    backgroundColor: "#0a0a1a",
                    borderTopColor: "rgba(255,255,255,0.1)",
                    height: 64,
                },
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Cart" component={CartScreen} />
            <Tab.Screen name="Account" component={AccountScreen} />
            <Tab.Screen name="Components" component={Components}/>
        </Tab.Navigator>
    )
}