import React, { useState } from 'react';
import { JobPost } from './Career';
import { FaMapMarkerAlt, FaBriefcase, FaCalendarAlt, FaChevronDown, FaChevronUp, FaArrowRight, FaClock, FaTimesCircle } from 'react-icons/fa';

interface CareerPostItemProps {
  job: JobPost;
  onApplyNow: (job: JobPost) => void;
}

const CareerPostItem: React.FC<CareerPostItemProps> = ({ job, onApplyNow }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`career-card group relative bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[2rem] overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-black/10 hover:-translate-y-1 ${isExpanded ? 'ring-2 ring-[var(--primary)]/20' : ''}`}>
      {/* Decorative Gradient Background */}
      <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[var(--primary)]/5 to-transparent rounded-full -mr-20 -mt-20 transition-transform duration-700 ${isExpanded ? 'scale-150' : 'group-hover:scale-110'}`}></div>

      <div className="p-8 md:p-10 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-[var(--primary)]/10 text-[var(--accent)] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border border-[var(--primary)]/20">
                {job.department}
              </span>
              <span className="bg-[var(--bg-main)] text-[var(--text-muted)] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border border-[var(--border-color)] flex items-center gap-1">
                <FaBriefcase size={8} /> {job.type}
              </span>
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-[var(--text-main)] leading-tight group-hover:text-[var(--primary)] transition-colors uppercase tracking-tight">
              {job.title}
            </h3>
            <div className="flex flex-wrap items-center gap-6 text-xs font-bold text-[var(--text-muted)]">
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-[var(--primary)]" />
                <span>{job.location}</span>
              </div>
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                <div className="flex items-center gap-2">
                  <FaClock className="text-[var(--text-muted)] opacity-50" />
                  <span className="text-xs sm:text-sm">Posted {new Date(job.postedDate).toLocaleDateString()}</span>
                </div>
                {job.startDate && (
                  <div className="flex items-center gap-2">
                    <span className="text-[var(--primary)] text-xs sm:text-sm font-bold">Starts:</span>
                    <span className="text-xs sm:text-sm">{new Date(job.startDate).toLocaleDateString()}</span>
                  </div>
                )}
                {job.deadline && (
                  <div className="flex items-center gap-2">
                    <span className="text-red-500 text-xs sm:text-sm font-bold">Deadline:</span>
                    <span className={`text-xs sm:text-sm ${new Date(job.deadline) < new Date() ? 'text-red-600 line-through' : 'text-[var(--text-main)]'}`}>
                      {new Date(job.deadline).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 self-start md:self-center">
            {job.deadline && new Date(job.deadline) < new Date() ? (
              <button
                disabled
                className="bg-[var(--bg-main)] text-[var(--text-muted)] px-8 h-12 rounded-2xl font-black text-[10px] uppercase tracking-widest cursor-not-allowed flex items-center gap-3 border border-[var(--border-color)]"
              >
                Applications Closed <FaTimesCircle />
              </button>
            ) : job.startDate && new Date(job.startDate) > new Date() ? (
              <button
                disabled
                className="bg-[var(--bg-main)] text-[var(--text-muted)] px-8 h-12 rounded-2xl font-black text-[10px] uppercase tracking-widest cursor-not-allowed flex items-center gap-3 border border-[var(--border-color)]"
              >
                Not Yet Open <FaClock />
              </button>
            ) : (
              <>
                <button
                  onClick={toggleExpand}
                  className={`w-12 h-12 rounded-full border border-[var(--border-color)] flex items-center justify-center transition-all ${isExpanded ? 'bg-[var(--primary)] text-white border-[var(--primary)] ring-4 ring-[var(--primary)]/10' : 'bg-[var(--bg-card)] text-[var(--text-muted)] hover:border-[var(--primary)] hover:text-[var(--primary)]'}`}
                >
                  {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); onApplyNow(job); }}
                  className="bg-[#16284F] hover:bg-[#0C7C92] text-white px-8 h-12 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-xl shadow-black/10 active:scale-95 flex items-center gap-3"
                >
                  Get Started <FaArrowRight />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Expanded Content */}
        <div className={`grid transition-all duration-500 ease-in-out ${isExpanded ? 'grid-rows-[1fr] opacity-100 mt-10' : 'grid-rows-[0fr] opacity-0'}`}>
          <div className="overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-8 border-t border-[var(--border-color)]">
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-black uppercase tracking-widest text-[var(--accent)] mb-2">The Mission</h4>
                  <p className="text-[var(--text-muted)] leading-relaxed font-medium">{job.description}</p>
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <h4 className="text-xs font-black uppercase tracking-widest text-[var(--accent)] mb-4">Core Responsibilities</h4>
                  <ul className="space-y-3">
                    {job.responsibilities.map((resp, index) => (
                      <li key={index} className="flex gap-3 text-sm text-[var(--text-muted)] font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] mt-1.5 shrink-0"></span>
                        {resp}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-black uppercase tracking-widest text-[var(--accent)] mb-4">Who You Are</h4>
                  <ul className="space-y-3">
                    {job.qualifications.map((qual, index) => (
                      <li key={index} className="flex gap-3 text-sm text-[var(--text-muted)] font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
                        {qual}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerPostItem;