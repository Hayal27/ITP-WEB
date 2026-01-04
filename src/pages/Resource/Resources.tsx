import React, { useState } from 'react';

const categories = [
  { id: 'all', name: 'All Resources' },
  { id: 'facilities', name: 'Facilities' },
  { id: 'programs', name: 'Programs' },
  { id: 'research', name: 'Research' },
  { id: 'events', name: 'Events' }
];

const getPlaceholderImage = (category: string) => {
  return `https://source.unsplash.com/400x200/?${category.toLowerCase().replace(/\s+/g, '-')}`;
};

const resources = [
  {
    id: 1,
    title: "Innovation Hub",
    description: "State-of-the-art facilities equipped with the latest technology for innovation and development at Ethiopian IT Park.",
    image: getPlaceholderImage("technology-hub"),
    link: "#",
    tags: ["Innovation", "Technology", "Facilities"],
    category: "facilities"
  },
  {
    id: 2,
    title: "Startup Incubation Center",
    description: "Complete startup support system with mentorship, funding opportunities, and networking resources.",
    image: getPlaceholderImage("startup-business"),
    link: "#",
    tags: ["Startups", "Funding", "Mentorship"],
    category: "programs"
  },
  {
    id: 3,
    title: "Research Labs",
    description: "Advanced research facilities for technological innovation and development projects.",
    image: getPlaceholderImage("research-lab"),
    link: "#",
    tags: ["Research", "Innovation", "Technology"],
    category: "research"
  },
  {
    id: 4,
    title: "Tech Events Space",
    description: "Modern venues for hosting technology conferences, meetups, and networking events.",
    image: getPlaceholderImage("tech-conference"),
    link: "#",
    tags: ["Events", "Networking", "Community"],
    category: "events"
  }
];

const Resources: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const filteredResources = activeCategory === 'all'
    ? resources
    : resources.filter(resource => resource.category === activeCategory);

  return (
    <section className="w-full min-h-screen bg-neutral pt-36 pb-8 flex flex-col items-center relative z-[1]">
      <div className="w-full max-w-[1200px] px-6 xl:max-w-[1400px] xl:px-12 2xl:max-w-[1800px] 2xl:px-20 3xl:max-w-[2200px] 3xl:px-[7vw] 4xl:max-w-[3000px] 4xl:px-[10vw] 5xl:max-w-[4200px] 5xl:px-[14vw] mx-auto relative z-[2]">
        <header className="text-center mb-12 relative z-10 w-full">
          <h1 className="text-[2.7rem] md:text-[3.2rem] font-extrabold text-accent mb-4 leading-tight block tracking-tight drop-shadow-sm">Resources & Facilities</h1>
          <p className="text-[1.15rem] md:text-lg text-gray-600 max-w-[700px] mx-auto leading-relaxed relative z-10 font-medium">
            Discover world-class resources and facilities at Ethiopian IT Park, designed to support your innovation and technological growth. Explore our infrastructure, amenities, and support services that empower startups, enterprises, and innovators to thrive in a secure, sustainable, and collaborative environment.
          </p>
        </header>
        {/* --- Realistic Sectioned Content --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 xl:gap-12 mb-16">
          {/* 1. Physical Infrastructure */}
          <div className="bg-white rounded-2xl shadow-card p-8 flex flex-col gap-4 border-t-4 border-primary-default/80">
            <h2 className="text-xl font-bold text-primary-default flex items-center gap-2 mb-2">🏢 Physical Infrastructure</h2>
            <ul className="list-disc list-inside text-gray-700 text-base space-y-1">
              <li><b>Office Spaces:</b> Flexible, scalable, 24/7 access, smart locks</li>
              <li><b>Meeting & Conference Rooms:</b> Smart boards, video conferencing, online booking</li>
              <li><b>Auditoriums & Training Halls:</b> For seminars, hackathons, pitch sessions</li>
            </ul>
          </div>
          {/* 2. Connectivity & ICT Resources */}
          <div className="bg-white rounded-2xl shadow-card p-8 flex flex-col gap-4 border-t-4 border-primary-default/80">
            <h2 className="text-xl font-bold text-primary-default flex items-center gap-2 mb-2">🌐 Connectivity & ICT</h2>
            <ul className="list-disc list-inside text-gray-700 text-base space-y-1">
              <li><b>High-Speed Internet:</b> Fiber optic, public Wi-Fi zones</li>
              <li><b>Data Center Access:</b> Local cloud, secure server rooms</li>
              <li><b>IT Support Services:</b> On-site tech support, shared IT desk</li>
            </ul>
          </div>
          {/* 3. Power & Utilities */}
          <div className="bg-white rounded-2xl shadow-card p-8 flex flex-col gap-4 border-t-4 border-primary-default/80">
            <h2 className="text-xl font-bold text-primary-default flex items-center gap-2 mb-2">⚡ Power & Utilities</h2>
            <ul className="list-disc list-inside text-gray-700 text-base space-y-1">
              <li><b>Uninterrupted Power:</b> Grid + backup generators, solar zones</li>
              <li><b>Water & Cooling:</b> Efficient HVAC, green building certified</li>
            </ul>
          </div>
        </div>
        {/* --- End Sectioned Content --- */}
        <div className="flex justify-center flex-wrap gap-4 mb-12 relative z-3">
          {categories.map(category => (
            <button
              key={category.id}
              className={`px-6 py-3 rounded-full font-medium text-base shadow-md transition-all duration-300 relative z-3 focus:outline-none border border-transparent ${activeCategory === category.id ? 'bg-primary-default text-white' : 'bg-white text-accent hover:bg-secondary hover:text-white'}`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10 2xl:gap-12 3xl:gap-16 4xl:gap-20 5xl:gap-28 w-full">
          {filteredResources.map(resource => (
            <article key={resource.id} className="bg-white rounded-xl overflow-hidden shadow-xl transition-transform duration-300 h-full flex flex-col relative z-2 hover:-translate-y-1.5">
              <div className="h-[200px] bg-center bg-cover relative" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.1),rgba(0,0,0,0.1)),url(${resource.image})` }} />
              <div className="p-6 flex-1 flex flex-col relative z-2">
                <h3 className="text-lg font-semibold text-primary-default mb-3">{resource.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4 flex-1">{resource.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {resource.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-neutral text-accent rounded-full text-xs font-medium">{tag}</span>
                  ))}
                </div>
                <a href={resource.link} className="inline-block px-6 py-3 bg-primary-default text-white rounded-md font-medium text-center transition-all duration-300 hover:bg-secondary hover:text-white">Learn More</a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Resources;