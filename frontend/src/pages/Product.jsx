import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';
import { toast } from 'react-toastify';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart, navigate } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const data = products.find(item => item._id === productId);
    if (data) {
      setProductData(data);
      setImage(data.image[0]);
    }
  }, [productId, products]);

  const handleAddToCart = () => {
    if (!size) {
      toast.warning("Please select a size");
      return;
    }
    addToCart(productData._id, size, quantity);
    toast.success("Added to cart");
  };

  const handleBuyNow = () => {
    if (!size) {
      toast.warning("Please select a size");
      return;
    }
    addToCart(productData._id, size, quantity);
    navigate('/cart');
  };

  return productData ? (
    <div className='border-t-2 pt-10'>
      <div className='flex gap-12 flex-col sm:flex-row'>

        {/* Product Images */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll gap-2 sm:w-[18%] w-full'>
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className={`w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer border ${image === item ? 'border-black' : 'border-transparent'}`}
                alt=""
              />
            ))}
          </div>
          <div className='w-full sm:w-[82%]'>
            <img className='w-full h-auto hover:scale-[1.01] transition-transform duration-200' src={image} alt="" />
          </div>
        </div>

        {/* Product Info */}
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            {[...Array(4)].map((_, i) => (
              <img key={i} src={assets.star_icon} alt="" className="w-4" />
            ))}
            <img src={assets.star_dull_icon} alt="" className="w-4" />
            <p className='pl-2'>(122)</p>
          </div>
          <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
          <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>

          {/* Size Selector */}
          <div className='flex flex-col gap-4 my-8'>
            <p>Select Size</p>
            <div className='flex gap-2'>
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  key={index}
                  className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-orange-500 font-semibold' : ''}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className='flex items-center gap-3 mb-5'>
            <p>Quantity:</p>
            <input
              type="number"
              min="1"
              max="10"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className='border px-2 py-1 w-16'
            />
          </div>

          {/* Action Buttons */}
          <div className='flex gap-4'>
            <button onClick={handleAddToCart} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>
              ADD TO CART
            </button>
            <button onClick={handleBuyNow} className='border border-black px-8 py-3 text-sm hover:bg-black hover:text-white transition'>
              BUY NOW
            </button>
          </div>

          <hr className='mt-8 sm:w-4/5' />

          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>✅ 100% Original product.</p>
            <p>💸 Cash on delivery is available.</p>
            <p>🔁 Easy return and exchange within 7 days.</p>
            <p>🟢 In Stock</p>
          </div>
        </div>
      </div>

      {/* Description & Review */}
      <div className='mt-20'>
        <div className='flex'>
          <b className='border px-5 py-3 text-sm'>Description</b>
          <p className='border px-5 py-3 text-sm'>Reviews (122)</p>
        </div>
        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
          <p>An e-commerce website is a platform for buying and selling products online. It provides convenience, variety, and global access to products and services.</p>
          <p>Each product page offers detailed information, multiple images, pricing, and options like sizes or colors to help customers make informed purchases.</p>
        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
    </div>
  ) : (
    <div className='text-center py-20 text-gray-500'>Loading product...</div>
  );
};

export default Product;
