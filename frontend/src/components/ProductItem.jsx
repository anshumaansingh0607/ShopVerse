import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, name, price, badge }) => {
  const { currency } = useContext(ShopContext); // ₹ or $

  return (
    <Link
      onClick={() => scrollTo(0, 0)}
      className='text-gray-700 cursor-pointer'
      to={`/product/${id}`}
    >
      <div className='relative overflow-hidden border rounded-md shadow-sm hover:shadow-md transition'>
        {/* Optional Badge */}
        {badge && (
          <div className="absolute top-2 left-2 bg-yellow-400 text-[10px] font-bold px-2 py-[2px] rounded shadow-sm uppercase">
            {badge}
          </div>
        )}

        {/* Product Image */}
        <img
          className='w-full h-60 object-cover hover:scale-105 transition-transform duration-300 ease-in-out'
          src={image?.[0] || '/placeholder.png'}
          alt={name}
          loading="lazy"
        />
      </div>

      {/* Product Info */}
      <p className='pt-3 pb-1 text-sm font-medium truncate'>{name}</p>
      <p className='text-sm font-semibold'>
        {`${price}`.includes('₹') || `${price}`.includes('$') ? price : `${currency}${price}`}
      </p>
    </Link>
  );
};

export default ProductItem;
