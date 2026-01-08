import React, { useState, useEffect, useRef, JSX } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import {
  IconChevronDown,
  IconSearch,
  IconX,
  IconHome,
  IconInfoCircle,
  IconBriefcase,
  IconRefresh,
  IconDatabase,
  IconPhone,
  IconBuildingCommunity,
  IconTargetArrow,
  IconUsers,
  IconUsersGroup,
  IconUserCircle,
  IconNetwork,
  IconCode,
  IconCloud,
  IconBuildingSkyscraper,
  IconSchool,
  IconFileCertificate,
  IconNews,
  IconLiveView,
  IconBriefcase2,
  IconPhoto,
  IconFileText,
  IconQuestionMark
} from '@tabler/icons-react';
import './Header.css';
import ParticleBackground from '../../ParticleBackground';

type MenuItem = {
  label: string;
  href: string;
  icon?: React.ReactNode;
  subMenu?: MenuItem[];
};

const menuData: MenuItem[] = [
  { label: 'Home', href: '/', icon: <IconHome size={20} /> },
  {
    label: 'About Us',
    href: '/about',
    icon: <IconInfoCircle size={20} />,
    subMenu: [
      { label: 'Who We Are', href: '/about/who-we-are', icon: <IconBuildingCommunity size={18} /> },
      { label: 'Mission & Vision', href: '/about/mission-vision', icon: <IconTargetArrow size={18} /> },
      { label: 'Leadership & Team', href: '/about/leadership', icon: <IconUsers size={18} /> },
      { label: 'Partners & Investors', href: '/about/partners', icon: <IconUsersGroup size={18} /> },
      { label: 'Board of Directors', href: '/about/board', icon: <IconUserCircle size={18} /> },
    ],
  },
  {
    label: 'Services',
    href: '/services',
    icon: <IconBriefcase size={20} />,
    subMenu: [
      {
        label: 'IT Services',
        href: '/services',
        icon: <IconNetwork size={18} />,
        subMenu: [
          { label: 'IT & Network Support', href: '/services/network', icon: <IconNetwork size={16} /> },
          { label: 'Software & Consulting', href: '/services/software-consulting', icon: <IconCode size={16} /> },
          { label: 'Cloud Infrastructure & Web Hosting', href: '/it-cloud/cloud-infrastructure', icon: <IconCloud size={16} /> },
        ],
      },
      {
        label: 'Investment',
        href: '/investment',
        icon: <IconBuildingSkyscraper size={18} />,
        subMenu: [
          { label: 'Steps to Invest', href: '/investment/steps-to-invest', icon: <IconTargetArrow size={16} /> },
        ],
      },
      {
        label: 'Workspace & Innovation',
        href: '/incubation',
        icon: <IconSchool size={18} />,
        subMenu: [
          { label: 'Office Rent', href: '/services/spaces/office-Rent', icon: <IconBuildingCommunity size={16} /> },
          { label: 'Leased Land', href: '/services/spaces/leased-Land', icon: <IconBuildingSkyscraper size={16} /> },
          { label: 'Training & Workshops', href: '/incubation/training', icon: <IconSchool size={16} /> },
          { label: 'How to Apply', href: '/incubation/how-to-apply', icon: <IconFileCertificate size={16} /> },
        ],
      },
    ],
  },
  {
    label: 'Updates',
    href: '/resources/digital/news',
    icon: <IconRefresh size={20} />,
    subMenu: [
      { label: 'News & Events', href: '/resources/digital/news', icon: <IconNews size={18} /> },
      { label: 'Live Events', href: '/live-events', icon: <IconLiveView size={18} /> },
      {
        label: 'Career',
        href: '/career',
        icon: <IconBriefcase2 size={18} />,
        subMenu: [
          { label: 'Jobs', href: '/career/jobs', icon: <IconUsers size={16} /> },
        ],
      },
    ],
  },
  {
    label: 'Resources',
    href: '/resources',
    icon: <IconDatabase size={20} />,
    subMenu: [
      { label: 'Media & Gallery', href: '/resources/digital', icon: <IconPhoto size={18} /> },
      { label: 'Policy & Guidelines', href: '/resources/policy', icon: <IconFileText size={18} /> },
      { label: 'FAQs', href: '/resources/faqs', icon: <IconQuestionMark size={18} /> },
    ],
  },
  {
    label: 'Contact Us',
    href: '/contact',
    icon: <IconPhone size={20} />
  },
];

// modern arrow icon for mobile submenu toggle
const ChevronIcon: React.FC<{ open: boolean }> = ({ open }) => (
  <IconChevronDown
    size={16}
    className={`mobile-arrow-icon transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
  />
);

// modern close icon for mobile menu
const CloseIcon: React.FC = () => (
  <IconX size={24} className="mobile-menu-close-icon" />
);

const SearchIcon: React.FC = () => (
  <IconSearch size={22} strokeWidth={2.5} />
);

const Header: React.FC = () => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubMenus, setMobileSubMenus] = useState<{ [key: string]: boolean }>({});
  const [searchResults, setSearchResults] = useState<MenuItem[]>([]);
  const searchBoxRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Define searchable pages
  const searchablePages: MenuItem[] = [
    { label: 'Home', href: '/' },
    { label: 'About IT Park', href: '/about' },
    { label: 'Who We Are', href: '/about/who-we-are' },
    { label: 'Mission & Vision', href: '/about/mission-vision' },
    { label: 'Leadership & Team', href: '/about/leadership' },
    { label: 'Partners & Investors', href: '/about/partners' },
    { label: 'Board of Directors', href: '/about/board' },
    { label: 'IT Services', href: '/services' },
    { label: 'IT & Network Support', href: '/services/network' },
    { label: 'Software & Consulting', href: '/services/software-consulting' },
    { label: 'Cloud Infrastructure', href: '/it-cloud/cloud-infrastructure' },
    { label: 'Investment', href: '/investment' },
    { label: 'Steps to Invest', href: '/investment/steps-to-invest' },
    { label: 'Workspace & Innovation', href: '/incubation' },
    { label: 'Workspaces', href: '/services/spaces' },
    { label: 'Office Rent', href: '/services/spaces/office-Rent' },
    { label: 'Leased Land', href: '/services/spaces/leased-Land' },
    { label: 'Training & Workshops', href: '/incubation/training' },
    { label: 'How to Apply', href: '/incubation/how-to-apply' },
    { label: 'Resources', href: '/resources' },
    { label: 'Media & Gallery', href: '/resources/digital/gallery' },
    { label: 'News & Events', href: '/resources/digital/news' },
    { label: 'Live Events', href: '/live-events' },
    { label: 'Policy & Guidelines', href: '/resources/policy' },
    { label: 'FAQs', href: '/resources/faqs' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'Career', href: '/career' },

  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  useEffect(() => {
    const setHeaderOffsetVar = () => {
      const topbar = document.querySelector('.site-topbar') as HTMLElement | null;
      const header = document.querySelector('.site-header') as HTMLElement | null;
      const topbarH = topbar ? topbar.offsetHeight : 0;
      const headerH = header ? header.offsetHeight : 0;
      const total = topbarH + headerH;
      document.documentElement.style.setProperty('--app-header-offset', `${total}px`);
    };

    const handleScroll = () => {
      // Set scrolled state when user scrolls more than 10px
      setIsScrolled(window.scrollY > 10);
      setHeaderOffsetVar();
    };
    const handleResize = () => setHeaderOffsetVar();
    const handleClickOutside = (e: MouseEvent) => {
      if (searchBoxRef.current && !searchBoxRef.current.contains(e.target as Node)) {
        setIsSearchActive(false);
        setSearchResults([]);
      }
    };
    // initialize and bind listeners
    setHeaderOffsetVar();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearchClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSearchActive(v => !v);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim().length > 0) {
      // Filter pages based on search query
      const results = searchablePages.filter(page =>
        page.label.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5); // Limit to 5 results
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (searchResults.length > 0) {
      // Navigate to first result
      navigate(searchResults[0].href);
      setIsSearchActive(false);
      setSearchQuery('');
      setSearchResults([]);
    }
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  const handleResultClick = (href: string) => {
    navigate(href);
    setIsSearchActive(false);
    setSearchQuery('');
    setSearchResults([]);
  };

  // Professional/Robust way: Close mobile menu automatically on any navigation event
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.key]);

  const [hoveredMenuItem, setHoveredMenuItem] = useState<number | null>(null);
  const [hoveredSubMenuItem, setHoveredSubMenuItem] = useState<number | null>(null);

  const toggleMobileMenu = () => setMobileMenuOpen((v: boolean) => !v);
  const toggleMobileSubMenu = (key: string) =>
    setMobileSubMenus((prev: { [key: string]: boolean }) => ({ ...prev, [key]: !prev[key] }));

  const renderMobileMenu = (items: MenuItem[], parentKey = ''): JSX.Element => (
    <ul className="mobile-menu-list">
      {items.map((item, idx) => {
        const key = `${parentKey}${item.label}-${idx}`;
        const hasSub = !!item.subMenu;
        return (
          <li key={key}>
            <div className="mobile-menu-item">
              <NavLink
                to={item.href}
                className={({ isActive }) => {
                  const path = window.location.pathname;
                  let isActuallyActive = isActive;
                  if (item.label === 'Resources' && item.href === '/resources') {
                    isActuallyActive = isActive && !path.startsWith('/resources/digital/news');
                  } else if (item.label === 'Updates' && item.href === '/resources/digital/news') {
                    isActuallyActive = isActive || path.startsWith('/live-events') || path.startsWith('/career');
                  }
                  return `mobile-menu-link ${isActuallyActive ? 'active' : ''}`;
                }}
              >
                <span className="menu-icon-wrapper">{item.icon}</span>
                <span className="menu-label">{item.label}</span>
              </NavLink>
              {hasSub && (
                <button
                  className="mobile-submenu-toggle"
                  onClick={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleMobileSubMenu(key);
                  }}
                  aria-label={`${mobileSubMenus[key] ? 'Collapse' : 'Expand'} ${item.label}`}
                  tabIndex={0}
                  type="button"
                >
                  <span className="mobile-submenu-toggle-icon-wrapper">
                    <ChevronIcon open={!!mobileSubMenus[key]} />
                  </span>
                </button>
              )}
            </div>
            {hasSub && mobileSubMenus[key] && renderMobileMenu(item.subMenu!, key)}
          </li>
        );
      })}
    </ul>
  );

  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: 15,
      scale: 0.95,
      transition: { duration: 0.2, ease: "easeOut" }
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
        staggerChildren: 0.05
      }
    }
  };

  const dropdownItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <>
      {/* Main Header */}
      <div className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
        <ParticleBackground />
        <div className="site-header-inner container mx-auto px-4
            sm:px-8 md:px-12 lg:px-16 xl:px-20
            2xl:px-24 3xl:px-32 4xl:px-40 5xl:px-52
            max-w-full sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg
            xl:max-w-screen-xl 2xl:max-w-[1536px] 3xl:max-w-[1920px] 4xl:max-w-[2560px] 5xl:max-w-[3840px]
          ">
          <div className="header-content">
            {/* Logo */}
            <div className="header-brand">
              <NavLink to="/" className="it-logo-container">
                <div className="it-logo-wrapper">
                  <img
                    src={isScrolled ? "https://res.cloudinary.com/yesuf/image/upload/v1766148035/Asset_19_30x_gclilt.png" : "https://res.cloudinary.com/yesuf/image/upload/v1766148184/Asset_22_30x_vrzigh.png"}
                    alt="Ethiopian IT Park Logo"
                    className="it-logo-image"
                    width={180}
                    height={45}
                    style={{ minWidth: '110px', height: 'auto' }}
                  />
                </div>
              </NavLink>
            </div>

            {/* Desktop Navigation */}
            <nav className="navigator">
              <ul className="menu flex gap-2 sm:gap-3 md:gap-4 lg:gap-6 xl:gap-8 2xl:gap-10 3xl:gap-12 4xl:gap-16 5xl:gap-20
                  text-base sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-2xl 3xl:text-3xl 4xl:text-4xl 5xl:text-5xl
                ">
                {menuData.map((item, idx) => (
                  <li
                    key={idx}
                    onMouseEnter={() => setHoveredMenuItem(idx)}
                    onMouseLeave={() => setHoveredMenuItem(null)}
                  >
                    <NavLink
                      to={item.href}
                      className={({ isActive }) => {
                        const path = window.location.pathname;
                        let isActuallyActive = isActive;
                        if (item.label === 'Resources' && item.href === '/resources') {
                          isActuallyActive = isActive && !path.startsWith('/resources/digital/news');
                        } else if (item.label === 'Updates' && item.href === '/resources/digital/news') {
                          isActuallyActive = isActive || path.startsWith('/live-events') || path.startsWith('/career');
                        }
                        return isActuallyActive ? 'active' : '';
                      }}
                    >
                      <span className="nav-label">{item.label}</span>
                      {item.subMenu && <IconChevronDown size={14} className="nav-chevron" />}
                    </NavLink>

                    <AnimatePresence>
                      {item.subMenu && hoveredMenuItem === idx && (
                        <motion.ul
                          className="sub-menu"
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                          variants={dropdownVariants}
                        >
                          {item.subMenu.map((sub, sIdx) => (
                            <motion.li
                              key={sIdx}
                              variants={dropdownItemVariants}
                              onMouseEnter={() => setHoveredSubMenuItem(sIdx)}
                              onMouseLeave={() => setHoveredSubMenuItem(null)}
                            >
                              <NavLink to={sub.href}>
                                <span className="dropdown-icon">{sub.icon}</span>
                                <span className="dropdown-label">{sub.label}</span>
                                {sub.subMenu && <IconChevronDown size={14} className="nav-chevron-right" />}
                              </NavLink>

                              <AnimatePresence>
                                {sub.subMenu && hoveredSubMenuItem === sIdx && (
                                  <motion.ul
                                    className="sub-sub-menu"
                                    variants={dropdownVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="hidden"
                                  >
                                    {sub.subMenu.map((subSub, ssIdx) => (
                                      <motion.li key={ssIdx} variants={dropdownItemVariants}>
                                        <NavLink to={subSub.href}>
                                          <span className="dropdown-icon">{subSub.icon}</span>
                                          <span className="dropdown-label">{subSub.label}</span>
                                        </NavLink>
                                      </motion.li>
                                    ))}
                                  </motion.ul>
                                )}
                              </AnimatePresence>
                            </motion.li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Extras - Search & Language on Right */}
            <div className="extras">
              <div className="search-container" ref={searchBoxRef}>
                <motion.button
                  className="search-trigger"
                  onClick={handleSearchClick}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Toggle search bar"
                  type="button"
                >
                  <SearchIcon aria-hidden="true" />
                </motion.button>

                <AnimatePresence>
                  {isSearchActive && (
                    <motion.div
                      className="search-box-compact"
                      initial={{ width: 0, opacity: 0, scale: 0.8 }}
                      animate={{ width: 'auto', opacity: 1, scale: 1 }}
                      exit={{ width: 0, opacity: 0, scale: 0.8 }}
                      transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    >
                      <div className="search-box-inner-compact">
                        <SearchIcon aria-hidden="true" />
                        <input
                          autoFocus
                          type="text"
                          className="search-input-compact"
                          placeholder="Search..."
                          value={searchQuery}
                          onChange={handleSearchChange}
                          onKeyDown={handleSearchKeyDown}
                        />
                        <button
                          className="search-close-compact"
                          onClick={() => {
                            setIsSearchActive(false);
                            setSearchResults([]);
                            setSearchQuery('');
                          }}
                          aria-label="Close search"
                        >
                          <CloseIcon aria-hidden="true" />
                        </button>
                      </div>

                      <AnimatePresence>
                        {searchResults.length > 0 && (
                          <motion.div
                            className="search-results-compact"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                          >
                            <div className="search-results-label-fancy">Quick Results</div>
                            {searchResults.map((result, index) => (
                              <motion.div
                                key={index}
                                className="search-result-item-compact-fancy"
                                variants={itemVariants}
                                onClick={() => handleResultClick(result.href)}
                                whileHover={{ x: 8 }}
                              >
                                <div className="result-dot-fancy"></div>
                                <span>{result.label}</span>
                              </motion.div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <button
                className={`off-canvas-toggle${mobileMenuOpen ? ' open' : ''}`}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                onClick={toggleMobileMenu}
              >
                <span />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`mobile-menu-overlay${mobileMenuOpen ? ' open' : ''}`}
        onClick={toggleMobileMenu}
      />
      <nav className={`mobile-menu${mobileMenuOpen ? ' open' : ''}`}>
        <div className="mobile-menu-header">
          <NavLink to="/" className="mobile-logo">
            <img
              src={isScrolled ? "https://res.cloudinary.com/yesuf/image/upload/v1766148035/Asset_19_30x_gclilt.png" : "https://res.cloudinary.com/yesuf/image/upload/v1766148035/Asset_19_30x_gclilt.png"}
              alt="Ethiopian IT Park Logo"
              width={120}
              height={30}
            />
          </NavLink>
          <button
            className="mobile-menu-close"
            aria-label="Close menu"
            onClick={toggleMobileMenu}
          >
            <CloseIcon />
          </button>
        </div>
        <div className="mobile-menu-content">
          {renderMobileMenu(menuData)}
          <div className="mobile-language-selector">
            <select
              value={selectedLanguage}
              onChange={e => setSelectedLanguage(e.target.value)}
              className="language-dropdown"
            >
              <option value="en">English</option>
              <option value="am">አማርኛ</option>
            </select>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;