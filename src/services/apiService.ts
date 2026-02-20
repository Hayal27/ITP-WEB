
import axios, { AxiosRequestConfig, AxiosError } from 'axios';


export const BACKEND_URL = "http://localhost:5005";

// Generic request function using axios
export async function request<T>(url: string, options: AxiosRequestConfig = {}): Promise<T> {
  try {
    const response = await axios({
      url: `${BACKEND_URL}/api${url}`,
      withCredentials: true,
      ...options,
      headers: {
        // Authorization headers or other common headers can be added here
        ...options.headers,
      },
    });
    return response.data as T;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      const errorData = axiosError.response.data as { message?: string; error?: string };
      // console.error('[SECURITY] API Error Masked');
      throw new Error(errorData?.error || errorData?.message || `Request failed`);
    } else if (axiosError.request) {
      // console.error('[SECURITY] Network Issue');
      throw new Error('Connection error. Please try again later.');
    } else {
      // console.error('[SECURITY] Setup Error');
      throw new Error('An unexpected error occurred.');
    }
  }
}

// Helper to ensure image URLs are fully qualified
export const fixImageUrl = (url: string | null | undefined): string | null => {
  if (!url) return null;

  let cleanUrl = String(url).trim();

  // 1. Handle JSON string arrays from database (e.g., '["/uploads/file.jpg"]')
  if (cleanUrl.startsWith('[') && cleanUrl.endsWith(']')) {
    try {
      const parsed = JSON.parse(cleanUrl);
      if (Array.isArray(parsed) && parsed.length > 0) {
        cleanUrl = parsed[0]; // Get first image from array
      }
    } catch (e) {
      console.warn('[fixImageUrl] Failed to parse JSON:', cleanUrl);
    }
  }

  // 2. Remove any accidental surrounding quotes
  cleanUrl = cleanUrl.replace(/^['"]|['"]$/g, '');

  // 3. Handle production domain replacement for local development
  if (cleanUrl.includes('api.ethiopianitpark.et')) {
    cleanUrl = cleanUrl.replace(/https?:\/\/api\.ethiopianitpark\.et/, '');
  }

  // 4. If it's already an absolute URL, return it
  if (cleanUrl.startsWith('http')) return cleanUrl;

  // 5. If it starts with /uploads, prepend backend URL
  if (cleanUrl.startsWith('/uploads')) return `${BACKEND_URL}${cleanUrl}`;

  // 6. Otherwise return as-is (for frontend public assets)
  return cleanUrl;
};

// Updated Comment interface
export interface Comment {
  id: string | number;
  postId?: string | number; // Or newsItemId, ensure consistency with backend
  name: string;
  email?: string; // Optional, as per new interface
  text: string;
  date: string; // ISO string
  parentId?: string | number | null;
  replies?: Comment[];
  approved: boolean; // Crucial for filtering and counting
  createdAt?: string;
  updatedAt?: string;
}

export interface NewsItem {
  id: number | string;
  title: string;
  date: string; // ISO string format expected from backend for date
  category: string;
  image: string[]; // Updated: Expect an array of image URLs from backend
  imageAltText?: string; // General alt text or for the primary image
  description: string;
  featured: boolean;
  readTime: string;
  youtubeUrl?: string;
  tags?: string[];
  comments?: number; // This might represent the count of comments
  commentsData?: Comment[]; // To hold actual comment objects for a news item, uses updated Comment interface
  createdAt?: string;
  updatedAt?: string; // Added based on your JSON response
}

export interface MediaItem {
  id: number | string;
  title: string;
  type: 'image' | 'video' | '3d' | 'interactive';
  src: string;
  date: string;
  category: string;
  description?: string;
  poster?: string;
  tags?: string[];
  interactiveUrl?: string;
  youtubeUrl?: string;
}

export interface EventItem {
  id: number | string;
  title: string;
  date: string; // ISO string format expected from backend for date
  time: string;
  venue: string;
  image: string[]; // Updated: Expect an array of image URLs from backend
  imageAltText?: string;
  description: string;
  featured: boolean;
  registrationLink: string;
  capacity: string;
  youtubeUrl?: string;
  tags?: string[];
  comments?: number; // This might represent the count of comments
  // Events might not have detailed commentsData like news, or you might add it later
  createdAt?: string;
  updatedAt?: string; // Added based on your JSON response (assuming events might have it too)
}

// FormData types for creating/updating posts
// NewsFormData now uses imageFiles for multiple image uploads
export type NewsFormData = Omit<NewsItem, 'id' | 'comments' | 'commentsData' | 'image' | 'createdAt' | 'updatedAt'> & {
  imageFiles?: File[]; // For multiple file uploads
};

export type EventFormData = Omit<EventItem, 'id' | 'comments' | 'image' | 'createdAt' | 'updatedAt'> & {
  imageFiles?: File[]; // For multiple file uploads
};



// --- NEWS API ---
export const getNews = async (): Promise<NewsItem[]> => {
  const response = await request<{ success: boolean, news: NewsItem[] }>('/news', { method: 'GET' });
  if (response.success) {
    return response.news.map(n => ({
      ...n,
      date: n.date ? n.date.split('T')[0] : '',
      tags: Array.isArray(n.tags) ? n.tags : [],
      image: Array.isArray(n.image)
        ? n.image.map(img => fixImageUrl(img) as string)
        : (n.image ? [fixImageUrl(n.image) as string] : []),
      commentsData: Array.isArray(n.commentsData) ? n.commentsData.map(c => ({
        ...c,
        approved: Boolean(c.approved), // Ensure boolean conversion here too if commentsData can come from getNews
        replies: Array.isArray(c.replies) ? c.replies.map(r => ({ ...r, approved: Boolean(r.approved), replies: r.replies || [] })) : []
      })) : [],
    }));
  }
  throw new Error("Failed to fetch news or backend response was not successful.");
};

// --- EVENTS API ---
export const getEvents = async (): Promise<EventItem[]> => {
  const response = await request<{ success: boolean, events: EventItem[] }>('/events', { method: 'GET' });
  if (response.success) {
    return response.events.map(e => ({
      ...e,
      date: e.date ? e.date.split('T')[0] : '',
      tags: Array.isArray(e.tags) ? e.tags : [],
      image: Array.isArray(e.image)
        ? e.image.map(img => fixImageUrl(img) as string)
        : (e.image ? [fixImageUrl(e.image) as string] : []),
    }));
  }
  throw new Error("Failed to fetch events or backend response was not successful.");
};

// --- COMMENTS API ---

export interface CommentPayload {
  name: string;
  email: string;
  text: string;
  parentId?: string | number | null;
  website?: string; // Honeypot field
}

// Interface for the result of calculateCommentCounts
export interface CommentCounts {
  totalComments: number;
  approvedComments: number;
  pendingComments: number;
}

/**
 * Posts a new comment or a reply to a news item.
 * @param newsItemId The ID of the news item.
 * @param commentData The comment payload.
 * @returns The newly created comment object from the backend.
 */
export const postNewsComment = async (
  newsItemId: string | number, // This is effectively the postId
  commentData: CommentPayload
): Promise<Comment> => {
  try {
    const response = await request<{ success: boolean; comment: Comment }>(
      `/news/${newsItemId}/comments`, // Note: This uses /news/ not /newsf/
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        data: { ...commentData, postId: newsItemId },
      }
    );

    if (response.success && response.comment) {
      return {
        ...response.comment,
        approved: Boolean(response.comment.approved), // Ensure boolean conversion for returned comment
        replies: response.comment.replies ? response.comment.replies.map(r => ({ ...r, approved: Boolean(r.approved) })) : [],
      };
    } else {
      throw new Error(
        (response as any).message || 'Failed to post comment or backend response was not successful.'
      );
    }
  } catch (error) {
    console.error('Error posting comment:', error);
    throw error instanceof Error ? error : new Error('An unknown error occurred while posting the comment.');
  }
};

/**
 * Fetches all comments for a given post ID.
 * Sorts comments and their replies by date, newest first.
 */
export const getCommentsForPost = async (postId: string | number): Promise<Comment[]> => {
  const response = await request<{ success: boolean, comments: any[] }>(`/news/${postId}/comments`, { method: 'GET' });

  if (response.success && Array.isArray(response.comments)) {
    const mapAndSortComments = (comments: any[]): Comment[] => {
      return comments
        .map(c => ({
          ...c,
          approved: Boolean(c.approved),
          replies: c.replies && c.replies.length > 0 ? mapAndSortComments(c.replies) : [],
        }))
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    };
    return mapAndSortComments(response.comments);
  }
  throw new Error((response as any).message || "Failed to fetch comments or invalid data format.");
};

/**
 * Calculates the total, approved, and pending comment counts from a list of comments.
 * This function recursively counts comments and their replies.
 * @param comments - An array of Comment objects (where 'approved' is boolean).
 * @returns An object containing totalComments, approvedComments, and pendingComments.
 */
export const calculateCommentCounts = (comments: Comment[]): CommentCounts => {
  let totalComments = 0;
  let approvedComments = 0;
  let pendingComments = 0;

  const count = (commentList: Comment[]) => {
    for (const comment of commentList) {
      totalComments++;
      if (comment.approved) { // This check now uses a boolean
        approvedComments++;
      } else {
        pendingComments++;
      }
      if (comment.replies && comment.replies.length > 0) {
        count(comment.replies);
      }
    }
  };

  count(comments);

  return {
    totalComments,
    approvedComments,
    pendingComments,
  };
};

// --- FAQs API ---
export interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
  order: number;
}

export const getFAQs = async (): Promise<FAQItem[]> => {
  const response = await request<{ success: boolean; faqs: FAQItem[] }>('/faqs', { method: 'GET' });
  if (response.success) {
    return response.faqs;
  }
  throw new Error("Failed to fetch FAQs or backend response was not successful.");
};

// --- CONTACT API ---
export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  phone?: string;
  message: string;
  status: 'new' | 'read' | 'replied';
  created_at: string;
}

export const submitContactForm = async (formData: { name: string; email: string; phone?: string; subject: string; message: string; website?: string }): Promise<{ success: boolean; message: string }> => {
  return await request<{ success: boolean; message: string }>('/contact', {
    method: 'POST',
    data: formData,
  });
};


// --- INVESTOR INQUIRY API ---
export interface InvestorInquiry {
  id: number;
  full_name: string;
  email: string;
  organization?: string;
  area_of_interest?: string;
  status: 'pending' | 'read' | 'archived';
  created_at: string;
}

export const submitInvestorInquiry = async (formData: { fullName: string; email: string; organization?: string; areaOfInterest?: string; website?: string }): Promise<{ success: boolean; message: string }> => {
  return await request<{ success: boolean; message: string }>('/investor-inquiries/submit', {
    method: 'POST',
    data: formData,
  });
};


// --- OFFICE & BUILDING API ---
export interface Building {
  id: number;
  name: string;
  description: string;
  total_offices: number;
  available_offices: number;
  total_size_sqm: number;
  icon_name: string;
}

export interface Office {
  id: string;
  zone: string;
  building_id: number;
  building_name?: string;
  unit_number: string;
  floor: number;
  size_sqm: number;
  status: 'Available' | 'Rented';
  price_monthly: number;
  rented_by: string | null;
  available_from: string;
  contact_name: string;
  contact_phone: string;
}

export const getBuildings = async (): Promise<Building[]> => {
  const response = await request<{ success: boolean; buildings: Building[] }>('/offices/buildings', { method: 'GET' });
  if (response.success) {
    return response.buildings;
  }
  throw new Error("Failed to fetch buildings or backend response was not successful.");
};

export const getOffices = async (): Promise<Office[]> => {
  const response = await request<{ success: boolean; offices: Office[] }>('/offices', { method: 'GET' });
  if (response.success) {
    return response.offices;
  }
  throw new Error("Failed to fetch offices or backend response was not successful.");
};

// --- LEASED LAND & ZONE API ---
export interface LandZone {
  id: number;
  name: string;
  description: string;
  total_size_sqm: number;
  available_size_sqm: number;
  icon_name: string;
}

export interface LeasedLand {
  id: string;
  zone_id: number;
  zone_name?: string;
  land_type: string;
  location: string;
  size_sqm: number;
  available_size_sqm: number;
  status: 'Available' | 'Leased';
  leased_by: string | null;
  leased_from: string;
  contact_name: string;
  contact_phone: string;
}

export const getLandZones = async (): Promise<LandZone[]> => {
  const response = await request<{ success: boolean; landZones: LandZone[] }>('/lands/zones', { method: 'GET' });
  if (response.success) {
    return response.landZones;
  }
  throw new Error("Failed to fetch land zones or backend response was not successful.");
};

export const getLeasedLands = async (): Promise<LeasedLand[]> => {
  const response = await request<{ success: boolean; leasedLands: LeasedLand[] }>('/lands', { method: 'GET' });
  if (response.success) {
    return response.leasedLands;
  }
  throw new Error("Failed to fetch leased lands or backend response was not successful.");
};

// --- LIVE EVENTS API ---
export interface LiveEventConfig {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  date: string;
  startTime?: string;
  endTime?: string;
  timezone?: string;
  location?: string;
  status?: string;
  signaling_data?: string;
  stream: {
    platform: string;
    url: string;
    poster?: string;
    aspect?: string;
  };
  chat?: {
    enabled: boolean;
    pinned?: string;
  };
  analytics?: {
    estimatedViewers?: number;
  };
  agenda?: {
    time: string;
    title: string;
    speaker?: string;
  }[];
  speakers?: {
    name: string;
    role?: string;
    photo?: string;
  }[];
  poster?: string; // Added poster field to LiveEventConfig for direct access
}

export const getActiveLiveEvent = async (): Promise<LiveEventConfig> => {
  const response = await request<{ success: boolean; liveEvent: LiveEventConfig }>('/live-events/active', { method: 'GET' });
  if (response.success) {
    return response.liveEvent;
  }
  throw new Error("Failed to fetch active live event or backend response was not successful.");
};

export const getAllLiveEvents = async (): Promise<LiveEventConfig[]> => {
  const response = await request<{ success: boolean; liveEvents: LiveEventConfig[] }>('/live-events', { method: 'GET' });
  if (response.success) {
    return response.liveEvents;
  }
  throw new Error("Failed to fetch live events or backend response was not successful.");
};


export const getLiveEvent = async (id: number): Promise<LiveEventConfig> => {
  const response = await request<{ success: boolean; liveEvent: LiveEventConfig }>(`/live-events/${id}`, { method: 'GET' });
  if (response.success) {
    return response.liveEvent;
  }
  throw new Error("Failed to fetch live event or backend response was not successful.");
};

// --- CAREER API ---
export interface Job {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  responsibilities: string | string[];
  qualifications: string | string[];
  status: string;
  start_date?: string;
  deadline?: string;
  created_at?: string;
}

export interface ApplicationResponse {
  success: boolean;
  message: string;
  trackingCode: string;
}

export interface TrackingStatus {
  status: 'pending' | 'reviewing' | 'shortlisted' | 'interviewing' | 'offered' | 'rejected';
  applied_at: string;
  jobTitle: string;
}

export const getCareerJobs = async (): Promise<Job[]> => {
  const response = await request<{ success: boolean; jobs: Job[] }>('/careers/jobs', { method: 'GET' });
  if (response.success) {
    return response.jobs.map(job => ({
      ...job,
      image: (job as any).image ? fixImageUrl((job as any).image) as string : '',
      responsibilities: typeof job.responsibilities === 'string' ? JSON.parse(job.responsibilities) : job.responsibilities,
      qualifications: typeof job.qualifications === 'string' ? JSON.parse(job.qualifications) : job.qualifications
    }));
  }
  throw new Error("Failed to fetch career jobs or backend response was not successful.");
};

export const applyForJob = async (formData: FormData): Promise<ApplicationResponse> => {
  return await request<ApplicationResponse>('/careers/jobs/apply', {
    method: 'POST',
    data: formData,
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};

export const trackApplication = async (code: string): Promise<TrackingStatus> => {
  return await request<TrackingStatus>(`/careers/jobs/track/${code}`, { method: 'GET' });
};

// --- MEDIA API ---
export const getMediaItems = async (): Promise<MediaItem[]> => {
  const response = await request<{ success: boolean, mediaItems: MediaItem[] }>('/media', { method: 'GET' });
  if (response.success) {
    return response.mediaItems.map(item => ({
      ...item,
      src: fixImageUrl(item.src) as string,
      poster: fixImageUrl(item.poster) as string,
      tags: [] // Backend for media_gallery might not have tags yet, defaulting to empty
    }));
  }
  throw new Error("Failed to fetch media items");
};

// --- PARTNERS & INVESTORS API ---
export interface Partner {
  id: number;
  partner_id: string;
  company_name: string;
  contact_name?: string;
  contact_email?: string;
  partnership_type?: string;
  country?: string;
  zone?: string;
  industry_type?: string;
  agreement_start_date?: string;
  agreement_end_date?: string;
  status: 'Active' | 'Inactive' | 'Ongoing';
  services_provided: string[];
  logo?: string;
  description?: string;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  slug?: string;
  website?: string;
  linkedin?: string;
  twitter?: string;
  facebook?: string;
  gallery?: string[];
}

export interface Investor {
  id: number;
  investor_id: string;
  company_name: string;
  property_name?: string;
  industry_type?: string;
  availability_status?: string;
  zone?: string;
  country?: string;
  description?: string;
  contact_name?: string;
  contact_phone?: string;
  investment_type?: string;
  established_date?: string;
  website?: string;
  image?: string;
  gallery?: string[];
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  slug?: string;
  linkedin?: string;
  twitter?: string;
  facebook?: string;
}

export const getPartners = async (): Promise<Partner[]> => {
  const response = await request<{ success: boolean; partners: Partner[] }>('/partners-investors/partners', { method: 'GET' });
  if (response.success) {
    return response.partners.map(p => ({
      ...p,
      logo: fixImageUrl(p.logo) as string,
      gallery: Array.isArray(p.gallery) ? p.gallery.map(img => fixImageUrl(img) as string) : []
    }));
  }
  throw new Error("Failed to fetch partners or backend response was not successful.");
};

export const getInvestors = async (): Promise<Investor[]> => {
  const response = await request<{ success: boolean; investors: Investor[] }>('/partners-investors/investors', { method: 'GET' });
  if (response.success) {
    return response.investors.map(i => ({
      ...i,
      image: fixImageUrl(i.image) as string,
      gallery: Array.isArray(i.gallery) ? i.gallery.map(img => fixImageUrl(img) as string) : []
    }));
  }
  throw new Error("Failed to fetch investors or backend response was not successful.");
};


// --- INCUBATION API ---
export interface IncubationProgram {
  id: number;
  title: string;
  icon: string;
  description: string;
  link: string;
}

export interface IncubationSuccessStory {
  id: number;
  image_url: string;
  title: string;
  description: string[];
  stats: { number: string; label: string }[];
  link: string;
}

export const getIncubationPrograms = async (): Promise<IncubationProgram[]> => {
  const response = await request<{ success: boolean; programs: IncubationProgram[] }>('/incubation/programs', { method: 'GET' });
  if (response.success) {
    return response.programs.map(p => ({
      ...p,
      icon: fixImageUrl(p.icon) as string
    }));
  }
  throw new Error("Failed to fetch incubation programs or backend response was not successful.");
};

export const getIncubationSuccessStories = async (): Promise<IncubationSuccessStory[]> => {
  const response = await request<{ success: boolean; stories: IncubationSuccessStory[] }>('/incubation/stories', { method: 'GET' });
  if (response.success) {
    return response.stories.map(s => ({
      ...s,
      image_url: fixImageUrl(s.image_url) as string
    }));
  }
  throw new Error("Failed to fetch incubation stories or backend response was not successful.");
};

// --- TRAINING & WORKSHOPS API ---
export interface TrainingWorkshop {
  id: number;
  title: string;
  image_url?: string;
  event_date: string;
  duration: string;
  location: string;
  type: string;
  instructor: string;
  capacity: number;
  summary: string;
  description: string;
  tags: string[];
  link?: string;
  status: 'Upcoming' | 'Ongoing' | 'Completed' | 'Cancelled';
}

export const getTrainings = async (): Promise<TrainingWorkshop[]> => {
  const response = await request<{ success: boolean; trainings: TrainingWorkshop[] }>('/trainings', { method: 'GET' });
  if (response.success) {
    return response.trainings.map(t => ({
      ...t,
      image_url: fixImageUrl(t.image_url) as string,
      tags: Array.isArray(t.tags) ? t.tags : []
    }));
  }
  throw new Error("Failed to fetch trainings or backend response was not successful.");
};

// --- ZONES API ---
export interface ZoneData {
  name: string;
  summary: string;
  images: string[];
  color: string;
  details: {
    purpose: string;
    features: string[];
  };
  position: {
    left: string;
    top: string;
  };
}

export const getZones = async (): Promise<ZoneData[]> => {
  // Mock data as specified in Zones.tsx and Services.tsx
  return [
    {
      name: "ICT Business Zone",
      summary: "High-speed fiber & secure data centers for BPOs and tech firms.",
      images: ["https://res.cloudinary.com/yesuf/image/upload/v1747135437/bpo_ckg1ys.png"],
      color: "bg-blue-600",
      details: {
        purpose: "To provide a world-class environment for IT and BPO services.",
        features: ["High-speed fiber connectivity", "Secure data centers", "24/7 power backup", "Modern office spaces"]
      },
      position: { left: "20%", top: "30%" }
    },
    {
      name: "Manufacturing Zone",
      summary: "Electronics assembly and hardware production facilities.",
      images: ["https://res.cloudinary.com/yesuf/image/upload/v1747135430/swdevelop_tc9anx.png"],
      color: "bg-orange-600",
      details: {
        purpose: "To facilitate local production and assembly of technology hardware.",
        features: ["Plug-and-play factories", "Special economic zone benefits", "Logistics support", "Waste management"]
      },
      position: { left: "40%", top: "50%" }
    },
    {
      name: "Knowledge Zone",
      summary: "Academic-industry partnerships and R&D innovation hubs.",
      images: ["https://res.cloudinary.com/yesuf/image/upload/v1747135446/reaseach_ew642q.png"],
      color: "bg-green-600",
      details: {
        purpose: "To foster innovation through research and development.",
        features: ["Research laboratories", "Collaboration spaces", "Incubation centers", "Library and information hub"]
      },
      position: { left: "60%", top: "20%" }
    },
    {
      name: "Commercial Zone",
      summary: "Retail, banking, and business support services.",
      images: ["https://res.cloudinary.com/yesuf/image/upload/v1747135441/mk_wd3mtf.png"],
      color: "bg-purple-600",
      details: {
        purpose: "To provide essential services to the Park community.",
        features: ["Banking facilities", "Retail outlets", "Restaurants and cafes", "Conference centers"]
      },
      position: { left: "80%", top: "40%" }
    },
    {
      name: "Residential Zone",
      summary: "Comfortable living spaces for Park professionals.",
      images: ["https://res.cloudinary.com/yesuf/image/upload/v1747135429/raxio_vgz5ev.png"],
      color: "bg-pink-600",
      details: {
        purpose: "To provide convenient housing options within the Park.",
        features: ["Modern apartments", "Green spaces", "Security", "Community centers"]
      },
      position: { left: "30%", top: "70%" }
    },
    {
      name: "Skill & Training Zone",
      summary: "Capacity building and technical skill development.",
      images: ["https://res.cloudinary.com/yesuf/image/upload/v1747135433/Incubation_euahej.png"],
      color: "bg-red-600",
      details: {
        purpose: "To develop a skilled workforce for the IT industry.",
        features: ["Training classrooms", "Certification labs", "Workshops", "Skill assessment centers"]
      },
      position: { left: "70%", top: "80%" }
    }
  ];
};

// --- INVESTMENT API ---
export interface InvestmentStep {
  id: number;
  step_number: number;
  title: string;
  description: string;
  doc_url?: string;
  status: string;
}

export interface InvestmentResource {
  id: number;
  label: string;
  icon: string;
  file_url: string;
  type: string;
}

export const getInvestmentSteps = async (): Promise<InvestmentStep[]> => {
  const response = await request<{ success: boolean; steps: InvestmentStep[] }>('/invest/steps', { method: 'GET' });
  if (response.success) {
    return response.steps.map(s => ({
      ...s,
      doc_url: fixImageUrl(s.doc_url) as string
    }));
  }
  throw new Error("Failed to fetch investment steps or backend response was not successful.");
};

export const getInvestmentResources = async (): Promise<InvestmentResource[]> => {
  const response = await request<{ success: boolean; resources: InvestmentResource[] }>('/invest/resources', { method: 'GET' });
  if (response.success) {
    return response.resources.map(r => ({
      ...r,
      file_url: fixImageUrl(r.file_url) as string
    }));
  }
  throw new Error("Failed to fetch investment resources or backend response was not successful.");
};

// --- BOARD MEMBERS & WHO WE ARE API ---
export interface BoardMember {
  id: number;
  name: string;
  english_name?: string;
  position?: string;
  bio?: string;
  image_url?: string;
  linkedin?: string;
  twitter?: string;
  order_index: number;
}

export interface WhoWeAreSection {
  id: number;
  section_type: 'hero' | 'section' | 'features' | 'voice' | 'cta';
  title?: string;
  subtitle?: string;
  content?: string;
  image_url?: string;
  order_index: number;
  is_active: boolean;
}

export const getBoardMembers = async (): Promise<BoardMember[]> => {
  const response = await request<{ success: boolean, boardMembers: BoardMember[] }>('/about/board-members', { method: 'GET' });
  if (response.success) {
    return response.boardMembers.map(member => ({
      ...member,
      image_url: fixImageUrl(member.image_url) as string
    }));
  }
  throw new Error("Failed to fetch board members");
};

export const getWhoWeAreSections = async (): Promise<WhoWeAreSection[]> => {
  const response = await request<{ success: boolean, sections: WhoWeAreSection[] }>('/about/who-we-are', { method: 'GET' });
  if (response.success) {
    return response.sections.map(section => ({
      ...section,
      image_url: fixImageUrl(section.image_url) as string
    }));
  }
  throw new Error("Failed to fetch who we are sections");
};


// --- NEWSLETTER SUBSCRIPTION API ---
export const subscribeToNewsletter = async (email: string): Promise<{ success: boolean; message: string }> => {
  return await request<{ success: boolean; message: string }>('/subscribe', {
    method: 'POST',
    data: { email }
  });
};

// --- ID CARD PUBLIC API ---
export interface IdCardPerson {
  id?: number;
  id_number?: string;
  fname: string;
  lname: string;
  full_name?: string;
  position?: string;
  position_am?: string;
  department?: string;
  fname_am?: string;
  lname_am?: string;
  nationality?: string;
  email?: string;
  phone?: string;
  sex?: 'M' | 'F';
  date_of_birth?: string;
  date_of_issue?: string;
  expiry_date?: string;
  photo_url?: string;
  signature_url?: string;
  qr_data?: string;
  status?: 'active' | 'inactive' | 'expired';
}

export const getPublicEmployeeData = async (idNumber: string): Promise<IdCardPerson> => {
  const response = await request<{ success: boolean; data: IdCardPerson }>(`/id-card-persons/public/${idNumber}`, { method: 'GET' });
  return response.data;
};
