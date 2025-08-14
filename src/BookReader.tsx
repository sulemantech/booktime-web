import React, { useState, useEffect } from 'react';

const style = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
html, body, #root {
  height: 100vh;
  margin: 0;
  padding: 0;
  overflow: hidden;
  font-family: 'Inter', sans-serif;
}
.global-wrapper {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
}
.wrapper {
  height: 100%;
  width: 100%;
  display: flex;
  flex-grow: 1;
  /* Add gap: 0 to remove any space between flex items */
  gap: 0; 
}
.story-container {
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: #f7f0e9;
  /* Remove any potential padding or margin */
  padding: 0;
  margin: 0;
}
.story-image-container {
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  position: relative;
  overflow: hidden;
  /* Remove any potential padding or margin */
  padding: 0;
  margin: 0;
}
.story-bg {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}
.story-content {
  padding: 20px;
  text-align: center;
  color: #333;
}
.app-bar--top {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 10;
}
.app-bar--bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  padding: 10px 20px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 -2px 5px rgba(0,0,0,0.1);
  z-index: 10;
}
.btn-icon {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px;
  padding: 10px;
  border-radius: 50%;
}
.story-pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.bar-right, .bar-left {
  display: flex;
  align-items: center;
  gap: 10px;
}
.pagination {
  display: flex;
  align-items: center;
}
.pagination-info {
  padding: 0 10px;
  font-weight: bold;
  color: #333;
}
.spinner-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  visibility: hidden;
}
.spinner {
  width: 50px;
  height: 50px;
  border: 6px solid #ccc;
  border-top-color: #af3eff;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
`;

const localImages = [
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

const BookReader = () => {
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        const loadBook = async () => {
            setLoading(true);
            await new Promise(resolve => setTimeout(resolve, 1000));
            setLoading(false);
        };
        loadBook();
    }, []);

    const handleNextPage = () => {
        if (currentPage < localImages.length - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const calculatePercentage = () => {
        return ((currentPage + 1) / localImages.length) * 100;
    };

    return (
        <div className="global-wrapper">
            <style>{style}</style>
            
            {loading && (
                <div className="spinner-overlay" style={{ visibility: 'visible' }}>
                    <div className="spinner"></div>
                </div>
            )}

            <div className="wrapper">
                {/* Left side for text */}
                <div className="story-container">
                    <div className="story-content">
                        <p>{localImages[currentPage].alt}</p>
                    </div>
                </div>

                {/* Right side for image */}
                <div className="story-image-container">
                    <img className="story-bg" src={localImages[currentPage].src} alt={localImages[currentPage].alt} />
                </div>
            </div>

            <div className="app-bar--top">
                <button className="btn-icon home-icon">
                    <i className="f-icon close-icon solid">X</i>
                </button>
            </div>
            
            <div className="app-bar--bottom">
                <div className="story-pagination">
                    <div className="bar-left">
                        <button className="btn-icon">
                            <i className="f-icon cog-icon light">⚙️</i>
                        </button>
                        <button className="btn-icon">
                            <i className="f-icon play-icon">▶️</i>
                        </button>
                    </div>
                    
                    <div className="pagination">
                        <button className="btn-icon" onClick={handlePrevPage}>
                            <i className="f-icon chevron-left-icon">❮</i>
                        </button>
                        <span className="pagination-info">
                            <span className="pagination-percentage">{Math.floor(calculatePercentage())}%</span>
                        </span>
                        <button className="btn-icon" onClick={handleNextPage}>
                            <i className="f-icon chevron-right-icon light">❯</i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookReader;