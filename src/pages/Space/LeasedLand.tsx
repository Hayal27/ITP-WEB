import React, { useState, useEffect, useMemo } from 'react';
import {
  FaEnvelope,
  FaTimes,
  FaMapMarkedAlt,
  FaBuilding,
  FaInfoCircle,
  FaThLarge,
  FaList,
  FaSearch,
  FaGlobeAfrica,
  FaExpandArrowsAlt,
  FaSeedling,
  FaArrowRight,
  FaSort,
  FaSortUp,
  FaSortDown,
  FaTrashAlt,
  FaFilter
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import * as api from '../../services/apiService';
import './LeasedLand.css';

interface LeasedLandData {
  id: string;
  zone: string;
  landType: string;
  location: string;
  sizeSqm: number;
  availableSizeSqm: number;
  status: 'Available' | 'Leased';
  leasedBy: string | null;
  leasedFrom: string;
  contactName: string;
  contactPhone: string;
  createdAt: string;
  updatedAt: string;
}

interface ZoneInfo {
  name: string;
  description: string;
  totalSizeSqm: number;
  availableSizeSqm: number;
  icon: React.ReactNode;
}

const LeasedLand: React.FC = () => {
  const navigate = useNavigate();
  const [lands, setLands] = useState<LeasedLandData[]>([]);
  const [zones, setZones] = useState<ZoneInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedLand, setSelectedLand] = useState<LeasedLandData | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [zoneFilter, setZoneFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: keyof LeasedLandData; direction: 'ascending' | 'descending' } | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [landsData, zonesData] = await Promise.all([
        api.getLeasedLands(),
        api.getLandZones()
      ]);

      const mappedLands = landsData.map((l: api.LeasedLand) => ({
        id: l.id,
        zone: l.zone_name || '',
        landType: l.land_type,
        location: l.location,
        sizeSqm: Number(l.size_sqm),
        availableSizeSqm: Number(l.available_size_sqm),
        status: l.status,
        leasedBy: l.leased_by,
        leasedFrom: l.leased_from,
        contactName: l.contact_name,
        contactPhone: l.contact_phone,
        createdAt: '',
        updatedAt: ''
      }));

      const mappedZones = zonesData.map((z: api.LandZone) => ({
        name: z.name,
        description: z.description,
        totalSizeSqm: Number(z.total_size_sqm),
        availableSizeSqm: Number(z.available_size_sqm),
        icon: <FaGlobeAfrica />
      }));

      setLands(mappedLands);
      setZones(mappedZones);
      setLoading(false);
    } catch (err) {
      setError('Failed to load land data. Please check your connection.');
      setLoading(false);
    }
  };

  const requestSort = (key: keyof LeasedLandData) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const filteredLands = lands.filter(land => {
    const matchesStatus = filter === 'all' || land.status.toLowerCase() === filter.toLowerCase();
    const matchesZone = zoneFilter === 'all' || land.zone === zoneFilter;
    const matchesSearch = land.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      land.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      land.zone.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesZone && matchesSearch;
  });

  const sortedLands = useMemo(() => {
    let sortableLands = [...filteredLands];
    if (sortConfig !== null) {
      sortableLands.sort((a, b) => {
        const valA = a[sortConfig.key];
        const valB = b[sortConfig.key];
        if (valA === null || valA === undefined) return 1;
        if (valB === null || valB === undefined) return -1;
        if (valA < valB) return sortConfig.direction === 'ascending' ? -1 : 1;
        if (valA > valB) return sortConfig.direction === 'ascending' ? 1 : -1;
        return 0;
      });
    }
    return sortableLands;
  }, [filteredLands, sortConfig]);

  const handleInquire = (land: LeasedLandData) => {
    navigate('/contact', {
      state: {
        subject: `Land Lease Inquiry: ${land.id}`,
        message: `I am interested in the ${land.sizeSqm} sqm land parcel (${land.id}) located at ${land.location} in ${land.zone}. Please provide details on leasing procedures.`
      }
    });
  };

  const clearFilters = () => {
    setSearchTerm('');
    setZoneFilter('all');
    setFilter('all');
    setSortConfig(null);
  };

  const getSortIcon = (key: keyof LeasedLandData) => {
    if (!sortConfig || sortConfig.key !== key) return <FaSort className="sort-icon-placeholder" />;
    return sortConfig.direction === 'ascending' ? <FaSortUp className="sort-icon-active" /> : <FaSortDown className="sort-icon-active" />;
  };

  const stats = {
    total: lands.length,
    available: lands.filter(l => l.status === 'Available').length,
    totalArea: lands.reduce((acc, l) => acc + l.sizeSqm, 0),
    leasedArea: lands.filter(l => l.status === 'Leased').reduce((acc, l) => acc + l.sizeSqm, 0)
  };

  return (
    <div className="land-experience-container">
      {/* Hero Section */}
      <section className="land-hero">
        <div className="hero-content">
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            Strategic Land for Development
          </motion.h1>
          <p>Strategic locations for industrial and commercial growth within the ICT ecosystem.</p>
        </div>

        <div className="land-stats-grid">
          <motion.div className="stat-card" whileHover={{ y: -5 }}>
            <div className="land-stat-icon bg-green"><FaGlobeAfrica /></div>
            <div className="stat-info">
              <h3>{stats.total}</h3>
              <p>Total Parcels</p>
            </div>
          </motion.div>
          <motion.div className="stat-card" whileHover={{ y: -5 }}>
            <div className="land-stat-icon bg-amber"><FaSeedling /></div>
            <div className="stat-info">
              <h3>{stats.available}</h3>
              <p>Available Parcels</p>
            </div>
          </motion.div>
          <motion.div className="stat-card" whileHover={{ y: -5 }}>
            <div className="land-stat-icon bg-emerald"><FaExpandArrowsAlt /></div>
            <div className="stat-info">
              <h3>{stats.totalArea.toLocaleString()} m²</h3>
              <p>Total Land Area</p>
            </div>
          </motion.div>
          <motion.div className="stat-card" whileHover={{ y: -5 }}>
            <div className="land-stat-icon bg-lime"><FaBuilding /></div>
            <div className="stat-info">
              <h3>{((stats.leasedArea / stats.totalArea) * 100 || 0).toFixed(1)}%</h3>
              <p>Utilization Rate</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="land-workspace-layout">
        {/* Sidebar Filter Section */}
        <aside className="land-sidebar glass-effect">
          <div className="sidebar-header">
            <h3><FaFilter /> Search & Filter</h3>
          </div>

          <div className="sidebar-section">
            <label>Find Parcel</label>
            <div className="search-box-sidebar">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="ID, Zone or Location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="sidebar-section">
            <label>Development Zone</label>
            <div className="filter-list">
              <button
                className={zoneFilter === 'all' ? 'active' : ''}
                onClick={() => setZoneFilter('all')}
              >
                All Zones
              </button>
              {zones.map((z, i) => (
                <button
                  key={i}
                  className={zoneFilter === z.name ? 'active' : ''}
                  onClick={() => setZoneFilter(z.name)}
                >
                  {z.name}
                </button>
              ))}
            </div>
          </div>

          <div className="sidebar-section">
            <label>Lease Status</label>
            <div className="status-pills">
              <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>All</button>
              <button className={filter === 'available' ? 'active' : ''} onClick={() => setFilter('available')}>Available</button>
              <button className={filter === 'leased' ? 'active' : ''} onClick={() => setFilter('leased')}>Leased</button>
            </div>
          </div>

          {(searchTerm || zoneFilter !== 'all' || filter !== 'all' || sortConfig) && (
            <button className="btn-reset-all" onClick={clearFilters}>
              <FaTrashAlt /> Reset Search
            </button>
          )}
        </aside>

        {/* Results Content Area */}
        <main className="land-main-content">
          <div className="results-toolbar">
            <div className="results-info">
              Total Results: <span>{sortedLands.length}</span> / <span>{lands.length}</span>
            </div>
            <div className="view-mode-toggle">
              <button className={viewMode === 'grid' ? 'active' : ''} onClick={() => setViewMode('grid')}><FaThLarge /> Grid</button>
              <button className={viewMode === 'table' ? 'active' : ''} onClick={() => setViewMode('table')}><FaList /> List</button>
            </div>
          </div>

          {loading ? (
            <div className="enterprise-loader">
              <div className="spinner"></div>
              <p>Accessing land registry...</p>
            </div>
          ) : error ? (
            <div className="enterprise-error">
              <p>{error}</p>
              <button onClick={fetchData}>Try Again</button>
            </div>
          ) : (
            <div className="land-results">
              {viewMode === 'grid' ? (
                <div className="land-grid">
                  <AnimatePresence>
                    {sortedLands.map((land) => (
                      <motion.div
                        key={land.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="land-card glass-effect"
                      >
                        <div className="card-header">
                          <span className={`status-badge ${land.status.toLowerCase()}`}>{land.status}</span>
                          <h3>{land.id}</h3>
                        </div>
                        <div className="card-body">
                          <p className="zone-label"><FaGlobeAfrica /> {land.zone}</p>
                          <p className="location-label"><FaMapMarkedAlt /> {land.location}</p>

                          <div className="land-metrics">
                            <div><span>Area</span><strong>{land.sizeSqm.toLocaleString()} m²</strong></div>
                            <div><span>Type</span><strong>{land.landType}</strong></div>
                          </div>
                        </div>
                        <div className="card-footer">
                          <button className="btn-details" onClick={() => setSelectedLand(land)}>Details</button>
                          {land.status === 'Available' && (
                            <button className="btn-apply" onClick={() => handleInquire(land)}>Inquire</button>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="land-table-modern glass-effect">
                  <table className="modern-table">
                    <thead>
                      <tr>
                        <th onClick={() => requestSort('id')}>
                          <div className="th-content">ID {getSortIcon('id')}</div>
                        </th>
                        <th onClick={() => requestSort('zone')}>
                          <div className="th-content">Zone {getSortIcon('zone')}</div>
                        </th>
                        <th onClick={() => requestSort('location')}>
                          <div className="th-content">Location {getSortIcon('location')}</div>
                        </th>
                        <th onClick={() => requestSort('sizeSqm')}>
                          <div className="th-content">Size (m²) {getSortIcon('sizeSqm')}</div>
                        </th>
                        <th onClick={() => requestSort('landType')}>
                          <div className="th-content">Type {getSortIcon('landType')}</div>
                        </th>
                        <th onClick={() => requestSort('status')}>
                          <div className="th-content">Status {getSortIcon('status')}</div>
                        </th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedLands.map((land) => (
                        <tr key={land.id}>
                          <td className="font-mono">{land.id}</td>
                          <td>{land.zone}</td>
                          <td>{land.location}</td>
                          <td>{land.sizeSqm.toLocaleString()}</td>
                          <td>{land.landType}</td>
                          <td><span className={`status-badge ${land.status.toLowerCase()}`}>{land.status}</span></td>
                          <td>
                            <div className="table-actions">
                              <button onClick={() => setSelectedLand(land)}><FaInfoCircle /></button>
                              {land.status === 'Available' && (
                                <button onClick={() => handleInquire(land)}><FaEnvelope /></button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {sortedLands.length === 0 && (
                <div className="empty-state">
                  <FaSearch />
                  <h3>No parcels found</h3>
                  <p>Try different search criteria or reset filters.</p>
                  <button onClick={clearFilters} className="btn-reset-inline">Reset All</button>
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* Modern Land Detail Modal */}
      <AnimatePresence>
        {selectedLand && (
          <div className="modal-overlay" onClick={() => setSelectedLand(null)}>
            <motion.div
              className="land-detail-premium glass-effect"
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              onClick={e => e.stopPropagation()}
            >
              <button className="close-btn-premium" onClick={() => setSelectedLand(null)}><FaTimes /></button>

              <div className="detail-layout">
                <div className="detail-visual land-theme">
                  <div className="visual-badge">
                    <FaGlobeAfrica />
                    <span>Parcel ID: {selectedLand.id}</span>
                  </div>
                  <h2 className="premium-title">{selectedLand.landType} Parcel</h2>
                  <div className="detail-tag-list">
                    <span className={`status-tag ${selectedLand.status.toLowerCase()}`}>{selectedLand.status}</span>
                    <span className="info-tag"><FaMapMarkedAlt /> {selectedLand.location}</span>
                  </div>

                  <div className="primary-metrics">
                    <div className="metric-box">
                      <span className="label">Total Space</span>
                      <span className="value">{selectedLand.sizeSqm.toLocaleString()} m²</span>
                    </div>
                    <div className="metric-box">
                      <span className="label">Available</span>
                      <span className="value">{selectedLand.availableSizeSqm.toLocaleString()} m²</span>
                    </div>
                  </div>
                </div>

                <div className="detail-content">
                  <div className="content-section">
                    <h4 className="section-heading">Strategic Value</h4>
                    <p className="detail-desc">
                      This premium parcel is located in the <strong>{selectedLand.zone}</strong>,
                      providing excellent connectivity and infrastructure and is ideal for {selectedLand.landType.toLowerCase()} development.
                    </p>
                  </div>

                  <div className="content-section">
                    <h4 className="section-heading">Lease Specifications</h4>
                    <ul className="spec-list">
                      <li><strong>Zone Designation:</strong> {selectedLand.zone}</li>
                      <li><strong>Development Policy:</strong> ICT Hub Standards</li>
                      <li><strong>Commencement Date:</strong> {new Date(selectedLand.leasedFrom).toLocaleDateString()}</li>
                    </ul>
                  </div>

                  {selectedLand.status === 'Leased' && (
                    <div className="content-section leased-notice">
                      <h4 className="section-heading">Current Lessee</h4>
                      <p className="occupant-name">{selectedLand.leasedBy || 'Confidential Partner'}</p>
                    </div>
                  )}

                  <div className="cta-group">
                    {selectedLand.status === 'Available' ? (
                      <button className="btn-premium-action land-btn" onClick={() => handleInquire(selectedLand)}>
                        Inquire About Lease <FaArrowRight />
                      </button>
                    ) : (
                      <button className="btn-premium-disabled" disabled>
                        Lease Agreement Active
                      </button>
                    )}
                    <button className="btn-outline-action" onClick={() => setSelectedLand(null)}>
                      Return to Map
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LeasedLand;