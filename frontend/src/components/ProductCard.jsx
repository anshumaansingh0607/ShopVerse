import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets'; // make sure heart icons are added

const ProductCard = ({ product }) => {
  const { wishlist, toggleWishlist } = useContext(ShopContext);

  const isWished = wishlist.includes(product._id);

  return (
    <div className="relative p-4 border rounded-md shadow hover:shadow-lg transition">
      {/* Wishlist Icon */}
      <div
        className="absolute top-3 right-3 cursor-pointer"
        onClick={() => toggleWishlist(product._id)}
      >
        <img
          src={isWished ? assets.heart_filled : assets.heart_outline}
          alt="wishlist"
          className="w-6 h-6"
        />
      </div>

      {/* Product Info */}
      <Link to={`/product/${product._id}`}>
        <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-2" />
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-gray-600">₹{product.price}</p>
      </Link>
    </div>
  );
};

export default ProductCard;
