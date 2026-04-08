import { motion } from 'framer-motion';
import { Award, Trophy, Target, Settings, Check, Clock } from 'lucide-react';
import './Notifications.css';

const notifications = [
  {
    id: '1', type: 'assessment', icon: Target, color: '#6366F1',
    title: 'Assessment Reminder', message: 'React Fundamentals assessment expires tomorrow. Complete it now!',
    time: '2 hours ago', unread: true,
  },
  {
    id: '2', type: 'certificate', icon: Award, color: '#10B981',
    title: 'New Certificate Earned!', message: 'Congratulations! You\'ve earned your JavaScript certificate with a score of 88%.',
    time: '5 hours ago', unread: true,
  },
  {
    id: '3', type: 'leaderboard', icon: Trophy, color: '#F59E0B',
    title: 'Rank Update', message: 'You\'ve moved up 5 positions on the global leaderboard! Current rank: #42.',
    time: '1 day ago', unread: true,
  },
  {
    id: '4', type: 'system', icon: Settings, color: '#64748B',
    title: 'System Update', message: 'New feature: Daily coding challenges are now available in the Practice section.',
    time: '2 days ago', unread: false,
  },
  {
    id: '5', type: 'assessment', icon: Target, color: '#6366F1',
    title: 'New Assessment Available', message: 'Kubernetes assessment is now available. Test your container orchestration skills!',
    time: '3 days ago', unread: false,
  },
  {
    id: '6', type: 'certificate', icon: Award, color: '#10B981',
    title: 'Certificate Expiring', message: 'Your Docker certificate will expire in 30 days. Consider retaking the assessment.',
    time: '5 days ago', unread: false,
  },
];

export default function Notifications() {
  return (
    <motion.div className="notifications-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="notifications-page__header">
        <h1>🔔 Notifications</h1>
        <button className="btn btn-sm btn-ghost"><Check size={16} /> Mark all as read</button>
      </div>

      <div className="notifications-list">
        {notifications.map(n => {
          const Icon = n.icon;
          return (
            <motion.div
              key={n.id}
              className={`notification-item ${n.unread ? 'notification-item--unread' : ''}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: parseInt(n.id) * 0.05 }}
            >
              <div className="notification-item__icon" style={{ background: `${n.color}15`, color: n.color }}>
                <Icon size={20} />
              </div>
              <div className="notification-item__content">
                <h4>{n.title}</h4>
                <p>{n.message}</p>
                <span className="notification-item__time"><Clock size={12} /> {n.time}</span>
              </div>
              {n.unread && <div className="notification-item__dot" />}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
