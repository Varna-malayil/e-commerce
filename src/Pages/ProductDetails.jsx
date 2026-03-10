import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
  ScrollView,
  Alert,
} from "react-native";
import { UseAddToCart, useGetDetails } from "../Hooks/useHooks";
import { useQueryClient } from "@tanstack/react-query";

const ProductDetailScreen = ({ route }) => {
  const { id } = route.params;
  const { data: products, isPending, isError } = useGetDetails(id);
  const {mutate, isLoading} = UseAddToCart();
  const queryClient = useQueryClient();
  const product = products?.find((item) => item.id === Number(id));

  if (isPending) {
    return (
      <View style={[styles.bg, styles.center]}>
        <ActivityIndicator size="large" color="#e94560" />
      </View>
    );
  }

  if (isError || !product) {
    return (
      <View style={[styles.bg, styles.center]}>
        <Text style={styles.error}>Failed to load product</Text>
      </View>
    );
  }
  const handleAddToCart = () => {

   mutate({product_id: product.id, quantity: 1},{
    onSuccess: () => {
      Alert.alert("Success", "Product added to cart!");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error) => {
      console.error("Failed to add to cart:", error);
    },
   })
    
  }

  return (
    <View style={styles.bg}>
      <View style={styles.bgLayer1} />
      <View style={styles.bgLayer2} />

      <StatusBar barStyle="light-content" backgroundColor="#0a0a1a" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Image */}
        <View style={styles.imageWrap}>
          <Image source={{ uri: product.image_url }} style={styles.image} />
        </View>

        {/* Content Card */}
        <View style={styles.card}>
          <Text style={styles.title}>{product.name}</Text>

          <View style={styles.priceRow}>
            <Text style={styles.price}>₹ {product.price}</Text>
            <View style={styles.ratingBadge}>
              <Text style={styles.ratingText}>★ 4.5</Text>
            </View>
          </View>

          <Text style={styles.description}>{product.description}</Text>

          <Text style={styles.stock}>
            Stock:{" "}
            <Text
              style={{
                color: product.stock > 0 ? "#7CFC98" : "#e94560",
                fontWeight: "700",
              }}
            >
              {product.stock}
            </Text>
          </Text>

          <TouchableOpacity
            style={[
              styles.cartBtn,
              product.stock === 0 && styles.cartBtnDisabled,
            ]}
            disabled={product.stock === 0}
            onPress={() => handleAddToCart()}
          >
            <Text style={styles.cartText}>
              {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: "#0a0a1a",
  },

  bgLayer1: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "55%",
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

  error: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 16,
    fontWeight: "600",
  },

  imageWrap: {
    marginTop: 20,
    marginHorizontal: 16,
    borderRadius: 22,
    overflow: "hidden",
    backgroundColor: "rgba(255,255,255,0.05)",
  },

  image: {
    width: "100%",
    height: 300,
  },

  card: {
    marginTop: -30,
    marginHorizontal: 16,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 22,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#fff",
    marginBottom: 6,
    letterSpacing: 0.3,
    marginTop:20
  },

  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 12,
  },

  price: {
    fontSize: 20,
    fontWeight: "800",
    color: "#fff",
  },

  ratingBadge: {
    backgroundColor: "rgba(255,200,0,0.12)",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(255,200,0,0.25)",
  },

  ratingText: {
    color: "#ffc800",
    fontSize: 11,
    fontWeight: "700",
  },

  description: {
    fontSize: 14,
    color: "rgba(255,255,255,0.7)",
    lineHeight: 22,
    marginBottom: 14,
  },

  stock: {
    fontSize: 13,
    color: "rgba(255,255,255,0.6)",
    marginBottom: 18,
  },

  cartBtn: {
    backgroundColor: "#e94560",
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
  },

  cartBtnDisabled: {
    backgroundColor: "rgba(255,255,255,0.2)",
  },

  cartText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "800",
    letterSpacing: 0.4,
  },
});

export default ProductDetailScreen;