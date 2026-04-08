import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import ProgressRing from '../../components/ui/ProgressRing';
import {
  Mail, GitBranch, ExternalLink, Edit3,
  Target, Award, Trophy, Flame, Calendar
} from 'lucide-react';
import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer
} from 'recharts';
import './Profile.css';

const skillData = [
  { skill: 'React', value: 92 },
  { skill: 'TypeScript', value: 85 },
  { skill: 'Node.js', value: 78 },
  { skill: 'CSS', value: 88 },
  { skill: 'Python', value: 70 },
  { skill: 'SQL', value: 75 },
  { skill: 'Docker', value: 60 },
  { skill: 'System Design', value: 55 },
];

const badges = [
  { name: 'First Assessment', icon: '🎯', unlocked: true },
  { name: '5-Day Streak', icon: '🔥', unlocked: true },
  { name: 'React Master', icon: '⚛️', unlocked: true },
  { name: 'Top 50', icon: '🏆', unlocked: true },
  { name: 'Certified x5', icon: '🏅', unlocked: true },
  { name: 'Speed Demon', icon: '⚡', unlocked: true },
  { name: 'Night Owl', icon: '🦉', unlocked: false },
  { name: 'Perfect Score', icon: '💯', unlocked: false },
  { name: 'Mentor', icon: '🧑‍🏫', unlocked: false },
  { name: 'Global #1', icon: '👑', unlocked: false },
];

const profileCompletion = [
  { label: 'Add profile photo', done: false },
  { label: 'Complete bio', done: true },
  { label: 'Add social links', done: false },
  { label: 'Take first assessment', done: true },
  { label: 'Earn a certificate', done: true },
  { label: 'Join a course', done: false },
];

const completionPercent = Math.round((profileCompletion.filter(i => i.done).length / profileCompletion.length) * 100);

const containerV = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const itemV = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

export default function Profile() {
  const { user } = useAuth();
  if (!user) return null;

  return (
    <motion.div className="profile-page" variants={containerV} initial="hidden" animate="visible">
      <div className="profile-grid">
        {/* Left Column */}
        <div className="profile-left">
          {/* User Card */}
          <motion.div className="profile-user-card card" variants={itemV}>
            <div className="profile-user-card__avatar">
              {user.name.split(' ').map(n => n[0]).join('')}
            </div>
            <h2>{user.name}</h2>
            <p className="profile-user-card__title">{user.jobTitle} at {user.company}</p>
            <div className="profile-user-card__meta">
              <span><Mail size={14} /> {user.email}</span>
              <span><Calendar size={14} /> Joined {new Date(user.joinDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
            </div>
            <p className="profile-user-card__bio">{user.bio}</p>
            <div className="profile-user-card__social">
              <button className="btn btn-sm btn-ghost"><GitBranch size={16} /> GitHub</button>
              <button className="btn btn-sm btn-ghost"><ExternalLink size={16} /> LinkedIn</button>
            </div>
            <button className="btn btn-secondary" style={{ width: '100%', marginTop: 16 }}>
              <Edit3 size={16} /> Edit Profile
            </button>
          </motion.div>

          {/* Profile Completion */}
          <motion.div className="profile-completion card" variants={itemV}>
            <div className="profile-completion__header">
              <h3>Profile Completion</h3>
              <ProgressRing progress={completionPercent} size={64} strokeWidth={5} />
            </div>
            <div className="profile-completion__list">
              {profileCompletion.map(item => (
                <div key={item.label} className={`profile-completion__item ${item.done ? 'profile-completion__item--done' : ''}`}>
                  <div className="profile-completion__check">{item.done ? '✓' : ''}</div>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="profile-right">
          {/* Stats */}
          <motion.div className="profile-stats" variants={itemV}>
            <div className="profile-stat-card">
              <Target size={20} color="var(--indigo-500)" />
              <span className="profile-stat-card__value">24</span>
              <span className="profile-stat-card__label">Assessments</span>
            </div>
            <div className="profile-stat-card">
              <Award size={20} color="var(--emerald-500)" />
              <span className="profile-stat-card__value">6</span>
              <span className="profile-stat-card__label">Certificates</span>
            </div>
            <div className="profile-stat-card">
              <Trophy size={20} color="var(--amber-500)" />
              <span className="profile-stat-card__value">#{user.rank}</span>
              <span className="profile-stat-card__label">Rank</span>
            </div>
            <div className="profile-stat-card">
              <Flame size={20} color="var(--rose-500)" />
              <span className="profile-stat-card__value">{user.streak}</span>
              <span className="profile-stat-card__label">Day Streak</span>
            </div>
          </motion.div>

          {/* Skill Radar Chart */}
          <motion.div className="profile-radar card" variants={itemV}>
            <h3>Skill Radar</h3>
            <div className="profile-radar__chart">
              <ResponsiveContainer width="100%" height={320}>
                <RadarChart data={skillData}>
                  <PolarGrid stroke="var(--border-primary)" />
                  <PolarAngleAxis dataKey="skill" tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar
                    name="Skills"
                    dataKey="value"
                    stroke="#6366F1"
                    fill="#6366F1"
                    fillOpacity={0.15}
                    strokeWidth={2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Badges */}
          <motion.div className="profile-badges card" variants={itemV}>
            <h3>Badges Wall</h3>
            <div className="profile-badges__grid">
              {badges.map(badge => (
                <div
                  key={badge.name}
                  className={`profile-badge ${badge.unlocked ? '' : 'profile-badge--locked'}`}
                  title={badge.name}
                >
                  <span className="profile-badge__icon">{badge.icon}</span>
                  <span className="profile-badge__name">{badge.name}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
