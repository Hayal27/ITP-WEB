import React from 'react';
import { ApplicationFormData } from '../ApplicationForm';
import { FaUserAlt, FaBriefcase, FaGraduationCap, FaTools, FaFileAlt, FaEnvelopeOpenText, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

interface ReviewSubmitStepProps {
  formData: ApplicationFormData;
  jobTitle: string;
}

const ReviewSubmitStep: React.FC<ReviewSubmitStepProps> = ({ formData, jobTitle }) => {
  const { personalDetails, workExperience, education, skills, resume, coverLetter } = formData;

  const DetailRow = ({ label, value, icon }: { label: string, value: string, icon?: React.ReactNode }) => (
    <div className="flex items-start gap-4 py-3 border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors px-2 rounded-xl">
      {icon && <div className="text-blue-500 mt-1">{icon}</div>}
      <div>
        <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">{label}</p>
        <p className="font-bold text-gray-900 leading-tight">{value || 'Not provided'}</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-10 fade-up">
      <div className="bg-blue-600 rounded-[2rem] p-8 text-white shadow-2xl shadow-blue-500/20">
        <div className="flex items-center gap-4 mb-2">
          <FaCheckCircle className="text-blue-200" size={20} />
          <h4 className="text-xl font-black uppercase tracking-tight">Final Verification</h4>
        </div>
        <p className="text-blue-100 text-xs font-medium opacity-80 leading-relaxed">
          You are applying for the <span className="text-white font-black underline decoration-blue-400 underline-offset-4">{jobTitle}</span> position. Please ensure all details below reflect your professional background accurately.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Info */}
        <div className="space-y-4">
          <h5 className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 mb-2">
            <FaUserAlt className="text-blue-500" /> Identity Details
          </h5>
          <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
            <DetailRow label="Full Name" value={personalDetails.fullName} />
            <div className="grid grid-cols-2 gap-4">
              <DetailRow label="Primary Email" value={personalDetails.email} />
              <DetailRow label="Gender Identity" value={personalDetails.gender} />
            </div>
            <DetailRow label="Phone Number" value={personalDetails.phone} />
            <DetailRow label="Current City" value={personalDetails.address} />
          </div>
        </div>

        {/* Professional Summary */}
        <div className="space-y-4">
          <h5 className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 mb-2">
            <FaTools className="text-blue-500" /> Competency Summary
          </h5>
          <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
            <div className="mb-6">
              <p className="text-[10px] font-black uppercase text-gray-400 mb-3 tracking-widest">Core Skills</p>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                  <span key={i} className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tight">{skill}</span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase text-gray-400 mb-3 tracking-widest">Attached Document</p>
              <div className="flex items-center gap-3 bg-blue-50 text-blue-600 p-3 rounded-2xl border border-blue-100">
                <FaFileAlt />
                <span className="text-xs font-black truncate">{resume?.name || 'No file attached'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Experience Timeline */}
      <div className="space-y-4">
        <h5 className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 mb-2">
          <FaBriefcase className="text-blue-500" /> Experience Timeline
        </h5>
        <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm space-y-6">
          {workExperience.length > 0 ? workExperience.map((exp, i) => (
            <div key={i} className="flex gap-6 group">
              <div className="flex flex-col items-center">
                <div className="w-4 h-4 rounded-full bg-blue-500 ring-4 ring-blue-100 mb-1 group-hover:scale-125 transition-transform" />
                {i !== workExperience.length - 1 && <div className="w-0.5 grow bg-gray-100" />}
              </div>
              <div className="pb-8">
                <h6 className="font-black text-gray-900 uppercase text-sm leading-none mb-1">{exp.jobTitle}</h6>
                <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-2">{exp.companyName}</p>
                <p className="text-xs font-medium text-gray-400 uppercase tracking-tighter">{exp.startDate} — {exp.isCurrent ? 'Present' : exp.endDate}</p>
              </div>
            </div>
          )) : <p className="text-xs font-bold text-gray-400 uppercase italic">No history provided...</p>}
        </div>
      </div>

      <div className="bg-orange-50 border border-orange-100 rounded-3xl p-6 flex gap-4">
        <FaExclamationTriangle className="text-orange-400 shrink-0 mt-1" />
        <p className="text-[11px] font-bold text-orange-700 leading-relaxed uppercase tracking-tight">
          Compliance Note: By submitting, you certify that all information is truthful. Providing false details may lead to immediate disqualification or termination.
        </p>
      </div>
    </div>
  );
};

export default ReviewSubmitStep;