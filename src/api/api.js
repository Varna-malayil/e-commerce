
// import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import * as Keychain from "react-native-keychain"

const API = axios.create({
  baseURL: "http://192.168.1.50:8000",
  headers: { "Content-Type": "application/json" },
});
// API.interceptors.request.use(
//   async (config) => {
//     const token = await AsyncStorage.getItem("token");

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );
API.interceptors.request.use(
  async (config) => {
    const credentials = await Keychain.getGenericPassword();

    if (credentials) {
      config.headers.Authorization = `Bearer ${credentials.password}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export const registerUser = async (data) => {
  const res = await API.post("/create_user/", data);
  return res.data;
};

export const loginUser = async (data) => {
  const res = await API.post("/login/", data);
  return res.data;
};
export const getProducts = async (data) => {
  const res = await API.get("/products/")
  return res.data;
}
export const getDetails = async (id) => {
  const res = await API.get(`/products/`, { params: { id }, });
  return res.data;
}
export const getUser = async () => {
  const res = await API.get("/profile-detail/")
  return res.data;
}
export const getCartList = async () => {
  const res = await API.get("/cart/cart-lists/")
  return res.data;
}
export const addToCart = async ({ product_id, quantity }) => {
  const res = await API.post("/cart/add_to_cart/", { product_id, quantity });
  return res.data;
};
export const removeFromCart = async ({ product_id }) => {
  await API.delete(`/cart/remove/${product_id}/`);
}
export const bannerList = async () => {
  const res = await API.get('/banner/banner-lists/')
  return res.data
}
export const userUpdate = async ({ user_id, payload }) => {
  const res = await API.patch(`/update_user/?user_id=${user_id}`, payload);
  return res.data;
};