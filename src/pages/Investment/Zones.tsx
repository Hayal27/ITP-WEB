import React, { useState } from "react";
import {
  IconFlask,
  IconCpu,
  IconBook,
  IconDeviceDesktopAnalytics,
  IconSearch,
  IconDownload,
  IconBuildingSkyscraper,
  IconPhone,
  IconHome,
  IconChevronDown,
  IconX,
  IconArrowRight,
  IconMapPin
} from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";

// --- Types and Constants ---
type ZoneName =
  | "ICT Business Zone"
  | "Commercial Zone"
  | "Manufacturing Zone"
  | "Knowledge Zone"
  | "Residential Zone"
  | "Skill & Training Zone";

interface ZoneDetails {
  purpose: string;
  features: string[];
  tenants: string;
}

interface ZoneData {
  name: ZoneName;
  color: string;
  images: string[];
  summary: string;
  details: ZoneDetails;
  position: {
    left: string;
    top: string;
  };
}

// --- Zone Data with your images ---
const ZONES: ZoneData[] = [
  {
    name: "ICT Business Zone",
    color: "bg-blue-600",
    images: [
      "https://res.cloudinary.com/yesuf/image/upload/v1747136300/bpo1_kxricq.jpg",
      "https://res.cloudinary.com/yesuf/image/upload/v1747135443/bpo2_kmphwy.png",
      "https://res.cloudinary.com/yesuf/image/upload/v1747135437/bpo_ckg1ys.png"
    ],
    summary: "Modern office spaces, robust IT infrastructure, and global connectivity for ICT and business operations.",
    details: {
      purpose: "To host ICT companies, business process outsourcing, and digital service providers.",
      features: [
        "High-speed fiber internet",
        "Secure data centers",
        "Business support services",
        "Conference and meeting facilities",
        "24/7 power backup"
      ],
      tenants: "ICT firms, BPOs, digital agencies, consulting companies."
    },
    position: { left: "41%", top: "35%" }
  },
  {
    name: "Commercial Zone",
    color: "bg-emerald-600",
    images: [
      "https://res.cloudinary.com/yesuf/image/upload/v1747135441/mk_wd3mtf.png",
      "https://res.cloudinary.com/yesuf/image/upload/v1747135437/bpo_ckg1ys.png"
    ],
    summary: "Retail, banking, and business centers supporting commercial activities and services.",
    details: {
      purpose: "To provide a vibrant environment for retail, banking, and commercial enterprises.",
      features: [
        "Retail outlets and showrooms",
        "Banking and financial services",
        "Business lounges",
        "Food courts and cafes"
      ],
      tenants: "Retailers, banks, service providers, commercial offices."
    },
    position: { left: "20%", top: "20%" }
  },
  {
    name: "Manufacturing Zone",
    color: "bg-amber-600",
    images: [
      "https://res.cloudinary.com/yesuf/image/upload/v1747135433/Incubation_euahej.png",
      "https://res.cloudinary.com/yesuf/image/upload/v1747135430/swdevelop_tc9anx.png"
    ],
    summary: "State-of-the-art facilities for electronics, hardware, and light manufacturing industries.",
    details: {
      purpose: "To support electronics assembly, hardware production, and light manufacturing.",
      features: [
        "Modern manufacturing units",
        "Logistics and warehousing",
        "Quality control labs",
        "Prototyping and testing facilities"
      ],
      tenants: "Electronics manufacturers, hardware startups, assembly plants."
    },
    position: { left: "22%", top: "55%" }
  },
  {
    name: "Knowledge Zone",
    color: "bg-purple-600",
    images: [
      "https://res.cloudinary.com/yesuf/image/upload/v1747135429/raxio_vgz5ev.png",
      "https://res.cloudinary.com/yesuf/image/upload/v1747135430/swdevelop_tc9anx.png"
    ],
    summary: "Academic, research, and innovation hubs for knowledge creation and collaboration.",
    details: {
      purpose: "To foster research, innovation, and academic-industry partnerships.",
      features: [
        "Research labs and libraries",
        "Innovation hubs",
        "Collaboration spaces",
        "Seminar and workshop venues"
      ],
      tenants: "Universities, R&D centers, think tanks, innovation hubs."
    },
    position: { left: "35%", top: "35%" }
  },
  {
    name: "Residential Zone",
    color: "bg-rose-600",
    images: [
      "https://res.cloudinary.com/yesuf/image/upload/v1747136300/bpo1_kxricq.jpg",
      "https://res.cloudinary.com/yesuf/image/upload/v1747135446/reaseach_ew642q.png"
    ],
    summary: "Residential zone area is reserved for future development.",
    details: {
      purpose: "Housing and accommodation facilities for professionals working in the IT Park.",
      features: [
        "Green spaces and parks",
        "24/7 security"
      ],
      tenants: "IT park staff, professionals, families."
    },
    position: { left: "30%", top: "81%" }
  },
  {
    name: "Skill & Training Zone",
    color: "bg-indigo-600",
    images: [
      "https://res.cloudinary.com/yesuf/image/upload/v1747135430/swdevelop_tc9anx.png",
      "https://res.cloudinary.com/yesuf/image/upload/v1747135446/reaseach_ew642q.png"
    ],
    summary: "Training centers, academies, and labs for upskilling and workforce development.",
    details: {
      purpose: "To host training institutions and skill development programs for the digital economy.",
      features: [
        "Training centers and classrooms",
        "Hands-on labs",
        "E-learning platforms",
        "Internship and placement support"
      ],
      tenants: "Training academies, bootcamps, workforce development agencies."
    },
    position: { left: "35%", top: "50%" }
  }
];

const GALLERY_IMAGES = [
  "https://res.cloudinary.com/yesuf/image/upload/v1747136300/bpo1_kxricq.jpg",
  "https://res.cloudinary.com/yesuf/image/upload/v1747135446/reaseach_ew642q.png",
  "https://res.cloudinary.com/yesuf/image/upload/v1747135443/bpo2_kmphwy.png",
  "https://res.cloudinary.com/yesuf/image/upload/v1747135441/mk_wd3mtf.png",
  "https://res.cloudinary.com/yesuf/image/upload/v1747135437/bpo_ckg1ys.png",
  "https://res.cloudinary.com/yesuf/image/upload/v1747135433/Incubation_euahej.png",
  "https://res.cloudinary.com/yesuf/image/upload/v1747135430/swdevelop_tc9anx.png",
  "https://res.cloudinary.com/yesuf/image/upload/v1747135429/raxio_vgz5ev.png"
];

const Zones: React.FC = () => {
  const [activeZone, setActiveZone] = useState<number | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredZones = ZONES.filter(zone =>
    zone.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    zone.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[500px] bg-gradient-to-r from-primary-default to-primary-light text-white">
        <div className="absolute inset-0 bg-primary-default/40" />
        <div className="container mx-auto px-4 h-full flex flex-col justify-center relative z-10">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Ready to Join Ethiopian IT Park?
          </motion.h1>
          <motion.p 
            className="text-xl mb-8 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            
            Find the right zone for your business and become part of Ethiopia's digital future at the IT Park.
          </motion.p>
          <motion.div 
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <button className="flex items-center gap-2 bg-white text-primary-default px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition">
              <IconSearch size={20} />
              Browse Zones
            </button>
            <button className="flex items-center gap-2 border-2 border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-dark/10 transition">
              <IconDownload size={20} />
              Learn More About IT Park
            </button>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter */}
      <div className="container mx-auto px-4 -mt-12 relative z-20">
        <motion.div 
          className="bg-white rounded-xl shadow-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <IconSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search zones..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <select className="border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-dark focus:border-transparent">
              <option>All Categories</option>
              <option>ICT & Business</option>
              <option>Manufacturing</option>
              <option>Research & Development</option>
            </select>
            <button className="bg-primary-dark text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-dark transition">
              Search
            </button>
          </div>
        </motion.div>
      </div>

      {/* Zones Grid */}
      <section className="container mx-auto px-4 py-18">
        <motion.h2 
          className="text-4xl font-bold mb-12 text-center text-primary-default"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Our Strategic Zones
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredZones.map((zone, index) => (
            <motion.div
              key={index}
              className="group relative bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 h-[500px] flex flex-col"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Image Container with Hover Effect */}
              <div className="relative h-2/3 overflow-hidden">
                <img
                  src={zone.images[0]}
                  alt={zone.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary-default/80 via-primary-default/30 to-transparent" />
                {/* Zone Icon */}
                <div className={`absolute top-4 right-4 w-14 h-14 ${zone.color} rounded-full flex items-center justify-center shadow-lg`}>
                  {zone.name === "ICT Business Zone" && <IconDeviceDesktopAnalytics size={28} className="text-white" />}
                  {zone.name === "Commercial Zone" && <IconBuildingSkyscraper size={28} className="text-white" />}
                  {zone.name === "Manufacturing Zone" && <IconCpu size={28} className="text-white" />}
                  {zone.name === "Knowledge Zone" && <IconBook size={28} className="text-white" />}
                  {zone.name === "Residential Zone" && <IconHome size={28} className="text-white" />}
                  {zone.name === "Skill & Training Zone" && <IconFlask size={28} className="text-white" />}
                </div>
                {/* Zone Title */}
                <h3 className="absolute bottom-4 left-4 right-4 text-2xl font-bold text-white">
                  {zone.name}
                </h3>
              </div>
              
              {/* Content Area */}
              <div className="p-6 flex-1 flex flex-col">
                <p className="text-gray-600 mb-4 flex-1">{zone.summary}</p>
                
                {/* Feature Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {zone.details.features.slice(0, 3).map((feature, i) => (
                    <span 
                      key={i} 
                      className="text-xs bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full font-medium hover:bg-gray-200 transition-colors"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
                
                {/* Action Buttons */}
                <div className="mt-auto pt-4 border-t border-gray-100">
                  <button
                    onClick={() => setActiveZone(activeZone === index ? null : index)}
                    className="w-full flex items-center justify-between text-white font-medium hover:text-primary-darker transition-colors"
                  >
                    <span>{activeZone === index ? 'Show less details' : 'View more details'}</span>
                    <IconChevronDown 
                      className={`ml-2 transition-transform duration-300 ${activeZone === index ? 'rotate-180' : ''}`} 
                      size={20} 
                    />
                  </button>
                  
                  <AnimatePresence>
                    {activeZone === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 space-y-4">
                          <div>
                            <h4 className="font-semibold text-gray-800 mb-1">Purpose</h4>
                            <p className="text-sm text-gray-600">{zone.details.purpose}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800 mb-2">Key Features</h4>
                            <ul className="space-y-2">
                              {zone.details.features.map((feature, i) => (
                                <li key={i} className="flex items-start">
                                  <span className="text-primary-dark mr-2 mt-1">•</span>
                                  <span className="text-sm text-gray-600">{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <button className="w-full mt-4 bg-primary-dark text-white py-2.5 rounded-lg hover:bg-primary-darker transition-colors flex items-center justify-center gap-2">
                            Explore {zone.name.split(' ')[0]} Zone
                            <IconArrowRight size={18} />
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Explore Our Park Map
          </motion.h2>
          <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="relative aspect-video max-w-6xl mx-auto">
              <div className="absolute inset-0 bg-gray-900/5">
                <img
                  src="https://res.cloudinary.com/yesuf/image/upload/v1747288575/map_ofyphk.jpg"
                  alt="IT Park Map"
                  className="w-full h-full object-contain"
                />
              </div>
              {ZONES.map((zone, index) => (
                <button
                  key={index}
                  className={`absolute w-10 h-10 ${zone.color} rounded-full flex items-center justify-center text-white font-bold shadow-lg hover:scale-110 transition-all duration-300 border-2 border-white`}
                  style={{ 
                    left: zone.position.left, 
                    top: zone.position.top,
                    transform: 'translate(-50%, -50%)'
                  }}
                  onClick={() => setActiveZone(activeZone === index ? null : index)}
                  aria-label={`View ${zone.name} details`}
                >
                  {zone.name[0]}
                </button>
              ))}
            </div>
            <div className="p-6 bg-white border-t border-gray-100">
              <div className="flex flex-wrap justify-center gap-4">
                {ZONES.map((zone, index) => (
                  <button
                    key={index}
                    className={`px-2 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-colors ${
                      activeZone === index 
                        ? `${zone.color} text-white` 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    onClick={() => setActiveZone(activeZone === index ? null : index)}
                  >
                    <span className={`w-3 h-3 rounded-full ${zone.color}`}></span>
                    {zone.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="container mx-auto px-4 py-16">
        <motion.h2 
          className="text-3xl font-bold mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Gallery
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {GALLERY_IMAGES.map((image, index) => (
            <motion.div
              key={index}
              className="relative group cursor-pointer"
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedImage(image)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <img
                src={image}
                alt={`Gallery ${index + 1}`}
                className="w-full h-64 object-cover rounded-lg"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity flex items-center justify-center">
                <IconSearch size={32} className="text-white" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-light text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.h2 
            className="text-3xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Ready to Join Our Community?
          </motion.h2>
          <motion.p 
            className="text-xl mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Discover the perfect space for your business and be part of Ethiopia's growing tech ecosystem.
          </motion.p>
          <motion.div 
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <button className="bg-white text-primary-dark px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition flex items-center gap-2">
              <IconPhone size={20} />
              Contact Us
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white/10 transition flex items-center gap-2">
              <IconDownload size={20} />
              Learn More About IT Park
            </button>
          </motion.div>
        </div>
      </section>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-4 right-4 text-white text-3xl"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
            >
              <IconX />
            </button>
            <motion.img
              src={selectedImage}
              alt="Enlarged view"
              className="max-w-full max-h-[90vh] object-contain"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Zones;