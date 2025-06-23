import React from 'react';

const Title = ({ text1, text2, subtitle = '', align = 'center', underlineColor = 'bg-gray-700' }) => {
  return (
    <div className={`mb-5 text-${align}`}>
      {/* Title */}
      <div className={`inline-flex items-center gap-2`}>
        <p className='text-gray-500 text-lg sm:text-xl md:text-2xl'>
          {text1}{' '}
          <span className='text-gray-800 font-semibold'>{text2}</span>
        </p>
        <p className={`w-8 sm:w-12 h-[2px] ${underlineColor}`}></p>
      </div>

      {/* Optional Subtitle */}
      {subtitle && (
        <p className="mt-1 text-sm sm:text-base text-gray-500 max-w-xl mx-auto">{subtitle}</p>
      )}
    </div>
  );
};

export default Title;
