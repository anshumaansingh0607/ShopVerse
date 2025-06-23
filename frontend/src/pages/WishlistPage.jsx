import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import ProductItem from '../components/ProductItem';
import Title from '../components/Title';

const Wishlist = () => {
  const { wishlist, products } = useContext(ShopContext);
  const wishlistProducts = products.filter(p => wishlist.includes(p._id));

  return (
    <div className='pt-10 px-4'>
      <Title text1="MY" text2="WISHLIST" />
      {
        wishlistProducts.length > 0 ? (
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-10'>
            {wishlistProducts.map((item, index) => (
              <ProductItem
                key={index}
                id={item._id}
                name={item.name}
                image={item.image}
                price={`₹${item.price}`}
              />
            ))}
          </div>
        ) : (
          <p className='text-center text-gray-600 text-lg py-20'>Your wishlist is empty 💔</p>
        )
      }
    </div>
  );
};

export default Wishlist;
