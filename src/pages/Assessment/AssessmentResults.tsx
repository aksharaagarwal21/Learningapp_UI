import { useLocation, useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getAssessmentById } from '../../data/assessmentData';
import ProgressRing from '../../components/ui/ProgressRing';
import { Trophy, Award, RotateCcw, Home, CheckCircle, XCircle } from 'lucide-react';
import './AssessmentResults.css';

export default function AssessmentResults() {
  const { assessmentId } = useParams();
  const location = useLocation();
  const state = location.state as any;

  if (!state) return <Navigate to="/skill-assessment" replace />;

  const assessment = getAssessmentById(assessmentId || '');
  if (!assessment) return <Navigate to="/skill-assessment" replace />;

  const { score, totalPoints, percent, passed, answers } = state;

  return (
    <motion.div className="results-page" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      {/* Hero */}
      <div className={`results-hero ${passed ? 'results-hero--pass' : 'results-hero--fail'}`}>
        <motion.div
          className="results-hero__icon"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.3 }}
        >
          {passed ? <Trophy size={48} /> : '😔'}
        </motion.div>
        <h1>{passed ? 'Congratulations! 🎉' : 'Keep Practicing!'}</h1>
        <p>{passed
          ? `You passed the ${assessment.title} assessment! Your certificate is ready.`
          : `You didn't pass this time. You need ${assessment.passingScore}% to earn certification.`
        }</p>
      </div>

      {/* Score Card */}
      <div className="results-score-card card">
        <div className="results-score-card__ring">
          <ProgressRing
            progress={percent}
            size={120}
            strokeWidth={8}
            color={passed ? '#10B981' : '#F43F5E'}
          />
        </div>
        <div className="results-score-card__details">
          <div className="results-score-card__stat">
            <strong>{score}</strong>
            <span>Points Earned</span>
          </div>
          <div className="results-score-card__stat">
            <strong>{totalPoints}</strong>
            <span>Total Points</span>
          </div>
          <div className="results-score-card__stat">
            <strong>{percent}%</strong>
            <span>Your Score</span>
          </div>
          <div className="results-score-card__stat">
            <strong>{assessment.passingScore}%</strong>
            <span>Passing Score</span>
          </div>
        </div>
      </div>

      {/* Question Review */}
      <div className="results-review card">
        <h2>📋 Question Review</h2>
        <div className="results-review__list">
          {assessment.questions.map((q, i) => {
            let isCorrect = false;
            if (q.type === 'truefalse') isCorrect = answers[i] === q.correctAnswer;
            else isCorrect = answers[i] === q.correctIndex;

            return (
              <div key={i} className={`results-review__item ${isCorrect ? 'results-review__item--correct' : 'results-review__item--wrong'}`}>
                <div className="results-review__item-header">
                  <span className="results-review__item-icon">
                    {isCorrect ? <CheckCircle size={18} /> : <XCircle size={18} />}
                  </span>
                  <span className="results-review__item-num">Q{i + 1}</span>
                  <span className="results-review__item-text">{q.question}</span>
                  <span className="results-review__item-pts">{isCorrect ? `+${q.points}` : '0'} pts</span>
                </div>
                {!isCorrect && (
                  <div className="results-review__item-explanation">
                    <strong>Explanation:</strong> {q.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="results-actions">
        <Link to="/skill-assessment" className="btn btn-secondary">
          <Home size={16} /> All Assessments
        </Link>
        <Link to={`/assessment/${assessmentId}`} className="btn btn-secondary">
          <RotateCcw size={16} /> Retake Assessment
        </Link>
        {passed && (
          <Link to="/certificates" className="btn btn-primary">
            <Award size={16} /> View Certificate
          </Link>
        )}
      </div>
    </motion.div>
  );
}
