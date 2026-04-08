import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import {
  Zap, ArrowRight, Target, Award, Trophy, BarChart3, Users, Globe,
  CheckCircle2, Star, Sun, Moon, Code2, Shield, Sparkles
} from 'lucide-react';
import ParticleBackground from '../../components/ui/ParticleBackground';
import './Landing.css';

const stats = [
  { value: '10K+', label: 'Active Learners', icon: Users },
  { value: '50+', label: 'Skill Assessments', icon: Target },
  { value: '25K+', label: 'Certificates Issued', icon: Award },
  { value: '99%', label: 'Satisfaction Rate', icon: Star },
];

const features = [
  {
    icon: Target,
    title: 'Skill Assessments',
    description: 'Take comprehensive assessments across 50+ technical skills with MCQs and live coding challenges.',
    gradient: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
  },
  {
    icon: Award,
    title: 'Earn Certificates',
    description: 'Get industry-recognized certificates for your achievements. Share them on LinkedIn and your portfolio.',
    gradient: 'linear-gradient(135deg, #10B981, #06B6D4)',
  },
  {
    icon: Trophy,
    title: 'Compete & Climb',
    description: 'See how you stack up against peers on global leaderboards. Earn XP, badges, and streak rewards.',
    gradient: 'linear-gradient(135deg, #F59E0B, #EF4444)',
  },
  {
    icon: BarChart3,
    title: 'Track Progress',
    description: 'Visualize your learning journey with interactive radar charts, heatmaps, and performance analytics.',
    gradient: 'linear-gradient(135deg, #EC4899, #8B5CF6)',
  },
  {
    icon: Code2,
    title: 'Practice & Code',
    description: 'Daily coding challenges with an integrated code editor. Practice by topic, difficulty, and language.',
    gradient: 'linear-gradient(135deg, #06B6D4, #3B82F6)',
  },
  {
    icon: Shield,
    title: 'Recruiter Tools',
    description: 'Companies can post jobs with skill requirements and evaluate candidates through assessment scores.',
    gradient: 'linear-gradient(135deg, #10B981, #059669)',
  },
];

const testimonials = [
  {
    name: 'Emily Rodriguez',
    role: 'Frontend Developer at Google',
    text: 'SkillForge helped me identify gaps in my React skills and prepare for my Google interview. The assessments are incredibly well-designed.',
    avatar: 'ER',
  },
  {
    name: 'James Wu',
    role: 'Full-Stack Engineer',
    text: 'The daily practice challenges keep me sharp. I\'ve improved my problem-solving speed by 40% in just 3 months.',
    avatar: 'JW',
  },
  {
    name: 'Sarah Miller',
    role: 'Engineering Manager at Meta',
    text: 'As a recruiter, SkillForge gives us reliable skill assessments to evaluate candidates. It\'s transformed our hiring process.',
    avatar: 'SM',
  },
];

const pricingPlans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for getting started',
    features: ['5 assessments/month', 'Basic certificates', 'Community leaderboard', 'Daily challenges', 'Basic analytics'],
    cta: 'Get Started',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$19',
    period: 'per month',
    description: 'For serious learners',
    features: ['Unlimited assessments', 'Premium certificates', 'Full leaderboard access', 'AI recommendations', 'Advanced analytics', 'Code playground', 'Priority support'],
    cta: 'Start Pro Trial',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: '$99',
    period: 'per month',
    description: 'For teams & companies',
    features: ['Everything in Pro', 'Custom assessments', 'Team management', 'Recruiter dashboard', 'API access', 'Dedicated support', 'SSO & SAML'],
    cta: 'Contact Sales',
    highlighted: false,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] as const } },
};

export default function Landing() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="landing">
      {/* Navbar */}
      <nav className="landing-nav">
        <div className="container landing-nav__inner">
          <Link to="/" className="landing-nav__brand">
            <div className="landing-nav__logo">
              <Zap size={20} />
            </div>
            <span className="landing-nav__title">SkillForge</span>
          </Link>
          <div className="landing-nav__links">
            <a href="#features">Features</a>
            <a href="#testimonials">Testimonials</a>
            <a href="#pricing">Pricing</a>
          </div>
          <div className="landing-nav__actions">
            <button className="btn btn-icon" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <Link to="/login" className="btn btn-ghost">Log In</Link>
            <Link to="/signup" className="btn btn-primary">
              Get Started <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <ParticleBackground />
        <div className="container hero__inner">
          <motion.div
            className="hero__content"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          >
            <motion.div
              className="hero__badge"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Sparkles size={14} />
              <span>The #1 Skill Assessment Platform</span>
            </motion.div>
            <h1 className="hero__title">
              Assess. <span className="hero__title-accent">Learn.</span> Prove.
            </h1>
            <p className="hero__subtitle">
              Take comprehensive skill assessments, earn industry-recognized certificates, 
              compete on global leaderboards, and track your learning journey — all in one platform.
            </p>
            <div className="hero__cta">
              <Link to="/signup" className="btn btn-primary btn-lg">
                Start Your Journey <ArrowRight size={18} />
              </Link>
              <Link to="/login" className="btn btn-secondary btn-lg">
                <Globe size={18} /> Explore Skills
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="hero__visual"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="hero__card-stack">
              <motion.div
                className="hero__floating-card hero__floating-card--1"
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="hero__floating-card-icon" style={{ background: 'linear-gradient(135deg, #6366F1, #8B5CF6)' }}>
                  <Target size={20} />
                </div>
                <div>
                  <div className="hero__floating-card-title">React Assessment</div>
                  <div className="hero__floating-card-sub">92% Score — Certified!</div>
                </div>
              </motion.div>
              <motion.div
                className="hero__floating-card hero__floating-card--2"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                <div className="hero__floating-card-icon" style={{ background: 'linear-gradient(135deg, #10B981, #06B6D4)' }}>
                  <Trophy size={20} />
                </div>
                <div>
                  <div className="hero__floating-card-title">Rank #42</div>
                  <div className="hero__floating-card-sub">Global Leaderboard</div>
                </div>
              </motion.div>
              <motion.div
                className="hero__floating-card hero__floating-card--3"
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <div className="hero__floating-card-icon" style={{ background: 'linear-gradient(135deg, #F59E0B, #EF4444)' }}>
                  <Award size={20} />
                </div>
                <div>
                  <div className="hero__floating-card-title">🔥 5 Day Streak</div>
                  <div className="hero__floating-card-sub">2,450 XP earned</div>
                </div>
              </motion.div>
              {/* Code snippet card */}
              <motion.div
                className="hero__code-card"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
              >
                <div className="hero__code-header">
                  <div className="hero__code-dots">
                    <span style={{ background: '#EF4444' }} />
                    <span style={{ background: '#F59E0B' }} />
                    <span style={{ background: '#10B981' }} />
                  </div>
                  <span className="hero__code-filename">solution.tsx</span>
                </div>
                <pre className="hero__code-body">
                  <code>
{`const solve = (arr: number[]) => {
  const map = new Map();
  for (let i = 0; i < arr.length; i++) {
    const comp = target - arr[i];
    if (map.has(comp)) 
      return [map.get(comp), i];
    map.set(arr[i], i);
  }
};`}
                  </code>
                </pre>
              </motion.div>
            </div>
          </motion.div>
        </div>
        <div className="hero__gradient-blur hero__gradient-blur--1" />
        <div className="hero__gradient-blur hero__gradient-blur--2" />
      </section>

      {/* Stats */}
      <section className="landing-stats">
        <div className="container">
          <motion.div
            className="landing-stats__grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <motion.div key={stat.label} className="landing-stat-card" variants={itemVariants}>
                  <div className="landing-stat-card__icon">
                    <Icon size={22} />
                  </div>
                  <div className="landing-stat-card__value">{stat.value}</div>
                  <div className="landing-stat-card__label">{stat.label}</div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="landing-features" id="features">
        <div className="container">
          <motion.div
            className="landing-section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="landing-section-badge">Features</span>
            <h2 className="landing-section-title">Everything you need to <span className="text-gradient">master your skills</span></h2>
            <p className="landing-section-subtitle">
              From assessments to certificates, leaderboards to AI-powered recommendations — SkillForge is your complete learning companion.
            </p>
          </motion.div>

          <motion.div
            className="landing-features__grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  className="feature-card"
                  variants={itemVariants}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                >
                  <div className="feature-card__icon" style={{ background: feature.gradient }}>
                    <Icon size={24} color="#fff" />
                  </div>
                  <h3 className="feature-card__title">{feature.title}</h3>
                  <p className="feature-card__desc">{feature.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="landing-testimonials" id="testimonials">
        <div className="container">
          <motion.div
            className="landing-section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="landing-section-badge">Testimonials</span>
            <h2 className="landing-section-title">Loved by <span className="text-gradient">developers worldwide</span></h2>
          </motion.div>

          <motion.div
            className="landing-testimonials__grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {testimonials.map((t) => (
              <motion.div key={t.name} className="testimonial-card" variants={itemVariants}>
                <div className="testimonial-card__stars">
                  {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} fill="#F59E0B" color="#F59E0B" />)}
                </div>
                <p className="testimonial-card__text">"{t.text}"</p>
                <div className="testimonial-card__author">
                  <div className="testimonial-card__avatar">{t.avatar}</div>
                  <div>
                    <div className="testimonial-card__name">{t.name}</div>
                    <div className="testimonial-card__role">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pricing */}
      <section className="landing-pricing" id="pricing">
        <div className="container">
          <motion.div
            className="landing-section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="landing-section-badge">Pricing</span>
            <h2 className="landing-section-title">Simple, <span className="text-gradient">transparent pricing</span></h2>
            <p className="landing-section-subtitle">Choose the plan that's right for your learning journey.</p>
          </motion.div>

          <motion.div
            className="landing-pricing__grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {pricingPlans.map((plan) => (
              <motion.div
                key={plan.name}
                className={`pricing-card ${plan.highlighted ? 'pricing-card--highlighted' : ''}`}
                variants={itemVariants}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
              >
                {plan.highlighted && <div className="pricing-card__badge">Most Popular</div>}
                <h3 className="pricing-card__name">{plan.name}</h3>
                <p className="pricing-card__desc">{plan.description}</p>
                <div className="pricing-card__price">
                  <span className="pricing-card__amount">{plan.price}</span>
                  <span className="pricing-card__period">/{plan.period}</span>
                </div>
                <ul className="pricing-card__features">
                  {plan.features.map(f => (
                    <li key={f}>
                      <CheckCircle2 size={16} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/signup"
                  className={`btn btn-lg ${plan.highlighted ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ width: '100%' }}
                >
                  {plan.cta}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="landing-cta">
        <div className="container">
          <motion.div
            className="landing-cta__inner"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Ready to forge your skills?</h2>
            <p>Join 10,000+ learners who are already leveling up with SkillForge.</p>
            <Link to="/signup" className="btn btn-primary btn-lg">
              Start Free Today <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="container">
          <div className="landing-footer__grid">
            <div className="landing-footer__brand">
              <div className="landing-nav__brand">
                <div className="landing-nav__logo"><Zap size={20} /></div>
                <span className="landing-nav__title">SkillForge</span>
              </div>
              <p>The ultimate platform for skill assessment, certification, and learning progress tracking.</p>
            </div>
            <div className="landing-footer__links">
              <h4>Product</h4>
              <a href="#features">Features</a>
              <a href="#pricing">Pricing</a>
              <a href="#testimonials">Testimonials</a>
            </div>
            <div className="landing-footer__links">
              <h4>Company</h4>
              <a href="#">About</a>
              <a href="#">Careers</a>
              <a href="#">Blog</a>
            </div>
            <div className="landing-footer__links">
              <h4>Support</h4>
              <a href="#">Help Center</a>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
          </div>
          <div className="landing-footer__bottom">
            <p>© 2026 SkillForge. All rights reserved.</p>
            <p className="landing-footer__credit">
              Made by <strong>Akshara Kumari</strong> — Full Stack Developer
              <span className="landing-footer__credit-links">
                <a href="https://github.com/aksharaagarwal21" target="_blank" rel="noopener noreferrer">GitHub</a>
                <a href="https://www.linkedin.com/in/akshara-kumari-bb38b535b" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              </span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
