import { useState, useEffect } from 'react';
//Changed the images alt text
const images = [
  { src: "peakabooshapes (1).png", alt: "This is a Cube" },
  { src: "peakabooshapes (2).png", alt: "Sun is Circle" },
  { src: "peakabooshapes (3).png", alt: "Peekaboo Shapes" },
  { src: "peakabooshapes (4).png", alt: "Egg is Oval" },
  { src: "peakabooshapes (6).png", alt: "Heart Shape" },
  { src: "peakabooshapes (8).png", alt: "Star" },
  { src: "peakabooshapes (9).png", alt: "Diamond" },
  { src: "peakabooshapes (10).png", alt: "Door is Rectangle" },
  { src: "peakabooshapes (11).png", alt: "Pizza slice is Triangle" },
  { src: "01-AfricanElephant.png", alt: "African Elephant" },
  { src: "02-BengalTiger.png", alt: "Bengal Tiger" },
  { src: "03-Giraffe.png", alt: "Giraffe" },
  { src: "04-EmperorPenguin.png", alt: "Emperor Penguin" },
  { src: "05-Dolphin.png", alt: "Dolphin" },
  { src: "06-BaldEagle.png", alt: "Bald Eagle" },
  { src: "07-GiantPanda.png", alt: "Giant Panda" },
  { src: "08-Lion.png", alt: "Lion Family" },
  { src: "09-Zebra.png", alt: "Zebra" },
  { src: "10-Kangaroo.png", alt: "Kangaroo" },
  { src: "11-Hippopotamus.png", alt: "Hippopotamus" },
  { src: "12-Gorilla.png", alt: "Gorilla" },
  { src: "13-PolarBear.png", alt: "Polar Bear" },
  { src: "14-Peacock.png", alt: "Peacock" },
  { src: "15-Cheetah.png", alt: "Cheetah" }
];

const App = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024); // Desktop threshold

  // Resize listener to switch layout
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Speak current image name
  const speakImageName = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Stop any ongoing speech
      const utterance = new SpeechSynthesisUtterance(images[currentIndex].alt);
      utterance.lang = 'en-US';
      utterance.rate = 1;
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Sorry, your browser doesn't support text-to-speech.");
    }
  };

  const handleNext = () => {
  setIsFading(true);
  setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  setTimeout(() => setIsFading(false), 300);
};

const handlePrev = () => {
  setIsFading(true);
  setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  setTimeout(() => setIsFading(false), 300);
};

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const mainClass = `w-full h-screen min-h-screen flex ${
    isDesktop ? 'flex-row' : 'flex-col'
  } ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`;

  const imageSectionClass = `w-full ${isDesktop ? 'w-1/2 h-full' : 'h-1/2'} flex items-center justify-center p-4 md:p-8`;
  const textSectionClass = `w-full ${isDesktop ? 'w-1/2 h-full' : 'h-1/2'} p-8 md:p-12 flex flex-col items-center justify-center bg-color-card transition-colors duration-300`;

  return (
    <div className={isDarkMode ? 'dark' : ''}>
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
            transition: background-color 300ms ease;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
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
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 
                        0 2px 4px -1px rgba(0, 0, 0, 0.06);
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
            transition: opacity 300ms ease-in-out;
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
        <section className={imageSectionClass}>
          <img
            src={"./" + images[currentIndex].src}
            alt={images[currentIndex].alt}
            tabIndex={0}
            className={`w-full h-full object-cover shadow-lg gallery-image max-w-full ${
              isFading ? 'fade-out' : 'fade-in'
            }`}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src =
                'https://placehold.co/600x400/94A3B8/FFFFFF?text=Image+Not+Found';
            }}
          />
        </section>

        <section className={textSectionClass}>
          <header>
            <h1 className="fluid-heading font-extrabold text-color-primary text-center md:text-left leading-tight mb-8">
              {images[currentIndex].alt}
            </h1>
          </header>
          <div className="flex space-x-4">
            <button onClick={handlePrev} className="btn-primary" aria-label="Previous Image">
              Previous
            </button>
            <button onClick={handleNext} className="btn-primary" aria-label="Next Image">
              Next
            </button>
            <button onClick={speakImageName} className="btn-primary" aria-label="Speak Image Name">
              🔊 Speak
            </button>
          </div>
          {/* <button
            onClick={toggleDarkMode}
            className="mt-8 px-4 py-2 text-sm font-semibold rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition-colors duration-300"
          >
            Toggle Dark Mode
          </button> */}
        </section>
      </div>
    </div>
  );
};

export default App;
