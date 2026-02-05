import { useState } from 'react';
import './Gallery.scss';

// Import images from Assets/Gallery
import img1 from "../../../Assets/Gallery/image-1.webp";
import img2 from "../../../Assets/Gallery/image-2.webp";
import img3 from "../../../Assets/Gallery/image-3.webp";
import img4 from "../../../Assets/Gallery/image-4.webp";
import img5 from "../../../Assets/Gallery/image-5.webp";
import img6 from "../../../Assets/Gallery/image-6.webp";
import img7 from "../../../Assets/Gallery/image-7.webp";
import img8 from "../../../Assets/Gallery/image-8.webp";
import img9 from "../../../Assets/Gallery/image-9.webp";
import img10 from "../../../Assets/Gallery/image-10.webp";
import img11 from "../../../Assets/Gallery/image-11.webp";
import img12 from "../../../Assets/Gallery/image-12.webp";
import img13 from "../../../Assets/Gallery/image-13.webp";
// import img14 from "../../../Assets/Gallery/image-14.webp";

const galleryImages = [
    { src: img1, alt: "Azizi David", span: "large" },   // large = 2x2
    { src: img2, alt: "Azizi David", span: "tall" },    // tall = 1x2
    { src: img3, alt: "Azizi David", span: "wide" },    // wide = 2x1
    { src: img4, alt: "Azizi David", span: "normal" },
    { src: img5, alt: "Azizi David", span: "normal" },
    { src: img6, alt: "Azizi David", span: "wide" },
    { src: img7, alt: "Azizi David", span: "normal" },
    { src: img8, alt: "Azizi David", span: "tall" },
    { src: img9, alt: "Azizi David", span: "normal" },
    { src: img10, alt: "Azizi David", span: "large" },
    { src: img11, alt: "Azizi David", span: "normal" },
    { src: img12, alt: "Azizi David", span: "normal" },
    { src: img13, alt: "Azizi David", span: "wide" },
    // { src: img14, alt: "Azizi David", span: "normal" },
];

export default function Gallery() {
    const [lightboxImage, setLightboxImage] = useState(null);

    const openLightbox = (img) => setLightboxImage(img);
    const closeLightbox = () => setLightboxImage(null);

    return (
        <section id="gallery" className="gallery-section">
            <div className="gallery-container">
                <header className="gallery-header section-header">
                    <h2 className="section-tagline">Visual Experience</h2>
                    <h1 className="section-title">Discover Azizi David</h1>
                    <p className="section-description">
                        A curated collection showcasing the elegance of Dubai Creek living — from stunning exteriors to refined interiors.
                    </p>
                </header>

                <div className="gallery-bento">
                    {galleryImages.map((item, index) => (
                        <div
                            key={index}
                            className={`gallery-item ${item.span}`}
                            onClick={() => openLightbox(item)}
                        >
                            <div className="gallery-item-inner">
                                <img src={item.src} alt={`${item.alt} - ${index + 1}`} />
                                <div className="gallery-item-overlay">
                                    <span className="view-text">View</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Lightbox */}
            {lightboxImage && (
                <div
                    className="gallery-lightbox"
                    onClick={closeLightbox}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Image lightbox"
                >
                    <button className="lightbox-close" onClick={closeLightbox} aria-label="Close">
                        ×
                    </button>
                    <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                        <img src={lightboxImage.src} alt={lightboxImage.alt} />
                    </div>
                </div>
            )}
        </section>
    );
}
