import React from 'react';
import { motion } from 'framer-motion';
import './Pricing.scss';

const pricingCards = [
    {
        id: 1,
        name: 'Studio',
        aed: 'AED 824K',
        usd: 'USD 224K',
    },
    {
        id: 2,
        name: 'One-Bedroom',
        aed: 'AED 1.3M',
        usd: 'USD 364K',
    },
    {
        id: 3,
        name: 'Two-Bedroom',
        aed: 'AED 1.7M',
        usd: 'USD 470K',
    },
];

const paymentPlan = [
    { percent: '10%', label: '1st Installment on Booking' },
    { percent: '10%', label: '2nd Installment 30 Days from Booking' },
    { percent: '1%', label: '3rd Installment 60 Days from Booking' },
    { percent: '1%', label: '4th Installment 90 Days from Booking' },
    { percent: '1%', label: '5th Installment 120 Days from Booking' },
    { percent: '1%', label: '6th Installment 150 Days from Booking' },
    { percent: '1%', label: '7th Installment 180 Days from Booking' },
    { percent: '5%', label: '8th Installment 210 Days from Booking' },
    { percent: '1%', label: '9th Installment 240 Days from Booking' },
    { percent: '1%', label: '10th Installment 270 Days from Booking' },
    { percent: '1%', label: '11th Installment 300 Days from Booking' },
    { percent: '1%', label: '12th Installment 330 Days from Booking' },
    { percent: '1%', label: '13th Installment 360 Days from Booking' },
    { percent: '5%', label: '14th Installment 390 Days from Booking' },
    { percent: '1%', label: '15th Installment 420 Days from Booking' },
    { percent: '1%', label: '16th Installment 450 Days from Booking' },
    { percent: '1%', label: '17th Installment 480 Days from Booking' },
    { percent: '1%', label: '18th Installment 510 Days from Booking' },
    { percent: '1%', label: '19th Installment 540 Days from Booking' },
    { percent: '5%', label: '20th Installment 570 Days from Booking' },
    { percent: '50%', label: 'On Completion on Handover', highlight: true },
];

export default function Pricing() {
    return (
        <section id="pricing" className="pricing-section">
            <div className="pricing-container">
                <div className="pricing-header section-header">
                    <h2 className="section-tagline">Pricing</h2>
                    <h1 className="section-title">Azizi David — Premium Residences</h1>
                    <p className="section-description">
                        Starting prices for premium residences at Dubai Creek — from sleek studios to exclusive penthouses.
                    </p>
                </div>

                {/* Price Cards */}
                <div className="pricing-cards">
                    {pricingCards.map((card, index) => (
                        <motion.div
                            key={card.id}
                            className="pricing-card"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <h3 className="card-title">{card.name}</h3>
                            <p className="card-label">Starting Price</p>
                            <p className="card-price-aed">{card.aed}</p>
                            <p className="card-price-usd">{card.usd}</p>
                        </motion.div>
                    ))}
                </div>

                <p className="price-disclaimer">
                    Prices are subject to change without prior notice and may vary based on availability. Terms and conditions apply.
                </p>

                {/* Payment Plan */}
                <motion.div
                    className="payment-plan-section"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h3 className="payment-plan-title">Payment Plan</h3>
                    <div className="payment-plan-grid">
                        {paymentPlan.map((item, index) => (
                            <div
                                key={index}
                                className={`payment-plan-item ${item.highlight ? 'highlight' : ''}`}
                            >
                                <span className="payment-percent">{item.percent}</span>
                                <span className="payment-label">{item.label}</span>
                            </div>
                        ))}
                    </div>
                    <p className="payment-disclaimer">
                        This payment plan is subject to change at the company's discretion.
                    </p>
                </motion.div>

                <div className="pricing-footer">
                    <a href="#contact-us" className="cta-button">
                        <div className="btn btn-primary">
                            Schedule a Visit
                        </div>
                    </a>
                </div>
            </div>
        </section>
    );
}
