import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getAssessmentById } from '../../data/assessmentData';
import { Clock, Flag, ChevronLeft, ChevronRight, AlertTriangle, CheckCircle } from 'lucide-react';
import './AssessmentTake.css';

export default function AssessmentTake() {
  const { assessmentId } = useParams();
  const navigate = useNavigate();
  const assessment = getAssessmentById(assessmentId || '');
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number | boolean>>({});
  const [flagged, setFlagged] = useState<Set<number>>(new Set());
  const [timeLeft, setTimeLeft] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!assessment) return;
    const mins = parseInt(assessment.duration);
    setTimeLeft(mins * 60);
  }, [assessment]);

  useEffect(() => {
    if (timeLeft <= 0 || submitted) return;
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) { clearInterval(timerRef.current!); handleSubmit(); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [timeLeft > 0 && !submitted]);

  if (!assessment) return <div className="cd-not-found"><h2>Assessment not found</h2></div>;

  const q = assessment.questions[currentQ];
  const answeredCount = Object.keys(answers).length;
  const formatTime = (s: number) => `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;

  const selectAnswer = (qi: number, val: number | boolean) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [qi]: val }));
  };

  const toggleFlag = (qi: number) => {
    setFlagged(prev => {
      const next = new Set(prev);
      next.has(qi) ? next.delete(qi) : next.add(qi);
      return next;
    });
  };

  const handleSubmit = () => {
    setSubmitted(true);
    if (timerRef.current) clearInterval(timerRef.current);

    let score = 0;
    assessment.questions.forEach((ques, i) => {
      if (ques.type === 'truefalse') {
        if (answers[i] === ques.correctAnswer) score += ques.points;
      } else {
        if (answers[i] === ques.correctIndex) score += ques.points;
      }
    });

    const totalPoints = assessment.questions.reduce((s, qq) => s + qq.points, 0);
    const percent = Math.round((score / totalPoints) * 100);
    const passed = percent >= assessment.passingScore;

    navigate(`/assessment/${assessmentId}/results`, {
      state: { score, totalPoints, percent, passed, answers, assessmentId },
    });
  };

  return (
    <div className="assessment-take">
      {/* Top Bar */}
      <div className="at-topbar">
        <div className="at-topbar__left">
          <span className="at-topbar__icon">{assessment.icon}</span>
          <h2>{assessment.title} Assessment</h2>
        </div>
        <div className="at-topbar__center">
          <div className={`at-timer ${timeLeft < 120 ? 'at-timer--warning' : ''}`}>
            <Clock size={16} />
            <span>{formatTime(timeLeft)}</span>
          </div>
        </div>
        <div className="at-topbar__right">
          <span className="at-topbar__count">{answeredCount}/{assessment.questions.length} answered</span>
          <button className="btn btn-sm btn-primary" onClick={() => setShowConfirm(true)}>
            Submit
          </button>
        </div>
      </div>

      <div className="at-body">
        {/* Question Nav */}
        <div className="at-nav">
          <h4>Questions</h4>
          <div className="at-nav__grid">
            {assessment.questions.map((_, i) => (
              <button
                key={i}
                className={`at-nav__btn ${i === currentQ ? 'at-nav__btn--active' : ''} ${answers[i] !== undefined ? 'at-nav__btn--answered' : ''} ${flagged.has(i) ? 'at-nav__btn--flagged' : ''}`}
                onClick={() => setCurrentQ(i)}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <div className="at-nav__legend">
            <span><div className="at-nav__btn at-nav__btn--answered" style={{ width: 14, height: 14, fontSize: 8 }} />Answered</span>
            <span><div className="at-nav__btn at-nav__btn--flagged" style={{ width: 14, height: 14, fontSize: 8 }} />Flagged</span>
            <span><div className="at-nav__btn" style={{ width: 14, height: 14, fontSize: 8 }} />Skipped</span>
          </div>
        </div>

        {/* Question Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQ}
            className="at-question"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="at-question__header">
              <span className="at-question__num">Question {currentQ + 1} of {assessment.questions.length}</span>
              <div className="at-question__actions">
                <button
                  className={`btn btn-sm ${flagged.has(currentQ) ? 'btn-primary' : 'btn-ghost'}`}
                  onClick={() => toggleFlag(currentQ)}
                >
                  <Flag size={14} /> {flagged.has(currentQ) ? 'Flagged' : 'Flag'}
                </button>
                <span className="badge badge-warning">{q.points} pts</span>
              </div>
            </div>

            <h3 className="at-question__text">{q.question}</h3>

            {/* MCQ Options */}
            {q.type === 'mcq' && q.options && (
              <div className="at-options">
                {q.options.map((opt, oi) => (
                  <button
                    key={oi}
                    className={`cl-quiz-option ${answers[currentQ] === oi ? 'cl-quiz-option--selected' : ''}`}
                    onClick={() => selectAnswer(currentQ, oi)}
                  >
                    <span className="cl-quiz-option__letter">{String.fromCharCode(65 + oi)}</span>
                    {opt}
                  </button>
                ))}
              </div>
            )}

            {/* True/False */}
            {q.type === 'truefalse' && (
              <div className="at-options at-options--tf">
                <button
                  className={`cl-quiz-option ${answers[currentQ] === true ? 'cl-quiz-option--selected' : ''}`}
                  onClick={() => selectAnswer(currentQ, true)}
                >
                  <CheckCircle size={18} /> True
                </button>
                <button
                  className={`cl-quiz-option ${answers[currentQ] === false ? 'cl-quiz-option--selected' : ''}`}
                  onClick={() => selectAnswer(currentQ, false)}
                >
                  <AlertTriangle size={18} /> False
                </button>
              </div>
            )}

            {/* Navigation */}
            <div className="at-question__nav">
              <button
                className="btn btn-secondary"
                disabled={currentQ === 0}
                onClick={() => setCurrentQ(currentQ - 1)}
              >
                <ChevronLeft size={16} /> Previous
              </button>
              {currentQ < assessment.questions.length - 1 ? (
                <button className="btn btn-primary" onClick={() => setCurrentQ(currentQ + 1)}>
                  Next <ChevronRight size={16} />
                </button>
              ) : (
                <button className="btn btn-primary" onClick={() => setShowConfirm(true)}>
                  Finish Assessment
                </button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Submit Confirmation Modal */}
      {showConfirm && (
        <div className="at-modal-overlay" onClick={() => setShowConfirm(false)}>
          <motion.div
            className="at-modal"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={e => e.stopPropagation()}
          >
            <h3>Submit Assessment?</h3>
            <p>You have answered <strong>{answeredCount}</strong> of <strong>{assessment.questions.length}</strong> questions.</p>
            {answeredCount < assessment.questions.length && (
              <p className="at-modal__warning">
                <AlertTriangle size={16} /> {assessment.questions.length - answeredCount} questions are unanswered!
              </p>
            )}
            <div className="at-modal__actions">
              <button className="btn btn-secondary" onClick={() => setShowConfirm(false)}>Review</button>
              <button className="btn btn-primary" onClick={handleSubmit}>Submit Now</button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
