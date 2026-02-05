import { useState, useEffect } from "react";
import "./NeighborhoodSection.scss";

// Import your images here - update paths as needed
import image1 from "../../../Assets/Plans/Key-Landmarks.webp";
import image2 from "../../../Assets/Plans/Map-Plan.jpg";

const SLIDER_INTERVAL = 4000; // 4 seconds per slide

const neighborhoodPlaces = [
    { name: "Creek Metro Station", time: "3 MIN" },
    { name: "Al Khail Road", time: "3 MIN" },
    { name: "Sheikh Zayed Road", time: "5 MIN" },
    { name: "Al Jaddaf Waterfront / Festival City / IKEA / Palazzo Versace Hotel", time: "5 MIN" },
    { name: "Dubai International Airport (DXB)", time: "7 MIN" },
    { name: "Wafi Mall", time: "9 MIN" },
    { name: "Dubai World Trade Centre", time: "11 MIN" },
    { name: "Downtown Dubai", time: "12 MIN" },
];

const sliderImages = [image1, image2];

export default function NeighborhoodSection() {
    const [activeSlide, setActiveSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveSlide((prev) => (prev + 1) % sliderImages.length);
        }, SLIDER_INTERVAL);
        return () => clearInterval(timer);
    }, []);

    return (
        <section id="neighborhood" className="neighborhood-section">
            {/* Title and Description */}
            <div className="section-heading section-header">
                <h2 className="section-tagline">Explore the Neighborhood</h2>
                <h1 className="section-title">Connectivity & Culture</h1>
                <p className="section-description">
                    Unparalleled connectivity places you within minutes of Dubai's key destinations — from Downtown and Dubai Creek to the airport, major business districts, and cultural landmarks — all effortlessly accessible by metro, main roads, and creek ferries.
                </p>
            </div>

            {/* 50/50 Split: Slider | Neighboring Places */}
            <div className="neighborhood-split">
                {/* Image Slider - 50% */}
                <div className="slider-wrapper">
                    <div className="slider-track">
                        {sliderImages.map((img, index) => (
                            <div
                                key={index}
                                className={`slide ${index === activeSlide ? "active" : ""}`}
                            >
                                <img src={img} alt={`Azizi David location ${index + 1}`} />
                            </div>
                        ))}
                    </div>
                    <div className="slider-dots">
                        {sliderImages.map((_, index) => (
                            <button
                                key={index}
                                className={`dot ${index === activeSlide ? "active" : ""}`}
                                onClick={() => setActiveSlide(index)}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Neighboring Places - 50% */}
                <div className="places-wrapper">
                    <div className="places-inner">
                        <h3 className="places-title">Key Destinations</h3>
                        <ul className="places-list">
                            {neighborhoodPlaces.map((place, index) => (
                                <li key={index} className="place-item">
                                    <span className="place-name">{place.name}</span>
                                    <span className="place-time">{place.time}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
