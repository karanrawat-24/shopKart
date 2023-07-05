import { createContext, useEffect, useState } from 'react';

const addCartItem = (cartItem, productToAdd) => {
  const existingCartItem = cartItem.find((cartItem) => {
    return cartItem.id === productToAdd.id;
  });

  if (existingCartItem) {
    return cartItem.map((cartItem) => {
      return cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem;
    });
  }

  return [...cartItem, { ...productToAdd, quantity: 1 }];
};

const removeItem = (cartItem, productToremove) => {
  const existingCartItem = cartItem.find((cartItem) => {
    return cartItem.id === productToremove.id;
  });

  if (existingCartItem.quantity === 1) {
    return cartItem.filter((cartItem) => cartItem.id !== productToremove.id);
  }

  return cartItem.map((cartItem) => {
    return cartItem.id === productToremove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem;
  });
};

const clearCartItem = (cartItem, cartItemToRClear) => {
  return cartItem.filter((cartItem) => cartItem.id !== cartItemToRClear.id);
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartCount: 0,
  cartTotal:0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const [cartCount, setCartCount] = useState(0);

  const [cartTotal, setCartTotal] = useState(0);


  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    setCartCount(newCartCount);
  }, [cartItems]);

  useEffect(() => {
    const newCartTotal = cartItems.reduce(
      (total, cartItem) => total + cartItem.price*cartItem.quantity,
      0
    );
    setCartTotal(newCartTotal);
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };
  const removeItemFromCart = (productToremove) => {
    setCartItems(removeItem(cartItems, productToremove));
  };

  const clearItemFromCart = (cartItemToRClear) => {
    setCartItems(clearCartItem(cartItems, cartItemToRClear));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    cartItems,
    cartCount,
    removeItemFromCart,
    clearItemFromCart,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
