import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ProgressRing from '../../components/ui/ProgressRing';
import { Search, Clock, ArrowRight, Filter } from 'lucide-react';
import './SkillAssessment.css';

const categories = ['All', 'Frontend', 'Backend', 'DevOps', 'Database', 'Soft Skills'];

const myOngoing = [
  { id: 'react', title: 'React Fundamentals', progress: 75, attempts: 2, tests: 4, color: '#6366F1', icon: '⚛️' },
  { id: 'typescript', title: 'TypeScript Advanced', progress: 45, attempts: 1, tests: 3, color: '#3B82F6', icon: '📘' },
  { id: 'javascript', title: 'JavaScript ES6+', progress: 20, attempts: 1, tests: 5, color: '#F59E0B', icon: '⚡' },
];

const assessments = [
  { id: 'angular', title: 'Angular', desc: 'Build dynamic web apps with Angular framework', duration: '45 min', category: 'Frontend', icon: '🔺', difficulty: 'Intermediate' },
  { id: 'java', title: 'Java', desc: 'Master object-oriented programming with Java', duration: '60 min', category: 'Backend', icon: '☕', difficulty: 'Advanced' },
  { id: 'problem-solving', title: 'Problem Solving', desc: 'Enhance your algorithmic thinking skills', duration: '30 min', category: 'Soft Skills', icon: '🧩', difficulty: 'Beginner' },
  { id: 'csharp', title: 'C#', desc: 'Build enterprise applications with C#', duration: '50 min', category: 'Backend', icon: '🔷', difficulty: 'Intermediate' },
  { id: 'react', title: 'React', desc: 'Create modern UIs with React library', duration: '45 min', category: 'Frontend', icon: '⚛️', difficulty: 'Intermediate' },
  { id: 'javascript', title: 'JavaScript', desc: 'Master the language of the web', duration: '40 min', category: 'Frontend', icon: '⚡', difficulty: 'Beginner' },
  { id: 'sql', title: 'SQL', desc: 'Query and manage relational databases', duration: '35 min', category: 'Database', icon: '🗄️', difficulty: 'Beginner' },
  { id: 'go', title: 'Go', desc: 'Build performant server-side applications', duration: '50 min', category: 'Backend', icon: '🐹', difficulty: 'Intermediate' },
  { id: 'css', title: 'CSS', desc: 'Style beautiful and responsive web pages', duration: '30 min', category: 'Frontend', icon: '🎨', difficulty: 'Beginner' },
  { id: 'nodejs', title: 'Node.js', desc: 'Build scalable server-side JavaScript apps', duration: '45 min', category: 'Backend', icon: '🟢', difficulty: 'Intermediate' },
  { id: 'typescript', title: 'TypeScript', desc: 'Add type safety to your JavaScript projects', duration: '40 min', category: 'Frontend', icon: '📘', difficulty: 'Intermediate' },
  { id: 'python', title: 'Python', desc: 'Versatile programming for any domain', duration: '45 min', category: 'Backend', icon: '🐍', difficulty: 'Beginner' },
  { id: 'docker', title: 'Docker', desc: 'Containerize and deploy applications', duration: '40 min', category: 'DevOps', icon: '🐳', difficulty: 'Intermediate' },
  { id: 'kubernetes', title: 'Kubernetes', desc: 'Orchestrate containers at scale', duration: '55 min', category: 'DevOps', icon: '☸️', difficulty: 'Advanced' },
  { id: 'mongodb', title: 'MongoDB', desc: 'Work with NoSQL document databases', duration: '35 min', category: 'Database', icon: '🍃', difficulty: 'Beginner' },
  { id: 'graphql', title: 'GraphQL', desc: 'Build flexible APIs with GraphQL', duration: '40 min', category: 'Backend', icon: '📊', difficulty: 'Intermediate' },
];

const containerV = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const itemV = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

export default function SkillAssessment() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = assessments.filter(a => {
    const matchCategory = activeCategory === 'All' || a.category === activeCategory;
    const matchSearch = a.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <motion.div className="skill-assessment" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* My Assessments */}
      <section className="sa-section">
        <h2 className="sa-section__title">My Assessment</h2>
        <div className="sa-ongoing-grid">
          {myOngoing.map(a => (
            <motion.div
              key={a.id}
              className="sa-ongoing-card"
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <div className="sa-ongoing-card__header">
                <span className="sa-ongoing-card__icon">{a.icon}</span>
                <div className="sa-ongoing-card__info">
                  <h4>{a.title}</h4>
                  <span className="sa-ongoing-card__meta">{a.attempts} Attempts • {a.tests} Tests</span>
                </div>
              </div>
              <div className="sa-ongoing-card__progress">
                <ProgressRing progress={a.progress} size={80} strokeWidth={6} color={a.color} />
              </div>
              <Link to={`/assessment/${a.id}`} className="btn btn-sm btn-primary" style={{ width: '100%' }}>
                Continue <ArrowRight size={14} />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Browse Assessments */}
      <section className="sa-section">
        <h2 className="sa-section__title">Get Your Skills Certified</h2>

        <div className="sa-toolbar">
          <div className="sa-search">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search assessments..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="sa-filters">
            {categories.map(cat => (
              <button
                key={cat}
                className={`sa-filter-btn ${activeCategory === cat ? 'sa-filter-btn--active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          className="sa-grid"
          variants={containerV}
          initial="hidden"
          animate="visible"
          key={activeCategory + searchQuery}
        >
          {filtered.map(a => (
            <motion.div key={a.id} className="sa-card" variants={itemV} whileHover={{ y: -6 }}>
              <div className="sa-card__header">
                <span className="sa-card__icon">{a.icon}</span>
                <span className={`sa-card__difficulty sa-card__difficulty--${a.difficulty.toLowerCase()}`}>
                  {a.difficulty}
                </span>
              </div>
              <h3 className="sa-card__title">{a.title}</h3>
              <p className="sa-card__desc">{a.desc}</p>
              <div className="sa-card__footer">
                <span className="badge badge-warning">
                  <Clock size={12} /> {a.duration}
                </span>
                <Link to={`/assessment/${a.id}`} className="btn btn-sm btn-primary">
                  Start Assessment
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filtered.length === 0 && (
          <div className="sa-empty">
            <Filter size={48} />
            <h3>No assessments found</h3>
            <p>Try changing your search or filter criteria</p>
          </div>
        )}
      </section>
    </motion.div>
  );
}
