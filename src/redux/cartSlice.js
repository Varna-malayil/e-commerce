import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
    },
    reducers: {
        addToCart: (state, action) => {
            const product = action.payload;
            const existing = state.items.find((i) => i.id === product.id);

            if (existing) {
                existing.qty += 1;
            } else {
                state.items.push({ ...product, qty: 1 });
            }
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter(
                (item) => item.id !== action.payload
            );
        },

        incrementQty: (state, action) => {
            const item = state.items.find((i) => i.id === action.payload);
            if (item) item.qty += 1;
        },

        decrementQty: (state, action) => {
            const item = state.items.find((i) => i.id === action.payload);
            if (item && item.qty > 1) {
                item.qty -= 1;
            } else {
                state.items = state.items.filter((i) => i.id !== action.payload);
            }
        },

        clearCart: (state) => {
            state.items = [];
        },
    },
});

export const {
    addToCart,
    incrementQty,
    decrementQty,
    clearCart,
    removeFromCart,
} = cartSlice.actions;

export default cartSlice.reducer;