import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import type { UserRole } from '../../contexts/AuthContext';
import { Mail, Lock, Eye, EyeOff, Zap, ArrowRight, GitBranch, User, GraduationCap, Briefcase, BookOpen } from 'lucide-react';
import ParticleBackground from '../../components/ui/ParticleBackground';
import './Auth.css';

const roles = [
  {
    id: 'learner' as UserRole,
    icon: GraduationCap,
    emoji: '🎓',
    title: 'Learner',
    description: 'Take assessments, earn certificates, and climb leaderboards',
    color: '#6366F1',
  },
  {
    id: 'recruiter' as UserRole,
    icon: Briefcase,
    emoji: '🏢',
    title: 'Recruiter',
    description: 'Post jobs, assess candidates, and find top talent',
    color: '#10B981',
  },
  {
    id: 'instructor' as UserRole,
    icon: BookOpen,
    emoji: '🧑‍🏫',
    title: 'Instructor',
    description: 'Create assessments, courses, and track student progress',
    color: '#F59E0B',
  },
];

export default function Signup() {
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setStep(2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) return;
    signup(name, email, password, selectedRole);
    const routes = {
      learner: '/dashboard',
      recruiter: '/recruiter/dashboard',
      instructor: '/instructor/dashboard',
    };
    navigate(routes[selectedRole]);
  };

  return (
    <div className="auth-page">
      <div className="auth-page__visual">
        <ParticleBackground />
        <motion.div
          className="auth-page__visual-content"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="auth-page__visual-badge">
            <Zap size={20} />
            <span>SkillForge</span>
          </div>
          <h2>Start your skill journey today</h2>
          <p>Join thousands of learners, recruiters, and instructors on the most comprehensive skill assessment platform.</p>
          <div className="auth-page__visual-stats">
            <div className="auth-visual-stat">
              <span className="auth-visual-stat__value">10K+</span>
              <span className="auth-visual-stat__label">Learners</span>
            </div>
            <div className="auth-visual-stat">
              <span className="auth-visual-stat__value">50+</span>
              <span className="auth-visual-stat__label">Skills</span>
            </div>
            <div className="auth-visual-stat">
              <span className="auth-visual-stat__value">25K+</span>
              <span className="auth-visual-stat__label">Certificates</span>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="auth-page__form-wrapper">
        <motion.div
          className="auth-form"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="auth-form__header">
            <Link to="/" className="auth-form__logo">
              <div className="landing-nav__logo"><Zap size={18} /></div>
              <span className="landing-nav__title" style={{ fontSize: '16px' }}>SkillForge</span>
            </Link>
            <h1>Create your account</h1>
            <p>Already have an account? <Link to="/login" className="auth-link">Sign in</Link></p>
          </div>

          {/* Progress Bar */}
          <div className="auth-progress">
            {[1, 2].map(s => (
              <div key={s} className={`auth-progress__step ${step >= s ? 'auth-progress__step--active' : ''}`}>
                <div className="auth-progress__dot">{s}</div>
                <span>{s === 1 ? 'Choose Role' : 'Your Details'}</span>
              </div>
            ))}
            <div className="auth-progress__bar">
              <motion.div
                className="auth-progress__fill"
                animate={{ width: step === 1 ? '0%' : '100%' }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="auth-roles"
              >
                <p className="auth-roles__label">I want to join as a:</p>
                {roles.map(role => {
                  const Icon = role.icon;
                  return (
                    <motion.button
                      key={role.id}
                      className={`auth-role-card ${selectedRole === role.id ? 'auth-role-card--selected' : ''}`}
                      onClick={() => handleRoleSelect(role.id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="auth-role-card__icon" style={{ background: `${role.color}15`, color: role.color }}>
                        <Icon size={24} />
                      </div>
                      <div className="auth-role-card__content">
                        <span className="auth-role-card__title">{role.emoji} {role.title}</span>
                        <span className="auth-role-card__desc">{role.description}</span>
                      </div>
                      <ArrowRight size={18} className="auth-role-card__arrow" />
                    </motion.button>
                  );
                })}
              </motion.div>
            ) : (
              <motion.form
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handleSubmit}
                className="auth-form__body"
              >
                <button type="button" className="auth-back-btn" onClick={() => setStep(1)}>
                  ← Back to role selection
                </button>

                <div className="input-group">
                  <label htmlFor="signup-name">Full Name</label>
                  <div className="input-field">
                    <User size={18} className="input-icon" />
                    <input
                      id="signup-name"
                      type="text"
                      placeholder="John Doe"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="input-group">
                  <label htmlFor="signup-email">Email address</label>
                  <div className="input-field">
                    <Mail size={18} className="input-icon" />
                    <input
                      id="signup-email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="input-group">
                  <label htmlFor="signup-password">Password</label>
                  <div className="input-field">
                    <Lock size={18} className="input-icon" />
                    <input
                      id="signup-password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Create a strong password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      required
                    />
                    <button type="button" className="input-toggle" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="input-group">
                  <label htmlFor="signup-confirm">Confirm Password</label>
                  <div className="input-field">
                    <Lock size={18} className="input-icon" />
                    <input
                      id="signup-confirm"
                      type="password"
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                  Create Account <ArrowRight size={18} />
                </button>

                <div className="auth-divider"><span>or continue with</span></div>
                <div className="auth-social">
                  <button type="button" className="auth-social__btn">
                    <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                    Google
                  </button>
                  <button type="button" className="auth-social__btn">
                    <GitBranch size={18} />
                    GitHub
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
