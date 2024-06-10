import { createSlice } from "@reduxjs/toolkit";
import { cloneDeep } from "lodash";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartAr: [],
    isOpen: false,
  },
  reducers: {
    setCartList: (state, payload) => {
      return {
        ...state,
        cartAr: [...payload.payload],
      };
    },
    setIsOpenCart: (state, payload) => {
      return {
        ...state,
        isOpen: payload.payload,
      };
    },
    byToCart: (state, payload) => {
      const isCart = state.cartAr.find(
        (e) => e.idBook === payload.payload.idBook
      );
      if (!isCart) {
        return {
          cartAr: [
            ...state.cartAr,
            {
              ...payload.payload,
              qty: payload.payload.quantity2 ?? 1,
              total: payload.payload.sellPrice,
            },
          ],
        };
      } else {
        const cartNew = cloneDeep(state.cartAr);
        const objIndex = cartNew.findIndex(
          (obj) => obj.idBook === payload.payload.idBook
        );
        cartNew[objIndex].qty =
          cartNew[objIndex].qty + (payload.payload.quantity2 ?? 1);
        cartNew[objIndex].total =
          cartNew[objIndex].sellPrice * cartNew[objIndex].qty;
        return {
          ...state,
          cartAr: cartNew,
        };
      }
    },
    plusToCart: (state, payload) => {
      const cartNew = cloneDeep(state.cartAr);
      const objIndex = cartNew.findIndex((obj) => obj.id === payload.payload);
      cartNew[objIndex].qty = cartNew[objIndex].qty + 1;
      cartNew[objIndex].total = cartNew[objIndex].price * cartNew[objIndex].qty;
      return {
        ...state,
        cartAr: cartNew,
      };
    },
    minusToCart: (state, payload) => {
      const cartNew = cloneDeep(state.cartAr);
      const objIndex = cartNew.findIndex((obj) => obj.id === payload.payload);
      if (cartNew[objIndex].qty > 1) {
        cartNew[objIndex].qty = cartNew[objIndex].qty - 1;
        cartNew[objIndex].total =
          cartNew[objIndex].price * cartNew[objIndex].qty;
      }
      return {
        ...state,
        cartAr: cartNew,
      };
    },
    qtyCart: (state, payload) => {
      const cartNew = cloneDeep(state.cartAr);
      const objIndex = cartNew.findIndex((obj) => obj.id == payload.payload.id);
      if (payload.payload.qty >= 1) {
        cartNew[objIndex].qty = payload.payload.qty;
        cartNew[objIndex].total =
          cartNew[objIndex].price * cartNew[objIndex].qty;
      }
      return {
        ...state,
        cartAr: cartNew,
      };
    },
    DeleteCart: (state, payload) => {
      const cartNew = cloneDeep(state.cartAr);

      const index = cartNew.findIndex((obj) => obj.idBook === payload.payload);

      if (index !== -1) {
        cartNew.splice(index, 1);
      }
      if (cartNew.length === 0) {
        localStorage.removeItem("cart");
      }
      return {
        ...state,
        cartAr: cartNew,
      };
    },
  },
});

export const {
  byToCart,
  DeleteCart,
  setCartList,
  plusToCart,
  minusToCart,
  qtyCart,
  setIsOpenCart,
} = cartSlice.actions;
export default cartSlice.reducer;
