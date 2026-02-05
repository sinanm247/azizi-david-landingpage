import logo from "../../../Assets/Logo/Azizi-Logo-White.png";
import { useLocation } from "react-router-dom";
import "./Footer.scss";
import propwiseLogo from "../../../Assets/Logo/propwise-logo.webp";


export default function Footer() {
    const location = useLocation();
    return (
        <footer className="footer">
            <div className="footer_row">
                {/* Column 1: Logo and About */}
                <div className="footer_col contact_us_col">
                    <div className="contact_content">
                        <img src={logo} className="company_logo" alt="Azizi David" />
                        <div className="contact_details_group">
                            <h2 className="head">About Azizi David</h2>
                            <p className="description">
                                Rising gracefully on the shores of the Dubai Creek, Azizi David presents premium residences in Al Jaddaf — where tradition converges with modern elegance. From sleek studios to exclusive penthouses, experience the energy and elegance of creekside living.
                            </p>
                            {location.pathname === "/thank-you" && (
                            <div className="company_website">
                                <a className="website_link" href="https://www.azizi.com" target="_blank" rel="noopener noreferrer">Azizi Properties</a>
                            </div>)}
                        </div>
                    </div>
                </div>

                {/* Column 2: Quick Links */}
                <div className="footer_col">
                    <h2 className="head">Azizi David</h2>
                    <ul>
                        <li><a href="#about-us">About Us</a></li>
                        <li><a href="#why-invest">Explore Neighborhood</a></li>
                        <li><a href="#gallery">Gallery</a></li>
                        <li><a href="#pricing">Pricing</a></li>
                        <li><a href="#contact-us">Contact Us</a></li>
                    </ul>
                </div>

                {/* Column 3: Location */}
                <div className="footer_col">
                    <h2 className="head">Location</h2>
                    <ul>
                        <li>Al Jaddaf, Dubai</li>
                        <li>Dubai Creek Waterside</li>
                        <li>Downtown Dubai — 12 min</li>
                        <li>Dubai Airport (DXB) — 7 min</li>
                        <li>Creek Metro Station — 3 min</li>
                    </ul>
                </div>

                {/* Column 4: Amenities */}
                <div className="footer_col">
                    <h2 className="head">Amenities</h2>
                    <ul>
                        <li>Infinity Pool</li>
                        <li>Magnificent Lobby</li>
                        <li>Resident Lounge</li>
                        <li>Premium Residences</li>
                        <li>Retail & Dining</li>
                        <li>Creek Views</li>
                    </ul>
                </div>
            </div>

            {/* Location Disclaimer */}
            <div className="footer_disclaimer">
                <p>
                    Azizi David, Al Jaddaf — Dubai Creek, UAE<br />
                    Where heritage shapes the future
                </p>
            </div>

            {/* Broker Disclaimer */}
            <div className="footer_disclaimer">
                <img src={propwiseLogo} alt="Propwise Realty" />
                <p>
                    Office No. M2-183, Aura Xavier Business Center, BN Complex Al Muteena Deira Dubai, UAE<br />
                    License No: 1503017
                </p>
            </div>

            {/* Legal Disclaimer */}
            <div className="footer_disclaimer">
                <p>
                    <strong>Disclaimer:</strong> The information provided on this website is intended exclusively for informational purposes and should not be construed as an offer of services. This site is managed by a RERA authorized real estate agency namely Propwise Realty LLC. The pricing information presented on this website is subject to alteration without advance notification, and the assurance of property availability cannot be guaranteed. The images showcased on this website are for representational purposes only and may not accurately reflect the actual properties. We may share your data with Real Estate Regulatory Agency (RERA) registered Developers for further processing as necessary. Additionally, we may send updates and information to the mobile number or email address registered with us. All rights reserved. The content, design, and information on this website are protected by copyright and other intellectual property rights. Any unauthorised use or reproduction of the content may violate applicable laws. For accurate and up-to-date information regarding services, pricing, availability, and any other details, it is recommended to contact us directly through the provided contact information on this website. Thank you for visiting our website.
                </p>
            </div>

            {/* Bottom Footer */}
            <div className="bottom_footer">
                <div className="left_section">
                    <p>Privacy Policy</p>
                    <span className="separator">|</span>
                    <p>Terms & Conditions</p>
                </div>
                <div className="right_section">
                    <p>© 2025 Azizi David. All Rights Reserved. | Propwise Realty LLC</p>
                </div>
            </div>
        </footer>
    );
}
