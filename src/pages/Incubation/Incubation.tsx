import React from 'react';
import './Incubation.css';


const Incubation: React.FC = () => {
  return (
    <div className="incubation-page bg-[var(--bg-main)] min-h-screen">

      {/* Hero Section (untouched) */}
      <section className="incubation-hero animated-hero relative overflow-hidden py-32 md:py-40 text-white">
        {/* The hero-bg-shapes div has been removed as per instruction */}

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="hero-title text-4xl md:text-5xl font-bold mb-6 animate-fade-in">Workspace & Innovation</h1>
            <p className="hero-subtitle text-lg md:text-xl mb-8 animate-fade-in-delay">
              Empowering Tech Entrepreneurship and Innovation in Ethiopia
            </p>
            <div className="hero-cta flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-delay2">
              <a href="/incubation/how-to-apply" className="btn btn-primary text-primary-light text-lg px-8 py-3 rounded-full shadow-card font-semibold me-3 btn-ripple">Apply Now</a>
              <a href="/incubation/how-to-apply" className="btn btn-outline text-lg px-8 py-3 rounded-full border-white text-white hover:bg-white hover:text-primary transition btn-glow">Learn More</a>
            </div>
          </div>
        </div>
      </section>

      {/* Workspace at IT Park Section */}
      <section className="py-20 bg-[var(--bg-card)]">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-main)] mb-4">Workspace at IT Park</h2>
            <p className="text-lg text-[var(--text-muted)]">
              Discover flexible, modern, and collaborative workspaces designed for startups, scale-ups, and global teams. Enjoy high-speed internet, 24/7 security, meeting rooms, and a vibrant tech community—everything you need to innovate and grow.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-2xl bg-[var(--bg-main)] shadow-card p-8 flex flex-col items-center hover:shadow-lg transition">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-[var(--primary)]/10 mb-4">
                <i className="fas fa-building text-[var(--primary)] text-2xl"></i>
              </div>
              <h3 className="font-semibold text-lg text-[var(--text-main)] mb-2">Private Offices</h3>
              <p className="text-[var(--text-muted)] text-center">Secure, fully-furnished offices for teams of any size, with flexible lease terms and access to all amenities.</p>
            </div>
            <div className="rounded-2xl bg-[var(--bg-main)] shadow-card p-8 flex flex-col items-center hover:shadow-lg transition">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-[var(--primary)]/10 mb-4">
                <i className="fas fa-users text-[var(--primary)] text-2xl"></i>
              </div>
              <h3 className="font-semibold text-lg text-[var(--text-main)] mb-2">Co-working Spaces</h3>
              <p className="text-[var(--text-muted)] text-center">Flexible desks, creative lounges, and networking zones—perfect for freelancers, founders, and remote teams.</p>
            </div>
            <div className="rounded-2xl bg-[var(--bg-main)] shadow-card p-8 flex flex-col items-center hover:shadow-lg transition">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-[var(--primary)]/10 mb-4">
                <i className="fas fa-chalkboard-teacher text-[var(--primary)] text-2xl"></i>
              </div>
              <h3 className="font-semibold text-lg text-[var(--text-main)] mb-2">Meeting & Event Rooms</h3>
              <p className="text-[var(--text-muted)] text-center">Book modern meeting rooms, event halls, and training labs equipped with the latest tech and support staff.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-main)] mb-4">Our Programs</h2>
            <p className="text-lg text-[var(--text-muted)] max-w-2xl mx-auto">
              Discover our comprehensive incubation and innovation programs designed to support your entrepreneurial journey.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[var(--bg-card)] rounded-2xl shadow-card p-8 flex flex-col items-center hover:shadow-lg transition border border-[var(--border-color)]">
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[var(--primary)]/10 mb-4">
                <i className="fas fa-rocket text-[var(--primary)] text-2xl"></i>
              </div>
              <h3 className="font-semibold text-lg text-[var(--text-main)] mb-2">Startups & Early-Stage Support</h3>
              <ul className="text-[var(--text-muted)] mb-4 space-y-2 text-sm">
                <li><i className="fas fa-check text-[var(--secondary)] mr-2"></i> Dedicated Office Spaces</li>
                <li><i className="fas fa-check text-[var(--secondary)] mr-2"></i> Startup Mentorship</li>
                <li><i className="fas fa-check text-[var(--secondary)] mr-2"></i> Pitch Events & Demo Days</li>
                <li><i className="fas fa-check text-[var(--secondary)] mr-2"></i> Business Services</li>
              </ul>
              <a href="/incubation/startups" className="btn btn-outline-primary w-full text-center font-semibold rounded-lg border-primary text-primary-light hover:bg-primary hover:text-white transition">Explore Startups</a>
            </div>
            <div className="bg-[var(--bg-card)] rounded-2xl shadow-card p-8 flex flex-col items-center hover:shadow-lg transition border border-[var(--border-color)]">
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[var(--primary)]/10 mb-4">
                <i className="fas fa-graduation-cap text-[var(--primary)] text-2xl"></i>
              </div>
              <h3 className="font-semibold text-lg text-[var(--text-main)] mb-2">Capacity Building & Training</h3>
              <ul className="text-[var(--text-muted)] mb-4 space-y-2 text-sm">
                <li><i className="fas fa-check text-[var(--secondary)] mr-2"></i> Entrepreneurship Bootcamps</li>
                <li><i className="fas fa-check text-[var(--secondary)] mr-2"></i> Digital Skills Development</li>
                <li><i className="fas fa-check text-[var(--secondary)] mr-2"></i> Design Thinking Workshops</li>
                <li><i className="fas fa-check text-[var(--secondary)] mr-2"></i> Partner-Led Programs</li>
              </ul>
              <a href="/incubation/training" className="btn btn-outline-primary w-full text-center font-semibold rounded-lg border-primary text-primary-light hover:bg-primary hover:text-white transition">View Training</a>
            </div>
            <div className="bg-[var(--bg-card)] rounded-2xl shadow-card p-8 flex flex-col items-center hover:shadow-lg transition border border-[var(--border-color)]">
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[var(--primary)]/10 mb-4">
                <i className="fas fa-lightbulb text-[var(--primary)] text-2xl"></i>
              </div>
              <h3 className="font-semibold text-lg text-primary-dark mb-2">Innovation & Acceleration</h3>
              <ul className="text-gray-600 mb-4 space-y-2 text-sm">
                <li><i className="fas fa-check text-secondary mr-2"></i> Product Development Labs</li>
                <li><i className="fas fa-check text-secondary mr-2"></i> Market Access Support</li>
                <li><i className="fas fa-check text-secondary mr-2"></i> Seed Funding Opportunities</li>
                <li><i className="fas fa-check text-secondary mr-2"></i> Corporate Collaborations</li>
              </ul>
              <a href="/incubation/innovation-programs" className="btn btn-outline-primary w-full text-center font-semibold rounded-lg border-primary text-primary-light hover:bg-primary hover:text-white transition">Discover Programs</a>
            </div>
          </div>
        </div>
      </section>

      {/* Apply Section (untouched) */}
      <section className="apply-section">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 w-full">
              <h2 className="section-title">Ready to Start Your Journey?</h2>
              <div className="apply-steps timeline-steps">
                <div className="apply-step timeline-step">
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <h4>Check Eligibility</h4>
                    <p>Startups must be in the ideation, MVP, or early traction stage</p>
                  </div>
                </div>
                <div className="apply-step timeline-step">
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <h4>Prepare Documents</h4>
                    <p>Business model canvas, pitch deck, team profile</p>
                  </div>
                </div>
                <div className="apply-step timeline-step">
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <h4>Submit Application</h4>
                    <p>Apply online or visit our incubation office</p>
                  </div>
                </div>
                <div className="timeline-progress-bar"></div>
              </div>
              <a href="/incubation/how-to-apply" className="btn btn-primary text-primary-light text-lg px-8 py-3 rounded-full shadow-card font-semibold btn-ripple mb-4">Apply Now</a>
            </div>
            <div className="lg:w-1/2 w-full mt-8 lg:mt-0">
              <div className="apply-image relative rounded-xl overflow-hidden shadow-card aspect-video">
                <img src="/images/innovations/apply-now.jpg" alt="Apply Now" className="object-cover w-full h-full" />
                <div className="startup-contact-info absolute bottom-0 left-0 right-0 bg-white/95 p-8 translate-y-full hover:translate-y-0 transition">
                  <h4 className="text-primary-default text-xl font-semibold mb-4">Contact Us</h4>
                  <p className="flex items-center gap-4 text-primary-default mb-3 text-lg">
                    <i className="fas fa-envelope bg-primary-default text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"></i>
                    incubation@ethiopianitpark.et
                  </p>
                  <p className="flex items-center gap-4 text-primary-default text-lg">
                    <i className="fas fa-phone bg-primary-default text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"></i>
                    +251 11 123 4567
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Incubation;