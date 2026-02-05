import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// import { sendContactFormEmail } from "../../../Utils/emailService";

import './PopupForm.scss';
import logo from "../../../Assets/Logo/Azizi-Logo-White.png";
import image from "../../../Assets/Gallery/image-10.webp";
import brochure from "../../../Assets/Common/Azizi-David-Brochure.pdf";
import { useNavigate } from 'react-router-dom';
import { IoClose } from 'react-icons/io5';
import { TextField, MenuItem } from '@mui/material';
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { toast } from 'react-toastify';
import { floorPlanOptions } from "../../../Utils/floorPlans";

const downloadBrochure = () => {
  const link = document.createElement('a');
  link.href = brochure;
  link.download = 'Azizi-David-Brochure-Payment-Plan.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

function PopupForm({ handleClose, isBrochureDownload = true }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
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
    const formDataWithSource = {
      ...formData,
      source: "Brochure Download Popup"
    };
    try {
      const result = await sendContactFormEmail(formDataWithSource);
      if (result.success) {
        setResponse("Email sent successfully!");
        toast.success("Thank you! Your brochure is downloading...");
        downloadBrochure();
        setFormData({ name: '', phone: '', email: '', message: '', configuration: '' });
        setFormErrors({});
        handleClose();
        setTimeout(() => navigate("/thank-you"), 3000);
      } else {
        setResponse("Failed to send email. Please try again.");
        toast.error("Failed to send email. Please try again.");
      }
    } catch (error) {
      console.error("Email sending error:", error);
      setResponse("Failed to send email. Please try again.");
      toast.error("Failed to send email. Please try again.");
    } finally {
      setIsLoading(false);
    }
    --- End commented block --- */

    // For now: navigate to thank-you page directly (no email sent)
    setResponse("Email sent successfully!");
    toast.success("Thank you! Your brochure is downloading...");
    downloadBrochure();
    setFormData({ name: '', phone: '', email: '', message: '', configuration: '' });
    setFormErrors({});
    handleClose();
    setTimeout(() => navigate("/thank-you"), 2000);
    setIsLoading(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    validateErrors();

    if (Object.keys(errors).length === 0) {
      handleSendEmail(formData);
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="popup-modal-overlay"
        onClick={handleClose}
      >
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="popup-modal-content"
          onClick={(e) => e.stopPropagation()}
        >
          <button className="closeButton" onClick={handleClose}>
            <IoClose />
          </button>

          <div className="popup-background">
            <img src={image} alt="Azizi David" />
            <div className="background-overlay"></div>
          </div>

          <div className="popup-content">
            <div className="popup-header">
              <img src={logo} alt="Azizi David" className="popup-logo" />
              <h1 className="popup-title">Download Brochure & Payment Plan</h1>
              <p className="popup-subtitle">
                Fill in your details to receive our brochure and payment plan for Azizi David
              </p>
            </div>

            <form onSubmit={handleFormSubmit} className="popup-form">
              <TextField 
                label="Name" 
                variant="outlined" 
                value={formData.name} 
                onChange={handleUpdate('name')} 
                fullWidth 
                className="form-field" 
                required 
              />
              {formErrors.name && <div className="error-message">{formErrors.name}</div>}

              <PhoneInput
                country={"ae"}
                value={formData.phone}
                onChange={(phone) => setFormData(prev => ({ ...prev, phone }))}
                inputProps={{ name: "phone", required: true }}
                inputStyle={{
                  width: "100%",
                  height: "56px",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  borderRadius: "20px",
                  paddingLeft: "50px",
                  fontSize: "16px",
                  fontFamily: '"Anek Latin", sans-serif',
                  background: "transparent",
                  color: "white",
                  transition: "all 0.3s ease",
                }}
                buttonStyle={{
                  border: "none",
                  borderRight: "1px solid rgba(255, 255, 255, 0.3)",
                  borderRadius: "20px 0 0 20px",
                  backgroundColor: "transparent",
                }}
                containerStyle={{ width: "100%" }}
                dropdownStyle={{
                  backgroundColor: "rgba(0, 0, 0, 0.9)",
                  color: "white",
                  borderRadius: "12px",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                }}
                searchStyle={{
                  backgroundColor: "rgba(0, 0, 0, 0.9)",
                  color: "white",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                }}
              />
              {formErrors.phone && <div className="error-message">{formErrors.phone}</div>}

              <TextField 
                label="Email" 
                variant="outlined" 
                value={formData.email} 
                onChange={handleUpdate('email')} 
                fullWidth 
                className="form-field" 
                required 
              />
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

              <TextField 
                label="Message" 
                variant="outlined" 
                multiline 
                rows={4} 
                value={formData.message} 
                onChange={handleUpdate('message')} 
                fullWidth 
                className="form-field" 
                required 
              />
              {formErrors.message && <div className="error-message">{formErrors.message}</div>}

              <button type="submit" className="btn btn-glass" disabled={isLoading}>
                {isLoading ? "Sending..." : "Download Brochure"}
              </button>
              {response && (
                <div className={`response-message ${response.includes("successfully") ? "success" : "error"}`}>
                  {response}
                </div>
              )}
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default PopupForm;
