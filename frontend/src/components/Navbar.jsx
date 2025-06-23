import React, { useContext, useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
  } = useContext(ShopContext);

  const location = useLocation();

  const logout = () => {
    navigate('/login');
    localStorage.removeItem('token');
    setToken('');
    setCartItems({});
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`flex items-center justify-between py-5 px-2 sm:px-0 font-medium z-50 bg-white transition-shadow ${
        isScrolled ? 'shadow-md sticky top-0' : ''
      }`}
    >
      {/* Logo */}
      <Link to='/'>
        <img src={assets.logo} className='w-36' alt='logo' />
      </Link>

      {/* Nav Links */}
      <ul className='hidden sm:flex gap-6 text-sm text-gray-700'>
        {['/', '/collection', '/wishlist', '/about', '/contact'].map((path, i) => (
          <NavLink
            key={i}
            to={path}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 ${isActive ? 'text-black font-semibold' : ''}`
            }
          >
            <p>{path === '/' ? 'HOME' : path.replace('/', '').toUpperCase()}</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden sm:block' />
          </NavLink>
        ))}
      </ul>

      {/* Right Icons */}
      <div className='flex items-center gap-6'>
        {/* Search */}
        <img
          onClick={() => {
            setShowSearch(true);
            navigate('/collection');
          }}
          src={assets.search_icon}
          className='w-5 cursor-pointer'
          alt='search'
        />

        {/* Wishlist */}
        <Link to='/wishlist'>
          <img src={assets.heart_outline} className='w-5 cursor-pointer' alt='wishlist' />
        </Link>

        {/* Profile Dropdown */}
        <div className='group relative'>
          <img
            onClick={() => (token ? null : navigate('/login'))}
            className='w-5 cursor-pointer'
            src={assets.profile_icon}
            alt='profile'
          />
          {token && (
            <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4 z-10'>
              <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded shadow-lg'>
                <p className='cursor-pointer hover:text-black'>My Profile</p>
                <p
                  onClick={() => navigate('/orders')}
                  className='cursor-pointer hover:text-black'
                >
                  Orders
                </p>
                <p onClick={logout} className='cursor-pointer hover:text-black'>
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Cart */}
        <Link to='/cart' className='relative'>
          <img src={assets.cart_icon} className='w-5 min-w-5' alt='cart' />
          <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px] animate-pulse'>
            {getCartCount()}
          </p>
        </Link>

        {/* Mobile Menu Icon */}
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className='w-5 cursor-pointer sm:hidden'
          alt='menu'
        />
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`absolute top-0 right-0 bottom-0 bg-white transition-all duration-300 ease-in-out ${
          visible ? 'w-full backdrop-blur-sm' : 'w-0'
        } overflow-hidden z-40`}
      >
        <div className='flex flex-col text-gray-600'>
          <div
            onClick={() => setVisible(false)}
            className='flex items-center gap-4 p-4 cursor-pointer'
          >
            <img className='h-4 rotate-180' src={assets.dropdown_icon} alt='back' />
            <p>Back</p>
          </div>
          {['/', '/collection', '/wishlist', '/about', '/contact'].map((path, i) => (
            <NavLink
              key={i}
              onClick={() => setVisible(false)}
              className='py-3 pl-6 border border-gray-100'
              to={path}
            >
              {path === '/' ? 'HOME' : path.replace('/', '').toUpperCase()}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
