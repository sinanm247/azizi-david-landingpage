import "./HomeAboutUs.scss"

import image from "../../../Assets/Common/about-us.webp"

export default function HomeAboutUs() {
    return (
        <section>
            <div className="about-company-section section-container">
                <div className="head-div">
                    <div className="head-top">
                    <h3 className="top-title">About Us | WeCan Universe</h3>
                    </div>
                    <h1 className="main-title">Digital Marketing Experts:<br/> Elevate Your Online Presence with <span className="color">Proven Strategies</span></h1>
                    <p className="description">At Wecan Universe, we are a collective ownership company driven by a shared vision of excellence in <a className="underline" href="/services/digital-marketing">digital marketing</a>. Our team of digital marketing experts collaborates to provide innovative online marketing solutions that help businesses grow and enhance their profitability.</p>
                    <p className="description">Our collective ownership model is at the heart of our success, each member of our team has a stake in the success of our clients. This ownership model fosters a deep sense of responsibility and commitment, driving us to deliver exceptional service and results.</p>
                    <a href="/about-us"><div className="btn-black">About Company</div></a>
                </div>
                <div className="img-div">
                    <img src={image} alt="We Can Universe" />
                </div>
            </div>
        </section>
    )
}