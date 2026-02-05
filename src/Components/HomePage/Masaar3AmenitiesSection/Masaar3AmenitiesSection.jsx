import "./Masaar3AmenitiesSection.scss";

// Import master plan image
import masaar3MasterPlan from "../../../Assets/Plans/3-master-plan.jpg";

// Amenities data based on the factsheet
const amenitiesData = [
    {
        id: 1,
        name: "Swimmable forest lagoon with waterfall",
        icon: "🏊"
    },
    {
        id: 2,
        name: "Basketball & padel courts",
        icon: "🏀"
    },
    {
        id: 3,
        name: "Café",
        icon: "☕"
    },
    {
        id: 4,
        name: "Kids' adventure playground",
        icon: "🎠"
    },
    {
        id: 5,
        name: "Outdoor cinema",
        icon: "🎬"
    },
    {
        id: 6,
        name: "Wellness area",
        icon: "🧘"
    },
    {
        id: 7,
        name: "Mosque",
        icon: "🕌"
    },
    {
        id: 8,
        name: "Duck pond",
        icon: "🦆"
    },
    {
        id: 9,
        name: "Adventure trail",
        icon: "🏃"
    },
    {
        id: 10,
        name: "Zad food truck park",
        icon: "🍔"
    },
    {
        id: 11,
        name: "Community centre",
        icon: "🏛️"
    },
    {
        id: 12,
        name: "Ladies-only community pool",
        icon: "👩"
    },
    {
        id: 13,
        name: "Family pool",
        icon: "👨‍👩‍👧‍👦"
    }
];

const Masaar3AmenitiesSection = () => {
    return (
        <section id="masaar3-amenities" className="masaar3-amenities-section section-container">
            {/* Title and Description - Above both sections */}
            <div className="amenities-header-section">
                <h2 className="section-title">A SENSE OF PURPOSE</h2>
                <p className="section-description">
                    From high-energy mornings on the track to quiet nights under the stars, life at Masaar adapts to your pace. Cycle through the forest. Meditate at dawn. Watch your children play in shaded parks. Or simply enjoy the privacy of a smart home tailored to your lifestyle. Whether your version of joy is active, soulful, creative or contemplative, you'll find the space to live it here.
                </p>
            </div>

            <div className="amenities-wrapper">
                {/* Master Plan Image - Left Side */}
                <div className="amenities-image">
                    <img src={masaar3MasterPlan} alt="Masaar 3 Master Plan" />
                </div>

                {/* Factsheet - Right Side */}
                <div className="amenities-content">
                    <div className="factsheet-header">
                        <h3 className="factsheet-title">Factsheet</h3>
                    </div>
                    <div className="amenities-list">
                        {amenitiesData.map((amenity, index) => (
                            <div key={amenity.id} className="amenity-item">
                                <div className="amenity-number">{index + 1}</div>
                                <div className="amenity-icon">{amenity.icon}</div>
                                <div className="amenity-name">{amenity.name}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Masaar3AmenitiesSection;

