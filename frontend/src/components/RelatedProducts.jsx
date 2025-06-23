import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';
import { Link } from 'react-router-dom';

const RelatedProducts = ({ category, subCategory, currentId }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (products.length > 0) {
      let productsCopy = products.slice();

      // Filter by category and subCategory
      productsCopy = productsCopy.filter(
        (item) =>
          item.category === category &&
          item.subCategory === subCategory &&
          item._id !== currentId
      );

      setRelated(productsCopy);
      setLoading(false);
    }
  }, [products, category, subCategory, currentId]);

  return (
    <div className='my-24'>
      <div className='text-center text-3xl py-2'>
        <Title text1={'RELATED'} text2={'PRODUCTS'} />
      </div>

      {loading ? (
        <p className='text-center text-gray-500 mt-10'>Loading...</p>
      ) : related.length > 0 ? (
        <>
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {related.slice(0, visibleCount).map((item, index) => (
              <ProductItem
                key={index}
                id={item._id}
                name={item.name}
                price={`₹${(item.price * 83).toFixed(0)}`}
                image={item.image}
                badge={item.oldPrice ? 'Offer' : 'Related'}
              />
            ))}
          </div>

          {related.length > visibleCount && (
            <div className='text-center mt-8'>
              <button
                onClick={() => setVisibleCount((prev) => prev + 5)}
                className='bg-black text-white px-6 py-2 rounded hover:bg-gray-800 text-sm'
              >
                See More
              </button>
            </div>
          )}
        </>
      ) : (
        <p className='text-center text-gray-500 mt-10'>
          No related products found in this category.
        </p>
      )}
    </div>
  );
};

export default RelatedProducts;
