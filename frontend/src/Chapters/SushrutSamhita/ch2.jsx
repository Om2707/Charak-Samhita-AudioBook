import React from 'react';
import Navbar from '../../components/Navbar';
import banner from '../../image.jpg'

function SushrutChapter2() {
  return (
    <div className="bg-chapterBg bg-no-repeat overflow-hidden bg-cover min-h-screen">
      <Navbar />
      <div className="container mx-auto p-4">
        <div className="w-full h-96">
          <img
            className="w-full h-full object-cover"
            src={banner}
            alt="Chapter 2"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
          {Array.from({ length: 50 }).map((_, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg p-4 cursor-pointer hover:shadow-xl transition-shadow duration-200"
            >
              <p className="text-center">Shlok {index + 1}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SushrutChapter2;
