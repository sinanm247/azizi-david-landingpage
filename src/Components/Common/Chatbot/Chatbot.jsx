import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
// import { sendContactFormEmail, sendChatbotToGoogleSheets } from "../../../Utils/emailService";
import "./Chatbot.scss";
import chatbotIcon from "../../../Assets/Logo/chatbot-icon.jpg";
import { TbMessageChatbot } from "react-icons/tb";
import { floorPlanOptions } from "../../../Utils/floorPlans";

const OPTION_LABELS = {
    pricing: "Pricing & Plans",
    amenities: "Amenities",
    directions: "Get Directions",
    "site-visit": "Book Site Visit",
    presentation: "Online Presentation",
    callback: "Get a Call Back",
};

const CONFIGURATIONS = floorPlanOptions;

// Auto-open intervals in milliseconds: 10sec, 30sec, 1min, 2min, 5min, 10min, 15min, 30min
const AUTO_OPEN_INTERVALS = [10000, 30000, 60000, 120000, 300000, 600000, 900000, 1800000];

const CHATBOT_CLOSE_COUNT_KEY = 'chatbotCloseCount';
const CHATBOT_LAST_CLOSE_TIME_KEY = 'chatbotLastCloseTime';

export default function Chatbot() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [messages, setMessages] = useState([]);
    const [nameInput, setNameInput] = useState("");
    const [hasAutoOpened, setHasAutoOpened] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const [phoneQuestionAsked, setPhoneQuestionAsked] = useState(false);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [closeCount, setCloseCount] = useState(() => {
        if (typeof window !== "undefined") {
            return parseInt(localStorage.getItem(CHATBOT_CLOSE_COUNT_KEY) || '0');
        }
        return 0;
    });
    
    // Chatbot data state
    const [chatData, setChatData] = useState({
        name: "",
        phone: "",
        selectedOption: null,
        visitedBefore: null,
        configuration: null,
        pageUrl: typeof window !== "undefined" ? window.location.href : "",
    });

    const chatContentRef = useRef(null);
    const nameInputRef = useRef(null);
    const phoneInputRef = useRef(null);

    // Determine current step function
    const getCurrentStep = () => {
        if (!chatData.name) return "name-input";
        if (!chatData.selectedOption) return "welcome";
        if (chatData.visitedBefore === null) return "visited-before";
        if (!chatData.configuration) return "configuration";
        // If form has been submitted, stay in complete state
        if (isFormSubmitted) return "complete";
        // Keep phone-input step active until form is submitted (isSubmitting handles that)
        if (!isSubmitting && (!chatData.phone || chatData.phone.length < 10)) return "phone-input";
        // Only show complete if we're actually submitting
        if (isSubmitting) return "complete";
        // Default to phone-input if we have phone but not submitting yet
        return "phone-input";
    };

    const currentStep = getCurrentStep();

    // Initialize messages on mount
    useEffect(() => {
        if (messages.length === 0) {
            setMessages([
                {
                    type: "bot",
                    content: "Hi there! 👋 Welcome to Azizi David. How can I assist you in finding your dream home at Dubai Creek today?",
                    timestamp: new Date(),
                },
                {
                    type: "bot",
                    content: "May I know your name?",
                    timestamp: new Date(),
                },
            ]);
        }
    }, []);

    // Auto-open chatbot after 5 seconds (first visit only)
    useEffect(() => {
        const hasOpenedBefore = localStorage.getItem("chatbot-auto-opened");
        if (!hasOpenedBefore && !hasAutoOpened) {
            const timer = setTimeout(() => {
                setIsOpen(true);
                setHasAutoOpened(true);
                localStorage.setItem("chatbot-auto-opened", "true");
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [hasAutoOpened]);

    // Auto-open chatbot at intervals if not submitted
    useEffect(() => {
        // Don't auto-open if form is submitted
        if (isFormSubmitted) {
            return;
        }

        // Don't auto-open if chat is already open
        if (isOpen) {
            return;
        }

        // Load close count and last close time from localStorage
        const storedCloseCount = parseInt(localStorage.getItem(CHATBOT_CLOSE_COUNT_KEY) || '0');
        const lastCloseTime = localStorage.getItem(CHATBOT_LAST_CLOSE_TIME_KEY);
        
        setCloseCount(storedCloseCount);

        let timer;

        if (lastCloseTime) {
            // Calculate time since last close
            const timeSinceLastClose = Date.now() - parseInt(lastCloseTime);
            // Use closeCount - 1 as index (first close uses interval 0, second uses interval 1, etc.)
            const intervalIndex = Math.min(storedCloseCount - 1, AUTO_OPEN_INTERVALS.length - 1);
            const currentInterval = AUTO_OPEN_INTERVALS[intervalIndex];
            
            if (timeSinceLastClose >= currentInterval) {
                // Enough time has passed, show popup immediately
                if (!isFormSubmitted && !isOpen) {
                    setIsOpen(true);
                }
            } else {
                // Schedule popup for remaining time
                const remainingTime = currentInterval - timeSinceLastClose;
                timer = setTimeout(() => {
                    if (!isFormSubmitted && !isOpen) {
                        setIsOpen(true);
                    }
                }, remainingTime);
            }
        } else if (storedCloseCount > 0) {
            // Fallback: show after current interval (shouldn't happen if lastCloseTime is set)
            const intervalIndex = Math.min(storedCloseCount - 1, AUTO_OPEN_INTERVALS.length - 1);
            const interval = AUTO_OPEN_INTERVALS[intervalIndex];
            timer = setTimeout(() => {
                if (!isFormSubmitted && !isOpen) {
                    setIsOpen(true);
                }
            }, interval);
        }

        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        };
    }, [isOpen, isFormSubmitted]);

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        if (chatContentRef.current) {
            setTimeout(() => {
                if (chatContentRef.current) {
                    chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
                }
            }, 100);
        }
    }, [messages, showOptions, currentStep]);

    // Ensure phone input is visible when step changes to phone-input
    useEffect(() => {
        if (currentStep === "phone-input") {
            // Wait for typing indicator to finish (800ms) + buffer to ensure DOM is updated
            const timer = setTimeout(() => {
                if (phoneInputRef.current && chatContentRef.current) {
                    // Scroll to phone input
                    phoneInputRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
                    // Also ensure chat container is scrolled to bottom
                    chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
                }
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [currentStep]);

    // Add bot message with typing indicator
    const addBotMessageWithTyping = (content, delay = 800) => {
        setMessages((prev) => [...prev, { type: "typing", content: "", timestamp: new Date() }]);
        setTimeout(() => {
            setMessages((prev) => {
                const withoutTyping = prev.filter((msg) => msg.type !== "typing");
                return [...withoutTyping, { type: "bot", content, timestamp: new Date() }];
            });
            setShowOptions(true);
        }, delay);
    };

    // Add user message
    const addUserMessage = (content) => {
        setMessages((prev) => [...prev, { type: "user", content, timestamp: new Date() }]);
    };

    // Stable phone change handler to prevent re-renders
    const handlePhoneChange = useCallback((phone) => {
        setChatData((prev) => ({ ...prev, phone }));
    }, []);

    // Handle name submission
    const handleNameSubmit = (e) => {
        e.preventDefault();
        if (!nameInput.trim() || nameInput.trim().length < 2) {
            return;
        }
        setChatData((prev) => ({ ...prev, name: nameInput.trim() }));
        addUserMessage(nameInput.trim());
        setNameInput("");
        setShowOptions(false);
        setTimeout(() => {
            addBotMessageWithTyping("Do you need any help with the following?", 800);
        }, 300);
    };

    // Handle option selection
    const handleOptionSelect = (option) => {
        addUserMessage(OPTION_LABELS[option]);
        setChatData((prev) => ({ ...prev, selectedOption: option }));
        setShowOptions(false);
        setTimeout(() => {
            addBotMessageWithTyping("Great! Have you ever visited our project before?");
        }, 300);
    };

    // Handle visited before selection
    const handleVisitedBefore = (visited) => {
        addUserMessage(visited ? "Yes" : "No");
        setChatData((prev) => ({ ...prev, visitedBefore: visited }));
        setShowOptions(false);
        setTimeout(() => {
            addBotMessageWithTyping("Select the configuration you are looking for:");
        }, 300);
    };

    // Handle configuration selection
    const handleConfiguration = (config) => {
        addUserMessage(config);
        setChatData((prev) => ({ ...prev, configuration: config }));
        setShowOptions(false);
        // Add bot message about phone number
        setTimeout(() => {
            addBotMessageWithTyping("📞 Please provide your phone number so our team can share the details with you.", 800);
            // Set phoneQuestionAsked to true after the typing delay (800ms) so input appears after question
            setTimeout(() => {
                setPhoneQuestionAsked(true);
            }, 800);
        }, 300);
    };

    // Handle phone submission and final submission
    const handlePhoneSubmit = async (e) => {
        e.preventDefault();
        if (!chatData.phone || chatData.phone.length < 10) {
            return;
        }

        addUserMessage(chatData.phone);
        setIsSubmitting(true);
        setShowOptions(false);

        /* --- Email service commented out - uncomment when needed ---
        const message = `
            Chatbot Inquiry Details:
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            Selected Option: ${OPTION_LABELS[chatData.selectedOption] || "N/A"}
            Visited Before: ${chatData.visitedBefore ? "Yes" : "No"}
            Configuration: ${chatData.configuration || "N/A"}
            Page URL: ${chatData.pageUrl}
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        `.trim();
        const emailData = {
            name: chatData.name,
            phone: chatData.phone,
            email: "",
            message: message,
        };
        try {
            const result = await sendContactFormEmail(emailData);
            if (result.success) {
                sendChatbotToGoogleSheets({
                    name: chatData.name,
                    phone: chatData.phone,
                    selectedOption: OPTION_LABELS[chatData.selectedOption] || chatData.selectedOption,
                    visitedBefore: chatData.visitedBefore,
                    configuration: chatData.configuration,
                    pageUrl: chatData.pageUrl,
                }).catch((error) => {
                    console.error("Failed to save chatbot data to Google Sheets (non-critical):", error);
                });
                setIsFormSubmitted(true);
                setCloseCount(0);
                localStorage.removeItem(CHATBOT_CLOSE_COUNT_KEY);
                localStorage.removeItem(CHATBOT_LAST_CLOSE_TIME_KEY);
                setTimeout(() => {
                    addBotMessageWithTyping(
                        <div className="chatbot-success-message">...</div>,
                        1200
                    );
                }, 500);
                setTimeout(() => navigate("/thank-you"), 5000);
            }
        } catch (error) {
            console.error("Submission error:", error);
            addBotMessageWithTyping("Sorry, there was an error submitting your information. Please try again or contact us directly.", 800);
        } finally {
            setIsSubmitting(false);
        }
        --- End commented block --- */

        // For now: navigate to thank-you page directly (no email sent)
        setIsFormSubmitted(true);
        setCloseCount(0);
        localStorage.removeItem(CHATBOT_CLOSE_COUNT_KEY);
        localStorage.removeItem(CHATBOT_LAST_CLOSE_TIME_KEY);
        setTimeout(() => {
            addBotMessageWithTyping(
                <div className="chatbot-success-message">
                    <div className="success-icon">✅</div>
                    <h3>Thank you for your interest!</h3>
                    <p>Our sales executive will get in touch with you shortly.</p>
                    <div className="contact-info">
                        <p>📞 For instant information, please call:</p>
                        <a href="tel:+971545118288" className="phone-link">
                            +971 54 511 8288
                        </a>
                    </div>
                </div>,
                1200
            );
        }, 500);

        // Navigate to thank-you page
        setTimeout(() => {
            navigate("/thank-you");
        }, 3000);
        setIsSubmitting(false);
    };

    // Handle chat close - track for auto-open intervals
    const handleChatClose = () => {
        // Only track closes if form hasn't been submitted
        if (!isFormSubmitted) {
            const newCloseCount = closeCount + 1;
            setCloseCount(newCloseCount);
            localStorage.setItem(CHATBOT_CLOSE_COUNT_KEY, newCloseCount.toString());
            localStorage.setItem(CHATBOT_LAST_CLOSE_TIME_KEY, Date.now().toString());
        }
        setIsOpen(false);
    };

    // Reset chat
    const resetChat = () => {
        setChatData({
            name: "",
            phone: "",
            selectedOption: null,
            visitedBefore: null,
            configuration: null,
            pageUrl: typeof window !== "undefined" ? window.location.href : "",
        });
        setNameInput("");
        setShowOptions(false);
        setPhoneQuestionAsked(false);
        setIsFormSubmitted(false);
        setCloseCount(0);
        localStorage.removeItem(CHATBOT_CLOSE_COUNT_KEY);
        localStorage.removeItem(CHATBOT_LAST_CLOSE_TIME_KEY);
        setMessages([
            {
                type: "bot",
                content: "Hi there! 👋 Welcome to Azizi David. How can I assist you in finding your dream home at Dubai Creek today?",
                timestamp: new Date(),
            },
            {
                type: "bot",
                content: "May I know your name?",
                timestamp: new Date(),
            },
        ]);
    };

    return (
        <>
            {/* Floating Chat Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="chatbot-toggle-btn"
                    aria-label="Open chat"
                >
                    {/* <img src={chatbotIcon} alt="Chat" className="chatbot-icon" /> */}
                    <TbMessageChatbot className="chatbot-icon" />
                </button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div className="chatbot-container">
                    {/* Header */}
                    <div className="chatbot-header">
                        <div className="chatbot-header-info">
                            <div className="chatbot-avatar">
                                <img src={chatbotIcon} alt="Chatbot" />
                            </div>
                            <div className="chatbot-header-text">
                                <h3>Azizi David Assistant</h3>
                                <p>Online</p>
                            </div>
                        </div>
                        <button
                            onClick={handleChatClose}
                            className="chatbot-close-btn"
                            aria-label="Close chat"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div ref={chatContentRef} className="chatbot-messages">
                        {messages.map((message, index) => {
                            if (message.type === "typing") {
                                return (
                                    <div key={index} className="chatbot-message chatbot-message-bot">
                                        <div className="typing-indicator">
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                        </div>
                                    </div>
                                );
                            }

                            return (
                                <div
                                    key={index}
                                    className={`chatbot-message ${
                                        message.type === "user" ? "chatbot-message-user" : "chatbot-message-bot"
                                    }`}
                                >
                                    <div className="message-bubble">
                                        {typeof message.content === "string" ? (
                                            <p>{message.content}</p>
                                        ) : (
                                            message.content
                                        )}
                                    </div>
                                </div>
                            );
                        })}

                        {/* Name Input */}
                        {currentStep === "name-input" && (
                            <div className="chatbot-message chatbot-message-bot">
                                <div className="message-bubble message-input-bubble">
                                    <form onSubmit={handleNameSubmit}>
                                        <input
                                            ref={nameInputRef}
                                            type="text"
                                            value={nameInput}
                                            onChange={(e) => setNameInput(e.target.value)}
                                            placeholder="Enter your name"
                                            className="chatbot-input"
                                            autoFocus
                                        />
                                        <button
                                            type="submit"
                                            disabled={!nameInput.trim() || nameInput.trim().length < 2}
                                            className="chatbot-submit-btn"
                                        >
                                            Send
                                        </button>
                                    </form>
                                </div>
                            </div>
                        )}

                        {/* Options - Welcome */}
                        {currentStep === "welcome" && showOptions && !messages.some((m) => m.type === "typing") && (
                            <div className="chatbot-message chatbot-message-bot">
                                <div className="message-bubble message-options-bubble">
                                    <div className="options-grid">
                                        <button
                                            onClick={() => handleOptionSelect("pricing")}
                                            className="option-btn"
                                        >
                                            🏠 Pricing & Plans
                                        </button>
                                        <button
                                            onClick={() => handleOptionSelect("amenities")}
                                            className="option-btn"
                                        >
                                            🏢 Amenities
                                        </button>
                                        <button
                                            onClick={() => handleOptionSelect("directions")}
                                            className="option-btn"
                                        >
                                            📍 Get Directions
                                        </button>
                                        <button
                                            onClick={() => handleOptionSelect("site-visit")}
                                            className="option-btn"
                                        >
                                            📅 Book Site Visit
                                        </button>
                                        <button
                                            onClick={() => handleOptionSelect("presentation")}
                                            className="option-btn"
                                        >
                                            💻 Online Presentation
                                        </button>
                                        <button
                                            onClick={() => handleOptionSelect("callback")}
                                            className="option-btn"
                                        >
                                            📞 Get a Call Back
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Visited Before Options */}
                        {currentStep === "visited-before" && showOptions && !messages.some((m) => m.type === "typing") && (
                            <div className="chatbot-message chatbot-message-bot">
                                <div className="message-bubble message-options-bubble">
                                    <div className="options-row">
                                        <button
                                            onClick={() => handleVisitedBefore(true)}
                                            className="option-btn option-btn-primary"
                                        >
                                            ✅ Yes
                                        </button>
                                        <button
                                            onClick={() => handleVisitedBefore(false)}
                                            className="option-btn"
                                        >
                                            ❌ No
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Configuration Options */}
                        {currentStep === "configuration" && showOptions && !messages.some((m) => m.type === "typing") && (
                            <div className="chatbot-message chatbot-message-bot">
                                <div className="message-bubble message-options-bubble">
                                    <div className="options-grid">
                                        {CONFIGURATIONS.map((config) => (
                                            <button
                                                key={config}
                                                onClick={() => handleConfiguration(config)}
                                                disabled={isSubmitting}
                                                className="option-btn"
                                            >
                                                {config}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Phone Input */}
                        {currentStep === "phone-input" && phoneQuestionAsked && !isSubmitting && (
                            <div className="chatbot-message chatbot-message-bot">
                                <div className="message-bubble message-input-bubble">
                                    <form onSubmit={handlePhoneSubmit}>
                                        <div ref={phoneInputRef} className="chatbot-phone-input-wrapper">
                                            <PhoneInput
                                                key="phone-input-field"
                                                country={"ae"}
                                                value={chatData.phone}
                                                onChange={handlePhoneChange}
                                                inputProps={{
                                                    name: "phone",
                                                    required: true,
                                                    autoFocus: true,
                                                }}
                                                inputStyle={{
                                                    width: "100%",
                                                    height: "40px",
                                                    borderRadius: "8px",
                                                    border: "1px solid rgba(0, 0, 0, 0.2)",
                                                    backgroundColor: "white",
                                                    color: "#111b21",
                                                    paddingLeft: "50px",
                                                    fontSize: "14px",
                                                }}
                                                buttonStyle={{
                                                    border: "none",
                                                    backgroundColor: "transparent",
                                                    borderRight: "1px solid rgba(0, 0, 0, 0.2)",
                                                }}
                                                containerStyle={{
                                                    width: "100%",
                                                }}
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={!chatData.phone || chatData.phone.length < 10 || isSubmitting}
                                            className="chatbot-submit-btn"
                                        >
                                            {isSubmitting ? "Sending..." : "Submit"}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

