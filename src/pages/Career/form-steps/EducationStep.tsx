import React from 'react';
import { FaPlusCircle, FaTrash, FaGraduationCap, FaUniversity, FaCalendarAlt } from 'react-icons/fa';

export interface Education {
  id: string;
  institutionName: string;
  degree: string;
  fieldOfStudy: string;
  graduationYear: string;
  gpa?: string;
}

interface EducationStepProps {
  data: Education[];
  onChange: (data: Education[]) => void;
}

const EducationStep: React.FC<EducationStepProps> = ({ data, onChange }) => {
  const handleEducationChange = (index: number, field: keyof Education, value: string) => {
    const newData = [...data];
    (newData[index] as any)[field] = value;
    onChange(newData);
  };

  const addEducation = () => {
    onChange([
      ...data,
      { id: Date.now().toString(), institutionName: '', degree: '', fieldOfStudy: '', graduationYear: '', gpa: '' },
    ]);
  };

  const removeEducation = (index: number) => {
    const newData = data.filter((_, i) => i !== index);
    onChange(newData);
  };

  return (
    <div className="space-y-8 fade-up">
      {data.map((edu, index) => (
        <div key={edu.id} className="relative bg-slate-50/50 rounded-[2rem] p-8 border border-slate-100 transition-all hover:bg-white hover:shadow-xl hover:shadow-emerald-500/5 group">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                <FaGraduationCap size={16} />
              </div>
              <h5 className="font-black text-xs uppercase tracking-widest text-slate-400">Education #{index + 1}</h5>
            </div>
            <button
              type="button"
              onClick={() => removeEducation(index)}
              className="bg-red-50 text-red-500 p-3 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm"
            >
              <FaTrash size={12} />
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <label className="itpc-label flex items-center gap-2"><FaUniversity className="text-emerald-500" /> Institution Name *</label>
              <input
                type="text"
                value={edu.institutionName}
                onChange={(e) => handleEducationChange(index, 'institutionName', e.target.value)}
                className="itpc-input"
                placeholder="e.g. Addis Ababa University"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="itpc-label">Degree / Certificate *</label>
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                  className="itpc-input"
                  placeholder="e.g. B.Sc, M.A"
                  required
                />
              </div>
              <div>
                <label className="itpc-label">Field of Study *</label>
                <input
                  type="text"
                  value={edu.fieldOfStudy}
                  onChange={(e) => handleEducationChange(index, 'fieldOfStudy', e.target.value)}
                  className="itpc-input"
                  placeholder="e.g. Computer Science"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="itpc-label flex items-center gap-2"><FaCalendarAlt className="text-emerald-500" /> Graduation Year *</label>
                <input
                  type="number"
                  value={edu.graduationYear}
                  min="1950"
                  max={new Date().getFullYear() + 10}
                  placeholder="YYYY"
                  onChange={(e) => handleEducationChange(index, 'graduationYear', e.target.value)}
                  className="itpc-input"
                  required
                />
              </div>
              <div>
                <label className="itpc-label">GPA (Optional)</label>
                <input
                  type="text"
                  value={edu.gpa || ''}
                  placeholder="e.g. 3.8 / 4.0"
                  onChange={(e) => handleEducationChange(index, 'gpa', e.target.value)}
                  className="itpc-input"
                />
              </div>
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addEducation}
        className="w-full py-6 rounded-[2rem] border-2 border-dashed border-gray-200 text-gray-400 hover:border-emerald-500 hover:text-emerald-500 hover:bg-emerald-50/10 transition-all flex items-center justify-center gap-3 font-black text-xs uppercase tracking-widest"
      >
        <FaPlusCircle /> Add Educational Background
      </button>
    </div>
  );
};

export default EducationStep;