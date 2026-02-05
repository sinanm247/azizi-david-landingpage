import "./StartAProject.scss"

import bg from "../../../Assets/Banner/bg2.webp"

export default function StartAProject({ title1, title2, description1, description2 }) {
    return (
        <section>
            <div className="project-section section-container">
                <img className="bg-img" src={bg} alt={title1} />
                <div className="overlay"></div>
                <div className="project-section-content">
                    <div className="left-div">
                        <h3 className="main-title sub-head">{title1}</h3>
                        <h2 className="main-title head">{title2}</h2>
                    </div>
                    <div className="right-div">
                        <p className="description" dangerouslySetInnerHTML={{ __html: description1 }}></p>
                        <p className="description" dangerouslySetInnerHTML={{ __html: description2 }}></p>
                        <a href="/contact-us"><div className="btn-white">Get A Quote</div></a>
                    </div>
                </div>
            </div>
        </section>
    )
}

// <div className="project-section-content">
//     <div className="left-div">
//         <h3 className="main-title sub-head">Catch the Success</h3>
//         <h1 className="main-title head"> Empower Your Business with <span className="color">WeCan Universe Experts</span></h1>
//     </div>
//     <div className="right-div">
//         <p className="description">
//             At WeCan Universe, client satisfaction is at the heart of everything we do. Our unwavering commitment, innovative mindset, and consistent performance have helped us earn the trust of businesses across industries.
//         </p>
//         <p className="description">
//             Partner with WeCan Universe to hire expert web designers and developers in Dubai who specialize in building responsive, scalable, and high-performing web applications — all crafted with precision and excellence.
//         </p>
//         <a href="/contact-us"><div className="btn-white">Get A Quote</div></a>
//     </div>
// </div>