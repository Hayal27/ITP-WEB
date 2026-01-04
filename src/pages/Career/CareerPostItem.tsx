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
    <div className={`career-card group relative bg-white border border-gray-100 rounded-[2rem] overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1 ${isExpanded ? 'ring-2 ring-blue-500/20' : ''}`}>
      {/* Decorative Gradient Background */}
      <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/5 to-transparent rounded-full -mr-20 -mt-20 transition-transform duration-700 ${isExpanded ? 'scale-150' : 'group-hover:scale-110'}`}></div>

      <div className="p-8 md:p-10 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border border-blue-100">
                {job.department}
              </span>
              <span className="bg-gray-50 text-gray-500 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border border-gray-100 flex items-center gap-1">
                <FaBriefcase size={8} /> {job.type}
              </span>
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight group-hover:text-blue-600 transition-colors uppercase tracking-tight">
              {job.title}
            </h3>
            <div className="flex flex-wrap items-center gap-6 text-xs font-bold text-gray-400">
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-blue-500" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <FaClock className="text-gray-300" />
                  <span>Posted {new Date(job.postedDate).toLocaleDateString()}</span>
                </div>
                {job.startDate && (
                  <div className="flex items-center gap-2">
                    <span className="text-blue-500">Starts:</span>
                    <span>{new Date(job.startDate).toLocaleDateString()}</span>
                  </div>
                )}
                {job.deadline && (
                  <div className="flex items-center gap-2">
                    <span className="text-red-500">Deadline:</span>
                    <span className={new Date(job.deadline) < new Date() ? 'text-red-600 line-through' : ''}>
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
                className="bg-gray-200 text-gray-400 px-8 h-12 rounded-2xl font-black text-[10px] uppercase tracking-widest cursor-not-allowed flex items-center gap-3"
              >
                Applications Closed <FaTimesCircle />
              </button>
            ) : job.startDate && new Date(job.startDate) > new Date() ? (
              <button
                disabled
                className="bg-gray-100 text-gray-400 px-8 h-12 rounded-2xl font-black text-[10px] uppercase tracking-widest cursor-not-allowed flex items-center gap-3"
              >
                Not Yet Open <FaClock />
              </button>
            ) : (
              <>
                <button
                  onClick={toggleExpand}
                  className={`w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center transition-all ${isExpanded ? 'bg-blue-600 text-white border-blue-600 ring-4 ring-blue-100' : 'bg-white text-gray-400 hover:border-blue-500 hover:text-blue-500'}`}
                >
                  {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); onApplyNow(job); }}
                  className="bg-slate-900 group-hover:bg-blue-600 text-white px-8 h-12 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-xl shadow-slate-900/10 active:scale-95 flex items-center gap-3"
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-8 border-t border-gray-100">
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-black uppercase tracking-widest text-blue-500 mb-2">The Mission</h4>
                  <p className="text-gray-600 leading-relaxed font-medium">{job.description}</p>
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <h4 className="text-xs font-black uppercase tracking-widest text-blue-500 mb-4">Core Responsibilities</h4>
                  <ul className="space-y-3">
                    {job.responsibilities.map((resp, index) => (
                      <li key={index} className="flex gap-3 text-sm text-gray-600 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0"></span>
                        {resp}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-black uppercase tracking-widest text-blue-500 mb-4">Who You Are</h4>
                  <ul className="space-y-3">
                    {job.qualifications.map((qual, index) => (
                      <li key={index} className="flex gap-3 text-sm text-gray-600 font-medium">
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