import "./AboutUsSection.scss";
import image from "../../../Assets/Gallery/image-1.webp"

const AboutUsSection = () => {
    return (
        <section id="about-us" className="about-us-section section-container">
            <div className="about-us-wrapper">
                {/* Single Image - Left Side */}
                <div className="about-image">
                    <img src={image} alt="Azizi David - Al Jaddaf" />
                </div>

                {/* Content - Right Side */}
                <div className="about-content section-header">
                    <h2 className="section-tagline">Al Jaddaf, Dubai</h2>
                    <h1 className="section-title">
                        Where Heritage Shapes the Future
                    </h1>
                    <p className="section-description">
                        Al Jaddaf is Dubai's awe-inspiring creekside district, where tradition converges with modern elegance. Once renowned for its dhow-building legacy, it has become a vibrant nexus of culture, luxury living, and seamless connectivity.
                    </p>
                    <a href="#contact-us"><div className="btn btn-primary">Schedule Your Viewing</div></a>
                </div>
            </div>
        </section>
    );
};

export default AboutUsSection;
