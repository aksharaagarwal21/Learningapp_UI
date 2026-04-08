import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { Mail, Lock, Eye, EyeOff, Zap, ArrowRight, GitBranch } from 'lucide-react';
import ParticleBackground from '../../components/ui/ParticleBackground';
import './Auth.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const { login, setRole } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRole('learner');
    login(email, password);
    navigate('/dashboard');
  };

  const quickLogin = (role: 'learner' | 'recruiter' | 'instructor') => {
    setRole(role);
    login('demo@skillforge.com', 'demo');
    const routes = {
      learner: '/dashboard',
      recruiter: '/recruiter/dashboard',
      instructor: '/instructor/dashboard',
    };
    navigate(routes[role]);
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
          <h2>Welcome back to your learning journey</h2>
          <p>Continue where you left off. Your assessments, certificates, and progress are waiting.</p>
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
            <h1>Sign in to your account</h1>
            <p>Don't have an account? <Link to="/signup" className="auth-link">Sign up</Link></p>
          </div>

          {/* Quick Login Buttons */}
          <div className="auth-quick-login">
            <p className="auth-quick-login__label">Quick demo login:</p>
            <div className="auth-quick-login__btns">
              <button className="btn btn-sm btn-secondary" onClick={() => quickLogin('learner')}>🎓 Learner</button>
              <button className="btn btn-sm btn-secondary" onClick={() => quickLogin('recruiter')}>🏢 Recruiter</button>
              <button className="btn btn-sm btn-secondary" onClick={() => quickLogin('instructor')}>🧑‍🏫 Instructor</button>
            </div>
          </div>

          <div className="auth-divider">
            <span>or sign in with email</span>
          </div>

          <form onSubmit={handleSubmit} className="auth-form__body">
            <div className="input-group">
              <label htmlFor="login-email">Email address</label>
              <div className="input-field">
                <Mail size={18} className="input-icon" />
                <input
                  id="login-email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="login-password">Password</label>
              <div className="input-field">
                <Lock size={18} className="input-icon" />
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
                <button type="button" className="input-toggle" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="auth-form__options">
              <label className="auth-checkbox">
                <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} />
                <span className="auth-checkbox__mark" />
                <span>Remember me</span>
              </label>
              <Link to="/forgot-password" className="auth-link">Forgot password?</Link>
            </div>

            <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
              Sign In <ArrowRight size={18} />
            </button>
          </form>

          <div className="auth-divider">
            <span>or continue with</span>
          </div>

          <div className="auth-social">
            <button className="auth-social__btn">
              <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              Google
            </button>
            <button className="auth-social__btn">
              <GitBranch size={18} />
              GitHub
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
