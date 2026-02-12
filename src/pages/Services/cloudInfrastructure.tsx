import React, { useState } from 'react';

const features = [
  {
    title: 'Infrastructure as a Service (IaaS)',
    icon: 'fa-server',
    content: (
      <ul className="list-disc ml-6 space-y-1">
        <li><b>Cloud Servers:</b> Virtual machines hosted at Ethiopian IT Park data center</li>
        <li><b>Localized Hosting:</b> Servers located in Ethiopia ensuring data sovereignty and compliance with national regulations</li>
        <li><b>Scalable Resources:</b> Flexible compute, storage, and memory allocation based on your needs</li>
        <li><b>Operating Systems:</b> Support for Windows Server and various Linux distributions</li>
        <li><b>High Availability:</b> Reliable uptime with backup power and redundant network infrastructure</li>
        <li><b>Pay-as-you-grow:</b> Affordable pricing model suitable for startups and growing businesses</li>
      </ul>
    ),
  },
  {
    title: 'Software as a Service (SaaS)',
    icon: 'fa-file-alt',
    content: (
      <ul className="list-disc ml-6 space-y-1">
        <li><b>File Management System (FMS):</b> Cloud-based document and file management solution</li>
        <li><b>Digital Transformation:</b> Shift from physical hardcopy documents to secure digital files</li>
        <li><b>Centralized Storage:</b> Store, organize, and manage all your business files in one place</li>
        <li><b>Access Control:</b> Role-based permissions for secure file sharing within your organization</li>
        <li><b>Cloud Accessibility:</b> Access your files from anywhere with internet connection</li>
        <li><b>Backup & Security:</b> Automated backups and secure storage of important documents</li>
      </ul>
    ),
  },
  {
    title: 'Security as a Service',
    icon: 'fa-shield-alt',
    content: (
      <ul className="list-disc ml-6 space-y-1">
        <li><b>Data Protection:</b> Enterprise-grade security measures for your cloud infrastructure</li>
        <li><b>Encryption:</b> Data encryption at rest and in transit to protect sensitive information</li>
        <li><b>Access Controls:</b> Multi-factor authentication and role-based access management</li>
        <li><b>Security Audits:</b> Regular security assessments and compliance monitoring</li>
        <li><b>Threat Protection:</b> Firewall protection and monitoring against security threats</li>
        <li><b>Compliance:</b> Adherence to Ethiopian data protection laws and industry standards</li>
      </ul>
    ),
  },
  {
    title: 'Database as a Service (DBaaS)',
    icon: 'fa-database',
    content: (
      <ul className="list-disc ml-6 space-y-1">
        <li><b>Managed Databases:</b> Fully managed database services for your applications</li>
        <li><b>Multiple Database Types:</b> Support for various database systems based on your requirements</li>
        <li><b>Automated Backups:</b> Regular automated backups to prevent data loss</li>
        <li><b>High Performance:</b> Optimized database performance for Ethiopian businesses</li>
        <li><b>Scalability:</b> Scale your database resources as your data grows</li>
        <li><b>Local Hosting:</b> Databases hosted within Ethiopia for low latency access</li>
      </ul>
    ),
  },
  {
    title: 'Broadband Internet Connectivity',
    icon: 'fa-wifi',
    content: (
      <ul className="list-disc ml-6 space-y-1">
        <li><b>High-Speed Internet:</b> Reliable broadband connectivity for businesses at Ethiopian IT Park</li>
        <li><b>Dedicated Bandwidth:</b> Guaranteed bandwidth allocation for your operations</li>
        <li><b>Low Latency:</b> Fast internet connection optimized for Ethiopian network infrastructure</li>
        <li><b>24/7 Availability:</b> Continuous internet connectivity with minimal downtime</li>
        <li><b>Technical Support:</b> Assistance with connectivity issues and network configuration</li>
      </ul>
    ),
  },
  {
    title: 'Demand-Based IT Projects',
    icon: 'fa-project-diagram',
    content: (
      <ul className="list-disc ml-6 space-y-1">
        <li><b>Custom Solutions:</b> Tailored IT infrastructure solutions for your specific business needs</li>
        <li><b>Consultation Services:</b> Expert guidance on cloud migration and digital transformation</li>
        <li><b>Implementation Support:</b> Professional assistance with deployment and configuration</li>
        <li><b>Integration Services:</b> Seamless integration with existing systems and applications</li>
        <li><b>Project Management:</b> End-to-end project management for IT infrastructure initiatives</li>
      </ul>
    ),
  },
  {
    title: 'Migration & Technical Support',
    icon: 'fa-headset',
    content: (
      <ul className="list-disc ml-6 space-y-1">
        <li><b>Migration Assistance:</b> Free support for moving existing applications to Zergaw Cloud</li>
        <li><b>Technical Team:</b> Experienced IT professionals available during business hours</li>
        <li><b>Troubleshooting:</b> Help with configuration, deployment, and performance optimization</li>
        <li><b>Training:</b> Guidance on using cloud services effectively</li>
        <li><b>24/7 Support:</b> Customer support available via phone and email</li>
        <li><b>Documentation:</b> Comprehensive guides for common tasks and procedures</li>
      </ul>
    ),
  },
  {
    title: 'Quality & Affordability',
    icon: 'fa-check-circle',
    content: (
      <ul className="list-disc ml-6 space-y-1">
        <li><b>Enterprise Quality:</b> Professional-grade cloud infrastructure serving banks, microfinance, government, and businesses</li>
        <li><b>Affordable Pricing:</b> Competitive rates designed for Ethiopian organizations</li>
        <li><b>Proven Track Record:</b> Serving over 500 businesses across diverse sectors since 2019</li>
        <li><b>Local Expertise:</b> Deep understanding of Ethiopian market needs and requirements</li>
        <li><b>Scalability:</b> Grow your infrastructure alongside your business</li>
        <li><b>Reliability:</b> High uptime and consistent performance</li>
      </ul>
    ),
  },
  {
    title: 'Ideal For',
    icon: 'fa-users',
    content: (
      <ul className="list-disc ml-6 space-y-1">
        <li><b>Financial Institutions:</b> Banks, microfinance institutions requiring secure cloud infrastructure</li>
        <li><b>Government Agencies:</b> Public institutions needing reliable and compliant hosting</li>
        <li><b>IT Park Incubatees:</b> Startups and tech companies in the Ethiopian IT Park incubation program</li>
        <li><b>Private Businesses:</b> Companies seeking affordable and local cloud solutions</li>
        <li><b>Hospitality & Entertainment:</b> Hotels, restaurants, and entertainment businesses</li>
        <li><b>Educational Institutions:</b> Schools and universities requiring file management and hosting</li>
        <li><b>NGOs & Development Organizations:</b> Organizations needing secure and accessible cloud services</li>
      </ul>
    ),
  },
];

const CloudInfrastructure: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="bg-[var(--bg-main)] min-h-screen w-full pt-36 md:pt-20">
      {/* Hero Section */}
      <section className="relative text-white py-16 px-4 md:px-12 lg:px-24 3xl:px-48 4xl:px-64 5xl:px-96 3xl:py-24 4xl:py-32 5xl:py-40 flex flex-col items-center text-center" style={{ background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)' }}>
        <div className="max-w-3xl 3xl:max-w-5xl 4xl:max-w-6xl 5xl:max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl 3xl:text-6xl 4xl:text-7xl 5xl:text-8xl font-extrabold mb-4 tracking-tight drop-shadow-lg">Cloud Infrastructure & Web Hosting</h1>
          <p className="text-lg md:text-2xl 3xl:text-3xl 4xl:text-4xl 5xl:text-5xl font-medium mb-6 opacity-90">Enterprise-grade, secure, and scalable cloud hosting solutions for Ethiopia's innovators and entrepreneurs</p>
          <p className="text-base md:text-lg 3xl:text-xl 4xl:text-2xl 5xl:text-3xl opacity-80 max-w-2xl mx-auto">
            Powered by Ethiopian IT Park's state-of-the-art data center infrastructure
          </p>
        </div>
        <div className="absolute right-8 bottom-8 3xl:right-24 4xl:right-40 5xl:right-64 3xl:bottom-24 4xl:bottom-40 5xl:bottom-64 opacity-20 hidden md:block">
          <i className="fas fa-cloud fa-7x 3xl:fa-9x 4xl:fa-10x 5xl:fa-12x"></i>
        </div>
      </section>

      {/* Key Benefits Section */}
      <section className="max-w-6xl 3xl:max-w-7xl 4xl:max-w-8xl 5xl:max-w-screen-2xl mx-auto py-16 3xl:py-24 4xl:py-32 5xl:py-40 px-4 md:px-8 3xl:px-20 4xl:px-32 5xl:px-48">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl 3xl:text-5xl 4xl:text-6xl 5xl:text-7xl font-bold mb-4" style={{ color: 'var(--secondary)' }}>Why Choose Ethiopian IT Park Cloud?</h2>
          <p className="text-lg md:text-xl 3xl:text-2xl 4xl:text-3xl 5xl:text-4xl text-[var(--text-muted)] max-w-3xl mx-auto">
            Built for Ethiopian businesses with global standards
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 3xl:gap-12 4xl:gap-16 5xl:gap-20">
          <div className="bg-[var(--bg-card)] rounded-xl shadow-lg p-8 3xl:p-12 4xl:p-16 5xl:p-20 border-t-4 hover:shadow-xl transition-shadow" style={{ borderTopColor: 'var(--primary)' }}>
            <div className="w-16 h-16 3xl:w-20 3xl:h-20 4xl:w-24 4xl:h-24 5xl:w-32 5xl:h-32 rounded-full flex items-center justify-center mb-6 mx-auto" style={{ background: 'linear-gradient(135deg, var(--primary), var(--accent))' }}>
              <i className="fas fa-map-marker-alt text-white text-2xl 3xl:text-3xl 4xl:text-4xl 5xl:text-5xl"></i>
            </div>
            <h3 className="text-xl md:text-2xl 3xl:text-3xl 4xl:text-4xl 5xl:text-5xl font-bold mb-4 text-center" style={{ color: 'var(--secondary)' }}>Local Infrastructure</h3>
            <p className="text-[var(--text-muted)] text-center 3xl:text-lg 4xl:text-xl 5xl:text-2xl">
              Ethiopian-based data center ensuring low latency and data residency compliance
            </p>
          </div>

          <div className="bg-[var(--bg-card)] rounded-xl shadow-lg p-8 3xl:p-12 4xl:p-16 5xl:p-20 border-t-4 hover:shadow-xl transition-shadow" style={{ borderTopColor: 'var(--accent)' }}>
            <div className="w-16 h-16 3xl:w-20 3xl:h-20 4xl:w-24 4xl:h-24 5xl:w-32 5xl:h-32 rounded-full flex items-center justify-center mb-6 mx-auto" style={{ background: 'linear-gradient(135deg, var(--accent), var(--primary))' }}>
              <i className="fas fa-money-bill-wave text-white text-2xl 3xl:text-3xl 4xl:text-4xl 5xl:text-5xl"></i>
            </div>
            <h3 className="text-xl md:text-2xl 3xl:text-3xl 4xl:text-4xl 5xl:text-5xl font-bold mb-4 text-center" style={{ color: 'var(--secondary)' }}>Affordable Pricing</h3>
            <p className="text-[var(--text-muted)] text-center 3xl:text-lg 4xl:text-xl 5xl:text-2xl">
              Competitive rates designed for startups and growing Ethiopian businesses
            </p>
          </div>

          <div className="bg-[var(--bg-card)] rounded-xl shadow-lg p-8 3xl:p-12 4xl:p-16 5xl:p-20 border-t-4 hover:shadow-xl transition-shadow" style={{ borderTopColor: 'var(--secondary)' }}>
            <div className="w-16 h-16 3xl:w-20 3xl:h-20 4xl:w-24 4xl:h-24 5xl:w-32 5xl:h-32 rounded-full flex items-center justify-center mb-6 mx-auto" style={{ background: 'linear-gradient(135deg, var(--secondary), var(--primary))' }}>
              <i className="fas fa-headset text-white text-2xl 3xl:text-3xl 4xl:text-4xl 5xl:text-5xl"></i>
            </div>
            <h3 className="text-xl md:text-2xl 3xl:text-3xl 4xl:text-4xl 5xl:text-5xl font-bold mb-4 text-center" style={{ color: 'var(--secondary)' }}>Local Support</h3>
            <p className="text-[var(--text-muted)] text-center 3xl:text-lg 4xl:text-xl 5xl:text-2xl">
              Ethiopian technical team available to assist with setup, migration, and support
            </p>
          </div>
        </div>
      </section>

      {/* Feature Accordion */}
      <section className="max-w-5xl 3xl:max-w-7xl 4xl:max-w-8xl 5xl:max-w-screen-2xl mx-auto py-12 3xl:py-20 4xl:py-28 5xl:py-36 px-4 md:px-8 3xl:px-20 4xl:px-32 5xl:px-48 bg-[var(--bg-card)]">
        <h2 className="text-2xl md:text-3xl 3xl:text-4xl 4xl:text-5xl 5xl:text-6xl font-bold mb-8 text-center" style={{ color: 'var(--secondary)' }}>Services & Features</h2>
        <div className="space-y-4 3xl:space-y-8">
          {features.map((f, idx) => (
            <div key={f.title} className="border rounded-lg bg-[var(--bg-card)] shadow-sm overflow-hidden 3xl:text-xl 4xl:text-2xl 5xl:text-3xl" style={{ borderColor: 'var(--accent)' }}>
              <button
                className="w-full flex items-center bg-[var(--bg-card)] justify-between px-6 py-4 3xl:px-12 3xl:py-8 4xl:px-16 4xl:py-10 5xl:px-24 5xl:py-14 text-left focus:outline-none focus:ring-2 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800"
                style={{ color: 'var(--primary)' }}
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                aria-expanded={openIdx === idx}
              >
                <div className="flex items-center gap-3 3xl:gap-6">
                  <i className={`fas ${f.icon} text-xl 3xl:text-3xl 4xl:text-4xl 5xl:text-5xl`} style={{ color: 'var(--primary)' }}></i>
                  <span className="font-semibold text-lg md:text-xl 3xl:text-2xl 4xl:text-3xl 5xl:text-4xl" style={{ color: 'var(--secondary)' }}>{f.title}</span>
                </div>
                <i className={`fas fa-chevron-${openIdx === idx ? 'up' : 'down'} text-lg 3xl:text-2xl 4xl:text-3xl 5xl:text-4xl transition-transform`} style={{ color: 'var(--accent)' }}></i>
              </button>
              {openIdx === idx && (
                <div className="px-8 pb-6 pt-2 3xl:px-16 3xl:pb-12 4xl:px-24 4xl:pb-16 5xl:px-32 5xl:pb-20 text-[var(--text-muted)] animate-fade-in" style={{ borderTop: '2px solid var(--accent)' }}>
                  {f.content}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Partnership Section - Powered by Zergaw Cloud */}
      <section className="py-16 3xl:py-24 4xl:py-32 5xl:py-40 px-4 md:px-8 3xl:px-20 4xl:px-32 5xl:px-48" style={{ background: 'linear-gradient(135deg, var(--bg-main) 0%, var(--bg-card) 100%)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl 3xl:text-5xl 4xl:text-6xl 5xl:text-7xl font-bold mb-4" style={{ color: 'var(--secondary)' }}>
              Collaborate with Zergaw Cloud
            </h2>
            <div className="w-24 h-1 mx-auto mb-8" style={{ background: 'linear-gradient(90deg, var(--primary), var(--accent))' }}></div>
            <p className="text-lg md:text-xl 3xl:text-2xl 4xl:text-3xl 5xl:text-4xl text-[var(--text-muted)] max-w-3xl mx-auto mb-12">
              Ethiopian IT Park partners with Zergaw Cloud to provide enterprise-grade cloud infrastructure services
            </p>
          </div>

          <div className="bg-[var(--bg-card)] rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-800">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Left Side - Logo and Info */}
              <div className="p-12 3xl:p-16 4xl:p-20 5xl:p-24 flex flex-col justify-center" style={{ background: 'linear-gradient(135deg, rgba(12, 124, 146, 0.05), rgba(110, 201, 196, 0.05))' }}>
                <div className="mb-8">
                  <a href="https://zergaw.com/" target="_blank" rel="noopener noreferrer" className="inline-block transition-transform hover:scale-105">
                    <div className="bg-[var(--bg-card)] p-6 rounded-xl shadow-md">
                      <h3 className="text-4xl 3xl:text-5xl 4xl:text-6xl 5xl:text-7xl font-bold" style={{ color: 'var(--primary)' }}>ZERGAW</h3>
                      <p className="text-lg 3xl:text-xl 4xl:text-2xl 5xl:text-3xl" style={{ color: 'var(--accent)' }}>CLOUD</p>
                    </div>
                  </a>
                </div>
                <p className="text-[var(--text-main)] text-lg 3xl:text-xl 4xl:text-2xl 5xl:text-3xl leading-relaxed mb-6">
                  <strong style={{ color: 'var(--secondary)' }}>Zergaw Cloud</strong> is a leading cloud services provider in Ethiopia, established in 2019 by experienced ICT experts.
                </p>
                <p className="text-[var(--text-muted)] 3xl:text-lg 4xl:text-xl 5xl:text-2xl">
                  Serving <strong>500+ businesses</strong> across banking, microfinance, hospitality, entertainment, and government sectors.
                </p>
              </div>

              {/* Right Side - Partnership Highlights */}
              <div className="p-12 3xl:p-16 4xl:p-20 5xl:p-24 bg-[var(--bg-card)]">
                <h4 className="text-2xl 3xl:text-3xl 4xl:text-4xl 5xl:text-5xl font-bold mb-8" style={{ color: 'var(--secondary)' }}>Partnership Highlights</h4>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 3xl:w-14 3xl:h-14 4xl:w-16 4xl:h-16 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, var(--primary), var(--accent))' }}>
                      <i className="fas fa-server text-white text-xl 3xl:text-2xl 4xl:text-3xl"></i>
                    </div>
                    <div>
                      <h5 className="font-semibold text-lg 3xl:text-xl 4xl:text-2xl 5xl:text-3xl mb-2" style={{ color: 'var(--secondary)' }}>Local Infrastructure</h5>
                      <p className="text-[var(--text-muted)] 3xl:text-lg 4xl:text-xl 5xl:text-2xl">Data center hosted at Ethiopian IT Park premises in Addis Ababa</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 3xl:w-14 3xl:h-14 4xl:w-16 4xl:h-16 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, var(--secondary), var(--primary))' }}>
                      <i className="fas fa-shield-alt text-white text-xl 3xl:text-2xl 4xl:text-3xl"></i>
                    </div>
                    <div>
                      <h5 className="font-semibold text-lg 3xl:text-xl 4xl:text-2xl 5xl:text-3xl mb-2" style={{ color: 'var(--secondary)' }}>Enterprise Security</h5>
                      <p className="text-[var(--text-muted)] 3xl:text-lg 4xl:text-xl 5xl:text-2xl">Compliance with Ethiopian data protection laws and global standards</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 3xl:w-14 3xl:h-14 4xl:w-16 4xl:h-16 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, var(--secondary), var(--primary))' }}>
                      <i className="fas fa-users text-white text-xl 3xl:text-2xl 4xl:text-3xl"></i>
                    </div>
                    <div>
                      <h5 className="font-semibold text-lg 3xl:text-xl 4xl:text-2xl 5xl:text-3xl mb-2" style={{ color: 'var(--secondary)' }}>Dedicated Support</h5>
                      <p className="text-[var(--text-muted)] 3xl:text-lg 4xl:text-xl 5xl:text-2xl">24/7 technical support and local expertise for IT Park tenants</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 3xl:w-14 3xl:h-14 4xl:w-16 4xl:h-16 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, var(--primary), var(--secondary))' }}>
                      <i className="fas fa-handshake text-white text-xl 3xl:text-2xl 4xl:text-3xl"></i>
                    </div>
                    <div>
                      <h5 className="font-semibold text-lg 3xl:text-xl 4xl:text-2xl 5xl:text-3xl mb-2" style={{ color: 'var(--secondary)' }}>Special Rates</h5>
                      <p className="text-[var(--text-muted)] 3xl:text-lg 4xl:text-xl 5xl:text-2xl">Affordable pricing for Ethiopian IT Park incubatees and tenants</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <a
                    href="https://zergaw.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-4 3xl:px-10 3xl:py-5 4xl:px-12 4xl:py-6 rounded-full font-semibold text-white text-lg 3xl:text-xl 4xl:text-2xl transition-all hover:shadow-xl transform hover:-translate-y-1"
                    style={{ background: 'linear-gradient(135deg, var(--primary), var(--accent))' }}
                  >
                    <span>Visit Zergaw Cloud</span>
                    <i className="fas fa-external-link-alt"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CloudInfrastructure;
