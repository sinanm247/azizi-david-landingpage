import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion"
import "./FAQ.scss"
import { FiMinus, FiPlus } from "react-icons/fi";

import image from "../../../Assets/Gallery/img6.webp"

const faqData = [
    {
        id: 1,
        question: "What's included in the Instant Access Pack?",
        answer: "Pricing & Payment Plan PDF, Floor Plans, Masterplan & Map, ROI Snapshot and booking steps."
    },
    {
        id: 2,
        question: "Is this free?",
        answer: "Yes—our advisory is free for buyers. We're a licensed real estate brokerage."
    },
    {
        id: 3,
        question: "How fast will I receive the details?",
        answer: "Instantly via WhatsApp and Email after you submit."
    },
    {
        id: 4,
        question: "Do you have exact prices and availability?",
        answer: "We'll share current pricing and inventory at the time you contact us; these change frequently."
    },
    {
        id: 5,
        question: "How do I book a site visit?",
        answer: "Use the Site Visit option in your pack or tell your advisor a convenient time."
    },
    {
        id: 6,
        question: "Do I need a UAE number?",
        answer: "No—international numbers are fine. We can connect via WhatsApp or a scheduled call."
    },
    {
        id: 7,
        question: "Are there any fees for buyers?",
        answer: "Developer policies vary. Your advisor will confirm all costs and any purchase incentives."
    }
];

export default function FAQ() {
    const [activeId, setActiveId] = useState(null);
    
    const toggleActive = (id) => {
        setActiveId((prev) => (prev === id ? null : id));
    };
    
    return (
        <section id="faq" className="common-process-section section-container">
            <div className="process-head">
                <h2 className="main-title">
                    Frequently Asked <span className="color">Questions</span>
                </h2>
                <a href="#contact-us"><div className="btn btn-blue-fill"> <span>Get Pricing & Payment Plan</span></div></a>
            </div>
            <div className="process-div">
                <div className="img-div">
                    <img 
                        src={image} 
                        alt="DAMAC Island Phase 2 - FAQ Background" 
                    />
                    <div className="faq-overlay">
                        <h3>Have Questions?</h3>
                        <p>Get instant answers to common questions about DAMAC Island Phase 2</p>
                    </div>
                </div>
                <div className="process-list">
                    {faqData.map((faq) => (
                        <div
                            key={faq.id}
                            className={`process-item ${activeId === faq.id ? "active" : ""}`}
                        >
                            <div
                                className="process-title-div"
                                onClick={() => toggleActive(faq.id)}
                            >
                                <h3 className="process-title">{faq.question}</h3>
                                <motion.div 
                                    className="icon"
                                    animate={{ 
                                        rotate: activeId === faq.id ? 180 : 0 
                                    }}
                                    transition={{ 
                                        duration: 0.3,
                                        ease: "easeInOut"
                                    }}
                                >
                                    {activeId === faq.id ? <FiMinus /> : <FiPlus />}
                                </motion.div>
                            </div>
                            <AnimatePresence mode="wait">
                                {activeId === faq.id && (
                                    <motion.div
                                        initial={{ 
                                            height: 0, 
                                            opacity: 0,
                                            y: -10
                                        }}
                                        animate={{ 
                                            height: "auto", 
                                            opacity: 1,
                                            y: 0
                                        }}
                                        exit={{ 
                                            height: 0, 
                                            opacity: 0,
                                            y: -10
                                        }}
                                        transition={{ 
                                            duration: 0.4,
                                            ease: "easeInOut"
                                        }}
                                        className="process-description"
                                    >
                                        <p>{faq.answer}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
