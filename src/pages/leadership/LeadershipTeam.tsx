import React, { useState, Suspense } from "react";
import { FaTwitter, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";

import './LeadershipTeam.css';

const GoJSWrapper = React.lazy(() => import('./GoJSWrapper'));

// Organize chart data based on the provided organizational chart
const teamData = [
  // Board of Directors (Root)
  {
    key: 0,
    name: "Board of Directors",
    title: "Board of Directors",
    dept: "Board",
    desc: "Highest governing body.",
    pic: "",
    email: "",
    social: {},
  },
  // CEO
  {
    key: 1,
    parent: 0,
    name: "CEO",
    title: "CEO",
    dept: "Executive Leadership",
    desc: "Leading our organization with vision and dedication.",
    pic: "",
    email: "",
    social: {},
  },

  // --- CEO Direct Reports ---
  {
    key: 101,
    parent: 1,
    name: "CEO Office Admin",
    title: "CEO Office Administration Directorate",
    dept: "Executive Office",
    desc: "Supporting the CEO's administrative functions.",
    pic: "", email: "", social: {},
  },
  {
    key: 102,
    parent: 1,
    name: "Data & Safety",
    title: "Data and Safety Administration Directorate",
    dept: "Executive Office",
    desc: "Managing data governance and safety protocols.",
    pic: "", email: "", social: {},
  },
  {
    key: 103,
    parent: 1,
    name: "Legal Directorate",
    title: "Legal Directorate",
    dept: "Legal",
    desc: "Managing legal affairs and compliance.",
    pic: "", email: "", social: {},
  },
  {
    key: 1031,
    parent: 103,
    name: "Legal Services",
    title: "Legal Services Unit",
    dept: "Legal",
    desc: "Providing legal counsel and services.",
    pic: "", email: "", social: {},
  },
  {
    key: 1032,
    parent: 103,
    name: "Compliance",
    title: "Compliance Unit",
    dept: "Legal",
    desc: "Ensuring regulatory compliance.",
    pic: "", email: "", social: {},
  },
  {
    key: 104,
    parent: 1,
    name: "Corporate Comm.",
    title: "Corporate Communication Unit",
    dept: "Executive Office",
    desc: "Managing internal and external communications.",
    pic: "", email: "", social: {},
  },
  {
    key: 105,
    parent: 1,
    name: "Strategic Advisor",
    title: "Strategic Management",
    dept: "Executive Office",
    desc: "Providing strategic planning and advice.",
    pic: "", email: "", social: {},
  },
  {
    key: 106,
    parent: 1,
    name: "Audit",
    title: "Audit Unit",
    dept: "Executive Office",
    desc: "Conducting internal audits.",
    pic: "", email: "", social: {},
  },
  {
    key: 107,
    parent: 1,
    name: "Plan & Monitor",
    title: "Planning and Monitoring Unit",
    dept: "Executive Office",
    desc: "Overseeing strategic planning and performance monitoring.",
    pic: "", email: "", social: {},
  },

  // --- Deputy CEO Branch (Operations) ---
  {
    key: 2,
    parent: 1,
    name: "Deputy CEO",
    title: "Deputy CEO",
    dept: "Operations",
    desc: "Overseeing core operational sectors.",
    pic: "",
    email: "",
    social: {},
  },

  // IT Sector
  {
    key: 21,
    parent: 2,
    name: "IT Sector",
    title: "Information Technology Sector",
    dept: "IT",
    desc: "Leading technological innovation.",
    pic: "", email: "", social: {},
  },
  {
    key: 211,
    parent: 21,
    name: "Innovation & Incubation",
    title: "Innovation and Incubation Directorate",
    dept: "IT",
    desc: "Fostering startups and new technologies.",
    pic: "", email: "", social: {},
  },
  {
    key: 2111,
    parent: 211,
    name: "R&D",
    title: "Research & Development Unit",
    dept: "IT",
    desc: "Conducting technical research.",
    pic: "", email: "", social: {},
  },
  {
    key: 2112,
    parent: 211,
    name: "Startups",
    title: "Startup Incubation & Sub-contracting",
    dept: "IT",
    desc: "Supporting startup growth.",
    pic: "", email: "", social: {},
  },
  {
    key: 212,
    parent: 21,
    name: "Digital Infra & Services",
    title: "Digital Infrastructure & IT Services Directorate",
    dept: "IT",
    desc: "Managing core digital infrastructure.",
    pic: "", email: "", social: {},
  },
  {
    key: 2121,
    parent: 212,
    name: "Infra & Network",
    title: "IT Infrastructure & Networking",
    dept: "IT",
    desc: "Ensuring network reliability.",
    pic: "", email: "", social: {},
  },
  {
    key: 2122,
    parent: 212,
    name: "IT Support",
    title: "IT Services & Support",
    dept: "IT",
    desc: "Providing technical support.",
    pic: "", email: "", social: {},
  },
  {
    key: 213,
    parent: 21,
    name: "Cyber Security",
    title: "Cyber Security Unit",
    dept: "IT",
    desc: "Protecting digital assets.",
    pic: "", email: "", social: {},
  },

  // Facility & Infrastructure Sector
  {
    key: 22,
    parent: 2,
    name: "Facility & Infra Sector",
    title: "Facility and Infrastructure Development Sector",
    dept: "Construction",
    desc: "Managing physical assets and development.",
    pic: "", email: "", social: {},
  },
  {
    key: 221,
    parent: 22,
    name: "Construction & Design",
    title: "Construction and Design Directorate",
    dept: "Construction",
    desc: "Overseeing building projects.",
    pic: "", email: "", social: {},
  },
  {
    key: 2211,
    parent: 221,
    name: "Construction",
    title: "Construction Unit",
    dept: "Construction",
    desc: "Managing active construction.",
    pic: "", email: "", social: {},
  },
  {
    key: 2212,
    parent: 221,
    name: "Design",
    title: "Design Unit",
    dept: "Construction",
    desc: "Architectural and structural design.",
    pic: "", email: "", social: {},
  },
  {
    key: 222,
    parent: 22,
    name: "Land Office",
    title: "Land Office Administration",
    dept: "Construction",
    desc: "Managing land resources.",
    pic: "", email: "", social: {},
  },
  {
    key: 223,
    parent: 22,
    name: "Utilities",
    title: "Utilities Administration",
    dept: "Construction",
    desc: "Managing power, water, and waste.",
    pic: "", email: "", social: {},
  },
  {
    key: 224,
    parent: 22,
    name: "Landscaping",
    title: "Landscaping & Greenery",
    dept: "Construction",
    desc: "Maintaining park aesthetics.",
    pic: "", email: "", social: {},
  },

  // --- Corporate Services Sector Branch ---
  {
    key: 3,
    parent: 1,
    name: "Corp. Services Sector",
    title: "Corporate Services Sector",
    dept: "Corporate",
    desc: "Providing support services.",
    pic: "", email: "", social: {},
  },

  // Marketing Directorate
  {
    key: 31,
    parent: 3,
    name: "Marketing Directorate",
    title: "Marketing Directorate",
    dept: "Corporate",
    desc: "Promoting the park.",
    pic: "", email: "", social: {},
  },
  {
    key: 311,
    parent: 31,
    name: "Marketing & Sales",
    title: "Marketing and Sales",
    dept: "Corporate",
    desc: "Driving revenue and occupancy.",
    pic: "", email: "", social: {},
  },
  {
    key: 312,
    parent: 31,
    name: "Invest. Relations",
    title: "Investment Relations & Support",
    dept: "Corporate",
    desc: "Supporting investors.",
    pic: "", email: "", social: {},
  },
  {
    key: 313,
    parent: 31,
    name: "Business Dev.",
    title: "Business Dev. & Partnership",
    dept: "Corporate",
    desc: "Creating strategic partnerships.",
    pic: "", email: "", social: {},
  },

  // Finance Directorate
  {
    key: 32,
    parent: 3,
    name: "Finance Directorate",
    title: "Finance Directorate",
    dept: "Corporate",
    desc: "Managing financial health.",
    pic: "", email: "", social: {},
  },
  {
    key: 321,
    parent: 32,
    name: "Accounting",
    title: "Accounting Unit",
    dept: "Corporate",
    desc: "Bookkeeping and reporting.",
    pic: "", email: "", social: {},
  },
  {
    key: 322,
    parent: 32,
    name: "Budget & Treasury",
    title: "Budget and Treasury Unit",
    dept: "Corporate",
    desc: "Managing funds and budgets.",
    pic: "", email: "", social: {},
  },

  // Procurement Directorate
  {
    key: 33,
    parent: 3,
    name: "Procurement & Prop.",
    title: "Procurement & Property Admin",
    dept: "Corporate",
    desc: "Managing supplies and assets.",
    pic: "", email: "", social: {},
  },
  {
    key: 331,
    parent: 33,
    name: "Procurement",
    title: "Procurement Unit",
    dept: "Corporate",
    desc: "Detailed procurement processes.",
    pic: "", email: "", social: {},
  },
  {
    key: 332,
    parent: 33,
    name: "Property Admin",
    title: "Property Administration",
    dept: "Corporate",
    desc: "Managing physical assets.",
    pic: "", email: "", social: {},
  },
  {
    key: 333,
    parent: 33,
    name: "General Services",
    title: "General Services",
    dept: "Corporate",
    desc: "General operational support.",
    pic: "", email: "", social: {},
  },

  // HR Directorate
  {
    key: 34,
    parent: 3,
    name: "HR Directorate",
    title: "HR Admin Directorate",
    dept: "Corporate",
    desc: "Managing human capital.",
    pic: "", email: "", social: {},
  },
  {
    key: 341,
    parent: 34,
    name: "HR Admin",
    title: "HR Admin Unit",
    dept: "Corporate",
    desc: "Personnel management.",
    pic: "", email: "", social: {},
  },
  {
    key: 342,
    parent: 34,
    name: "Training & Dev",
    title: "Training & HR Development",
    dept: "Corporate",
    desc: "Empowering staff.",
    pic: "", email: "", social: {},
  },
];

// Updated Executive Team Data
const executiveTeam = [
  {
    id: 1,
    name: "Belete esubalew",
    title: "Chief Executive Officer (CEO)",
    dept: "Executive Leadership",
    desc: "Driving the strategic vision and growth of Ethiopian IT Park.",
    pic: "/images/bele.png",
    email: "ceo@itpark.et",
    social: {
      linkedin: "https://linkedin.com/in/beleteesubalew",
      twitter: "https://twitter.com/beleteesubalew",
    },
  },
  {
    id: 2,
    name: "Olana Abebe",
    title: "Deputy CEO",
    dept: "Executive Leadership",
    desc: "Overseeing operational excellence and strategic execution.",
    pic: "/images/olana.png",
    email: "deputy.ceo@itpark.et",
    social: {
      linkedin: "https://linkedin.com/in/olanaabebe",
      twitter: "https://twitter.com/olanaabebe",
    },
  },
];

// Reusable Social Link Component
const SocialLink = ({ href, icon: Icon, label, colorClass }: any) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`flex items-center justify-center w-10 h-10 rounded-full text-white transition-transform transform hover:scale-110 shadow-md ${colorClass}`}
    aria-label={label}
  >
    <Icon size={18} />
  </a>
);

const LeadershipTeam: React.FC = () => {
  const [selectedMember, setSelectedMember] = useState<any>(null);

  // Stagger variants for text
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-main)] font-inter pb-20 overflow-x-hidden">

      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center bg-[var(--bg-main)] mb-20 overflow-hidden">
        <div className="absolute inset-0 rounded-b-[4rem] overflow-hidden shadow-2xl z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#16284F] via-[#1a365d] to-[#0C7C92] opacity-95"></div>
        </div>

        <motion.div
          className="container mx-auto px-4 relative z-10 text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="inline-block mb-4 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-blue-100 text-sm font-semibold tracking-wide uppercase">
            Driving Innovation
          </motion.div>
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight leading-tight"
          >
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-cyan-200">Leadership</span>
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-blue-100 font-light max-w-3xl mx-auto leading-relaxed"
          >
            Meet the visionaries dedicated to establishing Ethiopia as Africa's premier technology hub.
          </motion.p>
        </motion.div>

        {/* Scroll Down Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 10 }}
          transition={{ delay: 1, duration: 1, repeat: Infinity, repeatType: "reverse" }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 text-white/50"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-white/50 rounded-full"></div>
          </div>
        </motion.div>
      </section>

      {/* Executive Leadership Cards */}
      <section className="container mx-auto px-4 mb-32 -mt-40 relative z-20">
        <div className="flex flex-wrap justify-center gap-10" style={{ perspective: '1200px' }}>
          {executiveTeam.map((leader, index) => (
            <motion.div
              key={leader.id}
              initial={{
                opacity: 0,
                x: index % 2 === 0 ? -120 : 120,
                y: 60,
                rotateY: index % 2 === 0 ? -15 : 15,
                scale: 0.9
              }}
              whileInView={{
                opacity: 1,
                x: 0,
                y: 0,
                rotateY: 0,
                scale: 1
              }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 1,
                ease: [0.22, 1, 0.36, 1], // Custom Ease Out Quint
                delay: index * 0.1
              }}
              className="bg-[var(--bg-card)] rounded-[2.5rem] shadow-2xl overflow-hidden w-full max-w-2xl border border-gray-100/50 group hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] transition-all duration-500"
            >
              <div className="flex flex-col md:flex-row h-full relative">
                <div className="absolute top-0 right-0 p-6 z-30 opacity-10 group-hover:opacity-100 transition-opacity duration-500">
                  <img src="/logo-icon-only.png" alt="" className="w-12 h-12 grayscale group-hover:grayscale-0" onError={(e) => e.currentTarget.style.display = 'none'} />
                </div>

                <div className="w-full md:w-5/12 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#16284F]/90 via-transparent to-transparent z-10 opacity-70"></div>
                  <img
                    src={leader.pic}
                    alt={leader.name}
                    className="w-full h-full object-cover min-h-[450px] transition-transform duration-1000 group-hover:scale-105 filter group-hover:brightness-105"
                    onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/400x500')}
                  />
                  <div className="absolute bottom-6 left-6 z-20">
                    <span className="inline-block px-3 py-1 bg-[#0C7C92]/90 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-wider rounded-md shadow-sm mb-2">
                      {leader.dept}
                    </span>
                  </div>
                </div>

                <div className="w-full md:w-7/12 p-10 flex flex-col justify-center bg-gradient-to-br from-[var(--bg-card)] to-[var(--bg-main)]">
                  <div className="mb-auto"></div> {/* Spacer */}

                  <div>
                    <h3 className="text-3xl font-bold text-[var(--accent)] mb-2">{leader.name}</h3>
                    <p className="text-[var(--primary)] font-semibold text-lg mb-6 flex items-center gap-2">
                      {leader.title}
                      <span className="h-px flex-1 bg-gray-200"></span>
                    </p>
                    <p className="text-[var(--text-muted)] mb-8 text-base leading-relaxed">{leader.desc}</p>
                  </div>

                  <div className="flex gap-4 pt-6 border-t border-gray-100">
                    {leader.social.linkedin && (
                      <SocialLink href={leader.social.linkedin} icon={FaLinkedin} label="LinkedIn" colorClass="bg-[#0077b5] hover:shadow-[#0077b5]/30" />
                    )}
                    {leader.social.twitter && (
                      <SocialLink href={leader.social.twitter} icon={FaTwitter} label="Twitter" colorClass="bg-[#1da1f2] hover:shadow-[#1da1f2]/30" />
                    )}
                    <a href={`mailto:${leader.email}`} className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-700 text-white transition-all transform hover:scale-110 shadow-md hover:shadow-gray-700/30">
                      <FaEnvelope size={16} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Organizational Chart Section */}
      <section className="container mx-auto px-4 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-[var(--primary)] font-semibold tracking-wider text-sm uppercase block mb-3">Our Structure</span>
          <h2 className="text-4xl font-bold text-[var(--accent)] mb-6">Organizational Chart</h2>
          <div className="h-1.5 w-24 bg-gradient-to-r from-[var(--accent)] to-[var(--primary)] mx-auto rounded-full"></div>
          <p className="text-[var(--text-muted)] mt-6 max-w-2xl mx-auto text-lg">
            A hierarchical view of our operational management, showing how our departments collaborate to achieve our vision.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-[var(--bg-card)] rounded-[2.5rem] shadow-2xl overflow-hidden border border-[var(--border-color)] p-2 md:p-8 relative"
          style={{ height: '75vh' }}
        >
          {/* Decorative background element for the chart container */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-bl-[100%] -z-10"></div>

          <Suspense fallback={
            <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-t-2 border-[#0C7C92]"></div>
              <p className="text-sm font-medium animate-pulse">Loading Structure...</p>
            </div>
          }>
            <GoJSWrapper teamData={teamData} setSelectedMember={setSelectedMember} />
          </Suspense>
        </motion.div>
      </section>

      {/* Modal for Chart Details */}
      {selectedMember && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setSelectedMember(null)}>
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-[var(--bg-card)] rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden relative"
            onClick={e => e.stopPropagation()}
          >
            <div className="h-28 bg-gradient-to-br from-[#16284F] to-[#0C7C92] relative overflow-hidden">
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
            </div>
            <div className="px-8 pb-8 text-center -mt-14 relative z-10">
              <div className="w-28 h-28 bg-white rounded-full mx-auto p-1.5 shadow-xl mb-6 flex items-center justify-center relative">
                <div className="w-full h-full bg-slate-50 rounded-full flex items-center justify-center text-4xl overflow-hidden">
                  {/* Placeholder for no pic */}
                  <span className="text-slate-300">👤</span>
                </div>
                {/* Status Dot */}
                <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 border-4 border-white rounded-full"></div>
              </div>

              <h3 className="text-2xl font-bold text-[var(--accent)] mb-1 leading-tight">{selectedMember.title}</h3>
              <p className="text-[var(--primary)] font-semibold text-sm mb-5 uppercase tracking-wide">{selectedMember.dept}</p>

              <div className="bg-[var(--neutral)] rounded-xl p-4 mb-6 border border-[var(--border-color)]">
                <p className="text-[var(--text-muted)] text-sm leading-relaxed">{selectedMember.desc || "A key leadership role driving departmental success and strategic initiatives."}</p>
              </div>

              <button
                onClick={() => setSelectedMember(null)}
                className="w-full bg-[#16284F] text-white px-6 py-3 rounded-xl text-sm font-bold shadow-lg hover:shadow-xl hover:bg-[#1f3a6e] transition-all transform hover:-translate-y-0.5"
              >
                Close Details
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default LeadershipTeam;
