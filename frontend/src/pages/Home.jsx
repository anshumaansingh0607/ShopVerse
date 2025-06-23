import React from 'react';
import Hero from '../components/Hero';
import LatestCollection from '../components/LatestCollection';
import BestSeller from '../components/BestSeller';
import OurPolicy from '../components/OurPolicy';
import NewsletterBox from '../components/NewsletterBox';
import { Link } from 'react-router-dom';
import TestimonialSection from '../components/TestimonialSection';

const Home = () => {
  return (
    <div className="space-y-12">

      {/* Hero Banner */}
      <Hero />

      {/* Quick Category Navigation */}
      <div className="py-10 text-center">
        <h2 className="text-2xl font-semibold mb-6">Shop by Category</h2>
        <div className="flex flex-wrap justify-center gap-6">
          <Link to="/collection" state={{ category: 'Men' }}>
            <div className="w-40 h-40 bg-[url('/images/men.jpg')] bg-cover bg-center rounded-xl shadow-md hover:scale-105 transition" />
            <p className="mt-2 font-medium">Men</p>
          </Link>
          <Link to="/collection" state={{ category: 'Women' }}>
            <div className="w-40 h-40 bg-[url('/images/women.jpg')] bg-cover bg-center rounded-xl shadow-md hover:scale-105 transition" />
            <p className="mt-2 font-medium">Women</p>
          </Link>
          <Link to="/collection" state={{ category: 'Kids' }}>
            <div className="w-40 h-40 bg-[url('/images/kids.jpg')] bg-cover bg-center rounded-xl shadow-md hover:scale-105 transition" />
            <p className="mt-2 font-medium">Kids</p>
          </Link>
        </div>
      </div>

      {/* Latest Collection */}
      <LatestCollection />

      {/* Best Sellers */}
      <BestSeller />

   
      {/* Testimonials */}
      <TestimonialSection />

      {/* Policies */}
      <OurPolicy />

      {/* Newsletter */}
      <NewsletterBox />
    </div>
  );
};

export default Home;
