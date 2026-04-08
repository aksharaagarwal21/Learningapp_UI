import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getAssessmentById } from '../../data/assessmentData';
import {
  Clock, Target, Award, AlertTriangle,
  ChevronRight, Shield
} from 'lucide-react';
import './AssessmentDetail.css';

export default function AssessmentDetail() {
  const { assessmentId } = useParams();
  const assessment = getAssessmentById(assessmentId || '');

  if (!assessment) {
    return (
      <div className="cd-not-found">
        <h2>Assessment not found</h2>
        <Link to="/skill-assessment" className="btn btn-primary">← Back to Assessments</Link>
      </div>
    );
  }

  return (
    <motion.div className="assessment-detail" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="cd-breadcrumb">
        <Link to="/skill-assessment">Assessments</Link>
        <ChevronRight size={14} />
        <span>{assessment.title}</span>
      </div>

      <div className="ad-grid">
        <div className="ad-main">
          <div className="ad-hero" style={{ '--accent': assessment.color } as React.CSSProperties}>
            <span className="ad-hero__icon">{assessment.icon}</span>
            <h1>{assessment.title} Assessment</h1>
            <p>{assessment.description}</p>
          </div>

          {/* Rules */}
          <div className="card ad-rules">
            <h2>📋 Assessment Rules</h2>
            <div className="ad-rules-grid">
              <div className="ad-rule">
                <Clock size={20} color="var(--indigo-500)" />
                <div>
                  <h4>Time Limit</h4>
                  <p>{assessment.duration} — Timer starts when you begin</p>
                </div>
              </div>
              <div className="ad-rule">
                <Target size={20} color="var(--emerald-500)" />
                <div>
                  <h4>Questions</h4>
                  <p>{assessment.totalQuestions} questions — Multiple choice & True/False</p>
                </div>
              </div>
              <div className="ad-rule">
                <Award size={20} color="var(--amber-500)" />
                <div>
                  <h4>Passing Score</h4>
                  <p>{assessment.passingScore}% or higher to earn certification</p>
                </div>
              </div>
              <div className="ad-rule">
                <AlertTriangle size={20} color="var(--rose-500)" />
                <div>
                  <h4>No Going Back</h4>
                  <p>Once submitted, answers cannot be changed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Topics Covered */}
          <div className="card">
            <h2>Topics Covered</h2>
            <div className="ad-topics">
              <span className="ad-topic">Core Concepts</span>
              <span className="ad-topic">Best Practices</span>
              <span className="ad-topic">Common Patterns</span>
              <span className="ad-topic">Error Handling</span>
              <span className="ad-topic">Performance</span>
              <span className="ad-topic">Architecture</span>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="ad-sidebar">
          <div className="card ad-start-card">
            <div className="ad-start-card__header">
              <span className="ad-start-card__icon">{assessment.icon}</span>
              <h3>{assessment.title}</h3>
            </div>
            <div className="ad-start-card__stats">
              <div><strong>{assessment.totalQuestions}</strong><span>Questions</span></div>
              <div><strong>{assessment.duration}</strong><span>Duration</span></div>
              <div><strong>{assessment.passingScore}%</strong><span>To Pass</span></div>
            </div>
            <div className="ad-start-card__diff">
              <span className={`sa-card__difficulty sa-card__difficulty--${assessment.difficulty.toLowerCase()}`}>
                {assessment.difficulty}
              </span>
              <span className="badge badge-primary">{assessment.category}</span>
            </div>
            <Link
              to={`/assessment/${assessment.id}/take`}
              className="btn btn-primary btn-lg"
              style={{ width: '100%', marginTop: 16 }}
            >
              <Target size={18} /> Start Assessment
            </Link>
            <p className="ad-start-card__note">
              <Shield size={14} /> Your progress is saved automatically
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
