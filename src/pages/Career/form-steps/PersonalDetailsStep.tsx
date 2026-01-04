import React from 'react';
import { ApplicationFormData } from '../ApplicationForm';

interface PersonalDetailsStepProps {
  data: ApplicationFormData['personalDetails'];
  onChange: (data: ApplicationFormData['personalDetails']) => void;
  errors: Record<string, string>;
}

const PersonalDetailsStep: React.FC<PersonalDetailsStepProps> = ({ data, onChange, errors }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-6 fade-up">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="itpc-label" htmlFor="fullName">Full Name *</label>
          <input
            type="text" id="fullName" name="fullName"
            value={data.fullName} onChange={handleChange}
            className="itpc-input" required
          />
          {errors.fullName && <p className="error-hint">{errors.fullName}</p>}
        </div>
        <div>
          <label className="itpc-label" htmlFor="email">Email Address *</label>
          <input
            type="email" id="email" name="email"
            value={data.email} onChange={handleChange}
            className="itpc-input" required
          />
          {errors.email && <p className="error-hint">{errors.email}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="itpc-label" htmlFor="phone">Phone Number *</label>
          <input
            type="tel" id="phone" name="phone"
            value={data.phone} onChange={handleChange}
            className="itpc-input" required
          />
          {errors.phone && <p className="error-hint">{errors.phone}</p>}
        </div>
        <div>
          <label className="itpc-label" htmlFor="gender">Gender *</label>
          <select
            id="gender" name="gender"
            value={data.gender || ''} onChange={handleChange as any}
            className="itpc-input" required
          >
            <option value="" disabled>Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          {errors.gender && <p className="error-hint">{errors.gender}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
        <div>
          <label className="itpc-label" htmlFor="address">Location / Address</label>
          <input
            type="text" id="address" name="address"
            value={data.address} onChange={handleChange}
            className="itpc-input"
            placeholder="City, Region, Or Specific Address"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-50">
        <div>
          <label className="itpc-label" htmlFor="linkedin">LinkedIn Profile URL</label>
          <input
            type="url" id="linkedin" name="linkedin"
            value={data.linkedin || ''} onChange={handleChange}
            className="itpc-input" placeholder="linkedin.com/in/..."
          />
        </div>
        <div>
          <label className="itpc-label" htmlFor="portfolio">Portfolio/Website</label>
          <input
            type="url" id="portfolio" name="portfolio"
            value={data.portfolio || ''} onChange={handleChange}
            className="itpc-input" placeholder="portfolio.com/..."
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalDetailsStep;