import React, { useState } from 'react';
import { JobPost } from './Career';
import PersonalDetailsStep from './form-steps/PersonalDetailsStep';
import WorkExperienceStep, { WorkExperience } from './form-steps/WorkExperienceStep';
import EducationStep, { Education } from './form-steps/EducationStep';
import SkillsResumeStep from './form-steps/SkillsResumeStep';
import ReviewSubmitStep from './form-steps/ReviewSubmitStep';
import { FaTimes, FaCheckCircle, FaSpinner, FaCopy } from 'react-icons/fa';
import { applyForJob } from '../../services/apiService';
import { notifications } from '@mantine/notifications';

export interface ApplicationFormData {
  personalDetails: {
    fullName: string;
    email: string;
    phone: string;
    gender: string;
    address: string;
    linkedin?: string;
    portfolio?: string;
  };
  workExperience: WorkExperience[];
  education: Education[];
  skills: string[];
  resume: File | null;
  coverLetter?: string;
}

interface ApplicationFormProps {
  job: JobPost;
  onClose: () => void;
}

const TOTAL_STEPS = 5;

const ApplicationForm: React.FC<ApplicationFormProps> = ({ job, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [trackingCode, setTrackingCode] = useState<string | null>(null);
  const [formData, setFormData] = useState<ApplicationFormData>({
    personalDetails: { fullName: '', email: '', phone: '', gender: '', address: '' },
    workExperience: [],
    education: [],
    skills: [],
    resume: null,
    coverLetter: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (currentStep === 1) {
      if (!formData.personalDetails.fullName) newErrors.fullName = "Full name is required.";
      if (!formData.personalDetails.email) newErrors.email = "Email is required.";
      else if (!/\S+@\S+\.\S+/.test(formData.personalDetails.email)) newErrors.email = "Email is invalid.";
      if (!formData.personalDetails.phone) newErrors.phone = "Phone number is required.";
      if (!formData.personalDetails.gender) newErrors.gender = "Gender is required.";
    }
    if (currentStep === 4) {
      if (!formData.resume) newErrors.resume = "Resume is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) {
      setCurrentStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleChange = (section: keyof ApplicationFormData, data: any) => {
    setFormData((prev) => ({ ...prev, [section]: data }));
  };

  const handlePersonalDetailsChange = (data: ApplicationFormData['personalDetails']) => {
    setFormData(prev => ({ ...prev, personalDetails: data }));
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;

    setLoading(true);
    try {
      const payload = new FormData();
      payload.append('jobId', job.id);
      payload.append('fullName', formData.personalDetails.fullName);
      payload.append('email', formData.personalDetails.email);
      payload.append('gender', formData.personalDetails.gender);
      payload.append('phone', formData.personalDetails.phone);
      payload.append('address', formData.personalDetails.address);
      if (formData.personalDetails.linkedin) payload.append('linkedin', formData.personalDetails.linkedin);
      if (formData.personalDetails.portfolio) payload.append('portfolio', formData.personalDetails.portfolio);
      if (formData.resume) payload.append('resume', formData.resume);
      if (formData.coverLetter) payload.append('coverLetter', formData.coverLetter);

      // Detailed Data
      payload.append('education', JSON.stringify(formData.education));
      payload.append('workExperience', JSON.stringify(formData.workExperience));
      payload.append('skills', JSON.stringify(formData.skills));

      const response = await applyForJob(payload);
      if (response.success) {
        setTrackingCode(response.trackingCode);
        notifications.show({
          title: 'Success',
          message: 'Application received. Your tracking code is ' + response.trackingCode,
          color: 'green',
        });
      }
    } catch (err: any) {
      notifications.show({
        title: 'Error',
        message: err.message || "Failed to submit application",
        color: 'red',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (trackingCode) {
      navigator.clipboard.writeText(trackingCode);
      notifications.show({
        title: 'Copied',
        message: 'Tracking code copied to clipboard!',
        color: 'blue',
      });
    }
  };

  if (trackingCode) {
    return (
      <div className="application-form-modal fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6">
        <div className="modal-content w-full max-w-sm bg-white rounded-3xl sm:rounded-[32px] shadow-2xl text-center py-12 sm:py-20 px-6 sm:px-10">
          <div className="mb-6 sm:mb-8 relative inline-block">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-blue-50 text-blue-600 rounded-3xl sm:rounded-[2rem] flex items-center justify-center mx-auto relative z-10 shadow-xl shadow-blue-500/10">
              <FaCheckCircle size={40} className="sm:w-12 sm:h-12" />
            </div>
            <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full scale-150 animate-pulse"></div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-2 sm:mb-3 tracking-tight">Application Received</h2>
          <p className="text-gray-500 mb-8 sm:mb-10 font-medium text-[10px] sm:text-xs uppercase tracking-widest leading-loose px-2">Mission protocol initialized. Our talent acquisition team will review your profile shortly.</p>

          <div className="bg-slate-50 border border-slate-100 rounded-2xl sm:rounded-[2rem] p-6 sm:p-8 mb-8 sm:mb-10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-700"></div>
            <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 mb-3 sm:mb-4">Transmission ID</p>
            <div className="flex items-center justify-center gap-3 sm:gap-4 bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-sm border border-slate-100">
              <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-widest font-mono break-all">{trackingCode}</span>
              <button onClick={handleCopy} className="text-slate-300 hover:text-blue-600 transition-colors p-2 shrink-0" title="Copy Code">
                <FaCopy size={14} />
              </button>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full bg-slate-900 text-white px-8 sm:px-12 py-4 sm:py-5 rounded-xl sm:rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-black transition-all shadow-2xl active:scale-95"
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    );
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <PersonalDetailsStep data={formData.personalDetails} onChange={handlePersonalDetailsChange} errors={errors} />;
      case 2:
        return <WorkExperienceStep data={formData.workExperience} onChange={(d) => handleChange('workExperience', d)} />;
      case 3:
        return <EducationStep data={formData.education} onChange={(d) => handleChange('education', d)} />;
      case 4:
        return <SkillsResumeStep
          skills={formData.skills}
          resume={formData.resume}
          coverLetter={formData.coverLetter || ''}
          onSkillsChange={(s) => handleChange('skills', s)}
          onResumeChange={(f) => handleChange('resume', f)}
          onCoverLetterChange={(cl) => handleChange('coverLetter', cl)}
        />;
      case 5:
        return <ReviewSubmitStep formData={formData} jobTitle={job.title} />;
      default:
        return null;
    }
  };

  return (
    <div className="application-form-modal fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="modal-content w-full max-w-2xl bg-white rounded-3xl sm:rounded-[32px] shadow-2xl border border-white/20 my-4 sm:my-8 max-h-[95vh] sm:max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="modal-header bg-gradient-to-r from-white/80 to-white/50 backdrop-blur-md border-b border-gray-100 p-4 sm:p-6 flex items-center justify-between gap-3 shrink-0 rounded-t-3xl sm:rounded-t-[32px]">
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            <div className="bg-slate-900 text-white w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center font-black text-[10px] sm:text-xs shadow-xl shadow-slate-900/10 shrink-0">ITPC</div>
            <div className="min-w-0">
              <h2 className="text-sm sm:text-lg font-black text-slate-900 leading-tight uppercase tracking-tight truncate">Recruitment Protocol</h2>
              <p className="text-[9px] sm:text-[10px] font-bold text-blue-500 uppercase tracking-[0.1em] truncate">{job.title} • {job.department}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 sm:p-3 bg-slate-50 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl sm:rounded-2xl transition-all shadow-sm shrink-0"
            aria-label="Close form"
          >
            <FaTimes size={14} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-4 sm:px-10 py-4 sm:py-6 bg-slate-50/50 border-b border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex gap-1.5 sm:gap-2 w-full sm:w-auto">
            {[1, 2, 3, 4, 5].map(s => (
              <div
                key={s}
                className={`h-1.5 flex-1 sm:flex-none sm:w-12 rounded-full transition-all duration-700 ${s <= currentStep ? 'bg-blue-600 shadow-sm shadow-blue-500/20' : 'bg-gray-200'
                  }`}
              />
            ))}
          </div>
          <p className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Phase {currentStep} of {TOTAL_STEPS}</p>
        </div>

        {/* Content */}
        <div className="modal-body p-4 sm:p-10 custom-scrollbar overflow-y-auto flex-1">
          {renderStepContent()}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-10 border-t border-gray-100 flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 bg-gradient-to-r from-white/80 to-white/50 backdrop-blur-md shrink-0 rounded-b-3xl sm:rounded-b-[32px]">
          {currentStep > 1 ? (
            <button
              onClick={prevStep}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors rounded-xl sm:rounded-2xl hover:bg-slate-50"
            >
              ← Back Interface
            </button>
          ) : <div className="hidden sm:block" />}

          {currentStep < TOTAL_STEPS ? (
            <button
              onClick={nextStep}
              className="w-full sm:w-auto bg-blue-600 text-white px-8 sm:px-10 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-blue-600/10 active:scale-95"
            >
              Next Phase →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full sm:w-auto bg-slate-900 text-white px-8 sm:px-10 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 transition-all shadow-2xl active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {loading ? <><FaSpinner className="animate-spin" /> Processing...</> : 'Transmit Application'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicationForm;