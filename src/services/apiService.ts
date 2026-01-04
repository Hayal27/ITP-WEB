
import axios, { AxiosRequestConfig, AxiosError } from 'axios';


export const BACKEND_URL = "http://localhost:5005";

// Generic request function using axios
export async function request<T>(url: string, options: AxiosRequestConfig = {}): Promise<T> {
  try {
    const response = await axios({
      url: `${BACKEND_URL}/api${url}`,
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
      console.error('API Error Response:', errorData);
      throw new Error(errorData?.message || errorData?.error || `Request failed with status ${axiosError.response.status}`);
    } else if (axiosError.request) {
      console.error('API No Response:', axiosError.request);
      throw new Error('No response received from server. Please check your network connection and backend server.');
    } else {
      console.error('API Request Setup Error:', axiosError.message);
      throw new Error(axiosError.message || 'An unknown error occurred during the request setup.');
    }
  }
}

// Helper to ensure image URLs are fully qualified
export const fixImageUrl = (url: string | null | undefined): string | null => {
  if (!url) return null;
  if (url.startsWith('http')) return url;
  if (url.startsWith('/uploads')) return `${BACKEND_URL}${url}`;
  return url;
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


// Helper to build FormData for News
const buildNewsFormData = (newsData: Partial<NewsFormData>): FormData => {
  const formData = new FormData();
  (Object.keys(newsData) as Array<keyof Partial<NewsFormData>>).forEach(key => {
    // Skip imageFiles and tags as they are handled separately
    if (key === 'imageFiles' || key === 'tags') return;

    const value = newsData[key];
    if (value !== undefined && value !== null) {
      if (key === 'youtubeUrl' && value === '') { // Don't append empty youtubeUrl
        return;
      }
      formData.append(key, typeof value === 'boolean' ? String(value) : String(value));
    }
  });

  if (newsData.tags && newsData.tags.length > 0) {
    newsData.tags.forEach(tag => formData.append('tags', tag));
  } else if (newsData.tags === undefined || (Array.isArray(newsData.tags) && newsData.tags.length === 0)) {
    // No action needed if tags are empty or undefined, unless backend requires explicit empty value
  }

  if (newsData.imageFiles && newsData.imageFiles.length > 0) {
    newsData.imageFiles.forEach(file => {
      formData.append('newsImages', file, file.name); // Backend expects 'newsImages'
    });
  }
  return formData;
};

// Helper to build FormData for Events (remains for single image)
const buildEventFormData = (eventData: Partial<EventFormData>): FormData => {
  const formData = new FormData();
  (Object.keys(eventData) as Array<keyof Partial<EventFormData>>).forEach(key => {
    if (key === 'imageFiles' || key === 'tags') return;
    const value = eventData[key];
    if (value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  });
  if (eventData.tags && eventData.tags.length > 0) {
    eventData.tags.forEach(tag => formData.append('tags', tag));
  }

  if (eventData.imageFiles && eventData.imageFiles.length > 0) {
    eventData.imageFiles.forEach(file => {
      formData.append('imageFiles', file, file.name); // Backend expects 'imageFiles'
    });
  }
  return formData;
};

// --- NEWS API ---
export const getNews = async (): Promise<NewsItem[]> => {
  const response = await request<{ success: boolean, news: NewsItem[] }>('/newsf', { method: 'GET' });
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
  const response = await request<{ success: boolean, events: EventItem[] }>('/eventsf', { method: 'GET' });
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

export const updateEventItem = async (id: string | number, eventData: Partial<EventFormData>): Promise<EventItem> => {
  const formData = buildEventFormData(eventData);
  const updatedItem = await request<EventItem>(`/editEvent/${id}`, {
    method: 'PUT',
    data: formData,
  });
  return {
    ...updatedItem,
    date: updatedItem.date ? updatedItem.date.split('T')[0] : '',
    tags: Array.isArray(updatedItem.tags) ? updatedItem.tags : [],
    image: updatedItem.image === "" ? null : updatedItem.image,
  };
};

export const deleteEventItem = async (id: string | number): Promise<void> => {
  await request<{ success: boolean, message?: string }>(`/deleteEvent/${id}`, { method: 'DELETE' });
};

// --- COMMENTS API ---

export interface CommentPayload {
  name: string;
  email: string; // Kept email here as it's part of the submission form
  text: string;
  parentId?: string | number | null; // Updated to match Comment interface
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
  const response = await request<{ success: boolean, comments: any[] }>(`/newsf/${postId}/comments`, { method: 'GET' });

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
  return await request<FAQItem[]>('/faqs', { method: 'GET' });
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

export const submitContactForm = async (formData: { name: string; email: string; phone?: string; message: string }): Promise<{ success: boolean; message: string }> => {
  return await request<{ success: boolean; message: string }>('/contact', {
    method: 'POST',
    data: formData,
  });
};

export const getContactMessages = async (): Promise<ContactMessage[]> => {
  const response = await request<{ success: boolean; data: ContactMessage[] }>('/admin/messages', { method: 'GET' });
  return response.data;
};

export const markMessageAsRead = async (id: number): Promise<{ success: boolean; message: string }> => {
  return await request<{ success: boolean; message: string }>(`/admin/messages/${id}/read`, { method: 'PUT' });
};

export const deleteMessage = async (id: number): Promise<{ success: boolean; message: string }> => {
  return await request<{ success: boolean; message: string }>(`/admin/messages/${id}`, { method: 'DELETE' });
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

export const submitInvestorInquiry = async (formData: { fullName: string; email: string; organization?: string; areaOfInterest?: string }): Promise<{ success: boolean; message: string }> => {
  return await request<{ success: boolean; message: string }>('/investor-inquiries/submit', {
    method: 'POST',
    data: formData,
  });
};

export const getInvestorInquiries = async (): Promise<InvestorInquiry[]> => {
  const response = await request<{ success: boolean; data: InvestorInquiry[] }>('/investor-inquiries/admin/inquiries', { method: 'GET' });
  return response.data;
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
  return await request<Building[]>('/offices/buildings', { method: 'GET' });
};

export const getOffices = async (): Promise<Office[]> => {
  return await request<Office[]>('/offices', { method: 'GET' });
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
  return await request<LandZone[]>('/lands/zones', { method: 'GET' });
};

export const getLeasedLands = async (): Promise<LeasedLand[]> => {
  return await request<LeasedLand[]>('/lands', { method: 'GET' });
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
  return await request<LiveEventConfig>('/live-events/active', { method: 'GET' });
};

export const getAllLiveEvents = async (): Promise<LiveEventConfig[]> => {
  return await request<LiveEventConfig[]>('/live-events', { method: 'GET' });
};

export const updateSignaling = async (id: number, data: string): Promise<void> => {
  return await request<void>(`/live-events/${id}/signaling`, {
    method: 'POST',
    data: { signaling_data: data }
  });
};

export const getLiveEvent = async (id: number): Promise<LiveEventConfig> => {
  return await request<LiveEventConfig>(`/live-events/${id}`, { method: 'GET' });
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
  const jobs = await request<Job[]>('/careers/jobs', { method: 'GET' });
  return jobs.map(job => ({
    ...job,
    image: fixImageUrl((job as any).image) as string,
    responsibilities: typeof job.responsibilities === 'string' ? JSON.parse(job.responsibilities) : job.responsibilities,
    qualifications: typeof job.qualifications === 'string' ? JSON.parse(job.qualifications) : job.qualifications
  }));
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
  const response = await request<{ success: boolean, mediaItems: MediaItem[] }>('/mediaf', { method: 'GET' });
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
  const partners = await request<Partner[]>('/partners-investors/partners', { method: 'GET' });
  return partners.map(p => ({
    ...p,
    logo: fixImageUrl(p.logo) as string,
    gallery: Array.isArray(p.gallery) ? p.gallery.map(img => fixImageUrl(img) as string) : []
  }));
};

export const getInvestors = async (): Promise<Investor[]> => {
  const investors = await request<Investor[]>('/partners-investors/investors', { method: 'GET' });
  return investors.map(i => ({
    ...i,
    image: fixImageUrl(i.image) as string,
    gallery: Array.isArray(i.gallery) ? i.gallery.map(img => fixImageUrl(img) as string) : []
  }));
};

export const createPartner = async (partnerData: Partial<Partner>): Promise<any> => {
  return await request<any>('/partners-investors/partners', {
    method: 'POST',
    data: partnerData
  });
};

export const updatePartner = async (id: number, partnerData: Partial<Partner>): Promise<any> => {
  return await request<any>(`/partners-investors/partners/${id}`, {
    method: 'PUT',
    data: partnerData
  });
};

export const deletePartner = async (id: number): Promise<any> => {
  return await request<any>(`/partners-investors/partners/${id}`, { method: 'DELETE' });
};

export const createInvestor = async (investorData: Partial<Investor>): Promise<any> => {
  return await request<any>('/partners-investors/investors', {
    method: 'POST',
    data: investorData
  });
};

export const updateInvestor = async (id: number, investorData: Partial<Investor>): Promise<any> => {
  return await request<any>(`/partners-investors/investors/${id}`, {
    method: 'PUT',
    data: investorData
  });
};

export const deleteInvestor = async (id: number): Promise<any> => {
  return await request<any>(`/partners-investors/investors/${id}`, { method: 'DELETE' });
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
  const programs = await request<IncubationProgram[]>('/incubation/programs', { method: 'GET' });
  return programs.map(p => ({
    ...p,
    icon: fixImageUrl(p.icon) as string
  }));
};

export const getIncubationSuccessStories = async (): Promise<IncubationSuccessStory[]> => {
  const stories = await request<IncubationSuccessStory[]>('/incubation/stories', { method: 'GET' });
  return stories.map(s => ({
    ...s,
    image_url: fixImageUrl(s.image_url) as string
  }));
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
  const trainings = await request<TrainingWorkshop[]>('/trainings', { method: 'GET' });
  return trainings.map(t => ({
    ...t,
    image_url: fixImageUrl(t.image_url) as string,
    tags: Array.isArray(t.tags) ? t.tags : []
  }));
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
  const steps = await request<InvestmentStep[]>('/invest/steps', { method: 'GET' });
  return steps.map(s => ({
    ...s,
    doc_url: fixImageUrl(s.doc_url) as string
  }));
};

export const getInvestmentResources = async (): Promise<InvestmentResource[]> => {
  const resources = await request<InvestmentResource[]>('/invest/resources', { method: 'GET' });
  return resources.map(r => ({
    ...r,
    file_url: fixImageUrl(r.file_url) as string
  }));
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
