export interface JobPost {
    id: string;
    title: string;
    department: string;
    location: string;
    type: string;
    description: string;
    responsibilities: string[];
    qualifications: string[];
    postedDate: string;
    startDate?: string;
    deadline?: string;
}

export interface WorkExperience {
    id: string;
    companyName: string;
    jobTitle: string;
    startDate: string;
    endDate: string;
    isCurrent: boolean;
    responsibilities: string;
}

export interface Education {
    id: string;
    institutionName: string;
    degree: string;
    fieldOfStudy: string;
    graduationYear: string;
    gpa?: string;
}

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
