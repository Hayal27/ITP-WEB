import React, { useState } from 'react';
import { JobPost, ApplicationFormData } from './types';
import PersonalDetailsStep from './form-steps/PersonalDetailsStep';
import WorkExperienceStep from './form-steps/WorkExperienceStep';
import EducationStep from './form-steps/EducationStep';
import SkillsResumeStep from './form-steps/SkillsResumeStep';
import ReviewSubmitStep from './form-steps/ReviewSubmitStep';
import { FaTimes, FaCheckCircle, FaSpinner, FaCopy, FaTimesCircle } from 'react-icons/fa';
import { applyForJob } from '../../services/apiService';
import { notifications } from '@mantine/notifications';

// Types imported from ./types

interface ApplicationFormProps {
  job: JobPost;
  onClose: () => void;
}

const TOTAL_STEPS = 5;

const ApplicationForm: React.FC<ApplicationFormProps> = ({ job, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [trackingCode, setTrackingCode] = useState<string | null>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [formData, setFormData] = useState<ApplicationFormData>({
    personalDetails: { fullName: '', email: '', phone: '', gender: '', address: '' },
    workExperience: [],
    education: [],
    skills: [],
    resume: null,
    coverLetter: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  React.useEffect(() => {
    if (trackingCode) {
      console.warn("SUCCESS MODAL LOADED WITH CODE:", trackingCode);
    }
  }, [trackingCode]);

  const validateStep = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (currentStep === 1) {
      if (!formData.personalDetails.fullName) {
        newErrors.fullName = "Full name is required.";
      } else if (!/^[a-zA-Z\s.-]{3,100}$/.test(formData.personalDetails.fullName)) {
        newErrors.fullName = "Name must be 3-100 characters (letters only).";
      }

      if (!formData.personalDetails.email) {
        newErrors.email = "Email is required.";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.personalDetails.email)) {
        newErrors.email = "Enter a valid email address.";
      } else if (formData.personalDetails.email.length > 100) {
        newErrors.email = "Email is too long.";
      }

      if (!formData.personalDetails.phone) {
        newErrors.phone = "Phone number is required.";
      } else if (!/^(\+251|0)[79]\d{8}$/.test(formData.personalDetails.phone)) {
        newErrors.phone = "Enter a valid Ethiopian phone number.";
      }

      if (!formData.personalDetails.gender) {
        newErrors.gender = "Gender is required.";
      }

      if (!formData.personalDetails.address) {
        newErrors.address = "Address is required.";
      } else if (formData.personalDetails.address.length < 5 || formData.personalDetails.address.length > 200) {
        newErrors.address = "Address must be 5-200 characters.";
      }
    }

    if (currentStep === 4) {
      if (!formData.resume) {
        newErrors.resume = "Resume is required.";
      } else if (formData.resume.size > 10 * 1024 * 1024) {
        newErrors.resume = "File size exceeds 10MB limit.";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    setErrors(({ submit, ...rest }) => rest);
    if (validateStep()) {
      setCurrentStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
    } else {
      notifications.show({
        title: 'Validation Failed',
        message: 'Please complete all required fields correctly before moving to the next phase.',
        color: 'red',
      });
    }
  };

  const prevStep = () => {
    setErrors(({ submit, ...rest }) => rest);
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleChange = (section: keyof ApplicationFormData, data: any) => {
    setErrors(({ submit, ...rest }) => rest);
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
      if (captchaToken) payload.append('captchaToken', captchaToken);

      const response = await applyForJob(payload);
      if (response && response.success) {
        const code = response.trackingCode;
        setTrackingCode(code);
        // Removed redundant notification since we show the success modal
      }
    } catch (err: any) {
      const errorMessage = err.message || "Failed to submit application";
      setErrors(prev => ({ ...prev, submit: errorMessage }));
      notifications.show({
        title: 'Submission Error',
        message: errorMessage,
        color: 'red',
        autoClose: 10000, // Show for 10 seconds
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
      <div className="application-form-modal fixed inset-0 bg-slate-950/95 backdrop-blur-2xl z-[9999] flex items-center justify-center p-4 sm:p-6">
        <div className="modal-content w-full max-w-sm bg-[var(--bg-card)] rounded-3xl sm:rounded-[32px] shadow-2xl text-center py-12 sm:py-20 px-6 sm:px-10 border border-[var(--border-color)]">
          <div className="mb-6 sm:mb-8 relative inline-block">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-[var(--primary)]/10 text-[var(--primary)] rounded-3xl sm:rounded-[2rem] flex items-center justify-center mx-auto relative z-10 shadow-xl shadow-[var(--primary)]/10">
              <FaCheckCircle size={40} className="sm:w-12 sm:h-12" />
            </div>
            <div className="absolute inset-0 bg-[var(--primary)]/20 blur-3xl rounded-full scale-150 animate-pulse"></div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-main)] mb-2 sm:mb-3 tracking-tight">Application Received</h2>
          <p className="text-[var(--text-muted)] mb-8 sm:mb-10 font-medium text-[10px] sm:text-xs uppercase tracking-widest leading-loose px-2 opacity-80">Mission protocol initialized. Our talent acquisition team will review your profile shortly.</p>

          <div style={{ backgroundColor: '#fbbf24', border: '4px solid #000', borderRadius: '30px', padding: '30px', margin: '20px 0', boxShadow: '0 0 40px rgba(251,191,36,0.3)' }}>
            <p style={{ color: '#000', fontWeight: '900', fontSize: '12px', textTransform: 'uppercase', marginBottom: '15px', letterSpacing: '4px' }}>Tracking Code</p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
              <span style={{ color: '#000', fontSize: '32px', fontWeight: '900', fontFamily: 'monospace', letterSpacing: '2px' }}>
                {String(trackingCode)}
              </span>
              <button
                onClick={handleCopy}
                style={{ backgroundColor: '#000', color: '#fff', padding: '15px', borderRadius: '15px', cursor: 'pointer', border: 'none' }}
                title="Copy Code"
              >
                <FaCopy size={24} />
              </button>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full bg-[var(--secondary)] text-white px-8 sm:px-12 py-4 sm:py-5 rounded-xl sm:rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[var(--primary)] transition-all shadow-2xl active:scale-95"
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
        return <ReviewSubmitStep formData={formData} jobTitle={job.title} onCaptchaVerify={setCaptchaToken} />;
      default:
        return null;
    }
  };

  return (
    <div className="application-form-modal fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="modal-content w-full max-w-2xl bg-[var(--bg-card)] rounded-3xl sm:rounded-[32px] shadow-2xl border border-[var(--border-color)] my-4 sm:my-8 max-h-[95vh] sm:max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="modal-header bg-gradient-to-r from-[var(--bg-card)] to-[var(--bg-main)] backdrop-blur-md border-b border-[var(--border-color)] p-4 sm:p-6 flex items-center justify-between gap-3 shrink-0 rounded-t-3xl sm:rounded-t-[32px]">
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            <div className="bg-[var(--secondary)] text-white w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center font-black text-[10px] sm:text-xs shadow-xl shadow-black/10 shrink-0">ITPC</div>
            <div className="min-w-0">
              <h2 className="text-sm sm:text-lg font-black text-[var(--text-main)] leading-tight uppercase tracking-tight truncate">Recruitment Protocol</h2>
              <p className="text-[9px] sm:text-[10px] font-bold text-[var(--primary)] uppercase tracking-[0.1em] truncate">{job.title} • {job.department}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 sm:p-3 bg-[var(--bg-main)] text-[var(--text-muted)] hover:text-red-500 hover:bg-red-500/10 rounded-xl sm:rounded-2xl transition-all shadow-sm shrink-0"
            aria-label="Close form"
          >
            <FaTimes size={14} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-4 sm:px-10 py-4 sm:py-6 bg-[var(--bg-main)] border-b border-[var(--border-color)] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex gap-1.5 sm:gap-2 w-full sm:w-auto">
            {[1, 2, 3, 4, 5].map(s => (
              <div
                key={s}
                className={`h-1.5 flex-1 sm:flex-none sm:w-12 rounded-full transition-all duration-700 ${s <= currentStep ? 'bg-[var(--primary)] shadow-sm shadow-[var(--primary)]/20' : 'bg-[var(--border-color)]'
                  }`}
              />
            ))}
          </div>
          <p className="text-[9px] sm:text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest whitespace-nowrap">Phase {currentStep} of {TOTAL_STEPS}</p>
        </div>

        {/* Content */}
        <div className="modal-body p-4 sm:p-10 custom-scrollbar overflow-y-auto flex-1">
          {errors.submit && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-500 animate-in fade-in slide-in-from-top-2">
              <FaTimesCircle className="shrink-0" />
              <p className="text-xs font-bold uppercase tracking-widest">{errors.submit}</p>
            </div>
          )}
          {renderStepContent()}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-10 border-t border-[var(--border-color)] flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 bg-gradient-to-r from-[var(--bg-card)] to-[var(--bg-main)] backdrop-blur-md shrink-0 rounded-b-3xl sm:rounded-b-[32px]">
          {currentStep > 1 ? (
            <button
              onClick={prevStep}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors rounded-xl sm:rounded-2xl hover:bg-[var(--bg-main)]"
            >
              ← Back Interface
            </button>
          ) : <div className="hidden sm:block" />}

          {currentStep < TOTAL_STEPS ? (
            <button
              onClick={nextStep}
              className="w-full sm:w-auto bg-[var(--primary)] text-white px-8 sm:px-10 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[var(--secondary)] transition-all shadow-xl shadow-[var(--primary)]/10 active:scale-95"
            >
              Next Phase →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={loading || (currentStep === TOTAL_STEPS && !captchaToken)}
              className="w-full sm:w-auto bg-[var(--secondary)] text-white px-8 sm:px-10 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[var(--primary)] transition-all shadow-2xl active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
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