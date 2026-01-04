import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CareerPostList from './CareerPostList';
import ApplicationForm from './ApplicationForm';
import { getCareerJobs, trackApplication, TrackingStatus } from '../../services/apiService';
import { FaSearch, FaBriefcase, FaSatellite, FaCheckCircle, FaTimesCircle, FaClock, FaSpinner } from 'react-icons/fa';
import './Career.css';

export interface JobPost {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  responsibilities: string[];
  qualifications: string[];
  postedDate: string;
  startDate?: string;
  deadline?: string;
}

const CareerPage: React.FC = () => {
  const [jobPosts, setJobPosts] = useState<JobPost[]>([]);
  const [selectedJob, setSelectedJob] = useState<JobPost | null>(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [loading, setLoading] = useState(true);

  // Tracking State
  const [trackingCode, setTrackingCode] = useState('');
  const [trackingLoading, setTrackingLoading] = useState(false);
  const [trackingResult, setTrackingResult] = useState<TrackingStatus | null>(null);
  const [trackingError, setTrackingError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const data = await getCareerJobs();
      const formattedJobs: JobPost[] = data.map(j => ({
        id: j.id.toString(),
        title: j.title,
        department: j.department,
        location: j.location,
        type: j.type as any,
        description: j.description,
        responsibilities: j.responsibilities as string[],
        qualifications: j.qualifications as string[],
        postedDate: j.created_at || '',
        startDate: j.start_date,
        deadline: j.deadline
      }));
      setJobPosts(formattedJobs);
    } catch (err) {
      console.error("Failed to load jobs", err);
    } finally {
      setLoading(false);
    }
  };

  const handleApplyNow = (job: JobPost) => {
    setSelectedJob(job);
    setShowApplicationForm(true);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseForm = () => {
    setShowApplicationForm(false);
    setSelectedJob(null);
    document.body.style.overflow = 'auto';
  };

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingCode.trim()) return;

    setTrackingLoading(true);
    setTrackingError(null);
    setTrackingResult(null);

    try {
      const res = await trackApplication(trackingCode);
      setTrackingResult(res);
    } catch (err: any) {
      setTrackingError(err.message || "Tracking code not found");
    } finally {
      setTrackingLoading(false);
    }
  };

  return (
    <div className="career-page min-h-screen bg-gray-50">
      <header className="career-header bg-gradient-to-br from-[#16284F] to-[#0C7C92] py-20 px-6 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          <span className="bg-[#0C7C92]/20 text-[#0C7C92] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border border-[#0C7C92]/30">
            Join our Global Team
          </span>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight">Build the Future of <span className="text-[#0C7C92]">Tech.</span></h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto font-medium">
            We are looking for visionaries, creators, and problem solvers to help us shape the technological landscape in Ethiopia and beyond.
          </p>

          {/* Application Tracking UI */}
          <div className="mt-8 sm:mt-12 bg-white/5 backdrop-blur-xl p-4 sm:p-8 rounded-2xl sm:rounded-3xl border border-white/10 max-w-xl mx-auto shadow-2xl">
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#0C7C92] mb-3 sm:mb-4">Track Your Application</h3>
            <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-2 sm:gap-2">
              <input
                type="text"
                placeholder="Enter Tracking Code (e.g. ITPC-xxxx)"
                value={trackingCode}
                onChange={(e) => setTrackingCode(e.target.value)}
                className="w-full sm:flex-grow bg-black/30 border border-white/10 rounded-xl sm:rounded-2xl px-4 sm:px-5 py-3 outline-none focus:ring-2 focus:ring-[#0C7C92] transition-all text-white placeholder-gray-500 font-mono text-sm"
              />
              <button
                type="submit"
                disabled={trackingLoading}
                className="w-full sm:w-auto bg-[#16284F] hover:bg-[#0C7C92] text-white px-6 sm:px-8 py-3 rounded-xl sm:rounded-2xl font-bold transition-all shadow-lg shadow-[#16284F]/20 disabled:opacity-50 text-sm active:scale-95"
              >
                {trackingLoading ? <FaSpinner className="animate-spin mx-auto" /> : 'Track'}
              </button>
            </form>

            {trackingResult && (
              <div className="mt-4 sm:mt-6 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/10 border border-white/10 animate-in fade-in slide-in-from-top-4 duration-300">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-black uppercase text-gray-400">Position</span>
                  <span className="text-white font-bold text-sm break-words text-right max-w-[60%]">{trackingResult.jobTitle}</span>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-black uppercase text-gray-400">Status</span>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tight shadow-sm
                                ${trackingResult.status === 'pending' ? 'bg-gray-500 text-white' :
                      trackingResult.status === 'rejected' ? 'bg-red-500 text-white' :
                        'bg-green-500 text-white animate-pulse'}
                            `}>
                    {trackingResult.status}
                  </span>
                </div>

                <Link to="/career/status" className="block w-full text-center py-2.5 sm:py-2 rounded-xl bg-white/10 hover:bg-white/20 text-[#0C7C92] text-xs font-bold uppercase tracking-widest transition-all">
                  View Full Details & Map
                </Link>
              </div>
            )}
            {trackingError && (
              <p className="mt-3 sm:mt-4 text-red-400 text-xs font-bold bg-red-500/10 py-2 px-3 rounded-lg text-center">{trackingError}</p>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
          <div>
            <h2 className="text-3xl font-black text-gray-900">Current Openings</h2>
            <p className="text-gray-500 font-medium">Showing {jobPosts.filter(j =>
              (deptFilter === 'All' || j.department === deptFilter) &&
              (typeFilter === 'All' || j.type === typeFilter) &&
              (j.title.toLowerCase().includes(searchQuery.toLowerCase()) || j.department.toLowerCase().includes(searchQuery.toLowerCase()))
            ).length} active opportunities</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <div className="relative group min-w-[250px]">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#0C7C92] transition-colors" />
              <input
                type="text"
                placeholder="Search positions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-6 py-3 bg-white border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-[#0C7C92] shadow-sm transition-all text-sm font-bold"
              />
            </div>
            <select
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
              className="px-4 py-3 bg-white border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-[#0C7C92] shadow-sm text-sm font-bold appearance-none min-w-[150px]"
            >
              <option value="All">All Departments</option>
              {[...new Set(jobPosts.map(j => j.department))].map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-4 py-3 bg-white border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-[#0C7C92] shadow-sm text-sm font-bold appearance-none min-w-[150px]"
            >
              <option value="All">All Types</option>
              {['Full-time', 'Part-time', 'Contract', 'Internship'].map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400 space-y-4">
            <FaSpinner className="animate-spin text-4xl" />
            <p className="font-bold uppercase tracking-widest text-xs">Fetching Opportunities...</p>
          </div>
        ) : (
          <CareerPostList
            jobPosts={jobPosts.filter(j =>
              (deptFilter === 'All' || j.department === deptFilter) &&
              (typeFilter === 'All' || j.type === typeFilter) &&
              (j.title.toLowerCase().includes(searchQuery.toLowerCase()) || j.department.toLowerCase().includes(searchQuery.toLowerCase()))
            )}
            onApplyNow={handleApplyNow}
          />
        )}
      </main>

      {showApplicationForm && selectedJob && (
        <ApplicationForm job={selectedJob} onClose={handleCloseForm} />
      )}
    </div>
  );
};

export default CareerPage;
