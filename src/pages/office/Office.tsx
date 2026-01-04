import React, { useState, useEffect } from 'react';
import {
  FaEnvelope,
  FaPhone,
  FaUser,
  FaTimes,
  FaBuilding,
  FaInfoCircle,
  FaThLarge,
  FaList,
  FaSearch,
  FaChartLine,
  FaCheckCircle,
  FaClock,
  FaMapMarkerAlt,
  FaArrowRight,
  FaSort,
  FaSortUp,
  FaSortDown,
  FaFilter,
  FaTrashAlt
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import * as api from '../../services/apiService';
import './Office.css';

interface OfficeData {
  id: string;
  zone: string;
  building: string;
  unitNumber: string;
  floor: number;
  sizeSqm: number;
  status: 'Available' | 'Rented';
  priceMonthly: number;
  rentedBy: string | null;
  availableFrom: string;
  contactName: string;
  contactPhone: string;
  createdAt: string;
  updatedAt: string;
}

interface BuildingInfo {
  name: string;
  description: string;
  totalOffices: number;
  availableOffices: number;
  totalSizeSqm: number;
  icon: React.ReactNode;
}

const Office: React.FC = () => {
  const navigate = useNavigate();
  const [offices, setOffices] = useState<OfficeData[]>([]);
  const [buildings, setBuildings] = useState<BuildingInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedOffice, setSelectedOffice] = useState<OfficeData | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [buildingFilter, setBuildingFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: keyof OfficeData; direction: 'ascending' | 'descending' } | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [officesData, buildingsData] = await Promise.all([
        api.getOffices(),
        api.getBuildings()
      ]);

      const mappedOffices = officesData.map((o: api.Office) => ({
        id: o.id,
        zone: o.zone,
        building: o.building_name || '',
        unitNumber: o.unit_number,
        floor: o.floor,
        sizeSqm: o.size_sqm,
        status: o.status,
        priceMonthly: o.price_monthly,
        rentedBy: o.rented_by,
        availableFrom: o.available_from,
        contactName: o.contact_name,
        contactPhone: o.contact_phone,
        createdAt: '',
        updatedAt: ''
      }));

      const mappedBuildings = buildingsData.map((b: api.Building) => ({
        name: b.name,
        description: b.description,
        totalOffices: b.total_offices,
        availableOffices: b.available_offices,
        totalSizeSqm: b.total_size_sqm,
        icon: <FaBuilding />
      }));

      setOffices(mappedOffices);
      setBuildings(mappedBuildings);
      setLoading(false);
    } catch (err) {
      setError('Failed to load office data. Please try again later.');
      setLoading(false);
    }
  };

  const formatDate = (dateString: string): string => {
    if (!dateString) return 'TBD';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const filteredOffices = offices.filter(office => {
    const matchesStatus = filter === 'all' || office.status.toLowerCase() === filter.toLowerCase();
    const matchesBuilding = buildingFilter === 'all' || office.building === buildingFilter;
    const matchesSearch = office.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      office.unitNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      office.building.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesBuilding && matchesSearch;
  });

  const handleApply = (office: OfficeData) => {
    navigate('/contact', {
      state: {
        subject: `Inquiry: Office Unit ${office.unitNumber}`,
        message: `I am interested in leasing office unit ${office.unitNumber} (${office.id}) located in ${office.building}. Please provide more information regarding lease terms.`
      }
    });
  };

  const requestSort = (key: keyof OfficeData) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedOffices = React.useMemo(() => {
    let sortableOffices = [...filteredOffices];
    if (sortConfig !== null) {
      sortableOffices.sort((a, b) => {
        const valA = a[sortConfig.key];
        const valB = b[sortConfig.key];
        if (valA === null || valA === undefined) return 1;
        if (valB === null || valB === undefined) return -1;
        if (valA < valB) return sortConfig.direction === 'ascending' ? -1 : 1;
        if (valA > valB) return sortConfig.direction === 'ascending' ? 1 : -1;
        return 0;
      });
    }
    return sortableOffices;
  }, [filteredOffices, sortConfig]);

  const stats = {
    total: offices.length,
    available: offices.filter(o => o.status === 'Available').length,
    totalArea: offices.reduce((acc, curr) => acc + curr.sizeSqm, 0),
    avgPrice: offices.length ? (offices.reduce((acc, curr) => acc + curr.priceMonthly, 0) / offices.length).toFixed(0) : 0
  };

  const clearFilters = () => {
    setSearchTerm('');
    setBuildingFilter('all');
    setFilter('all');
    setSortConfig(null);
  };

  const getSortIcon = (key: keyof OfficeData) => {
    if (!sortConfig || sortConfig.key !== key) return <FaSort className="sort-icon-placeholder" />;
    return sortConfig.direction === 'ascending' ? <FaSortUp className="sort-icon-active" /> : <FaSortDown className="sort-icon-active" />;
  };

  return (
    <div className="office-experience-container">
      {/* Hero Section */}
      <section className="office-hero">
        <div className="hero-content">
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            Enterprise Workspace Solutions
          </motion.h1>
          <p>Find the perfect environment for your innovation at Ethiopia's premier ICT Hub.</p>
        </div>

        <div className="stats-grid">
          <motion.div className="stat-card" whileHover={{ y: -5 }}>
            <div className="stat-icon bg-blue"><FaBuilding /></div>
            <div className="stat-info">
              <h3>{stats.total}</h3>
              <p>Total Units</p>
            </div>
          </motion.div>
          <motion.div className="stat-card" whileHover={{ y: -5 }}>
            <div className="stat-icon bg-green"><FaCheckCircle /></div>
            <div className="stat-info">
              <h3>{stats.available}</h3>
              <p>Available Now</p>
            </div>
          </motion.div>
          <motion.div className="stat-card" whileHover={{ y: -5 }}>
            <div className="stat-icon bg-purple"><FaChartLine /></div>
            <div className="stat-info">
              <h3>{stats.totalArea.toLocaleString()}</h3>
              <p>Total Sqm</p>
            </div>
          </motion.div>
          <motion.div className="stat-card" whileHover={{ y: -5 }}>
            <div className="stat-icon bg-orange"><FaClock /></div>
            <div className="stat-info">
              <h3>{stats.avgPrice}</h3>
              <p>Avg. Monthly (ETB)</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Workspace Content with Sidebar */}
      <div className="office-workspace-layout">
        {/* Sidebar Filtering */}
        <aside className="office-sidebar glass-effect">
          <div className="sidebar-header">
            <h3><FaFilter /> Filters</h3>
          </div>

          <div className="sidebar-section">
            <label>Search Inventory</label>
            <div className="search-box-sidebar">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="ID, Unit or Building..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="sidebar-section">
            <label>Building Location</label>
            <div className="filter-list">
              <button
                className={buildingFilter === 'all' ? 'active' : ''}
                onClick={() => setBuildingFilter('all')}
              >
                All Buildings
              </button>
              {buildings.map((b, i) => (
                <button
                  key={i}
                  className={buildingFilter === b.name ? 'active' : ''}
                  onClick={() => setBuildingFilter(b.name)}
                >
                  {b.name}
                </button>
              ))}
            </div>
          </div>

          <div className="sidebar-section">
            <label>Status Filter</label>
            <div className="status-pills">
              <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>All</button>
              <button className={filter === 'available' ? 'active' : ''} onClick={() => setFilter('available')}>Available</button>
              <button className={filter === 'rented' ? 'active' : ''} onClick={() => setFilter('rented')}>Rented</button>
            </div>
          </div>

          {(searchTerm || buildingFilter !== 'all' || filter !== 'all' || sortConfig) && (
            <button className="btn-reset-all" onClick={clearFilters}>
              <FaTrashAlt /> Clear All Filters
            </button>
          )}
        </aside>

        {/* Main Workspace Area */}
        <main className="office-main-content">
          <div className="results-toolbar">
            <div className="results-info">
              Showing <strong>{sortedOffices.length}</strong> of <strong>{offices.length}</strong> matching units
            </div>
            <div className="view-mode-toggle">
              <button className={viewMode === 'grid' ? 'active' : ''} onClick={() => setViewMode('grid')}><FaThLarge /> Cards</button>
              <button className={viewMode === 'table' ? 'active' : ''} onClick={() => setViewMode('table')}><FaList /> Table</button>
            </div>
          </div>

          {loading ? (
            <div className="enterprise-loader">
              <div className="spinner"></div>
              <p>Preparing workspace catalog...</p>
            </div>
          ) : error ? (
            <div className="enterprise-error">
              <p>{error}</p>
              <button onClick={fetchData}>Retry Search</button>
            </div>
          ) : (
            <div className="office-results">
              {viewMode === 'grid' ? (
                <motion.div className="office-grid" layout>
                  <AnimatePresence>
                    {sortedOffices.map((office) => (
                      <motion.div
                        key={office.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="office-card glass-effect"
                      >
                        <div className="card-header">
                          <span className={`status-badge ${office.status.toLowerCase()}`}>{office.status}</span>
                          <h3>{office.unitNumber}</h3>
                        </div>
                        <div className="card-body">
                          <p className="building-name"><FaBuilding /> {office.building}</p>
                          <div className="card-metrics">
                            <div><span>Area</span><strong>{office.sizeSqm} m²</strong></div>
                            <div><span>Floor</span><strong>Level {office.floor}</strong></div>
                            <div><span>Price</span><strong>{office.priceMonthly.toLocaleString()} ETB</strong></div>
                          </div>
                        </div>
                        <div className="card-footer">
                          <button className="btn-details" onClick={() => setSelectedOffice(office)}>View Details</button>
                          {office.status === 'Available' && (
                            <button className="btn-apply" onClick={() => handleApply(office)}>Inquire</button>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              ) : (
                <div className="table-container-modern glass-effect">
                  <table className="modern-table">
                    <thead>
                      <tr>
                        <th onClick={() => requestSort('id')}>
                          <div className="th-content">ID {getSortIcon('id')}</div>
                        </th>
                        <th onClick={() => requestSort('building')}>
                          <div className="th-content">Building {getSortIcon('building')}</div>
                        </th>
                        <th onClick={() => requestSort('unitNumber')}>
                          <div className="th-content">Unit {getSortIcon('unitNumber')}</div>
                        </th>
                        <th onClick={() => requestSort('floor')}>
                          <div className="th-content">Floor {getSortIcon('floor')}</div>
                        </th>
                        <th onClick={() => requestSort('sizeSqm')}>
                          <div className="th-content">Size {getSortIcon('sizeSqm')}</div>
                        </th>
                        <th onClick={() => requestSort('priceMonthly')}>
                          <div className="th-content">Price {getSortIcon('priceMonthly')}</div>
                        </th>
                        <th onClick={() => requestSort('status')}>
                          <div className="th-content">Status {getSortIcon('status')}</div>
                        </th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedOffices.map((office) => (
                        <tr key={office.id}>
                          <td className="font-mono">{office.id}</td>
                          <td>{office.building}</td>
                          <td>{office.unitNumber}</td>
                          <td>{office.floor}</td>
                          <td>{office.sizeSqm} m²</td>
                          <td>{office.priceMonthly.toLocaleString()} ETB</td>
                          <td><span className={`status-badge ${office.status.toLowerCase()}`}>{office.status}</span></td>
                          <td>
                            <div className="table-actions">
                              <button onClick={() => setSelectedOffice(office)} title="View Details"><FaInfoCircle /></button>
                              {office.status === 'Available' && (
                                <button onClick={() => handleApply(office)} title="Inquire"><FaEnvelope /></button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {sortedOffices.length === 0 && (
                <div className="empty-state">
                  <FaSearch />
                  <h3>No matching results</h3>
                  <p>Try broadening your filter criteria or changing keywords.</p>
                  <button onClick={clearFilters} className="btn-reset-inline">Reset All Filters</button>
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* Modern Detail Modal */}
      <AnimatePresence>
        {selectedOffice && (
          <div className="modal-overlay" onClick={() => setSelectedOffice(null)}>
            <motion.div
              className="office-detail-premium glass-effect"
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              onClick={e => e.stopPropagation()}
            >
              <button className="close-btn-premium" onClick={() => setSelectedOffice(null)}><FaTimes /></button>

              <div className="detail-layout">
                <div className="detail-visual">
                  <div className="visual-badge">
                    <FaBuilding />
                    <span>PropID: {selectedOffice.id}</span>
                  </div>
                  <h2 className="premium-title">Unit {selectedOffice.unitNumber}</h2>
                  <div className="detail-tag-list">
                    <span className={`status-tag ${selectedOffice.status.toLowerCase()}`}>{selectedOffice.status}</span>
                    <span className="info-tag"><FaMapMarkerAlt /> {selectedOffice.building}</span>
                  </div>

                  <div className="primary-metrics">
                    <div className="metric-box">
                      <span className="label">Floor Level</span>
                      <span className="value">{selectedOffice.floor}</span>
                    </div>
                    <div className="metric-box">
                      <span className="label">Size</span>
                      <span className="value">{selectedOffice.sizeSqm} m²</span>
                    </div>
                  </div>
                </div>

                <div className="detail-content">
                  <div className="content-section">
                    <h4 className="section-heading">Financial Summary</h4>
                    <div className="price-display">
                      <span className="amount">{selectedOffice.priceMonthly.toLocaleString()}</span>
                      <span className="currency">ETB / Month</span>
                    </div>
                  </div>

                  <div className="content-section">
                    <h4 className="section-heading">Workspace Specifications</h4>
                    <ul className="spec-list">
                      <li><strong>Zone:</strong> {selectedOffice.zone}</li>
                      <li><strong>Available From:</strong> {formatDate(selectedOffice.availableFrom)}</li>
                      <li><strong>Office Status:</strong> {selectedOffice.status === 'Available' ? 'Immediate Occupancy' : 'Currently Leased'}</li>
                    </ul>
                  </div>

                  {selectedOffice.status === 'Rented' && (
                    <div className="content-section rented-notice">
                      <h4 className="section-heading">Current Occupant</h4>
                      <p className="occupant-name">{selectedOffice.rentedBy || 'Confidential Enterprise'}</p>
                    </div>
                  )}

                  <div className="cta-group">
                    {selectedOffice.status === 'Available' ? (
                      <button className="btn-premium-action" onClick={() => handleApply(selectedOffice)}>
                        Contact Leasing Agent <FaArrowRight />
                      </button>
                    ) : (
                      <button className="btn-premium-disabled" disabled>
                        Currently Unavailable
                      </button>
                    )}
                    <button className="btn-outline-action" onClick={() => setSelectedOffice(null)}>
                      Back to Listings
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

export default Office;