// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { createPost, deletePost, updatePost } from "../api/api";


// export const useCreatePost = () => {
//     const queryClient = useQueryClient();
//     return useMutation({
//         mutationFn: createPost,
//         onSuccess: (newPost) => {
//             queryClient.setQueryData(["posts"], (oldPosts = []) => {
//                 const maxId = oldPosts.reduce(
//                     (max, post) => (post.id > max ? post.id : max),
//                     0
//                 );
//                 return [
//                     {
//                         id: maxId + 1,

//                         ...newPost,
//                     },
//                     ...oldPosts,
//                 ];
//             });
//         },
//     })
// }

// export const useDeletePost = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: deletePost,
//     onSuccess: (id) => {
//       queryClient.setQueryData(["posts"], (oldPosts = []) =>
//         oldPosts.filter((post) => post.id !== id)
//       );
//     },
//   });
// };

// /* UPDATE */
// export const useUpdatePost = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: updatePost,
//     onSuccess: (updatedPost) => {
//       queryClient.setQueryData(["posts"], (oldPosts = []) =>
//         oldPosts.map((post) =>
//           post.id === updatedPost.id ? updatedPost : post
//         )
//       );
//     },
//   });
// };


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