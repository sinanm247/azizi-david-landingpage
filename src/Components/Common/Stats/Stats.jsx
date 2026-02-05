import "./Stats.scss"
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { FaBuilding, FaGlobe, FaUsers, FaMapMarkerAlt } from 'react-icons/fa';

const stats = [
    {
        id: 1,
        icon: FaBuilding,
        number: 30000,
        label: "Delivered units & plots",
        showPlus: true,
    },
    {
        id: 2,
        icon: FaGlobe,
        number: 2,
        label: "Continents",
        subtext: "· Northern Africa\n· Asia (Middle East)",
        showPlus: false,
    },
    {
        id: 3,
        icon: FaUsers,
        number: 600,
        label: "Employees",
        showPlus: true,
    },
    {
        id: 4,
        icon: FaMapMarkerAlt,
        number: 10,
        label: "Global Cities",
        subtext: "· Marrakech\t\t· Rabat\n\t\t· Casablanca\t\t· Dubai",
        showPlus: true,
    },
]

export default function Stats() {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.3,
    });

    return (
        <section className="stats-section">
            <div className="section-container">
                <h2 className="section-title">Stellar Reputation for Timely Project Delivery</h2>
                <div ref={ref} className="stats-grid">
                    {stats.map((stat) => {
                        const IconComponent = stat.icon;
                        return (
                            <div key={stat.id} className="stat-item">
                                <div className="stat-icon">
                                    <IconComponent />
                                </div>
                                <div className="stat-content">
                                    <div className="stat-number">
                                        {inView && <CountUp end={stat.number} duration={2.5} />}
                                        {stat.showPlus && '+'}
                                    </div>
                                    <div className="stat-label">{stat.label}</div>
                                    {stat.subtext && (
                                        <div className="stat-subtext">
                                            {stat.subtext.split('\n').map((line, idx) => (
                                                <div key={idx}>{line}</div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}