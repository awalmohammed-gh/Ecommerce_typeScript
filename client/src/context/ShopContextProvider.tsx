import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Address, CartItem, Product } from "../Types/type";

interface ShopContextCard {
  cartItems: CartItem[];
  addresses: Address[];
  cartCount: number;
  addToCart: (product: Product, quantity: number, selectedSize: string) => void;
  removeFromCart: (productId: string, selectedSize: string) => void;
  updateQuantity: (
    productId: string,
    quantity: number,
    selectedSize: string,
  ) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  cartTotal: number;
  clearCart: () => void;
  deliveryFee: number;
  addAddress: (address: Address) => void;
  removeAddress: (addressId: string) => void;
  updateAddress: (address: Address) => void;
  paymentMethod: string;
  setPaymentMethod: React.Dispatch<React.SetStateAction<string>>;
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
  currentState: string;
  setCurrentState: React.Dispatch<React.SetStateAction<string>>;
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  wishlist: string[];
}

const ShopContext = createContext<ShopContextCard | undefined>(undefined);
export const ShopContextProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });
 
  const [addresses, setAddresses] = useState<Address[]>(() =>{
    const saved = localStorage.getItem("address");
    return saved ? JSON.parse(saved) : [];
  })

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [isLogin, setIsLogin] = useState(true);
  const [currentState, setCurrentState] = useState("login");
  const [wishlist, setWishlist] = useState<string[]>([])


   const deliveryFee = 30;

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("address", JSON.stringify(addresses));
  }, [addresses]);

  const [isCartOpen, setIsCartOpen] = useState(false);

  // function to address

  const addAddress = (address:Address) =>{
    setAddresses((prev) => [...prev, address])
  }


  // function to handle wishlist
 const addToWishlist = (productId: string) => {
   setWishlist((prev) => [...prev, productId]);
 };


//  function to remove from wishlist

 const removeFromWishlist = (productId: string) => {
   setWishlist((prev) => prev.filter((item) => item !== productId));
 };
  // function to remove address
  const removeAddress = (addressId: string) => {
    setAddresses((prev) =>
      prev.filter((address) => address._id !== addressId),
    );
  };


  // function to update address

  const updateAddress = (updateAddress:Address) =>{
    setAddresses((prev) =>{
      return prev.map((addr) => addr._id === updateAddress._id ? updateAddress : addr)
    })
  }

  // function to add to cart
  const addToCart = (
    product: Product,
    quantity: number,
    selectedSize: string,
  ) => {
    setCartItems((prev) => {
      const isItemExist = prev.find(
        (item) =>
          item.product._id === product._id &&
          item.selectedSize === selectedSize,
      );
      if (isItemExist) {
        return prev.map((item) =>
          item.product._id === product._id && item.selectedSize === selectedSize
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }

      return [...prev, { product, quantity, selectedSize }];
    });

    setIsCartOpen(true);
  };

  // function to remove item from cart

  const removeFromCart = (productId: string, selectedSize: string) => {
    setCartItems((prev) => {
      return prev.filter(
        (item) =>
          !(
            item.product._id === productId && item.selectedSize === selectedSize
          ),
      );
    });
  };


  // function to clear cart
  const clearCart = () =>{
    setCartItems([]);
  }
  // function to update quantity
  const updateQuantity = (
    productId: string,
    quantity: number,
    selectedSize: string,
  ) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedSize);
      return;
    }

    setCartItems((prev) => {
      return prev.map((item) =>
        item.product._id === productId && item.selectedSize === selectedSize
          ? { ...item, quantity }
          : item,
      );
    });
  };

  // cart count and total amount
  const cartCount = cartItems.reduce((sum, items) => sum + items.quantity, 0);
  const cartTotal = cartItems.reduce(
    (sum, items) =>
      sum + (items.product?.offerPrice || items.product.price) * items.quantity,
    0,
  );

  console.log(cartItems);

  return (
    <ShopContext.Provider
      value={{
        cartItems,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        cartCount,
        cartTotal,
        updateQuantity,
        clearCart,
        deliveryFee,
        addresses,
        removeAddress,
        updateAddress,
        addAddress,
        paymentMethod,
        setPaymentMethod,
        isLogin,
        setIsLogin,
        currentState,
        setCurrentState,
        wishlist,
        addToWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);

  if (!context) {
    throw new Error("useShop must be used within ShopContextProvider");
  }

  return context;
};