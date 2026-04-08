import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import ProgressRing from '../../components/ui/ProgressRing';
import {
  Flame, Target, TrendingUp, Calendar, Clock,
  ChevronRight, Star, Zap, BookOpen, Code2, Trophy
} from 'lucide-react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const myAssessments = [
  { id: 'react', title: 'React Fundamentals', progress: 75, attempts: 2, tests: 4, color: '#6366F1', icon: '⚛️' },
  { id: 'typescript', title: 'TypeScript Advanced', progress: 45, attempts: 1, tests: 3, color: '#3B82F6', icon: '📘' },
  { id: 'javascript', title: 'JavaScript ES6+', progress: 90, attempts: 3, tests: 4, color: '#F59E0B', icon: '⚡' },
];

const recommended = [
  { id: 'docker-k8s', title: 'Docker & Kubernetes', category: 'DevOps', duration: '10 hours', icon: '🐳' },
  { id: 'css-animations', title: 'CSS Animations & Layouts', category: 'Frontend', duration: '7 hours', icon: '🎨' },
  { id: 'python-datascience', title: 'Python for Data Science', category: 'Data', duration: '15 hours', icon: '🐍' },
  { id: 'nodejs-backend', title: 'Node.js Backend', category: 'Backend', duration: '9 hours', icon: '🟢' },
];

const deadlines = [
  { title: 'React Assessment', due: 'Tomorrow, 5:00 PM', urgent: true },
  { title: 'TypeScript Quiz', due: 'Apr 12, 2026', urgent: false },
  { title: 'System Design Project', due: 'Apr 15, 2026', urgent: false },
];

// Generate heatmap data for GitHub-style activity
const generateHeatmapData = () => {
  const data: number[][] = [];
  for (let week = 0; week < 20; week++) {
    const weekData: number[] = [];
    for (let day = 0; day < 7; day++) {
      weekData.push(Math.random() > 0.4 ? Math.floor(Math.random() * 4) + 1 : 0);
    }
    data.push(weekData);
  }
  return data;
};

const heatmapData = generateHeatmapData();
const heatmapColors = ['var(--bg-tertiary)', '#C7D2FE', '#A5B4FC', '#818CF8', '#6366F1'];

export default function Dashboard() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <motion.div
      className="dashboard"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Greeting */}
      <motion.div className="dashboard__greeting" variants={itemVariants}>
        <div className="dashboard__greeting-left">
          <h1>Welcome back, {user.name.split(' ')[0]}! 👋</h1>
          <p>Continue your learning streak and level up your skills today.</p>
        </div>
        <div className="dashboard__streak-badge">
          <Flame size={20} color="#F59E0B" />
          <span>{user.streak} Day Streak!</span>
        </div>
      </motion.div>

      {/* Stats Row */}
      <motion.div className="dashboard__stats" variants={itemVariants}>
        <div className="stat-card">
          <div className="stat-card__icon stat-card__icon--indigo">
            <Target size={20} />
          </div>
          <div className="stat-card__content">
            <span className="stat-card__value">24</span>
            <span className="stat-card__label">Problems Solved</span>
          </div>
          <div className="stat-card__trend stat-card__trend--up">
            <TrendingUp size={14} /> +12%
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card__icon stat-card__icon--amber">
            <Zap size={20} />
          </div>
          <div className="stat-card__content">
            <span className="stat-card__value">{user.points.toLocaleString()}</span>
            <span className="stat-card__label">Points Collected</span>
          </div>
          <div className="stat-card__trend stat-card__trend--up">
            <TrendingUp size={14} /> +250
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card__icon stat-card__icon--emerald">
            <Code2 size={20} />
          </div>
          <div className="stat-card__content">
            <span className="stat-card__value">18</span>
            <span className="stat-card__label">Solutions Submitted</span>
          </div>
          <div className="stat-card__trend stat-card__trend--up">
            <TrendingUp size={14} /> +8
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card__icon stat-card__icon--rose">
            <Trophy size={20} />
          </div>
          <div className="stat-card__content">
            <span className="stat-card__value">#{user.rank}</span>
            <span className="stat-card__label">Global Rank</span>
          </div>
          <div className="stat-card__trend stat-card__trend--up">
            <TrendingUp size={14} /> +5
          </div>
        </div>
      </motion.div>

      <div className="dashboard__grid">
        {/* My Assessments */}
        <motion.div className="dashboard__section" variants={itemVariants}>
          <div className="dashboard__section-header">
            <h2>My Assessments</h2>
            <Link to="/skill-assessment" className="dashboard__section-link">
              View All <ChevronRight size={16} />
            </Link>
          </div>
          <div className="assessment-cards">
            {myAssessments.map((a) => (
              <Link key={a.id} to={`/assessment/${a.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <motion.div
                  className="assessment-mini-card"
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                >
                  <div className="assessment-mini-card__top">
                    <span className="assessment-mini-card__icon">{a.icon}</span>
                    <ProgressRing
                      progress={a.progress}
                      size={56}
                      strokeWidth={5}
                      color={a.color}
                    />
                  </div>
                  <h4 className="assessment-mini-card__title">{a.title}</h4>
                  <div className="assessment-mini-card__meta">
                    <span>{a.attempts} attempts</span>
                    <span>•</span>
                    <span>{a.tests} tests</span>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Weekly Activity  */}
        <motion.div className="dashboard__section" variants={itemVariants}>
          <div className="dashboard__section-header">
            <h2>Weekly Activity</h2>
            <span className="badge badge-success">This Week: 12 activities</span>
          </div>
          <div className="heatmap">
            <div className="heatmap__labels">
              {['Mon', '', 'Wed', '', 'Fri', '', 'Sun'].map((d, i) => (
                <span key={i}>{d}</span>
              ))}
            </div>
            <div className="heatmap__grid">
              {heatmapData.map((week, wi) => (
                <div key={wi} className="heatmap__column">
                  {week.map((val, di) => (
                    <motion.div
                      key={di}
                      className="heatmap__cell"
                      style={{ background: heatmapColors[val] }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: wi * 0.02 + di * 0.01 }}
                      title={`${val} activities`}
                    />
                  ))}
                </div>
              ))}
            </div>
            <div className="heatmap__legend">
              <span>Less</span>
              {heatmapColors.map((c, i) => (
                <div key={i} className="heatmap__cell" style={{ background: c }} />
              ))}
              <span>More</span>
            </div>
          </div>
        </motion.div>

        {/* Recommended */}
        <motion.div className="dashboard__section" variants={itemVariants}>
          <div className="dashboard__section-header">
            <h2>Recommended For You</h2>
            <span className="badge badge-primary"><Star size={12} /> AI-Powered</span>
          </div>
          <div className="recommended-list">
            {recommended.map((r) => (
              <Link key={r.id} to={`/courses/${r.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <motion.div
                  className="recommended-item"
                  whileHover={{ x: 4, transition: { duration: 0.2 } }}
                >
                  <span className="recommended-item__icon">{r.icon}</span>
                  <div className="recommended-item__content">
                    <span className="recommended-item__title">{r.title}</span>
                    <span className="recommended-item__category">{r.category}</span>
                  </div>
                  <span className="badge badge-warning">
                    <Clock size={12} /> {r.duration}
                  </span>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Upcoming Deadlines */}
        <motion.div className="dashboard__section" variants={itemVariants}>
          <div className="dashboard__section-header">
            <h2>Upcoming Deadlines</h2>
            <Calendar size={18} className="text-tertiary" />
          </div>
          <div className="deadlines-list">
            {deadlines.map((d) => (
              <div key={d.title} className={`deadline-item ${d.urgent ? 'deadline-item--urgent' : ''}`}>
                <div className="deadline-item__dot" />
                <div className="deadline-item__content">
                  <span className="deadline-item__title">{d.title}</span>
                  <span className="deadline-item__due">{d.due}</span>
                </div>
                {d.urgent && <span className="badge badge-danger">Urgent</span>}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div className="dashboard__section dashboard__quick-actions" variants={itemVariants}>
          <h2>Quick Actions</h2>
          <div className="quick-actions-grid">
            <Link to="/skill-assessment" className="quick-action-card">
              <div className="quick-action-card__icon" style={{ background: 'linear-gradient(135deg, #6366F1, #8B5CF6)' }}>
                <Target size={22} color="#fff" />
              </div>
              <span>New Assessment</span>
            </Link>
            <Link to="/practice" className="quick-action-card">
              <div className="quick-action-card__icon" style={{ background: 'linear-gradient(135deg, #10B981, #06B6D4)' }}>
                <Code2 size={22} color="#fff" />
              </div>
              <span>Daily Challenge</span>
            </Link>
            <Link to="/courses" className="quick-action-card">
              <div className="quick-action-card__icon" style={{ background: 'linear-gradient(135deg, #F59E0B, #EF4444)' }}>
                <BookOpen size={22} color="#fff" />
              </div>
              <span>Browse Courses</span>
            </Link>
            <Link to="/leaderboard" className="quick-action-card">
              <div className="quick-action-card__icon" style={{ background: 'linear-gradient(135deg, #EC4899, #8B5CF6)' }}>
                <Trophy size={22} color="#fff" />
              </div>
              <span>Leaderboard</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
