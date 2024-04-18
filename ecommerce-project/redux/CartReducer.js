import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: "Cart",
    InitialState: {
        cart: [],
    },
    reducers: {
        addToCart: (state, action) => {
            const itemsPresent = state.cart.find(item => item.id === action.payload.id);
            if (itemsPresent) {
                itemsPresent.quantity++;
            } else {
                state.cart.push({ ...action.payload, quantity: 1 });
            }
        },
        removeFromCart: (state, action) => {
            const removeItem = state.cart.filter((item) => item.id !== action.payload.id);
            state.cart = removeItem;
        },
        incemetQuantity: (state, action) => {
            const itemsPresent = state.cart.find(item => item.id === action.payload.id);
            itemsPresent.quantity++;

        },
        decreaseQuantity: (state, action) => {
            const itemsPresent = state.cart.find(item => item.id === action.payload.id);
            if (itemPresent.quantity === 1) {
                itemPresent.quantity = 0;
                const removeItem = state.cart.filter((item) => item.id !== action.payload.id);
                state.cart = removeItem;

            } else {
                itemPresent.quantity--;
            }
        },
        cleanCart: (state) => {
            state.cart = [];
        }
    },
});


export const { addToCart, removeFromCart, incemetQuantity, decreaseQuantity, cleanCart } = cartSlice.actions;

export default cartSlice.reducer;