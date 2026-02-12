import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
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

const BotIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 8V4H8" />
    <rect width="16" height="12" x="4" y="8" rx="2" />
    <path d="M2 14h2" />
    <path d="M20 14h2" />
    <path d="M15 13v2" />
    <path d="M9 13v2" />
  </svg>
);

// Knowledge base for the Ethiopian IT Park chatbot - Ultra Deep Institutional Data
const knowledgeBase = {
  greeting: "👋 Welcome to the Ethiopian IT Park Executive Portals. I am the Lead Digital Attaché. I possess deep-level data on our 200-hectare Special Economic Zone, regulatory frameworks, and technical infrastructure. How may I facilitate your strategic inquiry?",

  introduction: "I am an advanced digital representative of the Ethiopian Industrial Park Development Corporation (IPDC). I provide real-time institutional data on our SEZ (Special Economic Zone) status, the Digital Ethiopia 2025 strategy, and our high-specification technical environment.",

  services: "📂 **Institutional Service Portfolio:**\n\n1️⃣ **Real Estate:** Grade-A offices, customized industrial sheds (500m² - 5,000m²), and fully serviced land with pre-installed utility headers.\n2️⃣ **Digital Infra:** PaaS/SaaS environments, dedicated private clouds, and Tier III carrier-neutral colocation.\n3️⃣ **OSS Center:** One-Stop-Service for 24-hour business registration, customs, and immigration.\n4️⃣ **Human Capital:** Professional recruitment assistance and technical training programs through our ICT center.",

  infrastructure: "🏗️ **Technical Infrastructure Specs:**\n\n• **Power:** Dedicated 132kV substation, dual-feeder lines with automatic N+1 transition, and industrial 2MW UPS systems.\n• **Network:** Multiple-entry fiber vaults, 100Gbps+ capacity, and direct peering with regional internet exchange points (IXPs).\n• **Safety:** NFPA-compliant fire suppression, HSSD (High Sensitivity Smoke Detection), and Tier-4 physical security protocols.",

  sustainability: "🌱 **Green & Sustainable Operations:**\n\n• **Renewable Mix:** 95%+ of our grid energy is sourced from Hydro and Geothermal power.\n• **Solar Integration:** We have committed 20% of roof space for photovoltaic (PV) array installations.\n• **Waste Zero:** Centralized industrial wastewater treatment plant (ETP) and a proactive e-waste management partnership.",

  humancapital: "👥 **Labor & Talent Advantage:**\n\n• **Talent Pool:** Proximity to 10+ universities in Addis Ababa with 50,000+ STEM graduates annually.\n• **Labor Costs:** Competitive regional labor costs (approx. 30-40% lower than neighboring hubs).\n• **Training:** Our on-site 'Knowledge Park' provides continuous upskilling in Cloud, AI, and Cybersecurity.",

  regulatory: "⚖️ **SEZ Proclamation & Legal Framework:**\n\n• **Proclamation No. 886/2015:** Grants exclusive administrative autonomy to the IT Park.\n• **Zero Duty:** Permitted 100% duty-free import of capital goods and spare parts.\n• **Currency:** Right to maintain and operate foreign currency accounts with zero exchange risk.",

  zones: "🗺️ **Strategic Investment Zones:**\n\n• **Business Zone:** Optimized for BPO and HQ operations (High-density cooling & power).\n• **Assembly Zone:** Bonded warehouses and specialized sheds for electronics/hardware assembly.\n• **Knowledge Zone:** A Nexus for academic-industry R&D collaboration.\n• **Social Zone:** High-end hospitality and residential units for international staff.",

  investment: "💰 **Institutional Investment Incentives:**\n\n• **10-15 Year Tax Exemption:** For export-oriented tech firms.\n• **Full Customs Waiver:** 100% duty-free import of all capital machinery and inputs.\n• **Forex Accounts:** Guaranteed right to operate foreign currency accounts.\n• **No Minimum Investment:** Unlike other sectors, ICT startups have significantly lower entry barriers.",

  companies: "🏆 **Strategic Hub Participants:**\n\n• **Global Leaders:** Safaricom, Wingu, Raxio, RedFox Solutions.\n• **Regional Giants:** Several international BPO and Fintech houses.\n• **Startup Ecosystem:** 100+ innovators across EdTech, Agritech, and AI labs.",

  location: "📍 **Strategic Logistics Corridor:**\n\nPositioned on the Goro-Corridor, 10km from Bole International Airport. Direct access to the national highway network and the Addis-Djibouti railway for hardware exporters.",

  logistics: "🚛 **Logistics & Strategic Proximity:**\n\n• **Air Hub:** 10 minutes from Bole International Airport - Africa's most connected aviation hub.\n• **Inland Port:** Direct integration with the Mojo Dry Port for seamless container terminal logistics.\n• **Customs:** On-site customs bonded warehouse clearing goods in under 4 hours.",

  contact: "📞 **Executive Access & Support:**\n\n• **Investments:** invest@ethiopianitpark.et\n• **Technical Ops:** noc@ethiopianitpark.et\n• **General:** +251 11 888 7766\n• **Location:** Goro Corridor, Strategic Building B1, Addis Ababa.",

  fallback: "I require more technical specificity to answer that deeply. Would you like to know about our **10-Year Tax Breaks**, **Tier III Data Center Specs**, **Renewable Energy Mix**, or **Foreign Currency Rights**? You can also contact our Investment Desk at invest@ethiopianitpark.et."
};

// Expanded common questions with icons
const commonQuestions: QuickQuestion[] = [
  { id: 'q1', text: 'Why invest in Ethiopian IT Park?', icon: '💰' },
  { id: 'q2', text: 'Tell me about Tax Incentives', icon: '⚖️' },
  { id: 'q3', text: 'Data Center Infrastructure specs', icon: '💾' },
  { id: 'q4', text: 'Office space & land availability', icon: '🏢' },
  { id: 'q5', text: 'Labor costs & talent pool info', icon: '👥' },
  { id: 'q6', text: 'Sustainability & Green energy', icon: '🌱' },
  { id: 'q7', text: 'Logistics & Airport proximity', icon: '✈️' },
  { id: 'q8', text: 'How to register a business here?', icon: '📝' }
];

const LiveChatWidget: React.FC<LiveChatWidgetProps> = ({
  bgMode = 'auto',
  infoText = "Need help? Chat with us!",
  avatarUrl,
  chatLink = '/contact',
  botName = 'IT Park Assistant',
}) => {
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(true);
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
    else if (input.includes('infrastructure') || input.includes('facilities') || input.includes('power') || input.includes('internet')) {
      return knowledgeBase.infrastructure;
    }
    else if (input.includes('sustainability') || input.includes('green') || input.includes('solar') || input.includes('renewable')) {
      return knowledgeBase.sustainability;
    }
    else if (input.includes('talent') || input.includes('labor') || input.includes('human capital') || input.includes('graduates')) {
      return knowledgeBase.humancapital;
    }
    else if (input.includes('law') || input.includes('legal') || input.includes('regulatory') || input.includes('proclamation')) {
      return knowledgeBase.regulatory;
    }
    else if (input.includes('logistics') || input.includes('airport') || input.includes('transport')) {
      return knowledgeBase.logistics;
    }
    else if (input.includes('companies') || input.includes('businesses') || input.includes('tenants')) {
      return knowledgeBase.companies;
    }
    else if (input.includes('location') || input.includes('where') || input.includes('address')) {
      return knowledgeBase.location;
    }
    else if (input.includes('vision') || input.includes('mission') || input.includes('goal')) {
      return "🚀 **Our Vision:** To position Ethiopia as Africa's leading digital hub by fostering innovation, attracting foreign investment, and providing world-class ICT infrastructure.";
    }
    else if (input.includes('event') || input.includes('expo') || input.includes('conference')) {
      return "📅 **Major Annual Events:**\n\n• **Stride Ethiopia Tech Expo:** Our flagship technology exhibition.\n• **Africa Tech Summit:** Regional gathering of tech leaders.\n• **Investor Roundtables:** Monthly deep-dives for prospective tenants.";
    }
    else if (input.includes('tax') || input.includes('incentive') || input.includes('duty') || input.includes('profit')) {
      return knowledgeBase.investment;
    }
    else if (input.includes('register') || input.includes('apply') || input.includes('start business')) {
      return "📝 **Registration Process:**\n\n1. Submit Expression of Interest (EOI) via invest@ethiopianitpark.et\n2. Technical Review of your Business Plan by our IPDC board.\n3. SEC Licensing & OSS Onboarding in under 48 hours.\n4. Site selection & Utility activation.";
    }
    else if (input.includes('data center') || input.includes('colocation') || input.includes('hosting')) {
      return "💾 **Data Center Excellence:** We host Tier III carrier-neutral facilities (Wingu, Raxio) offering colocation, disaster recovery, and hybrid cloud solutions with guaranteed 99.982% availability.";
    }
    else if (input.includes('software') || input.includes('bpo') || input.includes('outsourcing')) {
      return "💻 **Software & BPO Hub:** Our Business Zone is custom-built for high-density software engineering teams and 24/7 BPO operations with sound-insulated floors and ergonomic layouts.";
    }
    else if (input.includes('contact') || input.includes('support')) {
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
        className={`live-chat-widget enterprise ${theme}-theme ${isVisible ? 'visible' : 'hidden'
          } ${isChatOpen ? 'expanded' : ''}`}
        aria-label="Live chat and contact"
        data-theme={theme}
      >
        {isChatOpen ? (
          <div className="chat-expanded" role="dialog" aria-modal="false" aria-label="Live support chat">
            <div className="chat-header">
              <div className="chat-avatar-small">
                <BotIcon />
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
                      <BotIcon />
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
                    <BotIcon />
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

          </button>
        )}
      </div>

    </>
  );
};

export default LiveChatWidget;