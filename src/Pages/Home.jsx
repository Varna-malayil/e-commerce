// import React, { useContext } from "react";
// import {
//     View,
//     Text,
//     TouchableOpacity,
//     StyleSheet,
//     FlatList,
//     Image,
// } from "react-native";
// import { AuthContext } from "./context/AuthContext";
// import { addToCart } from "./redux/cartSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigation } from "@react-navigation/native";
// import { useGetProducts } from "./Hooks/useHooks";

// const HomeScreen = () => {
//     const { logout } = useContext(AuthContext);
//     const dispatch = useDispatch();
//     const navigation = useNavigation();
//     const cartCount = useSelector((state) => state.cart.items.length);
//     const { data: Products, isPending, isError } = useGetProducts();
//     if (isPending) {
//         return <Text style={{ textAlign: "center", marginTop: 50 }}>Loading...</Text>;
//     }

//     if (isError) {
//         return (
//             <>
//                 <Text style={{ textAlign: "center", marginTop: 50 }}>Failed to load products</Text>
//                 <TouchableOpacity onPress={logout}>
//                     <Text style={styles.profileBtn}>👤</Text>
//                 </TouchableOpacity>
//             </>
//         );
//     }


//     const ProductCard = ({ item }) => {
//         return (
//             <TouchableOpacity activeOpacity={0.8} style={styles.card}
//                 onPress={() => navigation.navigate("ProductDetails", { id: item.id })}>
//                 <Image source={{ uri: item?.image_url }} style={styles.image} />
//                 <Text style={{ color: "#8585b1", fontSize: 16 }}>{item.name}</Text>
//                 <Text style={styles.price}>${item.price}</Text>
//                 {/* <TouchableOpacity
//                     style={{ backgroundColor: "#2E7D32", padding: 10, borderRadius: 5, marginTop: 10 }} onPress={() => dispatch(addToCart(item))}>
//                     <Text style={styles.title}>Add to Cart</Text>
//                 </TouchableOpacity> */}
//             </TouchableOpacity>
//         );
//     };
//     return (
//         <View style={styles.container}>
//             <View style={styles.header}>
//                 <Text style={styles.heading}>Products</Text>

//                 <View style={{ flexDirection: "row", gap: 10, padding: 20 }}>
//                     <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
//                         <Text style={styles.qty}>🛒 {cartCount}</Text>
//                     </TouchableOpacity>

//                     <TouchableOpacity onPress={logout}>
//                         <Text style={styles.profileBtn}>👤</Text>
//                     </TouchableOpacity>
//                 </View>
//             </View>

//             <FlatList
//                 data={Products}
//                 keyExtractor={(item) => item.id.toString()}
//                 numColumns={2}
//                 columnWrapperStyle={{ justifyContent: "space-between" }}
//                 renderItem={({ item }) => <ProductCard item={item} />}
//                 showsVerticalScrollIndicator={false}
//             />
//         </View>
//     );
// };
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: "#F5F5F5",
//         padding: 16,
//     },
//     heading: {
//         fontSize: 24,
//         fontWeight: "bold",
//         marginBottom: 16,
//         textAlign: "center",
//         color: "#404051",
//     },
//     card: {
//         backgroundColor: "#fff",
//         width: "48%",
//         borderRadius: 12,
//         padding: 10,
//         marginBottom: 16,
//         elevation: 3, // Android shadow
//     },
//     image: {
//         width: "100%",
//         height: 120,
//         borderRadius: 10,
//         marginBottom: 8,
//     },
//     title: {
//         fontSize: 14,
//         fontWeight: "600",
//         marginBottom: 4,
//     },
//     price: {
//         fontSize: 14,
//         fontWeight: "bold",
//         color: "#2E7D32",
//     },
//     logoutBtn: {
//         backgroundColor: "#F44336",
//         padding: 14,
//         borderRadius: 8,
//         alignItems: "center",
//         marginTop: 10,
//     },
//     logoutText: {
//         color: "#fff",
//         fontWeight: "600",
//     },
//     badge: {
//         backgroundColor: "red",
//         color: "#fff",
//         paddingHorizontal: 10,
//         borderRadius: 10,
//     },
//     qty: {
//         fontSize: 16,
//         fontWeight: "600",
//         marginHorizontal: 10,
//         color: "#404051",
//     },
//     profileBtn: {
//         fontSize: 20,
//         color: "#404051",
//     },
// });

// export default HomeScreen;

import React, { useContext, useRef, useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    Image,
    StatusBar,
    Alert,
} from "react-native";
import PagerView from "react-native-pager-view";
import { AuthContext } from "../context/AuthContext";
import { addToCart } from "../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { UseAddToCart, useGetProducts } from "../Hooks/useHooks";
import { useQueryClient } from "@tanstack/react-query";
import { BannerCarousel } from "./Banners";





const HomeScreen = () => {
    const { logout } = useContext(AuthContext);
    const { mutate } = UseAddToCart()
    const queryClient = useQueryClient();
    const navigation = useNavigation();
    const cartCount = useSelector((state) => state.cart.items.length);
    const { data: Products, isPending, isError } = useGetProducts();
    
    // const Products = [
    //     {
    //         id: 2,
    //         name: "Vintage Camera",
    //         description: "the mid 90's best one",
    //         stock: 1,
    //         image_url: "http://192.168.1.50:8000/media/pexels-chuck-4939936.jpg",
    //         rating: null,
    //         price: 990,
    //         discount_price: 950,
    //         is_active: true,
    //     },
    //     {
    //         id: 3,
    //         name: "Nikon gx63",
    //         description: "the generation balancer",
    //         stock: 2,
    //         image_url: "http://192.168.1.50:8000/media/pexels-alexazabache-3907507.jpg",
    //         rating: null,
    //         price: 1280,
    //         discount_price: 1250,
    //         is_active: true,
    //     },
    //     {
    //         id: 4,
    //         name: "Fuji Film",
    //         description: "the premium one in japan made",
    //         stock: 3,
    //         image_url: "http://192.168.1.50:8000/media/pexels-math-90946.jpg",
    //         rating: null,
    //         price: 1570,
    //         discount_price: 1550,
    //         is_active: true,
    //     },
    //     {
    //         id: 5,
    //         name: "Karolina jabrani",
    //         description: "For all skin types",
    //         stock: 6,
    //         image_url: "http://192.168.1.50:8000/media/pexels-karolina-grabowska-4041392.jpg",
    //         rating: null,
    //         price: 699,
    //         discount_price: 666,
    //         is_active: true,
    //     },
    //     {
    //         id: 6,
    //         name: "Baggito-The kidnapper",
    //         description: "For the kidnappers in you!",
    //         stock: 10,
    //         image_url: "http://192.168.1.50:8000/media/DSC5991-1-scaled.jpg",
    //         rating: null,
    //         price: 1280,
    //         discount_price: 1240,
    //         is_active: true,
    //     },
    //     {
    //         id: 7,
    //         name: null,
    //         description: "innovative products from the natural elements",
    //         stock: 20,
    //         image_url: null,
    //         rating: null,
    //         price: null,
    //         discount_price: null,
    //         is_active: true,
    //     },
    // ];

    const handleAddToCart = (id) => {
        mutate({ product_id: id, quantity: 1 }, {
            onSuccess: () => {
                Alert.alert("Success", "Product added to cart!");
                queryClient.invalidateQueries({ queryKey: ["cart"] })

            }
        }, {
            onError: (error) => {
                Alert.alert("Failed to add to cart:", error.message);
            }
        })

    };

    if (isPending) {
        return (
            <View style={[styles.bg, styles.center]}>
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        );
    }

    if (isError) {
        return (
            <View style={[styles.bg, styles.center]}>
                <Text style={styles.errorText}>Failed to load products</Text>
                <TouchableOpacity style={styles.retryBtn} onPress={logout}>
                    <Text style={styles.retryText}>Go Back</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const ProductCard = ({ item }) => (
        <TouchableOpacity
            activeOpacity={0.85}
            style={styles.cardWrapper}
            onPress={() => navigation.navigate("ProductDetails", { id: item.id })}
        >
            <View style={styles.card}>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: item?.image_url }} style={styles.image} />
                    <TouchableOpacity
                        style={styles.addBtn}
                        onPress={() => handleAddToCart(item.id)}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.addBtnText}>+</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.productName} numberOfLines={1}>
                    {item.name}
                </Text>

                <View style={styles.priceRow}>
                    <Text style={styles.price}>${item.price}</Text>
                    <View style={styles.ratingBadge}>
                        <Text style={styles.ratingText}>★ 4.5</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );

    const ListHeader = () => (
        <View>
            <View style={styles.header}>
                <View>
                    <Text style={styles.greeting}>Welcome back 👋</Text>
                    <Text style={styles.heading}>Discover Products</Text>
                </View>

                <View style={styles.headerActions}>
                    <TouchableOpacity
                        style={styles.iconBtn}
                        onPress={() => navigation.navigate("Cart")}
                    >
                        <Text style={styles.iconBtnText}>🛒</Text>
                        {cartCount > 0 && (
                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>{cartCount}</Text>
                            </View>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.iconBtn} onPress={logout}>
                        <Text style={styles.iconBtnText}>👤</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <BannerCarousel />

            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Featured Products</Text>
                <TouchableOpacity>
                    <Text style={styles.seeAll}>See all</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.bg}>
            <View style={styles.bgLayer1} />
            <View style={styles.bgLayer2} />

            <StatusBar barStyle="light-content" backgroundColor="#0a0a1a" />

            <FlatList
                data={Products}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                columnWrapperStyle={styles.columnWrapper}
                renderItem={({ item }) => <ProductCard item={item} />}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={<ListHeader />}
                contentContainerStyle={styles.listContent}
            />
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
    loadingText: {
        color: "rgba(255,255,255,0.6)",
        fontSize: 16,
        fontWeight: "600",
    },
    errorText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "700",
        marginBottom: 16,
    },
    retryBtn: {
        backgroundColor: "#e94560",
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 20,
    },
    retryText: {
        color: "#fff",
        fontWeight: "700",
    },
    listContent: {
        paddingHorizontal: 16,
        paddingBottom: 36,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: 52,
        paddingBottom: 20,
    },
    greeting: {
        color: "rgba(255,255,255,0.45)",
        fontSize: 13,
        fontWeight: "500",
        marginBottom: 2,
    },
    heading: {
        fontSize: 22,
        fontWeight: "800",
        color: "#ffffff",
        letterSpacing: 0.3,
    },
    headerActions: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    iconBtn: {
        width: 42,
        height: 42,
        backgroundColor: "rgba(255,255,255,0.07)",
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.1)",
        justifyContent: "center",
        alignItems: "center",
    },
    iconBtnText: {
        fontSize: 18,
    },
    badge: {
        position: "absolute",
        top: 5,
        right: 5,
        backgroundColor: "#e94560",
        width: 16,
        height: 16,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    badgeText: {
        color: "#fff",
        fontSize: 9,
        fontWeight: "800",
    },
    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 22,
        marginBottom: 14,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "800",
        color: "#ffffff",
        letterSpacing: 0.2,
    },
    seeAll: {
        fontSize: 13,
        color: "#e94560",
        fontWeight: "600",
    },
    columnWrapper: {
        justifyContent: "space-between",
        marginBottom: 14,
    },
    cardWrapper: {
        width: "48%",
    },
    card: {
        backgroundColor: "rgba(255,255,255,0.05)",
        borderRadius: 18,
        padding: 10,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.08)",
        overflow: "hidden",
    },
    imageContainer: {
        position: "relative",
        marginBottom: 10,
    },
    image: {
        width: "100%",
        height: 130,
        borderRadius: 12,
        backgroundColor: "rgba(255,255,255,0.04)",
    },
    addBtn: {
        position: "absolute",
        bottom: 6,
        right: 6,
        width: 30,
        height: 30,
        backgroundColor: "#e94560",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        elevation: 4,
    },
    addBtnText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "700",
        lineHeight: 22,
    },
    productName: {
        color: "rgba(255,255,255,0.75)",
        fontSize: 13,
        fontWeight: "600",
        marginBottom: 6,
    },
    priceRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    price: {
        fontSize: 15,
        fontWeight: "800",
        color: "#ffffff",
    },
    ratingBadge: {
        backgroundColor: "rgba(255, 200, 0, 0.1)",
        paddingHorizontal: 7,
        paddingVertical: 2,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "rgba(255, 200, 0, 0.2)",
    },
    ratingText: {
        color: "#ffc800",
        fontSize: 10,
        fontWeight: "700",
    },
});

export default HomeScreen;