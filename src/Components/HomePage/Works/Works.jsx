import "./Works.scss"

import { useState } from "react";
import { TbArrowForwardUpDouble } from "react-icons/tb";
import { useLocation } from "react-router-dom";

// import workImage from "../../../Assets/Works/website-mockup.webp"
// import workImage from "../../../Assets/Banner/bg7.jpg"
// import bg from "../../../Assets/Banner/bg1.webp"


export default function Works({title, works}) {
    const location = useLocation()
    const [ currentWork, setCurrentWork ] = useState(works[0])

    const handleCurrentWork =  async (service) => {
        setCurrentWork(works.find((ele) => ele.name === service))
    }
    return (
        <section>
            <div className="works-section section-container">
                {/* <img className="bg-img" src={bg} alt="" /> */}
                <div className="head-div">
                    <div className="left">
                        <h1 className="main-title">{title}</h1>
                        { location.pathname !== "/services/presentation-design" &&
                            <h3><span className="color">5+ Years Exp</span> but Countless Innovations</h3>}
                    </div>
                    <div className="right">
                        <a href="/case-studies"><div className="btn-blue">View More</div></a>
                        { location.pathname !== "/services/presentation-design" &&
                            <div className="service-links">
                                {works.filter(ele => ele.display).map((ele) => {
                                    return (
                                        <li key={ele.id} className="service" onClick={() => {handleCurrentWork(ele.name)}}>
                                            <TbArrowForwardUpDouble className={`icon ${ele.name === currentWork.name ? "active" : ""}`}/>
                                            <h1 className={`title ${ele.name === currentWork.name ? "active" : ""}`}>{ele.name}</h1>
                                        </li>
                                    )
                                })}
                            </div>
                        }
                    </div>
                </div>

                <div className="service-content-div">
                    <div className="details">
                            <h1 className="title">{currentWork.caseStudy.title}</h1>
                            <p className="description">{currentWork.caseStudy.description}</p>
                            <span className="percentage color">{currentWork.caseStudy.percentage}</span>
                            <p className="description2">{currentWork.caseStudy.percentageDescription}</p>
                            { currentWork.slug &&
                                <a href={`${currentWork.slug}#case-studies`}><div className="btn-blue">View More</div></a>}
                    </div>
                    <div className="image-div">
                            {currentWork.id === 4 ? 
                            <video src={currentWork.caseStudy.image} alt={currentWork.caseStudy.title} autoPlay muted loop/> 
                                :
                            <img src={currentWork.caseStudy.image} alt={currentWork.caseStudy.title} />
                            }
                    </div>
                </div>
            </div>
        </section>
    )
}