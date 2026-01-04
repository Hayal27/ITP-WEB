import React, { useState, useEffect } from "react";
import "./Innovation.css";

const programs = [  
  {
    title: "Digital Skills Academy",
    img: "/images/innovations/henok-skil.jpeg",
    desc: "Upskill with coding, AI, and digital business courses, tailored for Ethiopia's youth and professionals.",
    link: "#",
    icon: "🧑‍💻",
  },
  {
    title: "Startup Accelerator",
    img: "/images/innovations/incubation.jpg",
    desc: "A 12-week intensive program for early-stage startups. Access mentorship, funding, and global exposure to accelerate your business in Ethiopia's vibrant tech ecosystem.",
    link: "#",
    icon: "🚀",
  },  
  {
    title: "Innovation Bootcamp",
    img: "/images/innovations/Innovation Lab.jpeg",
    desc: "A 5-day hands-on bootcamp for teams and individuals to master design thinking, prototyping, and go-to-market strategies.",
    link: "#",
    icon: "💡",
  },
  {
    title: "Corporate Innovation Lab",
    img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80",
    desc: "Custom innovation sprints for enterprises. Foster intrapreneurship, solve business challenges, and launch new ventures with support from Ethiopia's IT Park.",
    link: "#",
    icon: "🏢",
  },
  {
    title: "Women in Tech Initiative",
    img: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80",
    desc: "Empowering women entrepreneurs and leaders through mentorship, funding, and networking events.",
    link: "#",
    icon: "👩‍💼",
  },
  {
    title: "Green Innovation Challenge",
    img: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80",
    desc: "Accelerate sustainable startups focused on climate, agriculture, and clean energy in Ethiopia.",
    link: "#",
    icon: "🌱",
  },
];

const features = [
  {
    icon: "🌍",
    title: "African Tech Hub",
    desc: "Located in the heart of Addis Ababa, Ethiopian IT Park is a gateway to Africa's booming digital economy.",
  },
  {
    icon: "🤝",
    title: "Collaborative Community",
    desc: "Connect with startups, corporates, investors, and mentors in a thriving, inclusive ecosystem.",
  },
  {
    icon: "💼",
    title: "Business Support",
    desc: "From legal advice to funding access, get all the support you need to scale your innovation.",
  },
  {
    icon: "🎓",
    title: "Workshops & Events",
    desc: "Regular hackathons, seminars, and networking events to keep you inspired and connected.",
  },
];

const testimonials = [
  {
    name: "Lensa Mekonnen",
    role: "Founder, AddisTech",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
    quote: "The IT Park's accelerator program gave us the mentorship and exposure we needed to launch our product across Africa.",
  },
  {
    name: "Samuel Getachew",
    role: "CEO, EthioCloud",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
    quote: "The innovation lab helped our team rethink our business model and connect with key partners in the region.",
  },
  {
    name: "Hanna Tadesse",
    role: "CTO, Blue Nile AI",
    img: "https://randomuser.me/api/portraits/women/65.jpg",
    quote: "The bootcamp was a game-changer. We learned design thinking and built a prototype in just one week!",
  },
];

const InnovationAcceleration: React.FC = () => {
  const [activeProgram, setActiveProgram] = useState<number | null>(null);
  const [visibleSection, setVisibleSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      const headerHeight = document.querySelector('header')?.offsetHeight || 80;
      
      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionBottom = section.getBoundingClientRect().bottom;
        
        if (sectionTop <= headerHeight + 100 && sectionBottom >= headerHeight) {
          setVisibleSection(section.id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (elementId: string) => {
    const element = document.getElementById(elementId);
    const headerHeight = document.querySelector('header')?.offsetHeight || 80;
    
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="innovation-container">
      {/* Hero Section */}
      <section className="hero-section-innovation" id="hero">
        <div className="hero-innovation-overlay"></div>
        <div className="container">
          <div className="hero-innovation-content">
            <h1 className="hero-innovation-title">Innovation & Acceleration Programs</h1>
            <p className="hero-innovation-description">
              Empowering Ethiopia's next generation of innovators and entrepreneurs. 
              Join IT Park's dynamic programs designed for startups, enterprises, and 
              visionaries ready to make an impact in Africa's digital future.
            </p>
            <div className="hero-innovation-cta">
              <button 
                onClick={() => scrollToSection('programs')} 
                className="btn btn-primary"
              >
                Explore Programs
              </button>
              <button 
                onClick={() => scrollToSection('contact')} 
                className="btn btn-outline"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section 
        id="programs" 
        className={`programs-section ${visibleSection === "programs" ? "visible" : ""}`}
      >
        <div className="container">
          <h2 className="innovation-section-title">Our Programs</h2>
          <div className="programs-grid">
            {programs.map((program, index) => (
              <div 
                key={program.title}
                className={`program-card ${activeProgram === index ? "active" : ""}`}
                onMouseEnter={() => setActiveProgram(index)}
                onMouseLeave={() => setActiveProgram(null)}
              >
                <div className="program-icon">{program.icon}</div>
                <div className="program-image">
                  <img src={program.img} alt={program.title} loading="lazy" />
                </div>
                <div className="program-content">
                  <h3>{program.title}</h3>
                  <p>{program.desc}</p>
                  <button 
                    onClick={() => scrollToSection(program.link.slice(1))}
                    className="program-link"
                  >
                    Learn More <span className="arrow">→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section 
        id="features" 
        className={`features-section ${visibleSection === "features" ? "visible" : ""}`}
      >
        <div className="container">
          <h2 className="innovation-section-title">Why Choose IT Park?</h2>
          <div className="features-grid">
            {features.map((feature) => (
              <div key={feature.title} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section 
        id="testimonials" 
        className={`testimonials-section ${visibleSection === "testimonials" ? "visible" : ""}`}
      >
        <div className="container">
          <h2 className="innovation-section-title">Success Stories</h2>
          <div className="testimonials-grid">
            {testimonials.map((testimonial) => (
              <div key={testimonial.name} className="testimonial-card">
                <div className="testimonial-image">
                  <img src={testimonial.img} alt={testimonial.name} loading="lazy" />
                </div>
                <blockquote>{testimonial.quote}</blockquote>
                <div className="testimonial-author">
                  <h4>{testimonial.name}</h4>
                  <p>{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section 
        id="contact" 
        className={`innovation-contact-section ${visibleSection === "contact" ? "visible" : ""}`}
      >
        <div className="container">
          <div className="innovation-contact-content">
            <h2 className="innovation-section-title">Ready to Innovate?</h2>
            <p className="innovation-contact-description">
              Join Ethiopia's leading innovation hub and accelerate your journey to success.
            </p>
            <div className="innovation-contact-cta">
              <button 
                onClick={() => scrollToSection('apply')} 
                className="btn btn-light"
              >
                Apply Now
              </button>
              <button 
                onClick={() => scrollToSection('learn-more')} 
                className="btn btn-outline-light"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InnovationAcceleration;