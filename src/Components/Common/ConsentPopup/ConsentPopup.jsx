import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose } from 'react-icons/io5';
import './ConsentPopup.scss';

const CONSENT_ACCEPTED_KEY = 'consentAccepted';
const CONSENT_DECLINE_COUNT_KEY = 'consentDeclineCount';
const CONSENT_LAST_DECLINE_TIME_KEY = 'consentLastDeclineTime';

// Intervals in milliseconds: 15sec, 30sec, 1min, 2min, 5min, 10min
const INTERVALS = [15000, 30000, 60000, 120000, 300000, 600000];

function ConsentPopup() {
  const [showPopup, setShowPopup] = useState(false);
  const [declineCount, setDeclineCount] = useState(0);

  useEffect(() => {
    // Check if consent was already accepted
    const consentAccepted = localStorage.getItem(CONSENT_ACCEPTED_KEY);
    
    if (consentAccepted === 'true') {
      // User has accepted, don't show popup
      return;
    }

    // Check decline count and last decline time
    const storedDeclineCount = parseInt(localStorage.getItem(CONSENT_DECLINE_COUNT_KEY) || '0');
    const lastDeclineTime = localStorage.getItem(CONSENT_LAST_DECLINE_TIME_KEY);
    
    setDeclineCount(storedDeclineCount);

    const showPopupAfterDelay = () => {
      if (storedDeclineCount === 0) {
        // First time - show immediately
        setShowPopup(true);
      } else if (lastDeclineTime) {
        // Calculate time since last decline
        const timeSinceLastDecline = Date.now() - parseInt(lastDeclineTime);
        const currentInterval = INTERVALS[Math.min(storedDeclineCount - 1, INTERVALS.length - 1)];
        
        if (timeSinceLastDecline >= currentInterval) {
          // Enough time has passed, show popup
          setShowPopup(true);
        } else {
          // Schedule popup for remaining time
          const remainingTime = currentInterval - timeSinceLastDecline;
          setTimeout(() => {
            setShowPopup(true);
          }, remainingTime);
        }
      } else {
        // Fallback: show after first interval
        const interval = INTERVALS[Math.min(storedDeclineCount, INTERVALS.length - 1)];
        setTimeout(() => {
          setShowPopup(true);
        }, interval);
      }
    };

    showPopupAfterDelay();
  }, []);

  const handleAccept = () => {
    localStorage.setItem(CONSENT_ACCEPTED_KEY, 'true');
    localStorage.removeItem(CONSENT_DECLINE_COUNT_KEY);
    localStorage.removeItem(CONSENT_LAST_DECLINE_TIME_KEY);
    setShowPopup(false);
  };

  const handleDecline = () => {
    const newDeclineCount = declineCount + 1;
    setDeclineCount(newDeclineCount);
    localStorage.setItem(CONSENT_DECLINE_COUNT_KEY, newDeclineCount.toString());
    localStorage.setItem(CONSENT_LAST_DECLINE_TIME_KEY, Date.now().toString());
    setShowPopup(false);

    // Schedule next popup appearance
    const nextInterval = INTERVALS[Math.min(newDeclineCount - 1, INTERVALS.length - 1)];
    setTimeout(() => {
      setShowPopup(true);
    }, nextInterval);
  };

  const handleClose = () => {
    // Treat close button as decline
    handleDecline();
  };

  if (!showPopup) {
    return null;
  }

  return (
    <AnimatePresence>
      {showPopup && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.3 }}
          className="consent-popup-banner"
        >
          {/* <button className="consent-close-button" onClick={handleClose}>
            <IoClose />
          </button> */}

          <div className="consent-banner-content">
            <div className="consent-message">
              <h3>Cookie Policy</h3>
              <p>
                Our websites may use "cookies" to enhance your user experience.
                Your web browser places cookies on your hard drive for record-keeping purposes and sometimes to track information about you. You may choose to set your web browser to refuse cookies or to alert you when cookies are being sent. If you do so, note that some parts of the websites may not function properly. This is a standard operating procedure that is used across the internet. For further details, please review our Privacy Policy.
              </p>
            </div>

            <div className="consent-banner-actions">
              <button className="consent-button consent-button-accept" onClick={handleAccept}>
                Accept all cookies
              </button>
              <button className="consent-button consent-button-decline" onClick={handleDecline}>
                Decline
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ConsentPopup;

