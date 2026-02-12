import React from 'react';
import { ApplicationFormData } from '../types';
import { FaUserAlt, FaBriefcase, FaGraduationCap, FaTools, FaFileAlt, FaEnvelopeOpenText, FaCheckCircle, FaExclamationTriangle, FaShieldAlt } from 'react-icons/fa';
import ReCAPTCHA from "react-google-recaptcha";

interface ReviewSubmitStepProps {
  formData: ApplicationFormData;
  jobTitle: string;
  onCaptchaVerify: (token: string | null) => void;
}

const ReviewSubmitStep: React.FC<ReviewSubmitStepProps> = ({ formData, jobTitle, onCaptchaVerify }) => {
  const { personalDetails, workExperience, education, skills, resume, coverLetter } = formData;

  const DetailRow = ({ label, value, icon }: { label: string, value: string, icon?: React.ReactNode }) => (
    <div className="flex items-start gap-4 py-3 border-b border-[var(--border-color)] last:border-0 hover:bg-[var(--bg-main)]/50 transition-colors px-2 rounded-xl">
      {icon && <div className="text-[var(--primary)] mt-1">{icon}</div>}
      <div>
        <p className="text-[10px] font-black uppercase text-[var(--text-muted)] tracking-widest">{label}</p>
        <p className="font-bold text-[var(--text-main)] leading-tight">{value || 'Not provided'}</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-10 fade-up">
      <div className="bg-[var(--primary)] rounded-[2rem] p-8 text-white shadow-2xl shadow-[var(--primary)]/20">
        <div className="flex items-center gap-4 mb-2">
          <FaCheckCircle className="text-white/80" size={20} />
          <h4 className="text-xl font-black uppercase tracking-tight">Final Verification</h4>
        </div>
        <p className="text-white/80 text-xs font-medium leading-relaxed">
          You are applying for the <span className="text-white font-black underline decoration-white/40 underline-offset-4">{jobTitle}</span> position. Please ensure all details below reflect your professional background accurately.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Info */}
        <div className="space-y-4">
          <h5 className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[var(--text-muted)] mb-2">
            <FaUserAlt className="text-[var(--primary)]" /> Identity Details
          </h5>
          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl p-6 shadow-sm">
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
          <h5 className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[var(--text-muted)] mb-2">
            <FaTools className="text-[var(--primary)]" /> Competency Summary
          </h5>
          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl p-6 shadow-sm">
            <div className="mb-6">
              <p className="text-[10px] font-black uppercase text-[var(--text-muted)] mb-3 tracking-widest">Core Skills</p>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                  <span key={i} className="bg-[var(--bg-main)] text-[var(--text-main)] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tight border border-[var(--border-color)]">{skill}</span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase text-[var(--text-muted)] mb-3 tracking-widest">Attached Document</p>
              <div className="flex items-center gap-3 bg-[var(--primary)]/10 text-[var(--accent)] p-3 rounded-2xl border border-[var(--primary)]/20">
                <FaFileAlt />
                <span className="text-xs font-black truncate">{resume?.name || 'No file attached'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Experience Timeline */}
      <div className="space-y-4">
        <h5 className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[var(--text-muted)] mb-2">
          <FaBriefcase className="text-[var(--primary)]" /> Experience Timeline
        </h5>
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[2.5rem] p-8 shadow-sm space-y-6">
          {workExperience.length > 0 ? workExperience.map((exp, i) => (
            <div key={i} className="flex gap-6 group">
              <div className="flex flex-col items-center">
                <div className="w-4 h-4 rounded-full bg-[var(--primary)] ring-4 ring-[var(--primary)]/10 mb-1 group-hover:scale-125 transition-transform" />
                {i !== workExperience.length - 1 && <div className="w-0.5 grow bg-[var(--border-color)]" />}
              </div>
              <div className="pb-8">
                <h6 className="font-black text-[var(--text-main)] uppercase text-sm leading-none mb-1">{exp.jobTitle}</h6>
                <p className="text-[10px] font-bold text-[var(--accent)] uppercase tracking-widest mb-2">{exp.companyName}</p>
                <p className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-tighter">{exp.startDate} — {exp.isCurrent ? 'Present' : exp.endDate}</p>
              </div>
            </div>
          )) : <p className="text-xs font-bold text-[var(--text-muted)] uppercase italic">No history provided...</p>}
        </div>
      </div>

      <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[2rem] p-8 shadow-sm">
        <h5 className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[var(--text-muted)] mb-6">
          <FaShieldAlt className="text-[var(--primary)]" /> Security Verification
        </h5>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="flex-1">
            <p className="text-[11px] font-bold text-[var(--text-main)] mb-2 uppercase tracking-tight">Are you human?</p>
            <p className="text-[10px] text-[var(--text-muted)] font-medium uppercase leading-relaxed">Please enter the security code shown to complete the transmission protocol.</p>
          </div>
          <div className="w-full md:w-auto p-4 rounded-2xl border border-[var(--border-color)] flex justify-center bg-white">
            <ReCAPTCHA
              sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" // Google test key
              onChange={onCaptchaVerify}
            />
          </div>
        </div>
      </div>

      <div className="bg-orange-500/10 border border-orange-500/20 rounded-3xl p-6 flex gap-4">
        <FaExclamationTriangle className="text-orange-500 shrink-0 mt-1" />
        <p className="text-[11px] font-bold text-orange-500 leading-relaxed uppercase tracking-tight">
          Compliance Note: By submitting, you certify that all information is truthful. Providing false details may lead to immediate disqualification or termination.
        </p>
      </div>
    </div>
  );
};

export default ReviewSubmitStep;