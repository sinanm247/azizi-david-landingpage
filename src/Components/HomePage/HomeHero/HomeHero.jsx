import "./HomeHero.scss";
import bannerVideo1 from "../../../Assets/Banner/Banner-Video-Desktop.mp4"
import bannerVideo2 from "../../../Assets/Banner/Banner-Video-Mobile.mp4"
import useIsMobile from "../../../Utils/useIsMobile";

export default function HomeHero() {
  const isMobile = useIsMobile(768);
  return (
    <div className="home-hero">
      <div className="overlay"></div>
      <div className="banner-container">
        <video
          className="banner-video"
          src={isMobile ? bannerVideo2 : bannerVideo1}
          alt="Azizi David - Dubai Creek Residences"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={isMobile ? bannerVideo2 : bannerVideo1} type="video/mp4" />
        </video>
      </div>
      
      {/* Content Text - Left Bottom */}
      {/* <div className="hero-content-left">
        <h1 className="content-title">
          Beyond shimmering creeks and the grace of flamingos, an exceptional lifestyle awaits - framed by views that seem to suspend time.
        </h1>
        <button 
          className="btn btn-dark content-button" 
          onClick={() => {
            const contactSection = document.getElementById('contact-us');
            if (contactSection) {
              contactSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          Discover Azizi David
        </button>
      </div> */}
    </div>
  );
}