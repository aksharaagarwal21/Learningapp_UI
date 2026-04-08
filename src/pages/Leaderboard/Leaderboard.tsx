import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Crown, ChevronUp } from 'lucide-react';
import './Leaderboard.css';

const timeFilters = ['Weekly', 'Monthly', 'All-Time'];

const topUsers = [
  { rank: 1, name: 'Sophia Martinez', points: 12450, badges: 28, country: '🇺🇸', avatar: 'SM', change: 0 },
  { rank: 2, name: 'Arjun Patel', points: 11890, badges: 25, country: '🇮🇳', avatar: 'AP', change: 2 },
  { rank: 3, name: 'Emma Wilson', points: 11120, badges: 23, country: '🇬🇧', avatar: 'EW', change: -1 },
];

const leaderboardData = [
  { rank: 4, name: 'Lucas Chen', points: 10850, badges: 22, country: '🇨🇦', avatar: 'LC', change: 1 },
  { rank: 5, name: 'Maria Garcia', points: 10340, badges: 21, country: '🇪🇸', avatar: 'MG', change: 3 },
  { rank: 6, name: 'James Kim', points: 9870, badges: 19, country: '🇰🇷', avatar: 'JK', change: -2 },
  { rank: 7, name: 'Sarah Johnson', points: 9540, badges: 18, country: '🇦🇺', avatar: 'SJ', change: 0 },
  { rank: 8, name: 'Ahmed Hassan', points: 9120, badges: 17, country: '🇪🇬', avatar: 'AH', change: 4 },
  { rank: 9, name: 'Yuki Tanaka', points: 8890, badges: 16, country: '🇯🇵', avatar: 'YT', change: -1 },
  { rank: 10, name: 'Hans Mueller', points: 8650, badges: 15, country: '🇩🇪', avatar: 'HM', change: 2 },
  { rank: 11, name: 'Priya Sharma', points: 8420, badges: 15, country: '🇮🇳', avatar: 'PS', change: 0 },
  { rank: 12, name: 'David Brown', points: 8100, badges: 14, country: '🇺🇸', avatar: 'DB', change: -3 },
];

const currentUser = { rank: 42, name: 'Alex Thompson', points: 2450, badges: 8, country: '🇺🇸', avatar: 'AT', change: 5, isYou: true };

const podiumColors = ['linear-gradient(135deg, #F59E0B, #EF4444)', 'linear-gradient(135deg, #94A3B8, #64748B)', 'linear-gradient(135deg, #D97706, #B45309)'];
const podiumIcons = [Crown, Medal, Medal];

export default function Leaderboard() {
  const [timeFilter, setTimeFilter] = useState('Weekly');

  return (
    <motion.div
      className="leaderboard-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="leaderboard-page__header">
        <h1>🏆 Leaderboard</h1>
        <div className="leaderboard-time-filters">
          {timeFilters.map(t => (
            <button
              key={t}
              className={`sa-filter-btn ${timeFilter === t ? 'sa-filter-btn--active' : ''}`}
              onClick={() => setTimeFilter(t)}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Podium */}
      <div className="podium">
        {[1, 0, 2].map((idx) => {
          const user = topUsers[idx];
          const PodiumIcon = podiumIcons[idx];
          return (
            <motion.div
              key={user.rank}
              className={`podium__card podium__card--${user.rank}`}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.15, duration: 0.5 }}
            >
              <div className="podium__trophy" style={{ background: podiumColors[idx] }}>
                <PodiumIcon size={20} color="#fff" />
              </div>
              <div className="podium__avatar" style={{ background: podiumColors[idx] }}>
                {user.avatar}
              </div>
              <h3>{user.name}</h3>
              <span className="podium__points">{user.points.toLocaleString()} pts</span>
              <div className="podium__badges">
                <Trophy size={14} /> {user.badges} badges
              </div>
              <span className="podium__country">{user.country}</span>
            </motion.div>
          );
        })}
      </div>

      {/* Table */}
      <div className="leaderboard-table-wrapper">
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>User</th>
              <th>Points</th>
              <th>Badges</th>
              <th>Country</th>
              <th>Change</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.map(user => (
              <motion.tr
                key={user.rank}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: user.rank * 0.03 }}
              >
                <td><span className="lb-rank">#{user.rank}</span></td>
                <td>
                  <div className="lb-user">
                    <div className="lb-avatar">{user.avatar}</div>
                    <span>{user.name}</span>
                  </div>
                </td>
                <td><strong>{user.points.toLocaleString()}</strong></td>
                <td><span className="badge badge-primary">{user.badges}</span></td>
                <td>{user.country}</td>
                <td>
                  <span className={`lb-change ${user.change > 0 ? 'lb-change--up' : user.change < 0 ? 'lb-change--down' : ''}`}>
                    {user.change > 0 ? <ChevronUp size={14} /> : user.change < 0 ? <ChevronUp size={14} style={{ transform: 'rotate(180deg)' }} /> : '—'}
                    {user.change !== 0 && Math.abs(user.change)}
                  </span>
                </td>
              </motion.tr>
            ))}
            {/* Current User Highlighted */}
            <motion.tr
              className="lb-you"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <td><span className="lb-rank">#{currentUser.rank}</span></td>
              <td>
                <div className="lb-user">
                  <div className="lb-avatar lb-avatar--you">{currentUser.avatar}</div>
                  <span>{currentUser.name} <span className="badge badge-primary" style={{ marginLeft: 6 }}>You</span></span>
                </div>
              </td>
              <td><strong>{currentUser.points.toLocaleString()}</strong></td>
              <td><span className="badge badge-primary">{currentUser.badges}</span></td>
              <td>{currentUser.country}</td>
              <td>
                <span className="lb-change lb-change--up">
                  <ChevronUp size={14} /> {currentUser.change}
                </span>
              </td>
            </motion.tr>
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
