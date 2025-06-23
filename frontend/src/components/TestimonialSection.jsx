import React from 'react';

const TestimonialSection = () => {
  return (
    <div className="py-14 bg-white text-center">
      <h2 className="text-2xl font-semibold mb-8">What Our Customers Say</h2>
      <div className="flex flex-wrap justify-center gap-8 px-4">
        <div className="bg-gray-50 rounded-lg shadow p-6 w-72">
          <p className="italic text-gray-600 mb-4">"Great quality products and super fast delivery!"</p>
          <p className="font-medium">- Ankit R.</p>
        </div>
        <div className="bg-gray-50 rounded-lg shadow p-6 w-72">
          <p className="italic text-gray-600 mb-4">"Loved the customer support. Very helpful!"</p>
          <p className="font-medium">- Priya M.</p>
        </div>
        <div className="bg-gray-50 rounded-lg shadow p-6 w-72">
          <p className="italic text-gray-600 mb-4">"The UI is simple and smooth. Great shopping experience!"</p>
          <p className="font-medium">- Rahul K.</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;
