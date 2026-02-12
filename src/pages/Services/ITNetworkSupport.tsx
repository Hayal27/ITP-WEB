import React from "react";

// Use modern, smart icons from Heroicons (or similar SVGs)
const features = [
  {
    icon: (
      // Computer Desktop Icon
      <div className="w-8 h-8 text-[var(--primary)]" style={{ display: 'flex' }}>
        <svg fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 6.75A2.25 2.25 0 015.25 4.5h13.5A2.25 2.25 0 0121 6.75v8.5A2.25 2.25 0 0118.75 17.5H5.25A2.25 2.25 0 013 15.25v-8.5z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 20h9" />
        </svg>
      </div>
    ),
    title: "End-to-End IT Support",
    points: [
      "Rapid response to technical issues",
      "Device setup, troubleshooting, and optimization",
      "Remote & on-site support as you need",
    ],
  },
  {
    icon: (
      // Wifi Icon
      <div className="w-8 h-8 text-[var(--primary)]" style={{ display: 'flex' }}>
        <svg fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.53 16.11a3.75 3.75 0 016.94 0M5.07 12.22a8.25 8.25 0 0113.86 0M1.5 8.33a13.5 13.5 0 0121 0M12 20.25h.008v.008H12v-.008z" />
        </svg>
      </div>
    ),
    title: "Professional Network Setup",
    points: [
      "Structured LAN/WAN architecture",
      "Secure wireless deployment (indoor/outdoor Wi-Fi)",
      "Server & network hardware configuration",
    ],
  },
  {
    icon: (
      // Shield Check Icon
      <div className="w-8 h-8 text-[var(--primary)]" style={{ display: 'flex' }}>
        <svg fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3.25l7.5 3.25v5.5c0 5.25-3.75 9.5-7.5 11.75-3.75-2.25-7.5-6.5-7.5-11.75v-5.5L12 3.25z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 12.75l2.25 2.25 4.25-4.25" />
        </svg>
      </div>
    ),
    title: "Network Security & Monitoring",
    points: [
      "Firewall & VPN configuration",
      "Real-time system monitoring & threat detection",
      "Data backup, recovery & access control",
    ],
  },
  {
    icon: (
      // Cloud Icon
      <div className="w-8 h-8 text-[var(--primary)]" style={{ display: 'flex' }}>
        <svg fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 19.5h9a4.5 4.5 0 000-9c-.2 0-.39.01-.58.03A6 6 0 005.5 13.5a4.5 4.5 0 002 6z" />
        </svg>
      </div>
    ),
    title: "Cloud & Remote Access",
    points: [
      "Office-to-cloud connectivity",
      "Secure access for remote employees",
      "Microsoft & Google Workspace integration",
    ],
  },
];

const badges = [
  "Fast response times",
  "Certified professionals",
  "Scalable solutions",
  "Tailored support",
];

const ITNetworkSupport: React.FC = () => {
  // Increase top padding to ensure hero is never covered by header (try pt-36/pt-40)
  return (
    <div className="bg-[var(--bg-main)] min-h-screen font-sans pt-36 md:pt-40">
      {/* Hero */}
      <section className="container py-16 flex flex-col items-center text-center 2xl:max-w-[1800px] 2xl:px-20 3xl:max-w-[2200px] 3xl:px-[7vw] 4xl:max-w-[3000px] 4xl:px-[10vw] 5xl:max-w-[4200px] 5xl:px-[14vw] mx-auto">
        <span className="inline-block px-4 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-[var(--primary)] font-semibold mb-4 tracking-wide animate-pulse shadow-card">
          🛠️ IT & Network Support
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--secondary)] mb-4 font-sans drop-shadow-lg">
          Smart. Reliable. Always On.
        </h1>
        <p className="max-w-2xl text-lg md:text-xl text-[var(--text-muted)] mb-8 font-medium">
          In a digital-first world, downtime is not an option. Our <span className="text-[var(--primary)] font-semibold">IT & Network Support</span> services keep your business running — fast, secure, and uninterrupted.
        </p>
      </section>

      {/* Features */}
      <section className="container py-12 grid md:grid-cols-2 gap-8 2xl:max-w-[1800px] 2xl:px-20 3xl:max-w-[2200px] 3xl:px-[7vw] 4xl:max-w-[3000px] 4xl:px-[10vw] 5xl:max-w-[4200px] 5xl:px-[14vw] mx-auto">
        {features.map((f) => (
          <div
            key={f.title}
            className="bg-[var(--bg-card)] rounded-2xl shadow-card p-8 flex flex-col items-start hover:shadow-outline-primary-light transition-shadow duration-300 group"
          >
            <div className="mb-4 bg-blue-50 dark:bg-blue-900/20 rounded-full p-3 group-hover:scale-110 transition-transform duration-300">
              {f.icon}
            </div>
            <h3 className="text-xl font-bold text-[var(--secondary)] mb-2">{f.title}</h3>
            <ul className="space-y-1 text-[var(--text-muted)] font-medium pl-4 list-disc">
              {f.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Who It's For */}
      <section className="container py-12 2xl:max-w-[1800px] 2xl:px-20 3xl:max-w-[2200px] 3xl:px-[7vw] 4xl:max-w-[3000px] 4xl:px-[10vw] 5xl:max-w-[4200px] 5xl:px-[14vw] mx-auto">
        <div className="bg-blue-50 dark:bg-blue-900/10 rounded-2xl p-8 md:p-12 shadow-card flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--secondary)] mb-2">Who It's For</h2>
            <ul className="list-none space-y-2 text-lg text-[var(--text-main)] font-medium">
              <li>• Offices at <span className="text-[var(--primary)] font-semibold">Ethiopian IT Park</span></li>
              <li>• Government agencies & institutions</li>
              <li>• Private companies, NGOs, SMEs</li>
              <li>• Tech-enabled enterprises that depend on uptime</li>
            </ul>
          </div>
          <div className="flex-1 flex justify-center">
            <img
              src="https://res.cloudinary.com/yesuf/image/upload/v1747707153/network-support_rpukdk.png"
              alt="IT Support Illustration"
              className="w-64 md:w-80 drop-shadow-xl animate-float"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="container py-12 my-5 2xl:max-w-[1800px] 2xl:px-20 3xl:max-w-[2200px] 3xl:px-[7vw] 4xl:max-w-[3000px] 4xl:px-[10vw] 5xl:max-w-[4200px] 5xl:px-[14vw] mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-[var(--secondary)] mb-6 text-center">Why Choose Us</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {badges.map((b) => (
            <span
              key={b}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue-50 dark:bg-blue-900/20 text-[var(--primary)] font-semibold shadow-card hover:bg-[var(--primary)]/20 transition"
            >
              <svg className="w-5 h-5 text-[var(--primary)]" fill="currentColor" viewBox="0 0 20 20">
                <circle cx="10" cy="10" r="10" />
                <path d="M7 10l2 2 4-4" stroke="#fff" strokeWidth="2" fill="none" />
              </svg>
              {b}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ITNetworkSupport;