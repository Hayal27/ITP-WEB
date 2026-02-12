import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CareerPostList from './CareerPostList';
import ApplicationForm from './ApplicationForm';
import { getCareerJobs, trackApplication, TrackingStatus } from '../../services/apiService';
import { FaSearch, FaBriefcase, FaSatellite, FaCheckCircle, FaTimesCircle, FaClock, FaSpinner } from 'react-icons/fa';
import './Career.css';

import { JobPost } from './types';

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
    // Auto-refresh logic to clear CSS pollution from other pages
    const hasRefreshed = sessionStorage.getItem('career_refreshed');
    if (!hasRefreshed) {
      sessionStorage.setItem('career_refreshed', 'true');
      window.location.reload();
      return;
    }

    fetchJobs();

    // Cleanup: Ensure body scroll is restored if component unmounts while modal is open
    return () => {
      document.body.style.overflow = 'auto';
    };
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
    <div className="career-page min-h-screen bg-[var(--bg-main)] pt-20">
      <header className="career-header bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0c7c92] py-16 sm:py-20 px-4 sm:px-6 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="relative z-10 max-w-4xl mx-auto space-y-4 sm:space-y-6">
          <span className="inline-block bg-white/10 text-white px-3 sm:px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest border border-white/20 backdrop-blur-sm">
            Join our Global Team
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight leading-tight">Build the Future of <span className="bg-gradient-to-r from-[#6ec9c4] to-[#3b82f6] bg-clip-text text-transparent">Tech.</span></h1>
          <p className="text-sm sm:text-base md:text-lg text-white/80 max-w-2xl mx-auto font-medium leading-relaxed px-4">
            We are looking for visionaries, creators, and problem solvers to help us shape the technological landscape in Ethiopia and beyond.
          </p>

          {/* Application Tracking UI */}
          <div className="mt-6 sm:mt-8 md:mt-12 bg-white/5 backdrop-blur-xl p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border border-white/10 max-w-xl mx-auto shadow-2xl">
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-white/90 mb-3 sm:mb-4">Track Your Application</h3>
            <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                placeholder="Enter Tracking Code (e.g. ITPC-xxxx)"
                value={trackingCode}
                onChange={(e) => setTrackingCode(e.target.value)}
                className="w-full sm:flex-grow bg-black/30 border border-white/10 rounded-xl sm:rounded-2xl px-4 sm:px-5 py-3 outline-none focus:ring-2 focus:ring-white/30 transition-all text-white placeholder-white/40 font-mono text-sm"
              />
              <button
                type="submit"
                disabled={trackingLoading}
                className="w-full sm:w-auto bg-white/20 hover:bg-white/30 text-white px-6 sm:px-8 py-3 rounded-xl sm:rounded-2xl font-bold transition-all shadow-lg backdrop-blur-sm disabled:opacity-50 text-sm active:scale-95 border border-white/10"
              >
                {trackingLoading ? <FaSpinner className="animate-spin mx-auto" /> : 'Track'}
              </button>
            </form>

            {trackingResult && (
              <div className="mt-4 sm:mt-6 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/10 border border-white/10 animate-in fade-in slide-in-from-top-4 duration-300">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-black uppercase text-white/60">Position</span>
                  <span className="text-white font-bold text-sm break-words text-right max-w-[60%]">{trackingResult.jobTitle}</span>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-black uppercase text-white/60">Status</span>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tight shadow-sm
                                ${trackingResult.status === 'pending' ? 'bg-yellow-500 text-white' :
                      trackingResult.status === 'rejected' ? 'bg-red-500 text-white' :
                        'bg-green-500 text-white animate-pulse'}
                            `}>
                    {trackingResult.status}
                  </span>
                </div>

                <Link to="/career/status" className="block w-full text-center py-2.5 sm:py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-widest transition-all">
                  View Full Details & Map
                </Link>
              </div>
            )}
            {trackingError && (
              <p className="mt-3 sm:mt-4 text-red-200 text-xs font-bold bg-red-500/20 py-2 px-3 rounded-lg text-center border border-red-400/20">{trackingError}</p>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
          <div>
            <h2 className="text-3xl font-black text-[var(--text-main)]">Current Openings</h2>
            <p className="text-[var(--text-muted)] font-medium">Showing {jobPosts.filter(j =>
              (deptFilter === 'All' || j.department === deptFilter) &&
              (typeFilter === 'All' || j.type === typeFilter) &&
              (j.title.toLowerCase().includes(searchQuery.toLowerCase()) || j.department.toLowerCase().includes(searchQuery.toLowerCase()))
            ).length} active opportunities</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <div className="relative group min-w-[250px]">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] group-focus-within:text-[var(--primary)] transition-colors" />
              <input
                type="text"
                placeholder="Search positions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-6 py-3 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl outline-none focus:ring-2 focus:ring-[var(--primary)] shadow-sm transition-all text-sm font-bold text-[var(--text-main)]"
              />
            </div>
            <select
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
              className="px-4 py-3 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl outline-none focus:ring-2 focus:ring-[var(--primary)] shadow-sm text-sm font-bold appearance-none min-w-[150px] text-[var(--text-main)]"
            >
              <option value="All">All Departments</option>
              {[...new Set(jobPosts.map(j => j.department))].map(d => (
                <option key={d} value={d} className="bg-[var(--bg-card)]">{d}</option>
              ))}
            </select>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-4 py-3 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl outline-none focus:ring-2 focus:ring-[var(--primary)] shadow-sm text-sm font-bold appearance-none min-w-[150px] text-[var(--text-main)]"
            >
              <option value="All">All Types</option>
              {['Full-time', 'Part-time', 'Contract', 'Internship'].map(t => (
                <option key={t} value={t} className="bg-[var(--bg-card)]">{t}</option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-[var(--text-muted)] space-y-4">
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

      {
        showApplicationForm && selectedJob && (
          <ApplicationForm job={selectedJob} onClose={handleCloseForm} />
        )
      }
    </div >
  );
};

export default CareerPage;
