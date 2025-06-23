import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = '₹';
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [wishlist, setWishlist] = useState(() => {
    // Load from localStorage initially
    const stored = localStorage.getItem('wishlist');
    return stored ? JSON.parse(stored) : [];
  });

  const [products, setProducts] = useState([]);
  const [token, setToken] = useState('');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const addToCart = async (itemId, size) => {
    if (!size) return toast.error('Select Product Size');

    let cartData = structuredClone(cartItems);
    cartData[itemId] = cartData[itemId] || {};
    cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(`${backendUrl}/api/cart/add`, { itemId, size }, { headers: { token } });
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const getCartCount = () => {
    let total = 0;
    for (let id in cartItems) {
      for (let size in cartItems[id]) {
        total += cartItems[id][size];
      }
    }
    return total;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(`${backendUrl}/api/cart/update`, { itemId, size, quantity }, { headers: { token } });
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const getCartAmount = () => {
    let total = 0;
    for (const id in cartItems) {
      const item = products.find(p => p._id === id);
      for (const size in cartItems[id]) {
        if (item) total += item.price * cartItems[id][size];
      }
    }
    return total;
  };

  const getProductsData = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/product/list`);
      if (res.data.success) {
        setProducts(res.data.products.reverse());
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch products.");
    }
  };

  const getUserCart = async (token) => {
    try {
      const res = await axios.post(`${backendUrl}/api/cart/get`, {}, { headers: { token } });
      if (res.data.success) setCartItems(res.data.cartData);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUserData = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/user/profile`, { headers: { token } });
      if (res.data.success) setUser(res.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  // ✅ Toggle wishlist with local storage sync
  const toggleWishlist = (productId) => {
    setWishlist((prev) => {
      const updated = prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId];
      localStorage.setItem('wishlist', JSON.stringify(updated));
      return updated;
    });
  };

  const logoutUser = () => {
    setToken('');
    setUser(null);
    setCartItems({});
    localStorage.removeItem('token');
    navigate('/login');
  };

  useEffect(() => {
    getProductsData();
  }, []);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (!token && savedToken) {
      setToken(savedToken);
      getUserCart(savedToken);
    }
    if (token) {
      getUserCart(token);
      fetchUserData();
    }
  }, [token]);

  const value = {
    products,
    cartItems,
    addToCart,
    updateQuantity,
    getCartAmount,
    getCartCount,
    setCartItems,
    wishlist,
    toggleWishlist,
    currency,
    delivery_fee,
    navigate,
    backendUrl,
    token,
    setToken,
    user,
    logoutUser,
    search,
    setSearch,
    showSearch,
    setShowSearch,
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
