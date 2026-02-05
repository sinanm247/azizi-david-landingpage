import React, { useEffect, useRef, useState } from 'react'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';


import "./Testimonials.css"

// import next_icon from "../../../Assets/Common/next-icon.png"
// import back_icon from "../../../Assets/Common/back-icon.png"
import client1 from "../../../Assets/Testimonials/FENDI-CASA.png"
import client2 from "../../../Assets/Testimonials/Roberto-Cavalli-logo.png"
import client3 from "../../../Assets/Testimonials/The_Trump_Organization_logo.svg"
import client4 from "../../../Assets/Testimonials/versace-home.png"

import Quote from '../../../Assets/Common/blockquote.svg';

const testimonials = [
  {
      id: 1,
      image: client1, // Fendi Casa
      companyName: "Fendi Casa",
      head: "Italian Elegance in Every Detail",
      text: "Partnering with DAMAC allowed us to bring the spirit of Fendi Casa into luxury living. Together, we created residences that blend Italian sophistication with Dubai’s modern lifestyle — a true statement of elegance."
  },
  {
      id: 2,
      image: client2, // Roberto Cavalli
      companyName: "Roberto Cavalli",
      head: "Fashion Meets Architecture",
      text: "Our collaboration with DAMAC has been extraordinary. The interiors reflect Cavalli’s bold design language while delivering an unmatched residential experience. DAMAC truly understands how to merge fashion and real estate."
  },
  {
      id: 3,
      image: client3, // Trump
      companyName: "Trump Organization",
      head: "Setting New Standards of Prestige",
      text: "Working with DAMAC on the Trump International Golf Club and branded residences has been exceptional. Their commitment to quality, luxury, and innovation mirrors our own values, making this partnership truly world-class."
  },
  {
      id: 4,
      image: client4, // Versace Home
      companyName: "Versace Home",
      head: "Luxury Lifestyle, Versace Style",
      text: "Through our partnership with DAMAC, we brought the essence of Versace into high-end real estate. The result is homes that don’t just offer luxury — they embody the iconic Versace lifestyle."
  },
];


const Testimonials = () => {
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    // Function to update screen size
    const updateScreenSize = () => {
      setScreenWidth(window.innerWidth);
    };

    // Initial size update
    updateScreenSize();

    // Add event listener for screen resize
    window.addEventListener("resize", updateScreenSize);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener("resize", updateScreenSize);
    };
  }, []);

  return (
    <section id="testimonials" className="testimonial-container">
      {/* <div className="heading-div">
          <h1>
              <hr />Testimonials
          </h1>
      </div> */}
      <div className="title">
        <h1 className="commonHeading"><span>Work Delights</span> & <span>Inspires Clients</span></h1>
        {/* <h3>Delivering Tailored and Distinctive Website Development Services for Your Business at Affordable Prices.</h3> */}
      </div>

      <div className="slider-container">
        <blockquote>
          <img className="top-quote quote" src={Quote} alt="quote" />
          <img className="bottom-quote quote" src={Quote} alt="quote" />
        </blockquote>

        <Splide
          options={{
            perPage: screenWidth <= 1600 ? 1 : (screenWidth <= 2000 ? 2 : 3),
            autoplay: true,
            gap: 20,
            speed: 1000,
            rewind: true,
            rewindByDrag: true,
          }}
        >
          {testimonials.map((review) => (
            <SplideSlide key={review.id}>
              <div className="review-img">
                <img src={review.image} alt="2D Animation" />
              </div>
              <div className="content">
                <p className="head">{review.head}</p>
                <p className="text">{review.text}</p>
                <div className="info">
                  <div className="rating">
                    <span className="star">&#9733;</span>
                    <span className="star">&#9733;</span>
                    <span className="star">&#9733;</span>
                    <span className="star">&#9733;</span>
                    <span className="star">&#9734;</span>
                  </div>
                  <p className="company">{review.companyName}</p>
                  {/* <p className="user">{review.name}</p> */}
                </div>
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </section>
  );
};

export default Testimonials;