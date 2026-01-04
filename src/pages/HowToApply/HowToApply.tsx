import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './HowToApply.css';

interface EligibilityCriteria {
  icon: string;
  title: string;
  description: string;
}

interface ApplicationStep {
  number: number;
  title: string;
  description: string;
  icon: string;
}

interface RequirementItem {
  text: string;
  details?: string;
}

const HowToApply: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('individual');

  const eligibilityCriteria: EligibilityCriteria[] = [
    {
      icon: "fas fa-user-check",
      title: "Citizenship",
      description: "Ethiopian citizens or Ethiopian-born foreigners with valid residence permit"
    },
    {
      icon: "fas fa-lightbulb",
      title: "Innovation",
      description: "IT entrepreneurs with novel and innovative ideas or products"
    },
    {
      icon: "fas fa-rocket",
      title: "Young Companies",
      description: "IT companies established within the last 2 years"
    },
    {
      icon: "fas fa-certificate",
      title: "Novelty",
      description: "Distinctive IT product, service, or technological solution concepts"
    }
  ];

  const applicationSteps: ApplicationStep[] = [
    {
      number: 1,
      title: "Review Eligibility",
      description: "Carefully review all eligibility requirements to ensure your startup qualifies for the incubation program",
      icon: "fas fa-clipboard-check"
    },
    {
      number: 2,
      title: "Prepare Documentation",
      description: "Compile all required documents including business plan, financial projections, and legal paperwork",
      icon: "fas fa-folder-open"
    },
    {
      number: 3,
      title: "Submit Application",
      description: "Complete the comprehensive online application form with detailed information about your IT innovation",
      icon: "fas fa-file-upload"
    },
    {
      number: 4,
      title: "Review & Evaluation",
      description: "Applications are evaluated by our expert panel based on innovation, feasibility, and market potential",
      icon: "fas fa-search-dollar"
    },
    {
      number: 5,
      title: "Interview & Pitch",
      description: "Shortlisted candidates present their business concept to our selection committee",
      icon: "fas fa-presentation"
    },
    {
      number: 6,
      title: "Final Decision",
      description: "Successful applicants receive acceptance notification and onboarding details",
      icon: "fas fa-check-double"
    }
  ];

  const requirementsByType: Record<string, RequirementItem[]> = {
    individual: [
      { text: "Valid Ethiopian national ID or passport" },
      { text: "Residence permit (for Ethiopian-born foreigners)" },
      { text: "Detailed business plan (10-15 pages)", details: "Including market analysis, revenue model, and growth strategy" },
      { text: "Technology concept documentation", details: "Technical specifications and innovation description" },
      { text: "Financial projections for 3 years", details: "Revenue forecasts, expense budgets, and cash flow analysis" },
      { text: "Commitment to pay subsidized office space fees" }
    ],
    group: [
      { text: "Valid identification for all co-founders" },
      { text: "Partnership agreement or MOU", details: "Clearly defining roles, ownership, and responsibilities" },
      { text: "Comprehensive business plan (15-20 pages)", details: "Covering team structure, market opportunity, and execution plan" },
      { text: "Technical product/service documentation" },
      { text: "Financial projections and funding requirements" },
      { text: "Equity distribution agreement" },
      { text: "Proof of initial capital contribution" }
    ],
    company: [
      { text: "Company registration certificate", details: "Must be registered within the last 2 years" },
      { text: "Business license from relevant authority" },
      { text: "Tax registration certificate (TIN)" },
      { text: "Complete business plan (20+ pages)", details: "Including traction, market validation, and scaling strategy" },
      { text: "Financial statements", details: "Balance sheet, income statement, and cash flow for existing operations" },
      { text: "Product/service documentation and demos" },
      { text: "Customer testimonials or pilot results (if available)" },
      { text: "Organizational structure and team information" }
    ]
  };

  return (
    <div className="how-to-apply-page">
      {/* Hero Section */}
      <section className="htap-hero">
        <Container>
          <Row className="justify-content-center">
            <Col lg={10} className="text-center">
              <h1 className="htap-hero-title">
                Join Ethiopia's Premier IT Park Incubation Program
                <span className="htap-hero-subtitle">Empowering Innovation • Building Technology Leaders • Transforming Ideas into Impact</span>
              </h1>
              <p className="htap-hero-description">
                Access world-class infrastructure, mentorship, networking opportunities, and resources to accelerate your IT venture's growth
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Eligibility Section */}
      <section className="htap-eligibility">
        <Container>
          <h2 className="htap-section-title">Eligibility Criteria</h2>
          <p className="htap-section-subtitle">
            To qualify for the incubation program, applicants must meet the following requirements:
          </p>
          <div className="htap-criteria-grid">
            {eligibilityCriteria.map((criteria, index) => (
              <div className="htap-criteria-card" key={index}>
                <div className="htap-criteria-icon">
                  <i className={criteria.icon}></i>
                </div>
                <h3 className="htap-criteria-title">{criteria.title}</h3>
                <p className="htap-criteria-description">{criteria.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Application Process */}
      <section className="htap-process">
        <Container>
          <h2 className="htap-section-title">Application Process</h2>
          <p className="htap-section-subtitle">
            Follow these steps to submit your application to the IT Park Incubation Program
          </p>
          <div className="htap-timeline">
            {applicationSteps.map((step, index) => (
              <div className="htap-timeline-item" key={index}>
                <div className="htap-timeline-marker">
                  <div className="htap-timeline-number">{step.number}</div>
                  <div className="htap-timeline-icon">
                    <i className={step.icon}></i>
                  </div>
                </div>
                <div className="htap-timeline-content">
                  <h3 className="htap-timeline-title">{step.title}</h3>
                  <p className="htap-timeline-description">{step.description}</p>
                </div>
                {index < applicationSteps.length - 1 && <div className="htap-timeline-connector"></div>}
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Application Types */}
      <section className="htap-types">
        <Container>
          <h2 className="htap-section-title">Required Documentation</h2>
          <p className="htap-section-subtitle">
            Select your applicant category to view specific document requirements
          </p>
          <div className="htap-tabs">
            <button
              className={`htap-tab ${activeTab === 'individual' ? 'active' : ''}`}
              onClick={() => setActiveTab('individual')}
              aria-label="Individual Entrepreneur Requirements"
            >
              <i className="fas fa-user"></i>
              <span>Individual Entrepreneur</span>
            </button>
            <button
              className={`htap-tab ${activeTab === 'group' ? 'active' : ''}`}
              onClick={() => setActiveTab('group')}
              aria-label="Group of Entrepreneurs Requirements"
            >
              <i className="fas fa-users"></i>
              <span>Group of Entrepreneurs</span>
            </button>
            <button
              className={`htap-tab ${activeTab === 'company' ? 'active' : ''}`}
              onClick={() => setActiveTab('company')}
              aria-label="Young IT Company Requirements"
            >
              <i className="fas fa-building"></i>
              <span>Young IT Company</span>
            </button>
          </div>
          <div className="htap-tab-content">
            <div className="htap-requirements-wrapper">
              {activeTab === 'individual' && (
                <>
                  <div className="htap-requirements-header">
                    <h3>Individual Entrepreneur Requirements</h3>
                    <p className="htap-requirements-intro">
                      Individual entrepreneurs must submit the following documents to complete their application:
                    </p>
                  </div>
                  <div className="htap-requirements-grid">
                    {requirementsByType.individual.map((req, idx) => (
                      <div className="htap-requirement-card" key={idx}>
                        <div className="htap-requirement-icon">
                          <i className="fas fa-file-alt"></i>
                        </div>
                        <div className="htap-requirement-content">
                          <h4>{req.text}</h4>
                          {req.details && <p>{req.details}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
              {activeTab === 'group' && (
                <>
                  <div className="htap-requirements-header">
                    <h3>Group of Entrepreneurs Requirements</h3>
                    <p className="htap-requirements-intro">
                      Groups applying together must provide comprehensive documentation about their team and venture:
                    </p>
                  </div>
                  <div className="htap-requirements-grid">
                    {requirementsByType.group.map((req, idx) => (
                      <div className="htap-requirement-card" key={idx}>
                        <div className="htap-requirement-icon">
                          <i className="fas fa-file-alt"></i>
                        </div>
                        <div className="htap-requirement-content">
                          <h4>{req.text}</h4>
                          {req.details && <p>{req.details}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
              {activeTab === 'company' && (
                <>
                  <div className="htap-requirements-header">
                    <h3>Young IT Company Requirements</h3>
                    <p className="htap-requirements-intro">
                      Registered companies (less than 2 years old) must submit:
                    </p>
                  </div>
                  <div className="htap-requirements-grid">
                    {requirementsByType.company.map((req, idx) => (
                      <div className="htap-requirement-card" key={idx}>
                        <div className="htap-requirement-icon">
                          <i className="fas fa-file-alt"></i>
                        </div>
                        <div className="htap-requirement-content">
                          <h4>{req.text}</h4>
                          {req.details && <p>{req.details}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="htap-cta">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8} className="text-center">
              <h2>Ready to Launch Your IT Venture?</h2>
              <p>Apply now and join Ethiopia's thriving technology ecosystem</p>
              <div className="htap-contact-info">
                <p>Have questions about the application process?</p>
                <div className="htap-contact-details">
                  <a href="tel:+251-944-666-633">
                    <i className="fas fa-phone-alt"></i>
                    <span>+251-944-666-633</span>
                  </a>
                  <a href="contact@ethiopianitpark.et">
                    <i className="fas fa-envelope"></i>
                    <span>contact@ethiopianitpark.et</span>
                  </a>
                </div>
                <div className="htap-office-hours">
                  <i className="fas fa-clock"></i>
                  <span>Office Hours: Monday - Friday, 8:30 AM - 5:00 PM (EAT)</span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default HowToApply;