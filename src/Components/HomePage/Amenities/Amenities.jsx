import { useState } from "react";
import { AnimatePresence } from "framer-motion"
import "./Amenities.scss"
import { FiMinus, FiPlus } from "react-icons/fi";

import image1 from "../../../Assets/Gallery/img23.webp"
import image2 from "../../../Assets/Gallery/img2.webp"
import image3 from "../../../Assets/Gallery/img1.webp"
import image4 from "../../../Assets/Gallery/img11.webp"
import image5 from "../../../Assets/Gallery/img9.webp"
import image6 from "../../../Assets/Gallery/img10.webp"
import image7 from "../../../Assets/Gallery/img13.webp"

const damacAmenities = [
    {
        id: 1,
        name: "Aqua Park",
        description: "An exciting water park featuring thrilling slides, lazy rivers, and splash zones for all ages. Experience endless fun and entertainment in our state-of-the-art aquatic adventure zone.",
        image: image1
    },
    {
        id: 2,
        name: "Water Platform",
        description: "An exclusive floating platform offering breathtaking views of the crystal-clear waters. Perfect for relaxation, meditation, and enjoying spectacular sunsets over the Arabian Gulf.",
        image: image2
    },
    {
        id: 3,
        name: "Paddling",
        description: "Explore the serene waterways with our premium paddling experiences. Whether kayaking or paddleboarding, discover the natural beauty of DAMAC Islands from a unique water perspective.",
        image: image3
    },
    {
        id: 4,
        name: "Lagoon Waterfall",
        description: "A magnificent man-made waterfall cascading into a pristine lagoon. This stunning water feature creates a tranquil oasis perfect for relaxation and creates a mesmerizing backdrop for your island experience.",
        image: image4
    },
    {
        id: 5,
        name: "Jungle River",
        description: "Navigate through our lush jungle river experience featuring tropical landscaping, exotic plants, and wildlife. A thrilling adventure that combines nature exploration with luxury comfort.",
        image: image5
    },
    {
        id: 6,
        name: "Central Hub Foundation",
        description: "The heart of DAMAC Islands featuring a stunning central plaza with world-class dining, shopping, and entertainment venues. Experience the vibrant social hub where luxury meets lifestyle.",
        image: image6
    },
    {
        id: 7,
        name: "Jungle Swings",
        description: "Swing through the treetops on our adventure jungle swings. Experience the thrill of soaring above the lush canopy while enjoying panoramic views of the entire DAMAC Islands development.",
        image: image7
    },
];

export default function Amenities() {
    const [activeId, setActiveId] = useState(null);

    const toggleActive = (id) => {
        setActiveId((prev) => (prev === id ? null : id));
    };

    return (
        <section id="services" className="common-process-section section-container">
            <div className="process-head">
                <h2 className="main-title">
                    Discover <span className="color">DAMAC Islands Phase 2</span><br/>Your Ultimate Island Adventure
                </h2>
                <a href="#contact-us"><div className="btn btn-blue-fill"> <span>Schedule a Visit</span></div></a>
            </div>
            <div className="process-div">
                <div className="img-div">
                    <img 
                        src={activeId ? damacAmenities.find(service => service.id === activeId)?.image || image1 : image1} 
                        alt={activeId ? damacAmenities.find(service => service.id === activeId)?.name || 'DAMAC Islands Activity' : 'DAMAC Islands'} 
                    />
                </div>
                <div className="process-list">
                    {damacAmenities.map((ele) => (
                        <div
                            key={ele.id}
                            className={`process-item ${activeId === ele.id ? "active" : ""}`}
                        >
                            <div
                                className="process-title-div"
                                onClick={() => toggleActive(ele.id)}
                            >
                                <h3 className="process-title">{ele.name}</h3>
                                <div className="icon">
                                    {activeId === ele.id ?<FiMinus /> : <FiPlus />}
                                </div>
                            </div>
                            <AnimatePresence mode="wait">
                                <div 
                                    id={ele.id}
                                    style={{ 
                                        height: activeId === ele.id ? "auto" : 0,
                                        overflow: "hidden",
                                        transition: "height 0.5s ease-in-out"
                                    }}
                                    className="process-description">
                                    <p>{ele.description}</p>
                                </div>
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}