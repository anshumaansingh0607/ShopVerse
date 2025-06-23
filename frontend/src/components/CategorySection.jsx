import React from 'react';
import men from '../assets/men.avif';     // ✅ Update extension if needed
import women from '../assets/women.avif';
import kids from '../assets/kid.avif';

const CategorySection = () => {
  const categories = [
    { name: 'Men', image: men },
    { name: 'Women', image: women },
    { name: 'Kids', image: kids },
  ];

  return (
    <div className="text-center my-10">
      <h2 className="text-3xl font-bold mb-6">Shop by Category</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 justify-items-center">
        {categories.map((cat, index) => (
          <div key={index} className="text-center">
            <img
              src={cat.image}
              alt={cat.name}
              className="w-48 h-48 object-cover rounded-2xl shadow-md hover:scale-105 transition-transform duration-300"
            />
            <p className="mt-3 font-semibold">{cat.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
