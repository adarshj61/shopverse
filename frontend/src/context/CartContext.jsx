import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("shopverse-cart");

    return savedCart
      ? JSON.parse(savedCart)
      : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "shopverse-cart",
      JSON.stringify(cartItems)
    );
  }, [cartItems]);


  // ADD PRODUCT

  const addToCart = (product, quantity = 1, size = null) => {
    setCartItems((currentItems) => {

      const existingItem = currentItems.find(
        (item) =>
          item.id === product.id &&
          item.size === size
      );

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id &&
          item.size === size
            ? {
                ...item,
                quantity:
                  item.quantity + quantity,
              }
            : item
        );
      }

      return [
        ...currentItems,
        {
          ...product,
          quantity,
          size,
        },
      ];
    });
  };


  // REMOVE PRODUCT

  const removeFromCart = (id, size) => {
    setCartItems((currentItems) =>
      currentItems.filter(
        (item) =>
          !(
            item.id === id &&
            item.size === size
          )
      )
    );
  };


  // INCREASE

  const increaseQuantity = (id, size) => {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id &&
        item.size === size
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };


  // DECREASE

  const decreaseQuantity = (id, size) => {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id &&
        item.size === size &&
        item.quantity > 1
          ? {
              ...item,
              quantity: item.quantity - 1,
            }
          : item
      )
    );
  };


  // CLEAR

  const clearCart = () => {
    setCartItems([]);
  };


  // TOTAL ITEMS

  const totalItems = cartItems.reduce(
    (total, item) =>
      total + item.quantity,
    0
  );


  // TOTAL PRICE

  const totalPrice = cartItems.reduce(
    (total, item) =>
      total +
      item.price * item.quantity,
    0
  );


  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}


export function useCart() {
  return useContext(CartContext);
}