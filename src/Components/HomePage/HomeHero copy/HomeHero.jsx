import "./HomeHero.scss";
import { useState, useEffect } from "react";
import banner1 from "../../../Assets/Gallery/Image-5.jpg"
import banner2 from "../../../Assets/Gallery/Image-2.jpg"
import banner3 from "../../../Assets/Gallery/Image-8.jpg"
import banner4 from "../../../Assets/Gallery/Image-7.jpg"
import banner5 from "../../../Assets/Gallery/Image-11.jpg"

const SLIDE_INTERVAL = 4000; // 4 seconds

const slides = [
  {
    image: banner1,
    title: "HOME TO YOUR SENSES",
    description: "Let nature lead your way home. Nestled within a forested master plan, Masaar is a place where everything has been designed to support calmer, more conscious living. Here, nature is more than a backdrop — it's a way of life. Step outside and follow shaded trails beneath mature trees. Feel the hush settle in. This is a place where the outside world melts away, replaced by clarity, presence, and peace."
  },
  {
    image: banner2,
    title: "LET NATURE LEAD YOUR WAY HOME",
    description: "Masaar 3 continues this journey, with a new neighborhood thoughtfully designed for families, wellbeing, and time well spent together."
  },
  {
    image: banner3,
    title: "LIFE UPLIFTED BY DESIGN",
    description: "Masaar was built around a simple truth: when you live close to nature, you live better. Across the master plan, every detail works in harmony to make your day easier, more balanced and more fulfilling."
  },
  {
    image: banner4,
    title: "RESET YOUR RHYTHM",
    description: "Masaar is designed to help you disconnect from noise and reconnect with what matters. Whether you're walking beneath the trees or taking a moment to reflect in your private garden, every space encourages presence, stillness and ease."
  },
  {
    image: banner5,
    title: "A SENSE OF PURPOSE",
    description: "From high-energy mornings on the track to quiet nights under the stars, life at Masaar adapts to your pace. Cycle through the forest. Meditate at dawn. Watch your children play in shaded parks. Or simply enjoy the privacy of a smart home tailored to your lifestyle."
  }
];

export default function HomeHero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, SLIDE_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="home-hero">
      <div className="overlay"></div>
      <div className="banner-container">
        {slides.map((slide, index) => (
          <img
            key={index}
            className={`banner-image ${index === currentSlide ? 'active' : ''}`}
            src={slide.image}
            alt={`Banner ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Content Text - Left Bottom */}
      <div className="hero-content-left">
        <h1 className="content-title">{slides[currentSlide].title}</h1>
        <p className="content-description">{slides[currentSlide].description}</p>
        <button 
          className="btn btn-dark content-button" 
          onClick={() => {
            const contactSection = document.getElementById('contact-us');
            if (contactSection) {
              contactSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          Explore Masaar Today
        </button>
      </div>

      {/* Pagination Dots - Right Bottom */}
      <div className="pagination-container">
        {slides.map((slide, index) => (
          <div
            key={`pagination-${index}`}
            className={`pagination-dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          >
            <div className="dot-indicator"></div>
            {index === currentSlide && (
              <div key={`filling-${currentSlide}`} className="filling-line"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}