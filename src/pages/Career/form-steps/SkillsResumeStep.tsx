import React, { useState } from 'react';
import { FaUpload, FaTimesCircle, FaPlus, FaCheckCircle, FaFileCode, FaEnvelopeOpenText } from 'react-icons/fa';

interface SkillsResumeStepProps {
  skills: string[];
  resume: File | null;
  coverLetter: string;
  onSkillsChange: (skills: string[]) => void;
  onResumeChange: (file: File | null) => void;
  onCoverLetterChange: (text: string) => void;
}

const SkillsResumeStep: React.FC<SkillsResumeStepProps> = ({
  skills,
  resume,
  coverLetter,
  onSkillsChange,
  onResumeChange,
  onCoverLetterChange,
}) => {
  const [currentSkill, setCurrentSkill] = useState('');

  const handleAddSkill = () => {
    if (currentSkill.trim() && !skills.includes(currentSkill.trim())) {
      onSkillsChange([...skills, currentSkill.trim()]);
      setCurrentSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    onSkillsChange(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onResumeChange(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-10 fade-up">
      {/* Skills Section */}
      <div className="space-y-4">
        <label className="itpc-label">Technical & Core Skills</label>
        <div className="flex gap-3">
          <input
            type="text"
            value={currentSkill}
            onChange={(e) => setCurrentSkill(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
            placeholder="e.g. React, Python, Leadership"
            className="itpc-input !rounded-2xl"
          />
          <button
            type="button"
            onClick={handleAddSkill}
            className="bg-[var(--primary)] text-white px-6 rounded-2xl hover:bg-[var(--secondary)] transition-all shadow-lg active:scale-95 flex items-center justify-center"
          >
            <FaPlus />
          </button>
        </div>
        <div className="flex flex-wrap gap-2 pt-2">
          {skills.map((skill) => (
            <span key={skill} className="bg-[var(--primary)]/10 text-[var(--accent)] pl-4 pr-2 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border border-[var(--primary)]/20 flex items-center gap-2 group hover:bg-[var(--primary)] hover:text-white transition-all">
              {skill}
              <button
                type="button"
                onClick={() => handleRemoveSkill(skill)}
                className="text-[var(--primary)] group-hover:text-white transition-colors opacity-50 group-hover:opacity-100"
                title="Remove Skill"
              >
                <FaTimesCircle />
              </button>
            </span>
          ))}
          {skills.length === 0 && <p className="text-[10px] uppercase font-black text-[var(--text-muted)] italic">No skills added yet...</p>}
        </div>
      </div>

      {/* Resume Upload */}
      <div className="space-y-4">
        <label className="itpc-label">Resume / CV Document *</label>
        <div className={`relative group cursor-pointer ${resume ? 'border-[var(--primary)] bg-[var(--primary)]/5' : 'border-[var(--border-color)]'} border-2 border-dashed rounded-[2.5rem] transition-all p-10 hover:border-[var(--primary)] hover:bg-[var(--primary)]/5`}>
          <input
            type="file"
            id="resumeUpload"
            accept=".pdf,.doc,.docx"
            onChange={handleResumeUpload}
            className="absolute inset-0 opacity-0 cursor-pointer z-10"
          />
          <div className="flex flex-col items-center justify-center text-center space-y-4 relative z-0">
            <div className={`w-16 h-16 rounded-3xl ${resume ? 'bg-[var(--primary)] text-white' : 'bg-[var(--bg-main)] text-[var(--text-muted)]'} flex items-center justify-center shadow-2xl transition-all`}>
              {resume ? <FaCheckCircle size={30} /> : <FaUpload size={24} />}
            </div>
            <div>
              <h5 className="font-black uppercase tracking-widest text-sm text-[var(--text-main)]">
                {resume ? resume.name : 'Upload your CV'}
              </h5>
              <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-tighter mt-1">
                {resume ?
                  `${(resume.size / 1024 / 1024).toFixed(2)} MB • ${resume.size > 10 * 1024 * 1024 ? '🚨 File too large' : 'Ready to submit'}`
                  : 'PDF, DOC, DOCX up to 10MB'}
              </p>
              {resume && resume.size > 10 * 1024 * 1024 && (
                <p className="text-[9px] font-black text-red-500 uppercase tracking-widest mt-2">
                  Please select a file smaller than 10MB
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Cover Letter */}
      <div className="space-y-4">
        <label className="itpc-label flex items-center gap-2"><FaEnvelopeOpenText className="text-blue-500" /> Professional Pitch (Optional)</label>
        <textarea
          value={coverLetter}
          onChange={(e) => onCoverLetterChange(e.target.value)}
          rows={6}
          className="itpc-input !rounded-[2rem]"
          placeholder="Briefly explain why you are the perfect candidate for this role..."
        ></textarea>
      </div>
    </div>
  );
};

export default SkillsResumeStep;