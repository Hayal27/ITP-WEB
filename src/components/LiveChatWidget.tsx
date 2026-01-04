import React, { useEffect, useState, useCallback, useRef } from 'react';
import '../styles/LiveChatWidget.css';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface QuickQuestion {
  id: string;
  text: string;
  icon?: string;
}

interface LiveChatWidgetProps {
  bgMode?: 'auto' | 'light' | 'dark';
  infoText?: string;
  avatarUrl?: string;
  chatLink?: string;
  botName?: string;
}

const defaultAvatar = '/images/icons8-support-64.png';

// Knowledge base for the Ethiopian IT Park chatbot
const knowledgeBase = {
  greeting: "👋 Hello! I'm your Ethiopian IT Park virtual assistant. I'm here to help you explore our world-class facilities, services, and opportunities. How can I assist you today?",

  introduction: "I'm the Ethiopian IT Park virtual assistant, powered by advanced AI to provide you with instant information about our premier technology hub located near Bole International Airport in Addis Ababa, Ethiopia.",

  services: "🏢 **Our Comprehensive Services:**\n\n• Modern office spaces & serviced land\n• Cloud services (PaaS, SaaS, security solutions)\n• Telecommunications & surveillance systems\n• IT consulting & digital transformation\n• Data center & connectivity solutions\n• Shared workspaces for startups\n• Business incubation programs",

  infrastructure: "🏗️ **State-of-the-Art Infrastructure:**\n\n• High-speed fiber optic connectivity\n• 99.99% uptime power supply\n• Tier III certified data centers\n• Modern office spaces (30m² - 500m²)\n• Five strategic zones:\n  - Business Zone\n  - Assembly & Warehouse\n  - Commercial Zone\n  - Administrative Hub\n  - Knowledge Park",

  companies: "🏆 **Our Prestigious Tenants:**\n\n• Safaricom - Leading telecommunications\n• Wingu.Africa - Carrier-neutral Tier III data center\n• Redfox Solutions - Modular data center & cloud services\n• Raxio Group - Tier III colocation facility\n• 20+ innovative tech companies",

  location: "📍 **Prime Location:**\n\nStrategically positioned on 200 hectares near Bole International Airport, Addis Ababa. Easy access to international connectivity and Ethiopia's business district.",

  vision: "🚀 **Our Vision:**\n\nTo position Ethiopia as Africa's leading digital hub by fostering innovation, attracting foreign investment, and providing world-class ICT infrastructure that empowers businesses to thrive.",

  events: "🎯 **Events & Opportunities:**\n\nWe regularly host tech expos, innovation summits, and networking events like the Stride Ethiopia Tech Expo. We welcome international delegations for investment and collaboration opportunities.",

  contact: "📞 **Get in Touch:**\n\n📧 Email: support@ethiopianitpark.gov.et\n📱 Phone: +251 11 667 8900\n📍 Address: Ethiopian IT Park, Bole Sub-City, Addis Ababa, Ethiopia\n\nOur team is ready to assist you!",

  fallback: "I don't have specific information about that topic right now. Would you like me to connect you with our support team for personalized assistance?\n\n📧 support@ethiopianitpark.gov.et\n📱 +251 11 667 8900"
};

// Enhanced common questions with icons
const commonQuestions: QuickQuestion[] = [
  { id: 'q1', text: 'What is Ethiopian IT Park?', icon: '🏢' },
  { id: 'q2', text: 'What services do you offer?', icon: '⚙️' },
  { id: 'q3', text: 'Tell me about your infrastructure', icon: '🏗️' },
  { id: 'q4', text: 'Which companies are here?', icon: '🏆' },
  { id: 'q5', text: 'Where are you located?', icon: '📍' },
  { id: 'q6', text: 'How can I contact support?', icon: '📞' }
];

const LiveChatWidget: React.FC<LiveChatWidgetProps> = ({
  bgMode = 'auto',
  infoText = "Need help? Chat with us!",
  avatarUrl = defaultAvatar,
  chatLink = '/contact',
  botName = 'IT Park Assistant',
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isDarkBackground, setIsDarkBackground] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showQuickQuestions, setShowQuickQuestions] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showCTABadge, setShowCTABadge] = useState(true);
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatMessagesRef = useRef<HTMLDivElement>(null);
  const popupTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-popup after 10 seconds
  useEffect(() => {
    if (!hasInteracted) {
      popupTimerRef.current = setTimeout(() => {
        setShowPopup(true);
        // Auto-hide popup after 15 seconds if not interacted
        setTimeout(() => {
          if (!hasInteracted) {
            setShowPopup(false);
          }
        }, 15000);
      }, 10000); // Show after 10 seconds
    }

    return () => {
      if (popupTimerRef.current) {
        clearTimeout(popupTimerRef.current);
      }
    };
  }, [hasInteracted]);

  // Initialize chat with greeting when opened
  useEffect(() => {
    if (isChatOpen && messages.length === 0) {
      const greetingMessage: Message = {
        id: generateUniqueId(),
        text: knowledgeBase.greeting,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages([greetingMessage]);

      setTimeout(() => {
        const suggestionsMessage: Message = {
          id: generateUniqueId(),
          text: "💡 Here are some popular topics, or feel free to ask anything:",
          sender: 'bot',
          timestamp: new Date(),
        };

        setMessages(prev => [...prev, suggestionsMessage]);
      }, 1000);
    }
  }, [isChatOpen, messages.length]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleScroll = useCallback(() => {
    // Keep widget always visible - removed scroll-based hiding
    setIsVisible(true);

    // Show scroll-to-top button when scrolled down 300px
    const currentScrollY = window.scrollY;
    setShowScrollToTop(currentScrollY > 300);

    if (bgMode === 'auto') {
      const chatWidget = document.querySelector('.live-chat-widget');
      if (chatWidget) {
        const rect = chatWidget.getBoundingClientRect();
        const elements = document.elementsFromPoint(
          rect.left + rect.width / 2,
          rect.top + rect.height / 2
        );

        const backgroundElement = elements.find(element => {
          if (element === chatWidget) return false;
          const style = window.getComputedStyle(element);
          const bgColor = style.backgroundColor;
          return bgColor && bgColor !== 'transparent' && !bgColor.includes('rgba(0, 0, 0, 0)');
        });

        if (backgroundElement) {
          const style = window.getComputedStyle(backgroundElement);
          const bgColor = style.backgroundColor;
          const rgb = bgColor.match(/\d+/g);

          if (rgb && rgb.length >= 3) {
            const [r, g, b] = rgb.map(Number);
            const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
            setIsDarkBackground(luminance < 0.5);
          }
        }
      }
    } else {
      setIsDarkBackground(bgMode === 'dark');
    }

    if (chatMessagesRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatMessagesRef.current;
      const isScrolledToBottom = scrollHeight - scrollTop - clientHeight < 50;
      setShowQuickQuestions(isScrolledToBottom);
    }
  }, [bgMode]);

  useEffect(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [handleScroll]);

  const generateUniqueId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };

  const getResponseFromKnowledgeBase = (userInput: string): string => {
    const input = userInput.toLowerCase();

    if (input.includes('hello') || input.includes('hi') || input.includes('hey') || input.includes('greetings')) {
      return knowledgeBase.greeting;
    }
    else if (input.includes('who are you') || input.includes('what are you') || input.includes('your name') || input.includes('about you')) {
      return knowledgeBase.introduction;
    }
    else if (input.includes('service') || input.includes('offer') || input.includes('provide')) {
      return knowledgeBase.services;
    }
    else if (input.includes('infrastructure') || input.includes('facilities') || input.includes('amenities')) {
      return knowledgeBase.infrastructure;
    }
    else if (input.includes('companies') || input.includes('businesses') || input.includes('organizations') || input.includes('firms')) {
      return knowledgeBase.companies;
    }
    else if (input.includes('location') || input.includes('where') || input.includes('address') || input.includes('situated')) {
      return knowledgeBase.location;
    }
    else if (input.includes('vision') || input.includes('mission') || input.includes('goal') || input.includes('aim') || input.includes('objective')) {
      return knowledgeBase.vision;
    }
    else if (input.includes('event') || input.includes('expo') || input.includes('conference') || input.includes('meeting')) {
      return knowledgeBase.events;
    }
    else if (input.includes('contact') || input.includes('support') || input.includes('help') || input.includes('reach') || input.includes('email') || input.includes('phone')) {
      return knowledgeBase.contact;
    }
    else if (input.includes('tell me about ethiopian it park') || input.includes('about ethiopian it park') || input.includes('tell me about it park') || input.includes('what is ethiopian it park')) {
      return `The Ethiopian IT Park is a flagship initiative transforming Ethiopia into Africa's leading digital hub. Established in 2010 and restructured under the Ministry of Innovation and Technology in 2023, the park spans 200 hectares near Bole International Airport in Addis Ababa.\n\nWe provide world-class infrastructure, foster innovation, and create opportunities for tech companies to thrive in Ethiopia's growing digital economy.`;
    }
    else {
      return knowledgeBase.fallback;
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: generateUniqueId(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    setTimeout(() => {
      const response = getResponseFromKnowledgeBase(userMessage.text);

      const botMessage: Message = {
        id: generateUniqueId(),
        text: response,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleQuickQuestionClick = (question: string) => {
    setInputText(question);

    const userMessage: Message = {
      id: generateUniqueId(),
      text: question,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    setTimeout(() => {
      const response = getResponseFromKnowledgeBase(question);

      const botMessage: Message = {
        id: generateUniqueId(),
        text: response,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
    setHasInteracted(true);
    setShowPopup(false);
    setShowCTABadge(false);

    if (!isChatOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  };

  const handlePopupAction = (action: 'chat' | 'dismiss') => {
    setHasInteracted(true);
    setShowPopup(false);

    if (action === 'chat') {
      setIsChatOpen(true);
      setShowCTABadge(false);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const toggleQuickQuestions = () => {
    setShowQuickQuestions(!showQuickQuestions);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {/* Auto-Popup Alert */}
      {showPopup && !isChatOpen && (
        <div className="chat-popup-alert animate-slide-up">
          <div className="popup-content">
            <div className="popup-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
            </div>
            <div className="popup-text">
              <h4>👋 Need assistance?</h4>
              <p>Our virtual assistant is here to help! Ask about our services, facilities, or anything else.</p>
            </div>
            <div className="popup-actions">
              <button className="popup-btn primary" onClick={() => handlePopupAction('chat')}>
                Start Chat
              </button>
              <button className="popup-btn secondary" onClick={() => handlePopupAction('dismiss')}>
                Maybe Later
              </button>
            </div>
          </div>
          <button className="popup-close" onClick={() => setShowPopup(false)} aria-label="Dismiss assistance invitation">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      )}

      <div
        className={`live-chat-widget enterprise ${isDarkBackground ? 'light-mode' : 'dark-mode'} ${isVisible ? 'visible' : 'hidden'
          } ${isChatOpen ? 'expanded' : ''}`}
        aria-label="Live chat and contact"
      >
        {isChatOpen ? (
          <div className="chat-expanded" role="dialog" aria-modal="false" aria-label="Live support chat">
            <div className="chat-header">
              <div className="chat-avatar-small">
                <img src={avatarUrl} alt={botName} />
                <span className="status-indicator pulse" />
                <span className="support-icon-badge">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                  </svg>
                </span>
              </div>
              <div className="chat-header-info">
                <h3>{botName}</h3>
                <span className="online-status">
                  <span className="status-dot"></span>
                  Online • Instant replies
                </span>
              </div>
              <button
                className="close-chat-btn"
                onClick={toggleChat}
                aria-label="Close chat"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            <div className="chat-messages" ref={chatMessagesRef}>
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
                >
                  {message.sender === 'bot' && (
                    <div className="message-avatar">
                      <img src={avatarUrl} alt={botName} />
                      <span className="support-icon-badge-small">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" />
                        </svg>
                      </span>
                    </div>
                  )}
                  <div className="message-content">
                    <div className="message-text">{message.text}</div>
                    <div className="message-time">{formatTime(message.timestamp)}</div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="message bot-message">
                  <div className="message-avatar">
                    <img src={avatarUrl} alt={botName} />
                    <span className="support-icon-badge-small">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" />
                      </svg>
                    </span>
                  </div>
                  <div className="message-content">
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick questions section */}
            <div className={`quick-questions-container ${showQuickQuestions ? 'visible' : 'collapsed'}`}>
              <div className="quick-questions-header" onClick={toggleQuickQuestions}>
                <span>💡 Quick Questions</span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className={`toggle-icon ${showQuickQuestions ? 'expanded' : ''}`}
                  aria-hidden="true"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
              {showQuickQuestions && (
                <div className="quick-questions">
                  {commonQuestions.map((question) => (
                    <button
                      key={question.id}
                      className="quick-question-btn"
                      onClick={() => handleQuickQuestionClick(question.text)}
                    >
                      <span className="question-icon">{question.icon}</span>
                      <span className="question-text">{question.text}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="chat-input-container">
              <input
                ref={inputRef}
                type="text"
                className="chat-input"
                placeholder="Type your message..."
                aria-label="Chat message input"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleInputKeyPress}
                disabled={isLoading}
              />
              <button
                className="send-button"
                onClick={handleSendMessage}
                disabled={isLoading || !inputText.trim()}
                aria-label="Send message"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M22 2L11 13"></path>
                  <path d="M22 2L15 22L11 13L2 9L22 2z"></path>
                </svg>
              </button>
            </div>
          </div>
        ) : (
          <button
            className="chat-floating-trigger"
            onClick={toggleChat}
            aria-label="Toggle live chat"
            type="button"
          >
            {showCTABadge && (
              <div className="cta-badge animate-bounce">
                <span>💬 Chat Now!</span>
              </div>
            )}
            <div className="chat-avatar-floating">
              <img src={avatarUrl} alt="Support Assistant" />
              <span className="status-indicator pulse" />
              <span className="support-icon-badge">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" />
                </svg>
              </span>
            </div>
          </button>
        )}
      </div>

      {/* Scroll to Top Button */}
      {showScrollToTop && (
        <button
          className={`scroll-to-top-btn ${isDarkBackground ? 'light-mode' : 'dark-mode'}`}
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
        </button>
      )}
    </>
  );
};

export default LiveChatWidget;