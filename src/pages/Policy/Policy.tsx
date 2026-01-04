'use client';

import React, { JSX, useState } from 'react';
import './Policy.css';
import { 
  FaBook, FaLightbulb, FaHandshake, FaGlobe, 
  FaShieldAlt, FaUserTie, FaCamera, FaGavel, FaSearch 
} from 'react-icons/fa';

// Define policy ID type
type PolicyId = 'general' | 'incubation' | 'tenant' | 'digital' | 
               'privacy' | 'conduct' | 'media' | 'legal';

// Define interfaces
interface PolicySection {
  id: PolicyId;
  title: string;
  icon: JSX.Element;
}

interface PolicyContent {
  title: string;
  description: string;
  sections: {
    title: string;
    items: string[];
  }[];
}

const Policy: React.FC = () => {
  const [activeTab, setActiveTab] = useState<PolicyId>('general');
  const [searchQuery, setSearchQuery] = useState('');

  const sections: PolicySection[] = [
    { id: 'general', title: 'General Usage Policy', icon: <FaBook className="policy-icon" /> },
    { id: 'incubation', title: 'Incubation & Startup Guidelines', icon: <FaLightbulb className="policy-icon" /> },
    { id: 'tenant', title: 'Tenant & Partner Policy', icon: <FaHandshake className="policy-icon" /> },
    { id: 'digital', title: 'Digital & IT Policy', icon: <FaGlobe className="policy-icon" /> },
    { id: 'privacy', title: 'Privacy & Data Handling', icon: <FaShieldAlt className="policy-icon" /> },
    { id: 'conduct', title: 'Code of Conduct', icon: <FaUserTie className="policy-icon" /> },
    { id: 'media', title: 'Event & Media Policy', icon: <FaCamera className="policy-icon" /> },
    { id: 'legal', title: 'Legal & Disclaimer', icon: <FaGavel className="policy-icon" /> },
  ];

  const policyContents: Record<PolicyId, PolicyContent> = {
    general: {
      title: 'General Usage Policy',
      description: 'This policy outlines the fundamental rules and guidelines for accessing and using Ethiopian IT Parks facilities and services.',
      sections: [
        {
          title: 'Access Eligibility',
          items: [
            'Registered startups and tech companies',
            'Authorized partners and collaborators',
            'Approved visitors and guests'
          ]
        },
        {
          title: 'Facility Usage',
          items: [
            'Respect shared spaces and equipment',
            'Follow security protocols',
            'Maintain professional conduct'
          ]
        }
      ]
    },
    incubation: {
      title: 'Incubation & Startup Guidelines',
      description: 'Guidelines for startups participating in our incubation program.',
      sections: [
        {
          title: 'Program Requirements',
          items: [
            'Regular progress reporting',
            'Participation in mentorship sessions',
            'Compliance with IP guidelines'
          ]
        },
        {
          title: 'Support Services',
          items: [
            'Access to mentorship and advisory services',
            'Technical support and resources',
            'Networking opportunities'
          ]
        }
      ]
    },
    tenant: {
      title: 'Tenant & Partner Policy',
      description: 'Policies governing the relationship between Ethiopian IT Park and its tenants and partners.',
      sections: [
        {
          title: 'Leasing Terms',
          items: [
            'Office space allocation and usage',
            'Utility and service provisions',
            'Maintenance responsibilities'
          ]
        },
        {
          title: 'Partnership Guidelines',
          items: [
            'Collaboration frameworks',
            'Resource sharing protocols',
            'Joint project management'
          ]
        }
      ]
    },
    digital: {
      title: 'Digital & IT Policy',
      description: 'Guidelines for digital infrastructure and IT resource usage within Ethiopian IT Park.',
      sections: [
        {
          title: 'Network Usage',
          items: [
            'Acceptable use of network resources',
            'Security protocols and compliance',
            'Data protection measures'
          ]
        },
        {
          title: 'IT Resources',
          items: [
            'Hardware and software usage',
            'Cloud service guidelines',
            'Technical support procedures'
          ]
        }
      ]
    },
    privacy: {
      title: 'Privacy & Data Handling',
      description: 'Our commitment to protecting personal and business data within Ethiopian IT Park.',
      sections: [
        {
          title: 'Data Collection',
          items: [
            'Types of data collected',
            'Purpose of data collection',
            'Consent procedures'
          ]
        },
        {
          title: 'Data Protection',
          items: [
            'Storage and security measures',
            'Access control procedures',
            'Data retention policies'
          ]
        }
      ]
    },
    conduct: {
      title: 'Code of Conduct',
      description: 'Standards of behavior and professional conduct within Ethiopian IT Park.',
      sections: [
        {
          title: 'Professional Standards',
          items: [
            'Respect and inclusivity',
            'Professional communication',
            'Conflict resolution'
          ]
        },
        {
          title: 'Anti-Abuse Measures',
          items: [
            'Harassment prevention',
            'Security protocols',
            'Reporting procedures'
          ]
        }
      ]
    },
    media: {
      title: 'Event & Media Policy',
      description: 'Guidelines for events, media coverage, and public relations within Ethiopian IT Park.',
      sections: [
        {
          title: 'Event Management',
          items: [
            'Event planning procedures',
            'Venue usage guidelines',
            'Safety protocols'
          ]
        },
        {
          title: 'Media Relations',
          items: [
            'Press release guidelines',
            'Photography and filming rules',
            'Social media policies'
          ]
        }
      ]
    },
    legal: {
      title: 'Legal & Disclaimer',
      description: 'Legal framework and disclaimers governing the use of Ethiopian IT Parks services.',
      sections: [
        {
          title: 'Legal Framework',
          items: [
            'Terms of service',
            'Intellectual property rights',
            'Liability limitations'
          ]
        },
        {
          title: 'Compliance',
          items: [
            'Regulatory requirements',
            'Industry standards',
            'Compliance procedures'
          ]
        }
      ]
    }
  };

  const getPolicyContent = () => {
    const content = policyContents[activeTab];
    
    if (!content) {
      return <p>Select a policy section to view its content.</p>;
    }

    return (
      <div className="policy-section">
        <h3>{content.title}</h3>
        <p>{content.description}</p>
        
        {content.sections.map((section, index) => (
          <div key={index}>
            <h4>{section.title}</h4>
            <ul>
              {section.items.map((item, itemIndex) => (
                <li key={itemIndex}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="eitp-policy">
      {/* Hero Section */}
      <section className="eitp-policy__hero">
        <div className="eitp-policy__hero-content">
          <h1>Ethiopian IT Park Policies & Guidelines</h1>
          <p>Empowering Innovation Through Clear Guidelines and Standards</p>
        </div>
        <div className="eitp-policy__hero-overlay"></div>
      </section>

      {/* Main Content */}
      <div className="eitp-policy__main">
        {/* Sidebar Navigation */}
        <aside className="eitp-policy__sidebar">
          <nav className="eitp-policy__nav">
            <ul>
              {sections.map((section) => (
                <li key={section.id}>
                  <button
                    className={`eitp-policy__nav-btn ${activeTab === section.id ? 'eitp-policy__nav-btn--active' : ''}`}
                    onClick={() => setActiveTab(section.id)}
                  >
                    {section.icon}
                    <span>{section.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Content Area */}
        <main className="eitp-policy__content">
          {/* Search Bar */}
          <div className="eitp-policy__search">
            <div className="eitp-policy__search-wrapper">
              <FaSearch className="eitp-policy__search-icon" />
              <input
                type="text"
                className="eitp-policy__search-input"
                placeholder="Search policies and guidelines..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="eitp-policy__search-btn">Search</button>
          </div>

          {/* Policy Content */}
          <div className="eitp-policy__content-area">
            <div className="eitp-policy__header">
              <h2>{sections.find(s => s.id === activeTab)?.title}</h2>
              <div className="eitp-policy__breadcrumb">
                Home / Policies / {sections.find(s => s.id === activeTab)?.title}
              </div>
            </div>
            <div className="eitp-policy__body">
              {getPolicyContent()}
            </div>
          </div>
        </main>
      </div>

      {/* CTA Section */}
      <section className="eitp-policy__cta">
        <div className="eitp-policy__cta-content">
          <h2>Need More Information?</h2>
          <p>Our team is ready to assist you with any questions about our policies</p>
          <div className="eitp-policy__cta-buttons">
            <button className="eitp-policy__cta-btn eitp-policy__cta-btn--primary">
              Schedule Consultation
            </button>
            <button className="eitp-policy__cta-btn eitp-policy__cta-btn--secondary">
              Download Guidelines
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Policy;