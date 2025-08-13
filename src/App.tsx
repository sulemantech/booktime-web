import React, { useState, useEffect } from 'react';

// The images array is now a constant within the component
const images = [
    { src: "peakabooshapes (1).png", alt: "African Elephant" },
    { src: "peakabooshapes (2).png", alt: "Bengal Tiger" },
    { src: "peakabooshapes (3).png", alt: "Giraffe" },
    { src: "peakabooshapes (4).png", alt: "Emperor Penguin" },
    { src: "peakabooshapes (6).png", alt: "Bald Eagle" },
    { src: "peakabooshapes (8).png", alt: "Lion" },
    { src: "peakabooshapes (9).png", alt: "Zebra" },
    { src: "peakabooshapes (10).png", alt: "Kangaroo" },
    { src: "peakabooshapes (11).png", alt: "Hippopotamus" },
    { src: "01-AfricanElephant.png", alt: "African Elephant" },
    { src: "02-BengalTiger.png", alt: "Bengal Tiger" },
    { src: "03-Giraffe.png", alt: "Giraffe" },
    { src: "04-EmperorPenguin.png", alt: "Emperor Penguin" },
    { src: "05-Dolphin.png", alt: "Dolphin" },
    { src: "06-BaldEagle.png", alt: "Bald Eagle" },
    { src: "07-GiantPanda.png", alt: "Giant Panda" },
    { src: "08-Lion.png", alt: "Lion" },
    { src: "09-Zebra.png", alt: "Zebra" },
    { src: "10-Kangaroo.png", alt: "Kangaroo" },
    { src: "11-Hippopotamus.png", alt: "Hippopotamus" },
    { src: "12-Gorilla.png", alt: "Gorilla" },
    { src: "13-PolarBear.png", alt: "Polar Bear" },
    { src: "14-Peacock.png", alt: "Peacock" },
    { src: "15-Cheetah.png", alt: "Cheetah" }
];

// Tailwind config for dark mode. In a real Vite project, this would be in tailwind.config.js
const tailwindConfig = {
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            }
        }
    }
};

const App = () => {
    // Use useState to manage the current image index
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isFading, setIsFading] = useState(false);

    // This useEffect hook runs only on component mount to set up Tailwind and font
    useEffect(() => {
        // Since we're in a single file, we simulate the Tailwind config loading
        window.tailwind = tailwindConfig;
        
        // This simulates the initial image load.
        // In a real app, you would handle this inside the component render.
    }, []);

    // Function to handle switching to the next image
    const handleNext = () => {
        setIsFading(true);
        setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
            setIsFading(false);
        }, 300);
    };

    // Function to handle switching to the previous image
    const handlePrev = () => {
        setIsFading(true);
        setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
            setIsFading(false);
        }, 300);
    };

    // This handles the dark mode toggle
    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    // The dark mode class is applied to the body or main container.
    const bodyClass = isDarkMode ? 'dark' : '';
    const mainClass = `w-full h-full flex flex-col md:flex-row ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`;

    return (
        <>
            {/* The style block and links are included here for the self-contained nature of this immersive document */}
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
                
                html, body {
                    height: 100%;
                    margin: 0;
                    padding: 0;
                }
                body {
                    font-family: 'Inter', sans-serif;
                    -webkit-font-smoothing: antialiased;
                    -moz-osx-font-smoothing: grayscale;
                    transition: background-color 300ms ease;
                }
                .text-color-primary {
                    color: #1f2937;
                }
                .dark .text-color-primary {
                    color: #f9fafb;
                }
                .bg-color-card {
                    background-color: #ffffff;
                }
                .dark .bg-color-card {
                    background-color: #1f2937;
                }
                .btn-primary {
                    background-color: #4f46e5;
                    color: white;
                    font-weight: 600;
                    padding: 0.5rem 1.5rem;
                    border-radius: 9999px;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
                    transition: transform 200ms ease-in-out;
                }
                .btn-primary:hover {
                    background-color: #4338ca;
                    transform: scale(1.05);
                }
                .fluid-heading {
                    font-size: clamp(2.5rem, 8vw, 4rem);
                }
                .gallery-image {
                    transition-property: opacity;
                    transition-duration: 300ms;
                    transition-timing-function: ease-in-out;
                }
                .fade-out {
                    opacity: 0;
                }
                .fade-in {
                    opacity: 1;
                }
                `}
            </style>
            
            <div className={mainClass}>
                {/* Left Section: Image Gallery */}
                <section className="w-full h-1/2 md:w-1/2 flex items-center justify-center">
                    <img 
                        src={"./" + images[currentIndex].src}
                        alt={images[currentIndex].alt}
                        tabIndex="0"
                        className={`w-full h-full object-cover shadow-lg gallery-image max-w-full ${isFading ? 'fade-out' : 'fade-in'}`}
                        onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/94A3B8/FFFFFF?text=Image+Not+Found'; }}
                    />
                </section>
                
                {/* Right Section: Text and Buttons */}
                <section className={`w-full h-1/2 md:w-1/2 p-8 md:p-12 flex flex-col items-center justify-center bg-color-card transition-colors duration-300`}>
                    <header>
                        <h1 className="fluid-heading font-extrabold text-color-primary text-center md:text-left leading-tight mb-8">
                            Pablo Picasso
                        </h1>
                    </header>
                    <div className="flex space-x-4">
                        <button onClick={handlePrev} className="btn-primary" aria-label="Previous Image">
                            Previous
                        </button>
                        <button onClick={handleNext} className="btn-primary" aria-label="Next Image">
                            Next
                        </button>
                    </div>
                    {/* Dark mode toggle button */}
                    {/* <button onClick={toggleDarkMode} className="mt-8 px-4 py-2 text-sm font-semibold rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition-colors duration-300">
                        Toggle Dark Mode
                    </button> */}
                </section>
            </div>
        </>
    );
};

export default App;
