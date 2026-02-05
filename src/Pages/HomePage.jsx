import { Fragment, useEffect } from "react";
import HomeHero from "../Components/HomePage/HomeHero/HomeHero";
import Stats from "../Components/Common/Stats/Stats";
import ContactForm from "../Components/Common/ContactForm/ContactForm";
import AboutUsSection from "../Components/HomePage/AboutUsSection/AboutUsSection";
import NeighborhoodSection from "../Components/HomePage/NeighborhoodSection/NeighborhoodSection";
import Gallery from "../Components/Common/Gallery/Gallery";
import FloorPlan from "../Components/HomePage/FloorPlan/FloorPlan";
import Helmet from "../General/Helmet";
import CTA from "../Components/Common/CTA/CTA";
import Pricing from "../Components/Common/Pricing/Pricing";
// import { initHomePageScripts } from "../Utils/scripts";

export default function HomePage() {

    // useEffect(() => {
    //     const cleanup = initHomePageScripts();
    //     return cleanup;
    // }, []);

    return (
        <Fragment>
            <Helmet title="Azizi David | Premium Residences on Dubai Creek — Al Jaddaf" />
            <HomeHero/>
            <AboutUsSection/>
            <ContactForm/>
            <Pricing/>
            {/* <FloorPlan/> */}
            <NeighborhoodSection/>
            <CTA />
            <Gallery/>
            {/* <Stats/> */}
            {/* <Activities/> */}
        </Fragment>
    )
}