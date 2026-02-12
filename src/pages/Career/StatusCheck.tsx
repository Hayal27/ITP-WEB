import React, { useState } from 'react';
import axios from 'axios';
import { FaSearch, FaCheckCircle, FaTimesCircle, FaClock, FaMapMarkerAlt, FaCalendarAlt, FaSpinner, FaChevronRight, FaArrowLeft } from 'react-icons/fa';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Link } from 'react-router-dom';

// Fix for default marker icon
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

import { BACKEND_URL } from '../../services/apiService';

const API_BASE = `${BACKEND_URL}/api/careers`;

const StatusCheck: React.FC = () => {
    const [trackingCode, setTrackingCode] = useState('');
    const [email, setEmail] = useState('');
    const [statusData, setStatusData] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleCheckStatus = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setStatusData(null);

        try {
            const res = await axios.post(`${API_BASE}/public/application-status`, { trackingCode, email });
            setStatusData(res.data);
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to fetch application status. Please verify your details.");
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
            case 'reviewing': return 'text-orange-400 bg-orange-400/10 border-orange-400/20';
            case 'shortlisted': return 'text-indigo-400 bg-indigo-400/10 border-indigo-400/20';
            case 'written_exam': return 'text-purple-400 bg-purple-400/10 border-purple-400/20';
            case 'interview_shortlisted': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
            case 'interviewing': return 'text-blue-300 bg-blue-300/10 border-blue-300/20';
            case 'offered': return 'text-green-400 bg-green-400/10 border-green-400/20';
            case 'rejected': return 'text-red-400 bg-red-400/10 border-red-400/20';
            default: return 'text-slate-400 bg-slate-400/10 border-slate-400/20';
        }
    };

    const formatStatus = (status: string) => {
        return status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    const getStatusDescription = (status: string) => {
        switch (status) {
            case 'pending': return 'We have received your application and it is currently awaiting review by our HR team.';
            case 'reviewing': return 'Your application is currently being reviewed by our hiring managers.';
            case 'shortlisted': return 'Congratulations! Your profile has been shortlisted for further consideration.';
            case 'written_exam': return 'You have been selected to take a written exam. Please check the appointment details below.';
            case 'interview_shortlisted': return 'You have been shortlisted for an interview. Please prepare accordingly for the scheduled time.';
            case 'interviewing': return 'Your interview process is in progress. Good luck!';
            case 'offered': return 'Congratulations! We are pleased to offer you a position at ITPC.';
            case 'rejected': return 'Thank you for your interest. Unfortunately, we will not be moving forward with your application at this time.';
            default: return 'Please check back later for updates.';
        }
    };

    return (
        <div className="min-h-screen lg:h-screen w-full flex flex-col lg:flex-row overflow-hidden bg-[#0f172a] dark:bg-[var(--bg-main)] pt-[120px] lg:pt-[140px]">
            {/* Left Section: Search & Branding */}
            <div className="w-full lg:w-[400px] xl:w-[450px] h-full flex flex-col justify-start lg:justify-center p-8 lg:p-12 relative z-10 bg-gradient-to-b from-[#1e293b]/50 to-[#0f172a] border-r border-white/5 overflow-y-auto lg:overflow-visible">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>

                <div className="mb-12">
                    <Link to="/career" className="inline-flex items-center text-white/50 hover:text-white mb-8 transition-colors group">
                        <FaArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-xs font-bold uppercase tracking-widest">Back to Careers</span>
                    </Link>
                    <h2 className="text-4xl xl:text-5xl font-black text-white uppercase tracking-tighter leading-none mb-4">
                        Status <br />
                        <span className="bg-gradient-to-r from-[#6ec9c4] to-[#0c7c92] bg-clip-text text-transparent italic">Control</span>
                    </h2>
                    <p className="text-white/40 font-bold uppercase tracking-widest text-[10px] sm:text-xs">
                        Secure Application Tracking Portal
                    </p>
                </div>

                <div className="bg-white/5 backdrop-blur-xl p-6 sm:p-8 rounded-[32px] border border-white/10 shadow-2xl relative">
                    <form onSubmit={handleCheckStatus} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[9px] uppercase font-black text-white/40 pl-3">Tracking Code</label>
                            <div className="relative">
                                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 text-sm" />
                                <input
                                    type="text"
                                    required
                                    value={trackingCode}
                                    onChange={e => setTrackingCode(e.target.value)}
                                    className="w-full pl-11 pr-4 py-4 bg-black/40 rounded-2xl border border-white/5 font-bold text-white outline-none focus:ring-2 focus:ring-[#0c7c92] transition-all placeholder:text-white/10"
                                    placeholder="ITPC-xxxxx"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[9px] uppercase font-black text-white/40 pl-3">Email Address</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className="w-full px-5 py-4 bg-black/40 rounded-2xl border border-white/5 font-bold text-white outline-none focus:ring-2 focus:ring-[#0c7c92] transition-all placeholder:text-white/10"
                                placeholder="you@example.com"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 bg-gradient-to-r from-[#0c7c92] to-[#086a7d] hover:brightness-110 text-white font-black uppercase tracking-widest text-xs rounded-2xl shadow-xl shadow-[#0c7c92]/20 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
                        >
                            {loading ? <FaSpinner className="animate-spin" /> : 'Retrieve Status'}
                            {!loading && <FaChevronRight className="text-[10px] opacity-50" />}
                        </button>
                    </form>

                    {error && (
                        <div className="mt-6 p-4 bg-red-500/10 rounded-2xl border border-red-500/20 flex items-start gap-3 text-red-400 animate-in fade-in slide-in-from-top-2">
                            <FaTimesCircle className="shrink-0 mt-1" />
                            <p className="text-[10px] font-bold leading-relaxed uppercase">{error}</p>
                        </div>
                    )}
                </div>

                <div className="mt-auto py-12 lg:py-16 border-t border-white/5 hidden lg:block">
                    <p className="text-white/20 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                        <FaClock className="opacity-50" /> Updates every 24 hours
                    </p>
                </div>
            </div>

            {/* Right Section: Results */}
            <div className="flex-1 h-full bg-[#0a0f1d] dark:bg-[var(--bg-main)] overflow-y-auto relative no-scrollbar">
                {!statusData ? (
                    <div className="h-full w-full flex flex-col items-center justify-center p-12 text-center">
                        <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 animate-pulse">
                            <FaSearch className="text-3xl text-white/10" />
                        </div>
                        <h3 className="text-xl font-bold text-white/20 uppercase tracking-widest mb-2">Ready for lookup</h3>
                        <p className="text-white/10 max-w-sm text-sm font-medium">Enter your tracking code and business email on the left to see your real-time application timeline.</p>
                    </div>
                ) : (
                    <div className="max-w-4xl mx-auto p-4 sm:p-8 lg:p-12 animate-in fade-in duration-700">
                        {/* Status Header */}
                        <div className="relative bg-white/5 dark:bg-[var(--bg-card)] backdrop-blur-xl rounded-[40px] border border-white/10 shadow-2xl p-8 lg:p-12 overflow-hidden mb-8">
                            <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${getStatusColor(statusData.status).includes('red') ? 'from-red-500 to-red-600' : 'from-[#6ec9c4] to-[#0c7c92]'}`}></div>

                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                                <div>
                                    <h1 className="text-3xl lg:text-4xl font-black text-white dark:text-[var(--text-main)] mb-2 uppercase tracking-tight">{statusData.full_name}</h1>
                                    <div className="flex flex-wrap gap-3">
                                        <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-bold text-white/60 uppercase tracking-widest border border-white/5">
                                            {statusData.jobTitle}
                                        </span>
                                        <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-bold text-white/40 uppercase tracking-widest border border-white/5">
                                            Ref: {trackingCode}
                                        </span>
                                    </div>
                                </div>
                                <div className={`px-8 py-6 rounded-[24px] border border-opacity-20 flex flex-col items-center text-center gap-2 ${getStatusColor(statusData.status)}`}>
                                    <div className="text-3xl">
                                        {['rejected'].includes(statusData.status) ? <FaTimesCircle /> : <FaCheckCircle />}
                                    </div>
                                    <div className="min-w-[140px]">
                                        <p className="text-[10px] uppercase font-black opacity-50 mb-1 leading-none">Status</p>
                                        <h4 className="text-lg font-black uppercase tracking-tight leading-none">{formatStatus(statusData.status)}</h4>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 pt-8 border-t border-white/5">
                                <p className="text-white/80 dark:text-slate-300 font-medium leading-relaxed max-w-2xl">{getStatusDescription(statusData.status)}</p>
                            </div>
                        </div>

                        {/* Appointment & Timeline - Side by Side Grid */}
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                            {/* Appointment Details */}
                            {['written_exam', 'interview_shortlisted', 'interviewing'].includes(statusData.status) ? (
                                <div className="bg-white/5 dark:bg-[var(--bg-card)] backdrop-blur-xl rounded-[40px] border border-white/10 shadow-2xl p-8">
                                    <h3 className="text-xs font-black text-white/40 uppercase tracking-widest mb-8 flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#0c7c92]"></div>
                                        Next Steps
                                    </h3>

                                    <div className="space-y-6">
                                        <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                                            <div className="w-10 h-10 rounded-xl bg-[#0c7c92]/20 flex items-center justify-center text-[#6ec9c4] shrink-0">
                                                <FaCalendarAlt />
                                            </div>
                                            <div>
                                                <p className="text-[10px] uppercase font-black text-white/40 mb-1">Appointment</p>
                                                <p className="text-sm font-bold text-white dark:text-[var(--text-main)]">
                                                    {statusData.appointment_date ? new Date(statusData.appointment_date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' }) : 'TBD'}
                                                    {statusData.appointment_time ? ` @ ${statusData.appointment_time}` : ''}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                                            <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center text-red-400 shrink-0">
                                                <FaMapMarkerAlt />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-[10px] uppercase font-black text-white/40 mb-1">Venue</p>
                                                <p className="text-sm font-bold text-white dark:text-[var(--text-main)] mb-3 truncate">{statusData.appointment_location || 'ITPC Campus'}</p>

                                                {statusData.appointment_lat && statusData.appointment_lng && (
                                                    <div className="h-40 w-full rounded-xl overflow-hidden grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all border border-white/10 mb-3">
                                                        <MapContainer
                                                            center={[Number(statusData.appointment_lat), Number(statusData.appointment_lng)]}
                                                            zoom={15}
                                                            style={{ height: '100%', width: '100%' }}
                                                            scrollWheelZoom={false}
                                                        >
                                                            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                                            <Marker position={[Number(statusData.appointment_lat), Number(statusData.appointment_lng)]} />
                                                        </MapContainer>
                                                    </div>
                                                )}

                                                <a
                                                    href={statusData.appointment_map_link || `https://www.google.com/maps/search/?api=1&query=${statusData.appointment_lat},${statusData.appointment_lng}`}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="inline-flex items-center gap-2 text-[9px] font-black uppercase text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-all"
                                                >
                                                    <FaMapMarkerAlt /> Full Directions
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-white/5 dark:bg-[var(--bg-card)] backdrop-blur-xl rounded-[40px] border border-white/10 shadow-2xl p-8 flex flex-col items-center justify-center text-center italic opacity-30">
                                    <FaClock className="text-3xl mb-4" />
                                    <p className="text-sm font-bold text-white uppercase tracking-widest">Awaiting Schedule</p>
                                </div>
                            )}

                            {/* Info Box / Instructions */}
                            <div className="bg-[#0c7c92]/10 dark:bg-[var(--bg-card)] backdrop-blur-xl rounded-[40px] border border-[#0c7c92]/20 dark:border-[var(--border-color)] shadow-2xl p-8 flex flex-col">
                                <h3 className="text-xs font-black text-[#6ec9c4] uppercase tracking-widest mb-8 flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                                    Guidelines
                                </h3>

                                <div className="flex-1">
                                    {statusData.appointment_details ? (
                                        <p className="text-sm font-medium text-white/90 dark:text-slate-200 leading-relaxed mb-6">
                                            {statusData.appointment_details}
                                        </p>
                                    ) : (
                                        <p className="text-sm font-medium text-white/70 dark:text-slate-300 leading-relaxed mb-6">
                                            No additional instructions at this time. Please ensure you have your tracking number ready when visiting our offices.
                                        </p>
                                    )}
                                </div>

                                <div className="mt-auto p-4 rounded-2xl bg-black/20 border border-white/5">
                                    <p className="text-[10px] font-bold text-white/60 uppercase tracking-tighter mb-2">Need Help?</p>
                                    <p className="text-[11px] font-medium text-white/80">Contact HR Support at careers@ithpark.et for immediate assistance.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Decorative gradients */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0c7c92]/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#0c7c92]/10 blur-[80px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
            </div>

            <style>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </div>
    );
};

export default StatusCheck;
