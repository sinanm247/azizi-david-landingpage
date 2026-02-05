import { useState } from "react";
import "./FloorPlan.scss";

// import olfahFullPlan from "../../../Assets/Common/olfah-plan.jpg";
// import olfah4FloorPlan from "../../../Assets/Common/olfah-floor-plan.jpg";
import { IoClose } from "react-icons/io5";

export default function FloorPlan() {
    const [enlargedImage, setEnlargedImage] = useState(null);

    const plans = [
        {
            id: 1,
            title: "Azizi David Full Project Plan",
            // image: olfahFullPlan,
            alt: "Azizi David Full Project Plan",
        },
        {
            id: 2,
            title: "Azizi David Floor Plan",
            // image: olfah4FloorPlan,
            alt: "Azizi David Floor Plan",
        }
    ];

    const handleImageClick = (imageSrc, imageAlt) => {
        setEnlargedImage({ src: imageSrc, alt: imageAlt });
    };

    const closeEnlargedImage = () => {
        setEnlargedImage(null);
    };

    const handleScrollToContact = () => {
        const contactSection = document.getElementById('contact-us');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="floor-plan">
            <div className="floorplan-section section-container">
                <div className="floorplan-header section-header">
                    <h2 className="section-tagline">Floor Plans</h2>
                    <h1 className="section-title">Designed for Your Lifestyle</h1>
                    <p className="section-description">
                        Discover our thoughtfully designed floor plans for modern living at Azizi David — from studios to penthouses.
                    </p>
                </div>

                <div className="plans-grid-section">
                    <div className="plans-grid">
                        {plans.map((plan) => (
                            <div key={plan.id} className="plan-item">
                                <div className="plan-image-box">
                                    {/* <img 
                                        src={plan.image} 
                                        alt={plan.alt}
                                        className="plan-image"
                                        onClick={() => handleImageClick(plan.image, plan.alt)}
                                    /> */}
                                    <button 
                                        className="view-plan-btn"
                                        onClick={() => handleImageClick(plan.image, plan.alt)}
                                    >
                                        View Plan
                                    </button>
                                    <button 
                                        className="get-details-btn"
                                        onClick={handleScrollToContact}
                                    >
                                        Get Full Details
                                    </button>
                                </div>
                                <h3 className="plan-title">{plan.title}</h3>
                            </div>
                        ))}
                    </div>
                </div>

                {enlargedImage && (
                    <div className="image-modal-overlay" onClick={closeEnlargedImage}>
                        <button className="close-btn" onClick={closeEnlargedImage}>
                            <IoClose />
                        </button>
                        <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
                            <div className="img-div">
                                <img 
                                    src={enlargedImage.src} 
                                    alt={enlargedImage.alt}
                                    className="enlarged-image"
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
