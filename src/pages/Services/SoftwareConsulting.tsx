import React from "react";

// Brand-aligned, modern icons (Heroicons style, using your Tailwind brand colors)
const features = [
  {
    icon: (
      // Sparkle/Lightbulb Icon (innovation, consulting, software)
      <div className="w-10 h-10 text-[var(--primary)]" style={{ display: 'flex' }}>
        <svg fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>
    ),
    title: "Custom Software Development",
    desc: "Tailored web, mobile, and desktop apps that fit your business—not the other way around.",
  },
  {
    icon: (
      // Puzzle Piece Icon (integration)
      <div className="w-10 h-10 text-[var(--primary)]" style={{ display: 'flex' }}>
        <svg fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255V8.745A2.745 2.745 0 0018.255 6H13.5V4.5A2.25 2.25 0 0011.25 2.25a2.25 2.25 0 00-2.25 2.25V6H5.745A2.745 2.745 0 003 8.745v4.51A2.745 2.745 0 005.745 16H10.5v1.5a2.25 2.25 0 002.25 2.25 2.25 2.25 0 002.25-2.25V16h4.755A2.745 2.745 0 0021 13.255z" />
        </svg>
      </div>
    ),
    title: "System Integration",
    desc: "Connect platforms, automate workflows, and unify your data for seamless operations.",
  },
  {
    icon: (
      // Light Bulb Icon (strategy)
      <div className="w-10 h-10 text-[var(--primary)]" style={{ display: 'flex' }}>
        <svg fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3a7 7 0 00-7 7c0 2.386 1.053 4.507 2.75 5.75V18a2 2 0 002 2h2a2 2 0 002-2v-2.25C17.947 14.507 19 12.386 19 10a7 7 0 00-7-7z" />
        </svg>
      </div>
    ),
    title: "IT Strategy Consulting",
    desc: "Smart roadmaps, digital transformation, and vendor-neutral advice for growth.",
  },
  {
    icon: (
      // Shield Lock Icon (security)
      <div className="w-10 h-10 text-[var(--primary)]" style={{ display: 'flex' }}>
        <svg fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path d="M12 3l7 4v5c0 5-3.5 9-7 11-3.5-2-7-6-7-11V7l7-4z" stroke="currentColor" strokeWidth="2" fill="none" />
          <circle cx="12" cy="13" r="2" stroke="currentColor" strokeWidth="2" fill="none" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v1" />
        </svg>
      </div>
    ),
    title: "Secure & Scalable Architecture",
    desc: "Cloud, DevOps, and cybersecurity for future-ready, high-performance systems.",
  },
];

const badges = [
  "Proven software delivery",
  "Deep domain expertise",
  "Agile, transparent process",
  "Scalable, secure solutions",
];

const SoftwareConsulting: React.FC = () => {
  // Adjust padding-top for header, and padding-bottom for sticky footer
  return (
    <div className="bg-[var(--bg-main)] min-h-screen font-sans pt-44 pb-32 md:pt-52 md:pb-40">
      {/* Fancy Hero */}
      <section className="container relative flex flex-col md:flex-row items-center justify-between gap-10 py-20 2xl:max-w-[1800px] 2xl:px-20 3xl:max-w-[2200px] 3xl:px-[7vw] 4xl:max-w-[3000px] 4xl:px-[10vw] 5xl:max-w-[4200px] 5xl:px-[14vw] mx-auto">
        {/* Left: Text */}
        <div className="flex-1 z-10">
          <span className="inline-block px-5 py-2 rounded-full bg-blue-50 dark:bg-blue-900/20 text-[var(--primary)] font-semibold mb-6 tracking-wide animate-pulse shadow-card text-base md:text-lg">
            💻 Software & Consulting
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-[var(--secondary)] mb-6 font-sans drop-shadow-lg leading-tight">
            Empowering Your <span className="text-[var(--primary)]">Digital Journey</span>
          </h1>
          <p className="max-w-xl text-xl md:text-2xl text-[var(--text-muted)] mb-8 font-medium">
            From tailored software to expert consulting, we help you modernize, automate, and scale with confidence.
          </p>
          <div className="flex flex-wrap gap-4 my-16">
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
        </div>
        {/* Right: Illustration */}
        <div className="flex-1 flex mt-8 justify-center relative">
          <div className="relative">
            <img
              src="https://res.cloudinary.com/yesuf/image/upload/v1747710474/software-consulting_m5cxyk.png"
              alt="Software Consulting Illustration"
              className="w-80 md:w-[28rem] drop-shadow-2xl animate-float"
              loading="lazy"
            />
            {/* Fancy gradient blob */}
            <div className="absolute -top-8 -right-8 w-40 h-40 bg-[var(--primary)]/20 rounded-full blur-2xl z-[-1] animate-pulse" />
          </div>
        </div>
        {/* Decorative background shapes */}
        <div className="absolute left-0 top-0 w-32 h-32 bg-[var(--primary)]/10 rounded-full blur-2xl z-0" />
        <div className="absolute right-0 bottom-0 w-40 h-40 bg-[var(--primary)]/20 rounded-full blur-2xl z-0" />
      </section>

      {/* Features in horizontal cards */}
      <section className="container py-8 2xl:max-w-[1800px] 2xl:px-20 3xl:max-w-[2200px] 3xl:px-[7vw] 4xl:max-w-[3000px] 4xl:px-[10vw] 5xl:max-w-[4200px] 5xl:px-[14vw] mx-auto">
        <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch">
          {features.map((f, i) => (
            <div
              key={f.title}
              className={`flex-1 bg-[var(--bg-card)] rounded-2xl shadow-card p-8 flex flex-col items-center text-center border-t-4 ${i % 2 === 0 ? "border-[var(--primary)]" : "border-[var(--secondary)]"
                } hover:scale-[1.03] hover:shadow-outline-primary-light transition-transform duration-300 group`}
            >
              <div className="mb-3 bg-blue-50 dark:bg-blue-900/20 rounded-full p-3 group-hover:scale-110 transition-transform duration-300">
                {f.icon}
              </div>
              <h3 className="text-xl font-bold text-[var(--secondary)] mb-2">{f.title}</h3>
              <p className="text-[var(--text-muted)] font-medium">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Who We Serve - vertical split */}
      <section className="container py-16 2xl:max-w-[1800px] 2xl:px-20 3xl:max-w-[2200px] 3xl:px-[7vw] 4xl:max-w-[3000px] 4xl:px-[10vw] 5xl:max-w-[4200px] 5xl:px-[14vw] mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-12 mt-10">
          <div className="flex-1 order-2 md:order-1">
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--secondary)] mb-4">Who We Serve</h2>
            <ul className="list-none space-y-3 text-lg text-[var(--text-main)] font-medium">
              <li className="flex items-center gap-3">
                <span className="inline-block w-3 h-3 rounded-full bg-[var(--primary)]" />
                Government agencies & public institutions
              </li>
              <li className="flex items-center gap-3">
                <span className="inline-block w-3 h-3 rounded-full bg-[var(--primary)]" />
                Private companies & NGOs
              </li>
              <li className="flex items-center gap-3">
                <span className="inline-block w-3 h-3 rounded-full bg-[var(--primary)]" />
                Educational institutions & R&amp;D centers
              </li>
              <li className="flex items-center gap-3">
                <span className="inline-block w-3 h-3 rounded-full bg-[var(--primary)]" />
                Tech-focused startups & enterprises
              </li>
            </ul>
          </div>
          <div className="flex-1 flex justify-center order-1 md:order-2">
            <img
              src="https://res.cloudinary.com/yesuf/image/upload/v1747738652/ChatGPT_Image_May_20_2025_06_09_27_AM_wwkgnn.png"
              alt="Clients Illustration"
              className="w-64 md:w-80 drop-shadow-xl animate-float"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default SoftwareConsulting;