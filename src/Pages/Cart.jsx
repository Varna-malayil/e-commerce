import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Fontisto from "@react-native-vector-icons/fontisto";

import { UseGetCartList, UseRemoveFromCart } from "../Hooks/useHooks";
import { useQueryClient } from "@tanstack/react-query";

const CartScreen = () => {
    const queryClient = useQueryClient();
  const navigation = useNavigation();

  const { data, isLoading, isError } = UseGetCartList();
  const { mutate: removeFromCart } = UseRemoveFromCart();

  const cartItems = data?.data ?? [];
  const totalPrice = data?.total_amount ?? 0;

 
  const handleRemoveFromCart = (productId) => {
    if (!productId) {
      Alert.alert("Error", "Invalid product id");
      return;
    }

    removeFromCart(
      { product_id: productId },
      {
        onSuccess: () => {
          Alert.alert("Success", "Item removed from cart!");
          queryClient.invalidateQueries({ queryKey: ["cart"] });
        },
        onError: (error) => {
          Alert.alert(
            "Failed",
            error?.response?.data?.message || error.message
          );
        },
      }
    );
  };

 
  const renderCartItem = ({ item }) => (
    <>
    <View style={styles.card}>
      <View style={styles.rowTop}>
        <Image source={{ uri: item.image_url }} style={styles.image} />

        <View style={{ flex: 1 }}>
          <Text style={styles.title} numberOfLines={1}>
            {item.name}
          </Text>
          <View style={{flexDirection:"row" ,"gap":10}}><Text style={styles.price}>₹{item.item_total}</Text>
          <Text style={styles.discprice}>₹{item.discount_price}</Text></View>
        </View>
      </View>

      <View style={styles.rowBottom}>
        {/* Quantity */}
        <View style={styles.qtyBox}>
          <TouchableOpacity style={styles.qtyBtnBox}>
            <Text style={styles.qtyBtn}>−</Text>
          </TouchableOpacity>

          <Text style={styles.qty}>{item.quantity}</Text>

          <TouchableOpacity style={styles.qtyBtnBox}>
            <Text style={styles.qtyBtn}>+</Text>
          </TouchableOpacity>
        </View>

        {/* Remove */}
        <TouchableOpacity
          style={styles.removeBtn}
          onPress={() => handleRemoveFromCart(item.product_id)}
        >
          <Text style={styles.removeText}>Remove</Text>
        </TouchableOpacity>
      </View></View>
      </>
    
  );

 
  if (isLoading) {
    return (
      <View style={[styles.bg, styles.center]}>
        <ActivityIndicator size="large" color="#e94560" />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={[styles.bg, styles.center]}>
        <Text style={styles.empty}>Failed to load cart</Text>
      </View>
    );
  }

 
  return (
    <View style={styles.bg}>
      <View style={styles.bgLayer1} />
      <View style={styles.bgLayer2} />

      <StatusBar barStyle="light-content" backgroundColor="#0a0a1a" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
        >
          <Fontisto name="arrow-left" size={16} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.heading}>My Cart</Text>
      </View>

      {cartItems.length === 0 ? (
        <Text style={styles.empty}>Your cart is empty 🛒</Text>
      ) : (
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.cart_id.toString()}
          renderItem={renderCartItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        />
      )}
       <View><Text style={styles.totalPrice}>Total: ₹{totalPrice}</Text></View>
    </View>
  );
};
const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: "#0a0a1a",
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingTop: 52,
    paddingBottom: 20,
  },

  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.07)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },

  heading: {
    fontSize: 22,
    fontWeight: "800",
    color: "#fff",
  },

  empty: {
    textAlign: "center",
    marginTop: 120,
    fontSize: 16,
    color: "rgba(255,255,255,0.5)",
  },

  card: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 18,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  rowTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 14,
  },

  image: {
    width: 64,
    height: 64,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.05)",
  },

  title: {
    fontSize: 14,
    fontWeight: "700",
    color: "rgba(255,255,255,0.8)",
    marginBottom: 4,
  },

  price: {
    fontSize: 12,
    fontWeight: "800",
    color: "#c36a6a",
    textDecorationLine: "line-through",
  },
  discprice:{
     fontSize: 15,
    fontWeight: "800",
    color: "#fff",
  },
  totalPrice:{
    fontSize: 16,
    fontWeight: "800",
    color: "#9e9697",
    textAlign:"right",
    marginBottom:50
  },
  rowBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  qtyBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.07)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },

  qtyBtnBox: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },

  qtyBtn: {
    fontSize: 18,
    fontWeight: "800",
    color: "#fff",
  },

  qty: {
    fontSize: 15,
    fontWeight: "700",
    color: "#fff",
    marginHorizontal: 8,
  },

  removeBtn: {
    backgroundColor: "rgba(233,69,96,0.15)",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(233,69,96,0.4)",
  },

  removeText: {
    color: "#e94560",
    fontWeight: "700",
    fontSize: 12,
  },
});

export default CartScreen;