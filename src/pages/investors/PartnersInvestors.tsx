import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaHandshake, FaBuilding, FaHome, FaGlobe, FaIndustry,
  FaCalendarAlt, FaServer, FaCloud, FaNetworkWired, FaSearch,
  FaThLarge, FaList, FaChevronRight, FaExternalLinkAlt, FaInfoCircle,
  FaLinkedin, FaTwitter, FaFacebook
} from 'react-icons/fa';
import { MdEmail, MdLocationOn, MdBusiness, MdSchool, MdFilterList } from 'react-icons/md';
import { getPartners, getInvestors, Partner, Investor, BACKEND_URL } from '../../services/apiService';
import './partners.css';


const PartnersInvestors: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'partners' | 'investors'>('partners');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPartner, setSelectedPartner] = useState<number | null>(null);
  const [selectedInvestor, setSelectedInvestor] = useState<number | null>(null);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [investors, setInvestors] = useState<Investor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [partnersRes, investorsRes] = await Promise.all([
          getPartners(),
          getInvestors()
        ]);
        setPartners(partnersRes);
        setInvestors(investorsRes);
      } catch (error) {
        console.error("Error fetching partners/investors:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filter Logic
  const filteredPartners = useMemo(() => {
    return partners.filter(p =>
      p.company_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.industry_type?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [partners, searchQuery]);

  const filteredInvestors = useMemo(() => {
    return investors.filter(i =>
      i.company_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.property_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.industry_type?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [investors, searchQuery]);

  // SEO Update Logic
  useEffect(() => {
    let title = "Partners & Investors | Ethiopian IT Park (ITPC)";
    let description = "Join our growing ecosystem of innovation and collaboration at the Ethiopian IT Park. Explore our strategic partners and key investors.";
    let keywords = "Ethiopian IT Park, ITPC Partners, ITPC Investors, Tech Investment Ethiopia, IT Park Addis Ababa";

    if (activeTab === 'partners' && selectedPartner) {
      const partner = partners.find(p => p.id === selectedPartner);
      if (partner) {
        title = partner.meta_title || `${partner.company_name} - Partner | ITPC`;
        description = partner.meta_description || partner.description || description;
        keywords = partner.meta_keywords || keywords;
      }
    } else if (activeTab === 'investors' && selectedInvestor) {
      const investor = investors.find(i => i.id === selectedInvestor);
      if (investor) {
        title = investor.meta_title || `${investor.company_name} - Investor | ITPC`;
        description = investor.meta_description || investor.description || description;
        keywords = investor.meta_keywords || keywords;
      }
    }

    document.title = title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', description);

    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', keywords);
    } else {
      const newKeywords = document.createElement('meta');
      newKeywords.name = "keywords";
      newKeywords.content = keywords;
      document.head.appendChild(newKeywords);
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', description);

  }, [activeTab, selectedPartner, selectedInvestor, partners, investors]);

  const getImageUrl = (url: string | undefined, type: 'logo' | 'image') => {
    if (!url) return "";
    if (url.startsWith('http')) return url;
    return `${BACKEND_URL}${url}`;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Ongoing';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const getIndustryIcon = (industryType: string) => {
    switch (industryType?.toLowerCase()) {
      case 'data infrastructure': return <FaServer className="mt-1 mr-2 text-teal-500" />;
      case 'cloud computing':
      case 'cloud services': return <FaCloud className="mt-1 mr-2 text-teal-500" />;
      case 'smart card technology': return <FaNetworkWired className="mt-1 mr-2 text-teal-500" />;
      case 'venture capital': return <MdBusiness className="mt-1 mr-2 text-teal-500" />;
      case 'development cooperation': return <MdSchool className="mt-1 mr-2 text-teal-500" />;
      default: return <FaIndustry className="mt-1 mr-2 text-teal-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Premium Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#16284F] opacity-90 mix-blend-multiply"></div>
          <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
            className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center"
          ></motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#16284F]/50 to-[#F8FAFC]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.span
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1 rounded-full bg-teal-500/20 text-teal-400 text-sm font-semibold mb-6 backdrop-blur-md border border-teal-500/30"
          >
            GLOBAL PARTNERSHIPS
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight"
          >
            Partners & <span className="text-teal-400">Investors</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
          >
            The engine of innovation at the Ethiopian IT Park. Explore the visionary organizations powering our digital transformation.
          </motion.p>
        </div>

        {/* Floating Shapes */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[100px] text-[#F8FAFC] fill-current">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C58.05,110.44,117.58,121.1,178.55,108.02A389.06,389.06,0,0,0,321.39,56.44Z"></path>
          </svg>
        </div>
      </section>

      {/* Control Bar */}
      <div className="sticky top-20 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2 bg-gray-100 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('partners')}
              className={`flex items-center space-x-2 px-6 py-2 rounded-lg transition-all ${activeTab === 'partners' ? 'bg-white shadow-md text-[#16284F] font-bold' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <FaHandshake /> <span>Partners</span>
              <span className="ml-2 bg-gray-200 px-2 py-0.5 rounded-md text-xs">{partners.length}</span>
            </button>
            <button
              onClick={() => setActiveTab('investors')}
              className={`flex items-center space-x-2 px-6 py-2 rounded-lg transition-all ${activeTab === 'investors' ? 'bg-white shadow-md text-[#16284F] font-bold' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <FaBuilding /> <span>Investors</span>
              <span className="ml-2 bg-gray-200 px-2 py-0.5 rounded-md text-xs">{investors.length}</span>
            </button>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-grow">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder={`Search ${activeTab}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none transition-all"
              />
            </div>

            <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden p-1 bg-white">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-teal-50 text-teal-600' : 'text-gray-400 hover:text-gray-600'}`}
                title="Grid View"
              >
                <FaThLarge />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'table' ? 'bg-teal-50 text-teal-600' : 'text-gray-400 hover:text-gray-600'}`}
                title="Table View"
              >
                <FaList />
              </button>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-12">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-500 font-medium">Loading ecosystem data...</p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {viewMode === 'grid' ? (
              <motion.div
                key={`${activeTab}-grid`}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {activeTab === 'partners' ? (
                  filteredPartners.map((partner) => (
                    <GridCard
                      key={partner.id}
                      item={partner}
                      type="partner"
                      selected={selectedPartner === partner.id}
                      onSelect={() => setSelectedPartner(selectedPartner === partner.id ? null : partner.id)}
                      getImageUrl={getImageUrl}
                      getIndustryIcon={getIndustryIcon}
                      formatDate={formatDate}
                    />
                  ))
                ) : (
                  filteredInvestors.map((investor) => (
                    <GridCard
                      key={investor.id}
                      item={investor}
                      type="investor"
                      selected={selectedInvestor === investor.id}
                      onSelect={() => setSelectedInvestor(selectedInvestor === investor.id ? null : investor.id)}
                      getImageUrl={getImageUrl}
                      getIndustryIcon={getIndustryIcon}
                      formatDate={formatDate}
                    />
                  ))
                )}
              </motion.div>
            ) : (
              <motion.div
                key={`${activeTab}-table`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
              >
                <table className="w-full text-left">
                  <thead className="bg-gray-50/50 border-b border-gray-100">
                    <tr>
                      <th className="px-6 py-4 text-sm font-bold text-gray-400 uppercase tracking-wider">Company</th>
                      <th className="px-6 py-4 text-sm font-bold text-gray-400 uppercase tracking-wider">Industry</th>
                      <th className="px-6 py-4 text-sm font-bold text-gray-400 uppercase tracking-wider">Type / Property</th>
                      <th className="px-6 py-4 text-sm font-bold text-gray-400 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-sm font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {activeTab === 'partners' ? (
                      filteredPartners.map(p => (
                        <TableRow key={p.id} item={p} type="partner" onSelect={() => setSelectedPartner(p.id)} getImageUrl={getImageUrl} getIndustryIcon={getIndustryIcon} />
                      ))
                    ) : (
                      filteredInvestors.map(i => (
                        <TableRow key={i.id} item={i} type="investor" onSelect={() => setSelectedInvestor(i.id)} getImageUrl={getImageUrl} getIndustryIcon={getIndustryIcon} />
                      ))
                    )}
                  </tbody>
                </table>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </main>

      {/* Detail Modal Overlay */}
      <AnimatePresence>
        {(selectedPartner || selectedInvestor) && (
          <DetailModal
            id={selectedPartner || selectedInvestor!}
            type={activeTab}
            partners={partners}
            investors={investors}
            onClose={() => { setSelectedPartner(null); setSelectedInvestor(null); }}
            getImageUrl={getImageUrl}
            formatDate={formatDate}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// Component Components

const GridCard = ({ item, type, selected, onSelect, getImageUrl, getIndustryIcon, formatDate }: any) => {
  const isPartner = type === 'partner';
  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="group bg-white rounded-3xl p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100/50 hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.1)] transition-all duration-300 relative overflow-hidden flex flex-col h-full"
    >
      <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <button onClick={onSelect} className="w-8 h-8 rounded-full bg-teal-500/10 text-teal-600 flex items-center justify-center hover:bg-teal-500 hover:text-white transition-colors">
          <FaChevronRight className="w-3 h-3" />
        </button>
      </div>

      <div className="flex items-center space-x-4 mb-6">
        <div className="w-16 h-16 rounded-2xl bg-[#F8FAFC] flex items-center justify-center border border-gray-100 p-2 overflow-hidden shadow-inner group-hover:scale-110 transition-transform duration-500">
          <img
            src={getImageUrl(isPartner ? item.logo : item.image, isPartner ? 'logo' : 'image')}
            alt={item.company_name}
            className="w-full h-full object-contain"
            onError={(e: any) => e.target.src = "https://via.placeholder.com/64?text=" + item.company_name[0]}
          />
        </div>
        <div>
          <h3 className="text-xl font-bold text-[#16284F] group-hover:text-teal-600 transition-colors leading-tight">{item.company_name}</h3>
          <p className="text-xs text-teal-500 font-bold uppercase tracking-widest mt-1">
            {isPartner ? item.partnership_type : item.investor_id}
          </p>
        </div>
      </div>

      <div className="space-y-4 mb-6 flex-grow">
        <div className="flex items-center text-sm text-gray-500">
          <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center mr-3 text-teal-600">
            {getIndustryIcon(item.industry_type)}
          </div>
          <span className="font-medium">{item.industry_type || 'Technology Services'}</span>
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center mr-3 text-teal-600">
            <MdLocationOn />
          </div>
          <span className="font-medium">{item.zone}, {item.country}</span>
        </div>
      </div>

      <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter ${item.status === 'Active' || item.availability_status === 'Operational'
          ? 'bg-teal-500/10 text-teal-600'
          : 'bg-amber-500/10 text-amber-600'
          }`}>
          {item.status || item.availability_status}
        </span>
        <button
          onClick={onSelect}
          className="text-sm font-bold text-[#16284F] flex items-center hover:translate-x-1 transition-transform"
        >
          View Details <FaChevronRight className="ml-1 w-2 h-2" />
        </button>
      </div>
    </motion.div>
  );
};

const TableRow = ({ item, type, onSelect, getImageUrl, getIndustryIcon }: any) => {
  const isPartner = type === 'partner';
  return (
    <motion.tr
      whileHover={{ backgroundColor: "rgba(248, 250, 252, 1)" }}
      className="group border-b border-gray-50 last:border-0"
    >
      <td className="px-6 py-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-gray-50 p-1 border border-gray-100 overflow-hidden flex-shrink-0">
            <img
              src={getImageUrl(isPartner ? item.logo : item.image, isPartner ? 'logo' : 'image')}
              alt=""
              className="w-full h-full object-contain"
              onError={(e: any) => e.target.src = "https://via.placeholder.com/40?text=" + item.company_name[0]}
            />
          </div>
          <span className="font-bold text-[#16284F]">{item.company_name}</span>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center text-sm text-gray-500 font-medium">
          {getIndustryIcon(item.industry_type)} {item.industry_type}
        </div>
      </td>
      <td className="px-6 py-4">
        <span className="text-sm text-gray-500 font-medium">{isPartner ? item.partnership_type : item.property_name}</span>
      </td>
      <td className="px-6 py-4">
        <span className="px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest bg-gray-100 text-gray-600">
          {item.status || item.availability_status}
        </span>
      </td>
      <td className="px-6 py-4 text-right">
        <button
          onClick={onSelect}
          className="p-2 rounded-lg hover:bg-[#16284F] hover:text-white text-[#16284F] transition-all border border-gray-100"
        >
          <FaInfoCircle />
        </button>
      </td>
    </motion.tr>
  );
};

const DetailModal = ({ id, type, partners, investors, onClose, getImageUrl, formatDate }: any) => {
  const isPartner = type === 'partners';
  const data = isPartner ? partners.find((p: any) => p.id === id) : investors.find((i: any) => i.id === id);

  const [fullScoreImg, setFullScoreImg] = useState<string | null>(null);
  const [galleryIndex, setGalleryIndex] = useState(0);

  if (!data) return null;

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    },
    exit: { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  const nextSlide = (e: any) => {
    e.stopPropagation();
    if (data.gallery && data.gallery.length > 0) {
      setGalleryIndex((prev) => (prev + 1) % data.gallery.length);
    }
  };

  const prevSlide = (e: any) => {
    e.stopPropagation();
    if (data.gallery && data.gallery.length > 0) {
      setGalleryIndex((prev) => (prev - 1 + data.gallery.length) % data.gallery.length);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-8 bg-[#0F172A]/80 backdrop-blur-xl"
        onClick={onClose}
      >
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
          className="bg-white dark:bg-slate-900 rounded-[2.5rem] w-full max-w-5xl max-h-[95vh] overflow-hidden flex flex-col md:flex-row shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] border border-white/10 relative"
        >
          {/* Progress Bar */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8 }}
            className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 via-blue-500 to-indigo-500 origin-left z-[1001]"
          />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-[1010] p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 transition-all hover:rotate-90 duration-500 group"
          >
            <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>

          {/* Left Sidebar: Brand Identity */}
          <div className="md:w-5/12 relative h-80 md:h-auto overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#16284F] via-[#16284F]/90 to-teal-900/50 mix-blend-multiply z-10"></div>

            <motion.img
              initial={{ scale: 1.3, filter: 'blur(10px)' }}
              animate={{ scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1.8, ease: "easeOut" }}
              src={getImageUrl(isPartner ? data.logo : data.image, isPartner ? 'logo' : 'image')}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              alt={data.company_name}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/20 to-transparent z-20"></div>

            <div className="absolute bottom-12 left-10 right-10 z-30">
              <motion.div variants={itemVariants} className="space-y-4">
                <span className="px-4 py-1.5 rounded-full bg-teal-500/20 text-teal-400 text-[10px] font-black tracking-[0.3em] border border-teal-500/30 uppercase backdrop-blur-md inline-flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mr-2 animate-pulse" />
                  {isPartner ? data.partnership_type : 'VISIONARY INVESTOR'}
                </span>
                <h2 className="text-4xl md:text-5xl font-black text-white leading-[1.1] tracking-tighter">
                  {data.company_name}
                </h2>
              </motion.div>
            </div>
          </div>

          {/* Right Content: Premium Details */}
          <div className="md:w-7/12 p-8 md:p-14 overflow-y-auto bg-slate-50/10 dark:bg-[#0B1120] custom-scrollbar selection:bg-teal-500/30">

            <div className="space-y-12">

              {/* Refined Metadata - No Cards */}
              <motion.div variants={itemVariants} className="grid grid-cols-2 gap-y-8 gap-x-12 pb-8 border-b border-slate-200/50 dark:border-white/5">
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center">
                    <MdLocationOn className="mr-2 text-teal-500" size={16} /> HQ / ZONE
                  </p>
                  <p className="text-[#16284F] dark:text-white font-bold text-sm tracking-tight">{data.zone}</p>
                </div>

                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center">
                    <FaIndustry className="mr-2 text-blue-500" size={14} /> DOMAIN
                  </p>
                  <p className="text-[#16284F] dark:text-white font-bold text-sm tracking-tight truncate">{data.industry_type || 'Technology Services'}</p>
                </div>

                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center">
                    <FaCalendarAlt className="mr-2 text-indigo-500" size={14} /> {isPartner ? 'PARTNERSHIP' : 'ESTABLISHED'}
                  </p>
                  <p className="text-[#16284F] dark:text-white font-bold text-sm tracking-tight">
                    {isPartner ? `${formatDate(data.agreement_start_date)}` : formatDate(data.established_date)}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">STATUS</p>
                  <div className="flex items-center">
                    <span className="w-2 h-2 rounded-full bg-teal-500 mr-2 shadow-[0_0_8px_rgba(20,184,166,0.6)]" />
                    <p className="text-[#16284F] dark:text-white font-bold text-sm tracking-tight uppercase">
                      {data.status || data.availability_status}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Narrative Overview */}
              <motion.div variants={itemVariants}>
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">The Strategic Perspective</h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm font-medium">
                  {data.description || "Driving the future of technology in Ethiopia through strategic collaboration and visionary investment at the ITPC ecosystem."}
                </p>
              </motion.div>

              {/* Core Services */}
              {isPartner && data.services_provided && data.services_provided.length > 0 && (
                <motion.div variants={itemVariants}>
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-5">Core Capabilities</h3>
                  <div className="flex flex-wrap gap-2">
                    {data.services_provided.map((s: string, idx: number) => (
                      <span key={idx} className="px-4 py-2 bg-slate-100 dark:bg-white/5 text-[#1E293B] dark:text-slate-200 text-[10px] font-black rounded-lg hover:bg-teal-500 hover:text-white transition-all cursor-default uppercase tracking-wider">
                        {s}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Slider Gallery */}
              {data.gallery && data.gallery.length > 0 && (
                <motion.div variants={itemVariants} className="relative group/gallery">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Ecosystem Gallery</h3>
                    <div className="flex space-x-2">
                      <button onClick={prevSlide} className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center hover:bg-teal-500 hover:text-white transition-all">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                      </button>
                      <button onClick={nextSlide} className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center hover:bg-teal-500 hover:text-white transition-all">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                      </button>
                    </div>
                  </div>

                  <div className="relative aspect-[16/9] rounded-[2rem] overflow-hidden shadow-2xl border border-white/10">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={galleryIndex}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        src={data.gallery[galleryIndex].startsWith('http') ? data.gallery[galleryIndex] : `${BACKEND_URL}${data.gallery[galleryIndex]}`}
                        className="w-full h-full object-cover cursor-zoom-in"
                        onClick={() => setFullScoreImg(data.gallery[galleryIndex].startsWith('http') ? data.gallery[galleryIndex] : `${BACKEND_URL}${data.gallery[galleryIndex]}`)}
                      />
                    </AnimatePresence>

                    {/* Index Indicator */}
                    <div className="absolute bottom-6 right-6 px-4 py-2 bg-black/40 backdrop-blur-md rounded-full text-white text-[10px] font-black tracking-widest z-20">
                      {galleryIndex + 1} / {data.gallery.length}
                    </div>
                  </div>

                  {/* Thumbnails */}
                  <div className="mt-4 flex space-x-3 overflow-x-auto pb-4 custom-scrollbar">
                    {data.gallery.map((img: string, idx: number) => (
                      <button
                        key={idx}
                        onClick={() => setGalleryIndex(idx)}
                        className={`flex-shrink-0 w-20 h-14 rounded-xl overflow-hidden border-2 transition-all ${galleryIndex === idx ? 'border-teal-500 scale-105 shadow-lg' : 'border-transparent opacity-50 hover:opacity-100'}`}
                      >
                        <img src={img.startsWith('http') ? img : `${BACKEND_URL}${img}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Action Footer */}
              <motion.div variants={itemVariants} className="pt-10 border-t border-slate-200 dark:border-white/5 flex items-center justify-between">
                <div className="flex space-x-6">
                  {[
                    { icon: FaLinkedin, link: data.linkedin, color: 'hover:text-[#0077B5]' },
                    { icon: FaTwitter, link: data.twitter, color: 'hover:text-[#1DA1F2]' },
                    { icon: FaFacebook, link: data.facebook, color: 'hover:text-[#1877F2]' },
                    { icon: FaGlobe, link: data.website, color: 'hover:text-teal-500' }
                  ].map((social, idx) => (social.link && social.link.trim() !== "") && (
                    <a
                      key={idx}
                      href={social.link.trim().startsWith('http') ? social.link.trim() : `https://${social.link.trim()}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-slate-400 transition-all transform hover:-translate-y-1 ${social.color}`}
                    >
                      <social.icon size={22} />
                    </a>
                  ))}
                </div>

                <div className="flex space-x-4">
                  {isPartner ? (
                    <a href={`mailto:${data.contact_email}`} className="bg-[#16284F] text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:shadow-xl transition-all">
                      Inquire Partner
                    </a>
                  ) : (
                    data.website && (
                      <a href={data.website.startsWith('http') ? data.website : `https://${data.website}`} target="_blank" rel="noopener noreferrer" className="bg-teal-600 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:shadow-xl transition-all flex items-center">
                        Visit Entity <FaChevronRight className="ml-2 w-2 h-2" />
                      </a>
                    )
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Fullscreen Image View */}
      <AnimatePresence>
        {fullScoreImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4"
            onClick={() => setFullScoreImg(null)}
          >
            <button className="absolute top-10 right-10 text-white hover:rotate-90 transition-transform duration-500">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            <motion.img
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              src={fullScoreImg}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};


export default PartnersInvestors;
