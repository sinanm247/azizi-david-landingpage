import { useState } from "react";
import { TextField, MenuItem } from '@mui/material';
import { useNavigate } from "react-router-dom";
import "./ContactForm.scss";
import bg from "../../../Assets/Gallery/image-7.webp";
import PhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/style.css";
// import { sendContactFormEmail } from "../../../Utils/emailService";
import { floorPlanOptions } from "../../../Utils/floorPlans";

export default function ContactForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        message: '',
        service: '',
        configuration: '',
    });

    const [formErrors, setFormErrors] = useState({});
    const [response, setResponse] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const errors = {};

    const validateErrors = () => {
        if (formData?.name?.trim()?.length === 0) errors.name = "Name is Required";
        if (formData?.phone?.trim()?.length === 0) errors.phone = "Phone No is Required";
        if (formData?.email?.trim()?.length === 0) errors.email = "Email is Required";
        // if (formData?.service?.trim()?.length === 0) errors.service = "Please select a service";
        if (formData?.message?.trim()?.length === 0) errors.message = "Message is Required";
    };

    const handleUpdate = (field) => (event) => {
        const inputValue = event.target.value;
        setFormData((prev) => ({ ...prev, [field]: inputValue }));
    };

    const handleSendEmail = async (formData) => {
        setIsLoading(true);
        setResponse("");
        /* --- Email service commented out - uncomment when needed ---
        try {
            const result = await sendContactFormEmail(formData);
            if (result.success) {
                setResponse("Email sent successfully!");
                setFormData({
                    name: "",
                    phone: "",
                    email: "",
                    message: "",
                    service: "",
                    configuration: "",
                });
                setFormErrors({});
                setTimeout(() => navigate("/thank-you"), 3000);
            } else {
                setResponse("Failed to send email. Please try again.");
            }
        } catch (error) {
            console.error("Email sending error:", error);
            setResponse("Failed to send email. Please try again.");
        } finally {
            setIsLoading(false);
        }
        --- End commented block --- */

        // For now: navigate to thank-you page directly (no email sent)
        setResponse("Email sent successfully!");
        setFormData({
            name: "",
            phone: "",
            email: "",
            message: "",
            service: "",
            configuration: "",
        });
        setFormErrors({});
        setTimeout(() => navigate("/thank-you"), 2000);
        setIsLoading(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        validateErrors();

        if (Object.keys(errors).length === 0) {
            handleSendEmail(formData);
        } else {
            console.log(errors);
            setFormErrors(errors);
        }
    };

    return (
        <section id="contact-us">
            <div className="contact-form-section">
                <img className="bg-img" src={bg} alt="Azizi David - Dubai Creek Residences" />
                <div className="overlay"></div>
                <div className="contact-content section-container">
                    <div className="contact-info section-header section-header--light">
                        <h2 className="section-tagline">Al Jaddaf, Dubai</h2>
                        <h1 className="section-title">Welcome to Azizi David</h1>
                        <p className="section-description">
                            Al Jaddaf is Dubai's awe-inspiring creekside district, where tradition converges with modern elegance. Rising gracefully on the shores of the Dubai Creek, Azizi David presents premium residences designed to suit diverse lifestyles — from sleek studios and spacious one- and two-bedroom apartments to two exclusive penthouses crowning the tower.
                        </p>

                        {/* <div className="key-points">
                            <div className="point">
                                <div className="point-icon">
                                    <img src={icons1} alt="" />
                                </div>
                                <div className="point-text">
                                    <h4>Wellness-Inspired Living</h4>
                                    <p>Holistic wellness facilities for body and mind</p>
                                </div>
                            </div>

                            <div className="point">
                                <div className="point-icon">
                                    <img src={icons2} alt="" />
                                </div>
                                <div className="point-text">
                                    <h4>Modern Luxury Residences</h4>
                                    <p>Impeccably crafted 1 & 2 bedroom homes</p>
                                </div>
                            </div>

                            <div className="point">
                                <div className="point-icon">
                                    <img src={icons3} alt="" />
                                </div>
                                <div className="point-text">
                                    <h4>Prime Location</h4>
                                    <p>Nestled in Majan's tranquil enclave</p>
                                </div>
                            </div>

                            <div className="point">
                                <div className="point-icon">
                                    <img src={icons4} alt="" />
                                </div>
                                <div className="point-text">
                                    <h4>Refined Living Spaces</h4>
                                    <p>Sophisticated environments that elevate lifestyle</p>
                                </div>
                            </div>
                        </div> */}
                    </div>

                    <form onSubmit={handleSubmit} className="contact-form">
                        <div className="form-header section-header section-header--light">
                        <h2 className="section-tagline">Get in Touch</h2>
                        <h1 className="section-title">Discover Your Dream Home at Azizi David</h1>
                        <p className="section-description">Fill out the form below and our team will contact you shortly to schedule your viewing.</p>
                    </div>
                        {/* 
                        <TextField label="First Name" variant="outlined" value={formData.firstName} onChange={handleUpdate('firstName')} fullWidth className="form-field" required />
                        {formErrors.firstName && <div className="error-message">{formErrors.firstName}</div>} */}

                        <TextField label="Name" variant="outlined" value={formData.name} onChange={handleUpdate('name')} fullWidth className="form-field" required />
                        {formErrors.name && <div className="error-message">{formErrors.name}</div>}
                        
                        <PhoneInput
                            country={"ae"}
                            value={formData.phone}
                            onChange={(phone) => {
                                setFormData((prev) => ({ ...prev, phone })); // save full phone like +971xxxxxxxxx
                            }}
                            inputProps={{
                                name: "phone",
                                required: true,
                            }}
                            // ---- STYLES TO MATCH MUI TEXTFIELD ----
                            inputStyle={{
                                width: "100%",
                                height: "56px", // same as MUI default height
                                borderRadius: "20px",
                                border: "1px solid rgba(255, 255, 255, 0.3)",
                                backgroundColor: "transparent",
                                color: "white",
                                paddingLeft: "50px", // space for flag dropdown
                                fontSize: "16px",
                                fontFamily: '"Anek Latin", sans-serif',
                            }}
                            buttonStyle={{
                                border: "none",
                                backgroundColor: "transparent",
                                borderRight: "1px solid rgba(255, 255, 255, 0.3)",
                                borderRadius: "20px 0 0 20px",
                            }}
                            containerStyle={{
                                width: "100%",
                            }}
                            dropdownStyle={{
                                backgroundColor: "black", // dropdown background
                                color: "white", // text color
                                borderRadius: "10px",
                                border: "1px solid rgba(255,255,255,0.2)",
                            }}
                            searchStyle={{
                                backgroundColor: "black",
                                color: "white",
                                border: "1px solid rgba(255,255,255,0.2)",
                            }}
                        />

                        {formErrors.phone && <div className="error-message">{formErrors.phone}</div>}

                        <TextField label="Email" variant="outlined" value={formData.email} onChange={handleUpdate('email')} fullWidth className="form-field" required />
                        {formErrors.email && <div className="error-message">{formErrors.email}</div>}

                        <TextField 
                            select 
                            label="Configuration" 
                            variant="outlined" 
                            value={formData.configuration} 
                            onChange={handleUpdate('configuration')} 
                            fullWidth 
                            className="form-field"
                        >
                            {floorPlanOptions.map((plan) => (
                                <MenuItem key={plan} value={plan}>
                                    {plan}
                                </MenuItem>
                            ))}
                        </TextField>
                        {formErrors.configuration && <div className="error-message">{formErrors.configuration}</div>}

                        <TextField label="Message" variant="outlined" multiline rows={4} value={formData.message} onChange={handleUpdate('message')} fullWidth className="form-field" required />
                        {formErrors.message && <div className="error-message">{formErrors.message}</div>}

                        <button type="submit" className="btn btn-glass" disabled={isLoading}>
                            {isLoading ? "Sending..." : "Book an Appointment"}
                        </button>
                        {response && (
                            <div className={`response-message ${response.includes("successfully") ? "success" : "error"}`}>
                                {response}
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </section>
    );
}
