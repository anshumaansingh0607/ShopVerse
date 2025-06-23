import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>

      {/* ----------- About Title ----------- */}
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      {/* ----------- About Content ----------- */}
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="About ShopVerse" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p><strong>ShopVerse</strong> was born out of a passion for innovation and a desire to revolutionize the way people shop online. Our journey began with a simple idea: to provide a platform where customers can easily discover, explore, and purchase a wide range of products from the comfort of their homes.</p>
          <p>Since our inception, we've worked tirelessly to curate a diverse selection of high-quality products that cater to every taste and preference. From fashion and beauty to electronics and home essentials, we offer an extensive collection sourced from trusted brands and suppliers.</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>At <strong>ShopVerse</strong>, our mission is to empower customers with choice, convenience, and confidence. We're dedicated to delivering a seamless shopping experience that exceeds expectations—from browsing to doorstep delivery and beyond.</p>
        </div>
      </div>

      {/* ----------- Why Choose Us ----------- */}
      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20 flex-wrap justify-center gap-4'>

        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 max-w-sm'>
          <b>Quality Assurance</b>
          <p className='text-gray-600'>We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>
        </div>

        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 max-w-sm'>
          <b>Convenience</b>
          <p className='text-gray-600'>Our user-friendly interface and smooth checkout make online shopping faster and easier than ever.</p>
        </div>

        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 max-w-sm'>
          <b>Exceptional Customer Service</b>
          <p className='text-gray-600'>Our support team is here 24/7 to answer your queries and ensure your experience is always smooth.</p>
        </div>

        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 max-w-sm'>
          <b>Fast & Reliable Delivery</b>
          <p className='text-gray-600'>We partner with top logistics providers to get your orders delivered quickly and safely.</p>
        </div>

        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 max-w-sm'>
          <b>Secure Payments</b>
          <p className='text-gray-600'>Your transactions are protected with leading-edge encryption for a safe checkout experience.</p>
        </div>

        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 max-w-sm'>
          <b>Easy Returns</b>
          <p className='text-gray-600'>Not satisfied? No problem! Enjoy hassle-free returns and refunds within a flexible window.</p>
        </div>

      </div>

      {/* ----------- Newsletter Box ----------- */}
      <NewsletterBox />
      
    </div>
  )
}

export default About
