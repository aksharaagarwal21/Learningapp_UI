import { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Download, Share2, Eye, Filter, Calendar } from 'lucide-react';
import './Certificates.css';

const filters = ['All', 'Frontend', 'Backend', 'DevOps'];

const certificates = [
  { id: '1', skill: 'React', score: 92, date: 'Mar 15, 2026', category: 'Frontend', icon: '⚛️', color: '#6366F1' },
  { id: '2', skill: 'JavaScript', score: 88, date: 'Feb 28, 2026', category: 'Frontend', icon: '⚡', color: '#F59E0B' },
  { id: '3', skill: 'Node.js', score: 85, date: 'Feb 10, 2026', category: 'Backend', icon: '🟢', color: '#10B981' },
  { id: '4', skill: 'TypeScript', score: 90, date: 'Jan 22, 2026', category: 'Frontend', icon: '📘', color: '#3B82F6' },
  { id: '5', skill: 'Docker', score: 78, date: 'Jan 05, 2026', category: 'DevOps', icon: '🐳', color: '#06B6D4' },
  { id: '6', skill: 'Python', score: 95, date: 'Dec 18, 2025', category: 'Backend', icon: '🐍', color: '#10B981' },
];

const containerV = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const itemV = { hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } } };

export default function Certificates() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = certificates.filter(c => activeFilter === 'All' || c.category === activeFilter);

  return (
    <motion.div className="certificates-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="certificates-page__header">
        <div>
          <h1>🏅 My Certificates</h1>
          <p>{certificates.length} certificates earned</p>
        </div>
        <div className="sa-filters">
          {filters.map(f => (
            <button
              key={f}
              className={`sa-filter-btn ${activeFilter === f ? 'sa-filter-btn--active' : ''}`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <motion.div
        className="certificates-grid"
        variants={containerV}
        initial="hidden"
        animate="visible"
        key={activeFilter}
      >
        {filtered.map(cert => (
          <motion.div key={cert.id} className="cert-card" variants={itemV}>
            <div className="cert-card__preview">
              <div className="cert-card__preview-inner" style={{ borderColor: cert.color }}>
                <div className="cert-card__crest">
                  <Award size={28} color={cert.color} />
                </div>
                <h4>Certificate of Achievement</h4>
                <p className="cert-card__preview-skill">{cert.skill}</p>
                <div className="cert-card__preview-score">
                  <span style={{ color: cert.color }}>{cert.score}%</span>
                </div>
                <p className="cert-card__preview-name">Alex Thompson</p>
                <div className="cert-card__preview-footer">
                  <span className="cert-card__preview-icon">{cert.icon}</span>
                  <span>SkillForge™</span>
                </div>
              </div>
            </div>
            <div className="cert-card__info">
              <div>
                <h3>{cert.skill}</h3>
                <div className="cert-card__meta">
                  <Calendar size={14} /> {cert.date} • Score: {cert.score}%
                </div>
              </div>
              <div className="cert-card__actions">
                <button className="btn btn-sm btn-ghost" title="Preview">
                  <Eye size={16} />
                </button>
                <button className="btn btn-sm btn-ghost" title="Share to LinkedIn">
                  <Share2 size={16} />
                </button>
                <button className="btn btn-sm btn-primary" title="Download PDF">
                  <Download size={16} /> PDF
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
