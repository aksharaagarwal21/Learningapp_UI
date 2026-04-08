import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import {
  LayoutDashboard, Target, Award, Trophy, User, BookOpen,
  Code2, Bell, Settings, LogOut, ChevronLeft, ChevronRight,
  Briefcase, Users, BarChart3, PlusCircle, GraduationCap,
  Zap
} from 'lucide-react';
import { useState } from 'react';
import './Sidebar.css';

const learnerLinks = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/skill-assessment', icon: Target, label: 'Assessments' },
  { to: '/certificates', icon: Award, label: 'Certificates' },
  { to: '/leaderboard', icon: Trophy, label: 'Leaderboard' },
  { to: '/courses', icon: BookOpen, label: 'Courses' },
  { to: '/practice', icon: Code2, label: 'Practice' },
  { to: '/profile', icon: User, label: 'Profile' },
];

const recruiterLinks = [
  { to: '/recruiter/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/recruiter/jobs', icon: Briefcase, label: 'Job Posts' },
  { to: '/recruiter/candidates', icon: Users, label: 'Candidates' },
  { to: '/recruiter/assessments', icon: Target, label: 'Assessments' },
];

const instructorLinks = [
  { to: '/instructor/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/instructor/create-assessment', icon: PlusCircle, label: 'Create Assessment' },
  { to: '/instructor/analytics', icon: BarChart3, label: 'Analytics' },
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  if (!user) return null;

  const links = user.role === 'recruiter' 
    ? recruiterLinks 
    : user.role === 'instructor' 
      ? instructorLinks 
      : learnerLinks;

  const roleIcon = user.role === 'recruiter' 
    ? Briefcase 
    : user.role === 'instructor' 
      ? GraduationCap 
      : Zap;

  const RoleIcon = roleIcon;

  return (
    <>
      <motion.aside 
        className={`sidebar ${collapsed ? 'sidebar--collapsed' : ''}`}
        animate={{ width: collapsed ? 72 : 260 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="sidebar__header">
          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.div 
                className="sidebar__brand"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="sidebar__logo">
                  <Zap size={22} />
                </div>
                <span className="sidebar__title">SkillForge</span>
              </motion.div>
            )}
          </AnimatePresence>
          {collapsed && (
            <div className="sidebar__logo sidebar__logo--centered">
              <Zap size={22} />
            </div>
          )}
          <button 
            className="sidebar__toggle"
            onClick={() => setCollapsed(!collapsed)}
            aria-label="Toggle sidebar"
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        <div className="sidebar__role-badge">
          <RoleIcon size={14} />
          {!collapsed && <span>{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</span>}
        </div>

        <nav className="sidebar__nav">
          <div className="sidebar__nav-section">
            {!collapsed && <span className="sidebar__section-label">Main Menu</span>}
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.to;
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={`sidebar__link ${isActive ? 'sidebar__link--active' : ''}`}
                  title={link.label}
                >
                  {isActive && (
                    <motion.div
                      className="sidebar__link-bg"
                      layoutId="activeNav"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <Icon size={20} className="sidebar__link-icon" />
                  <AnimatePresence>
                    {!collapsed && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 'auto' }}
                        exit={{ opacity: 0, width: 0 }}
                        className="sidebar__link-label"
                      >
                        {link.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
          </div>
        </nav>

        <div className="sidebar__footer">
          <NavLink to="/notifications" className="sidebar__link" title="Notifications">
            <Bell size={20} className="sidebar__link-icon" />
            {!collapsed && <span className="sidebar__link-label">Notifications</span>}
            <span className="sidebar__notification-dot" />
          </NavLink>
          <NavLink to="/settings" className="sidebar__link" title="Settings">
            <Settings size={20} className="sidebar__link-icon" />
            {!collapsed && <span className="sidebar__link-label">Settings</span>}
          </NavLink>
          <button className="sidebar__link sidebar__link--danger" onClick={logout} title="Logout">
            <LogOut size={20} className="sidebar__link-icon" />
            {!collapsed && <span className="sidebar__link-label">Logout</span>}
          </button>
        </div>
      </motion.aside>

      {/* Mobile Bottom Nav */}
      <nav className="mobile-nav">
        {links.slice(0, 5).map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.to;
          return (
            <NavLink
              key={link.to}
              to={link.to}
              className={`mobile-nav__link ${isActive ? 'mobile-nav__link--active' : ''}`}
            >
              <Icon size={20} />
              <span>{link.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </>
  );
}
