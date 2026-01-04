import React from 'react';
import { FaPlusCircle, FaTrash, FaBriefcase, FaBuilding, FaCalendarAlt } from 'react-icons/fa';

export interface WorkExperience {
  id: string;
  companyName: string;
  jobTitle: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  responsibilities: string;
}

interface WorkExperienceStepProps {
  data: WorkExperience[];
  onChange: (data: WorkExperience[]) => void;
}

const WorkExperienceStep: React.FC<WorkExperienceStepProps> = ({ data, onChange }) => {
  const handleExperienceChange = (index: number, field: keyof WorkExperience, value: string | boolean) => {
    const newData = [...data];
    (newData[index] as any)[field] = value;
    if (field === 'isCurrent' && value === true) {
      newData[index].endDate = '';
    }
    onChange(newData);
  };

  const addExperience = () => {
    onChange([
      ...data,
      { id: Date.now().toString(), companyName: '', jobTitle: '', startDate: '', endDate: '', isCurrent: false, responsibilities: '' },
    ]);
  };

  const removeExperience = (index: number) => {
    const newData = data.filter((_, i) => i !== index);
    onChange(newData);
  };

  return (
    <div className="space-y-8 fade-up">
      {data.map((exp, index) => (
        <div key={exp.id} className="relative bg-slate-50/50 rounded-[2rem] p-8 border border-slate-100 transition-all hover:bg-white hover:shadow-xl hover:shadow-blue-500/5 group">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                <FaBriefcase size={14} />
              </div>
              <h5 className="font-black text-xs uppercase tracking-widest text-slate-400">Position #{index + 1}</h5>
            </div>
            <button
              type="button"
              onClick={() => removeExperience(index)}
              className="bg-red-50 text-red-500 p-3 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm"
              title="Remove Experience"
            >
              <FaTrash size={12} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="itpc-label flex items-center gap-2"><FaBuilding className="text-blue-500" /> Company *</label>
              <input
                type="text"
                value={exp.companyName}
                onChange={(e) => handleExperienceChange(index, 'companyName', e.target.value)}
                className="itpc-input"
                placeholder="e.g. Google, ITPC"
                required
              />
            </div>
            <div>
              <label className="itpc-label flex items-center gap-2"><FaBriefcase className="text-blue-500" /> Job Title *</label>
              <input
                type="text"
                value={exp.jobTitle}
                onChange={(e) => handleExperienceChange(index, 'jobTitle', e.target.value)}
                className="itpc-input"
                placeholder="e.g. Senior Developer"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="itpc-label flex items-center gap-2"><FaCalendarAlt className="text-blue-500" /> Start Date *</label>
              <input
                type="month"
                value={exp.startDate}
                onChange={(e) => handleExperienceChange(index, 'startDate', e.target.value)}
                className="itpc-input"
                required
              />
            </div>
            <div>
              <label className="itpc-label flex items-center gap-2"><FaCalendarAlt className="text-blue-500" /> End Date</label>
              <input
                type="month"
                value={exp.endDate}
                onChange={(e) => handleExperienceChange(index, 'endDate', e.target.value)}
                className="itpc-input disabled:opacity-30 disabled:cursor-not-allowed"
                disabled={exp.isCurrent}
              />
            </div>
          </div>

          <div className="flex items-center gap-3 mb-6 px-4">
            <input
              type="checkbox"
              id={`isCurrent-${index}`}
              checked={exp.isCurrent}
              onChange={(e) => handleExperienceChange(index, 'isCurrent', e.target.checked)}
              className="w-5 h-5 rounded-lg border-gray-300 text-blue-600 focus:ring-blue-500 transition-all cursor-pointer"
            />
            <label htmlFor={`isCurrent-${index}`} className="text-sm font-bold text-gray-600 cursor-pointer select-none">I currently work here</label>
          </div>

          <div>
            <label className="itpc-label">Impact & Achievements</label>
            <textarea
              value={exp.responsibilities}
              onChange={(e) => handleExperienceChange(index, 'responsibilities', e.target.value)}
              rows={4}
              className="itpc-input !rounded-[1.5rem]"
              placeholder="Tell us about your key accomplishments during this role..."
            ></textarea>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addExperience}
        className="w-full py-6 rounded-[2rem] border-2 border-dashed border-gray-200 text-gray-400 hover:border-blue-500 hover:text-blue-500 hover:bg-blue-50/10 transition-all flex items-center justify-center gap-3 font-black text-xs uppercase tracking-widest"
      >
        <FaPlusCircle /> Add Professional Experience
      </button>
    </div>
  );
};

export default WorkExperienceStep;