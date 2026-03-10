
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addToCart, bannerList, getCartList, getDetails, getProducts, getUser, loginUser, registerUser, removeFromCart, userUpdate } from "../api/api";


export const useRegister = () => {
  return useMutation({
    mutationFn: registerUser,
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: loginUser,
  });
};
export const useGetProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  })
}
export const useGetDetails = (id) => {
  return useQuery({
    queryKey: ["details", id],
    queryFn: () => getDetails(id),
  })
}
export const UseGetUser = () => {
  return useQuery({
     queryKey: ["user"],
     queryFn: getUser })
}
export const UseGetCartList = () => {
   return useQuery({
      queryKey: ["cart"], 
      queryFn: getCartList
  })
}
export const UseAddToCart = () => {
  return useMutation({
    mutationFn: addToCart,
  })
}
export const UseRemoveFromCart = () => {
  return useMutation({
    mutationFn: removeFromCart,
    mutationKey: ["removeFromCart"],
  })
}
export const UseGetBanner =()=>{
  return useQuery({
    queryFn:bannerList
  })
}
export const UseUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userUpdate,
    mutationKey: ["updateUser"],
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
    },
  });
};