import { motion } from 'framer-motion';
import { Briefcase, Users, CheckCircle, Clock, TrendingUp, Plus, Search, Eye, MessageSquare } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './RecruiterDashboard.css';

const skillDemand = [
  { skill: 'React', demand: 85 },
  { skill: 'Python', demand: 78 },
  { skill: 'TypeScript', demand: 72 },
  { skill: 'Node.js', demand: 68 },
  { skill: 'AWS', demand: 65 },
  { skill: 'Docker', demand: 60 },
  { skill: 'Go', demand: 45 },
  { skill: 'Rust', demand: 35 },
];

const recentActivity = [
  { user: 'Sarah Kim', action: 'completed React assessment', score: 94, time: '2 hours ago', avatar: 'SK' },
  { user: 'James Park', action: 'completed TypeScript assessment', score: 87, time: '5 hours ago', avatar: 'JP' },
  { user: 'Emily Chen', action: 'applied for Senior Dev role', score: null, time: '8 hours ago', avatar: 'EC' },
  { user: 'David Lee', action: 'completed Node.js assessment', score: 91, time: '1 day ago', avatar: 'DL' },
];

const candidates = [
  { name: 'Sarah Kim', skill: 'React', score: 94, location: 'San Francisco, CA', status: 'shortlisted', avatar: 'SK' },
  { name: 'James Park', skill: 'TypeScript', score: 87, location: 'New York, NY', status: 'pending', avatar: 'JP' },
  { name: 'Emily Chen', skill: 'Python', score: 91, location: 'Seattle, WA', status: 'shortlisted', avatar: 'EC' },
  { name: 'David Lee', skill: 'Node.js', score: 78, location: 'Austin, TX', status: 'rejected', avatar: 'DL' },
  { name: 'Lisa Wang', skill: 'React', score: 96, location: 'Boston, MA', status: 'shortlisted', avatar: 'LW' },
];

const containerV = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const itemV = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

export default function RecruiterDashboard() {
  return (
    <motion.div className="recruiter-dash" variants={containerV} initial="hidden" animate="visible">
      <motion.div className="dashboard__greeting" variants={itemV}>
        <div>
          <h1>Recruiter Dashboard 🏢</h1>
          <p>Manage job posts, assess candidates, and find top talent.</p>
        </div>
        <button className="btn btn-primary"><Plus size={18} /> Post New Job</button>
      </motion.div>

      {/* Stats */}
      <motion.div className="dashboard__stats" variants={itemV}>
        <div className="stat-card">
          <div className="stat-card__icon stat-card__icon--indigo"><Briefcase size={20} /></div>
          <div className="stat-card__content">
            <span className="stat-card__value">8</span>
            <span className="stat-card__label">Active Job Posts</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card__icon stat-card__icon--emerald"><Users size={20} /></div>
          <div className="stat-card__content">
            <span className="stat-card__value">156</span>
            <span className="stat-card__label">Candidates Assessed</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card__icon stat-card__icon--amber"><CheckCircle size={20} /></div>
          <div className="stat-card__content">
            <span className="stat-card__value">12</span>
            <span className="stat-card__label">Hired</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card__icon stat-card__icon--rose"><Clock size={20} /></div>
          <div className="stat-card__content">
            <span className="stat-card__value">34</span>
            <span className="stat-card__label">Pending Reviews</span>
          </div>
        </div>
      </motion.div>

      <div className="dashboard__grid">
        {/* Skill Demand Chart */}
        <motion.div className="dashboard__section" variants={itemV}>
          <div className="dashboard__section-header">
            <h2>Skill Demand</h2>
            <span className="badge badge-primary"><TrendingUp size={12} /> Market Trends</span>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={skillDemand} barSize={24}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-secondary)" />
              <XAxis dataKey="skill" tick={{ fill: 'var(--text-tertiary)', fontSize: 12 }} />
              <YAxis tick={{ fill: 'var(--text-tertiary)', fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-primary)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: 13,
                }}
              />
              <Bar dataKey="demand" fill="#6366F1" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Recent Activity */}
        <motion.div className="dashboard__section" variants={itemV}>
          <div className="dashboard__section-header">
            <h2>Recent Activity</h2>
          </div>
          <div className="recruiter-activity-list">
            {recentActivity.map((a, i) => (
              <div key={i} className="recruiter-activity-item">
                <div className="lb-avatar">{a.avatar}</div>
                <div className="recruiter-activity-item__content">
                  <span><strong>{a.user}</strong> {a.action}</span>
                  {a.score && <span className="badge badge-success">{a.score}%</span>}
                </div>
                <span className="recruiter-activity-item__time">{a.time}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Candidates Table */}
        <motion.div className="dashboard__section" style={{ gridColumn: '1 / -1' }} variants={itemV}>
          <div className="dashboard__section-header">
            <h2>Top Candidates</h2>
            <div className="sa-search" style={{ minWidth: 200 }}>
              <Search size={16} />
              <input type="text" placeholder="Search candidates..." />
            </div>
          </div>
          <div className="leaderboard-table-wrapper">
            <table className="leaderboard-table">
              <thead>
                <tr>
                  <th>Candidate</th>
                  <th>Skill</th>
                  <th>Score</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {candidates.map(c => (
                  <tr key={c.name}>
                    <td>
                      <div className="lb-user">
                        <div className="lb-avatar">{c.avatar}</div>
                        <span>{c.name}</span>
                      </div>
                    </td>
                    <td><span className="badge badge-primary">{c.skill}</span></td>
                    <td><strong>{c.score}%</strong></td>
                    <td>{c.location}</td>
                    <td>
                      <span className={`badge badge-${c.status === 'shortlisted' ? 'success' : c.status === 'rejected' ? 'danger' : 'warning'}`}>
                        {c.status}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: 4 }}>
                        <button className="btn btn-sm btn-ghost" title="View"><Eye size={16} /></button>
                        <button className="btn btn-sm btn-ghost" title="Message"><MessageSquare size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
