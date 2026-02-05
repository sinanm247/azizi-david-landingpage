import "./CTA.scss";
import bgImage from "../../../Assets/Gallery/image-9.webp";

export default function CTA() {
    return (
        <section id="cta-section" className="common-cta-section">
            {/* Background Image */}
            <img className="cta-bg-image" src={bgImage} alt="Azizi David - Dubai Creek Residences" />
            
            {/* Overlay */}
            <div className="cta-overlay"></div>

            <div className="cta-content section-container section-header section-header--light">
                <h2 className="section-tagline">Dubai Creek Living</h2>
                <h1 className="section-title">Where Heritage Meets Modern Luxury on the Shores of Dubai Creek</h1>
                <p className="section-description">
                    Rising gracefully on the shores of the Dubai Creek, Azizi David presents premium residences designed to suit diverse lifestyles — from sleek studios and spacious one- and two-bedroom apartments to two exclusive penthouses crowning the tower. Al Jaddaf draws a diverse mix of professionals, families, and creatives, offering a seamless fusion of modern convenience and cultural richness.
                </p>

                <a href="#contact-us" className="btn btn-glass">
                    Schedule Your Viewing
                </a>
            </div>
        </section>
    );
}

