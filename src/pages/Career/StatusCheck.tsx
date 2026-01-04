import React, { useState } from 'react';
import axios from 'axios';
import { FaSearch, FaCheckCircle, FaTimesCircle, FaClock, FaMapMarkerAlt, FaCalendarAlt, FaSpinner } from 'react-icons/fa';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

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

const API_BASE = "http://localhost:5005/api/careers";

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
            case 'pending': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
            case 'reviewing': return 'text-orange-600 bg-orange-50 border-orange-200';
            case 'shortlisted': return 'text-indigo-600 bg-indigo-50 border-indigo-200';
            case 'written_exam': return 'text-purple-600 bg-purple-50 border-purple-200';
            case 'interview_shortlisted': return 'text-blue-600 bg-blue-50 border-blue-200';
            case 'interviewing': return 'text-blue-600 bg-blue-50 border-blue-200';
            case 'offered': return 'text-green-600 bg-green-50 border-green-200';
            case 'rejected': return 'text-red-600 bg-red-50 border-red-200';
            default: return 'text-gray-600 bg-gray-50 border-gray-200';
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
        <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 bg-gradient-to-b from-slate-50 to-white">
            <div className="w-full max-w-md">
                <div className="text-center mb-8 sm:mb-10">
                    <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tighter text-slate-800 mb-2">Track Application</h2>
                    <p className="text-xs sm:text-sm font-bold text-slate-400 uppercase tracking-widest">Enter your details to check status</p>
                </div>

                <div className="bg-white p-6 sm:p-8 rounded-2xl sm:rounded-[32px] shadow-xl border border-slate-100">
                    <form onSubmit={handleCheckStatus} className="space-y-5 sm:space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase font-black text-slate-400 pl-3">Tracking Code</label>
                            <div className="relative">
                                <FaSearch className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-300 text-sm" />
                                <input
                                    type="text"
                                    required
                                    value={trackingCode}
                                    onChange={e => setTrackingCode(e.target.value)}
                                    className="w-full pl-9 sm:pl-10 pr-4 py-3 sm:py-4 bg-slate-50 rounded-xl sm:rounded-2xl border-none font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-slate-300 text-sm sm:text-base"
                                    placeholder="APP-..."
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] uppercase font-black text-slate-400 pl-3">Email Address</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className="w-full px-4 py-3 sm:py-4 bg-slate-50 rounded-xl sm:rounded-2xl border-none font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-slate-300 text-sm sm:text-base"
                                placeholder="you@example.com"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 sm:py-4 bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-widest text-xs rounded-xl sm:rounded-2xl shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed active:scale-95"
                        >
                            {loading ? <FaSpinner className="animate-spin" /> : 'Check Status'}
                        </button>
                    </form>

                    {error && (
                        <div className="mt-5 sm:mt-6 p-3 sm:p-4 bg-red-50 rounded-xl sm:rounded-2xl border border-red-100 flex items-start gap-3 text-red-600 animate-in fade-in slide-in-from-top-2">
                            <FaTimesCircle className="shrink-0 mt-0.5" />
                            <p className="text-xs font-bold">{error}</p>
                        </div>
                    )}
                </div>

                {statusData && (
                    <div className="mt-6 sm:mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500 w-full">
                        <div className="bg-white p-6 sm:p-8 rounded-2xl sm:rounded-[32px] shadow-xl border border-slate-100 relative overflow-hidden">
                            <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${getStatusColor(statusData.status).includes('red') ? 'from-red-400 to-red-600' : 'from-blue-400 to-blue-600'}`}></div>

                            <div className="text-center mb-6 sm:mb-8 mt-2">
                                <h3 className="text-lg sm:text-xl font-black uppercase text-slate-800 mb-1 break-words">{statusData.full_name}</h3>
                                <p className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest">Applying for {statusData.jobTitle}</p>
                            </div>

                            <div className={`p-5 sm:p-6 rounded-xl sm:rounded-2xl border mb-5 sm:mb-6 flex flex-col items-center justify-center text-center gap-3 ${getStatusColor(statusData.status)}`}>
                                <div className="text-2xl sm:text-3xl">
                                    {['rejected'].includes(statusData.status) ? <FaTimesCircle /> : <FaCheckCircle />}
                                </div>
                                <div className="max-w-xs">
                                    <p className="text-[10px] uppercase font-black opacity-60">Current Status</p>
                                    <h4 className="text-base sm:text-lg font-black uppercase tracking-tight mb-2">{formatStatus(statusData.status)}</h4>
                                    <p className="text-xs font-medium opacity-80">{getStatusDescription(statusData.status)}</p>
                                </div>
                            </div>

                            {(statusData.status === 'written_exam' || statusData.status === 'interview_shortlisted' || statusData.status === 'interviewing') && (
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="h-px bg-slate-100 flex-1"></div>
                                        <span className="text-[10px] font-black uppercase text-slate-300">Appointment Details</span>
                                        <div className="h-px bg-slate-100 flex-1"></div>
                                    </div>

                                    <div className="bg-slate-50 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-slate-100 space-y-3 sm:space-y-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-blue-500 shadow-sm">
                                                <FaCalendarAlt />
                                            </div>
                                            <div>
                                                <p className="text-[10px] uppercase font-black text-slate-400">Date & Time</p>
                                                <p className="text-sm font-bold text-slate-700">
                                                    {statusData.appointment_date ? new Date(statusData.appointment_date).toLocaleDateString() : 'TBD'}
                                                    {statusData.appointment_time ? ` at ${statusData.appointment_time}` : ''}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-red-500 shadow-sm shrink-0">
                                                <FaMapMarkerAlt />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-[10px] uppercase font-black text-slate-400">Location</p>
                                                <p className="text-sm font-bold text-slate-700 mb-2">{statusData.appointment_location || 'Online / TBD'}</p>
                                                {statusData.appointment_lat && statusData.appointment_lng ? (
                                                    <>
                                                        <div className="h-48 w-full rounded-xl overflow-hidden border border-slate-200 mt-2 z-0 relative">
                                                            <MapContainer
                                                                center={[Number(statusData.appointment_lat), Number(statusData.appointment_lng)]}
                                                                zoom={15}
                                                                style={{ height: '100%', width: '100%' }}
                                                            >
                                                                <TileLayer
                                                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                                                                />
                                                                <Marker position={[Number(statusData.appointment_lat), Number(statusData.appointment_lng)]} />
                                                            </MapContainer>
                                                        </div>
                                                        <div className="mt-2 flex items-center justify-between gap-2">
                                                            <div className="text-[10px] text-slate-500 font-mono">
                                                                <span className="font-bold">Lat:</span> {Number(statusData.appointment_lat).toFixed(6)},
                                                                <span className="font-bold ml-2">Lng:</span> {Number(statusData.appointment_lng).toFixed(6)}
                                                            </div>
                                                            <a
                                                                href={`https://www.google.com/maps/search/?api=1&query=${statusData.appointment_lat},${statusData.appointment_lng}`}
                                                                target="_blank"
                                                                rel="noreferrer"
                                                                className="inline-flex items-center gap-1 text-[10px] font-black uppercase text-white bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded-lg transition-colors"
                                                            >
                                                                <FaMapMarkerAlt /> Google Maps
                                                            </a>
                                                        </div>
                                                    </>
                                                ) : statusData.appointment_map_link && (
                                                    <a
                                                        href={statusData.appointment_map_link}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="inline-flex items-center gap-2 text-[10px] font-black uppercase text-white bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-lg transition-colors"
                                                    >
                                                        <FaMapMarkerAlt /> View on Google Maps
                                                    </a>
                                                )}
                                            </div>
                                        </div>

                                        {statusData.appointment_details && (
                                            <div className="pt-4 border-t border-slate-200 mt-4">
                                                <p className="text-[10px] uppercase font-black text-slate-400 mb-1">Instructions</p>
                                                <p className="text-xs text-slate-600 font-medium leading-relaxed">{statusData.appointment_details}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StatusCheck;
