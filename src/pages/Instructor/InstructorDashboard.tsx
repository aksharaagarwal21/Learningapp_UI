import { motion } from 'framer-motion';
import { PlusCircle, Target, Users, TrendingUp, DollarSign, Star, BarChart3 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Link } from 'react-router-dom';
import './InstructorDashboard.css';

const performanceData = [
  { month: 'Jan', attempts: 120, avgScore: 72 },
  { month: 'Feb', attempts: 180, avgScore: 74 },
  { month: 'Mar', attempts: 250, avgScore: 76 },
  { month: 'Apr', attempts: 310, avgScore: 78 },
  { month: 'May', attempts: 420, avgScore: 75 },
  { month: 'Jun', attempts: 380, avgScore: 80 },
];

const topAssessments = [
  { title: 'React Fundamentals', attempts: 1240, avgScore: 78, rating: 4.8, icon: '⚛️' },
  { title: 'JavaScript Mastery', attempts: 980, avgScore: 72, rating: 4.6, icon: '⚡' },
  { title: 'TypeScript Advanced', attempts: 650, avgScore: 68, rating: 4.5, icon: '📘' },
  { title: 'CSS Layouts', attempts: 420, avgScore: 82, rating: 4.7, icon: '🎨' },
];

const feedback = [
  { user: 'Alex T.', text: 'Great assessment! Really tests practical knowledge.', rating: 5, assessment: 'React Fundamentals' },
  { user: 'Maria G.', text: 'Challenging but fair. Learned a lot from the explanations.', rating: 4, assessment: 'JavaScript Mastery' },
  { user: 'James K.', text: 'The coding questions were excellent. More like this please!', rating: 5, assessment: 'TypeScript Advanced' },
];

const containerV = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const itemV = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

export default function InstructorDashboard() {
  return (
    <motion.div className="instructor-dash" variants={containerV} initial="hidden" animate="visible">
      <motion.div className="dashboard__greeting" variants={itemV}>
        <div>
          <h1>Instructor Dashboard 🧑‍🏫</h1>
          <p>Create assessments, track performance, and help learners grow.</p>
        </div>
        <Link to="/instructor/create-assessment" className="btn btn-primary">
          <PlusCircle size={18} /> Create Assessment
        </Link>
      </motion.div>

      {/* Stats */}
      <motion.div className="dashboard__stats" variants={itemV}>
        <div className="stat-card">
          <div className="stat-card__icon stat-card__icon--indigo"><Target size={20} /></div>
          <div className="stat-card__content">
            <span className="stat-card__value">12</span>
            <span className="stat-card__label">Assessments Created</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card__icon stat-card__icon--emerald"><Users size={20} /></div>
          <div className="stat-card__content">
            <span className="stat-card__value">3,290</span>
            <span className="stat-card__label">Total Attempts</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card__icon stat-card__icon--amber"><TrendingUp size={20} /></div>
          <div className="stat-card__content">
            <span className="stat-card__value">76%</span>
            <span className="stat-card__label">Avg Score</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card__icon stat-card__icon--rose"><DollarSign size={20} /></div>
          <div className="stat-card__content">
            <span className="stat-card__value">$2,840</span>
            <span className="stat-card__label">Revenue (Pro)</span>
          </div>
        </div>
      </motion.div>

      <div className="dashboard__grid">
        {/* Performance Chart */}
        <motion.div className="dashboard__section" variants={itemV}>
          <div className="dashboard__section-header">
            <h2>Performance Trends</h2>
            <span className="badge badge-primary"><BarChart3 size={12} /> 6 Months</span>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={performanceData}>
              <defs>
                <linearGradient id="attemptGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366F1" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-secondary)" />
              <XAxis dataKey="month" tick={{ fill: 'var(--text-tertiary)', fontSize: 12 }} />
              <YAxis tick={{ fill: 'var(--text-tertiary)', fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-primary)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: 13,
                }}
              />
              <Area type="monotone" dataKey="attempts" stroke="#6366F1" fill="url(#attemptGrad)" strokeWidth={2} />
              <Line type="monotone" dataKey="avgScore" stroke="#10B981" strokeWidth={2} dot={{ r: 4 }} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Top Assessments */}
        <motion.div className="dashboard__section" variants={itemV}>
          <div className="dashboard__section-header">
            <h2>Top Performing Assessments</h2>
          </div>
          <div className="instructor-assessments-list">
            {topAssessments.map(a => (
              <div key={a.title} className="instructor-assessment-item">
                <span className="instructor-assessment-item__icon">{a.icon}</span>
                <div className="instructor-assessment-item__content">
                  <span className="instructor-assessment-item__title">{a.title}</span>
                  <span className="instructor-assessment-item__meta">{a.attempts.toLocaleString()} attempts • Avg: {a.avgScore}%</span>
                </div>
                <div className="instructor-assessment-item__rating">
                  <Star size={14} fill="#F59E0B" color="#F59E0B" />
                  <span>{a.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Student Feedback */}
        <motion.div className="dashboard__section" style={{ gridColumn: '1 / -1' }} variants={itemV}>
          <div className="dashboard__section-header">
            <h2>Student Feedback</h2>
          </div>
          <div className="instructor-feedback-grid">
            {feedback.map((f, i) => (
              <div key={i} className="instructor-feedback-card">
                <div className="instructor-feedback-card__stars">
                  {Array.from({ length: f.rating }, (_, i) => (
                    <Star key={i} size={14} fill="#F59E0B" color="#F59E0B" />
                  ))}
                </div>
                <p>"{f.text}"</p>
                <div className="instructor-feedback-card__footer">
                  <strong>{f.user}</strong>
                  <span className="badge badge-primary">{f.assessment}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
