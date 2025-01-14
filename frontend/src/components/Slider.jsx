import { useEffect, useState } from 'react';

const Slider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [' /s1.jpg', ' /s2.jpg', ' /s3.jpg', ' /s4.jpg']; 
    const numSlides = slides.length;

    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrentSlide((current) => (current === numSlides - 1 ? 0 : current + 1));
        }, 3000); 
        return () => clearTimeout(timer); 
    }, [currentSlide, numSlides]);

    const goToSlide = (index) => {
        setCurrentSlide(index); 
    };

    return (
        <div className="slider-container mx-auto mb-6 overflow-hidden md:h-1/2 relative">
            <div className="slider flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                {slides.map((slide, index) => (
                    <img key={index} src={slide} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
                ))}
            </div>
            <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-2 p-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        className={`h-2 w-2 rounded-full ${index === currentSlide ? 'bg-white' : 'bg-gray-400'}`}
                        onClick={() => goToSlide(index)}
                    ></button>
                ))}
            </div>
        </div>
    );
};

export default Slider;
