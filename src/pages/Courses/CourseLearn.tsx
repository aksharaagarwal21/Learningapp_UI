import { useState } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getCourseById } from '../../data/courseData';
import type { Lesson } from '../../data/courseData';
import {
  ChevronLeft, ChevronRight, Play, CheckCircle, Video,
  FileText, Code2, HelpCircle, BookOpen, Menu, X, ArrowRight
} from 'lucide-react';
import './CourseLearn.css';

const typeIcons: Record<string, typeof Video> = { video: Video, reading: FileText, code: Code2, quiz: HelpCircle };

export default function CourseLearn() {
  const { courseId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const course = getCourseById(courseId || '');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [codeValue, setCodeValue] = useState('');
  const [showSolution, setShowSolution] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const moduleIndex = parseInt(searchParams.get('m') || '0');
  const lessonIndex = parseInt(searchParams.get('l') || '0');

  if (!course) {
    return (
      <div className="cd-not-found">
        <h2>Course not found</h2>
        <Link to="/courses" className="btn btn-primary">← Back to Courses</Link>
      </div>
    );
  }

  const currentModule = course.modules[moduleIndex];
  const currentLesson = currentModule?.lessons[lessonIndex];

  if (!currentModule || !currentLesson) {
    return (
      <div className="cd-not-found">
        <h2>Lesson not found</h2>
        <Link to={`/courses/${courseId}`} className="btn btn-primary">← Back to Course</Link>
      </div>
    );
  }

  // Flatten all lessons for next/prev navigation
  const allLessons: { moduleIndex: number; lessonIndex: number; lesson: Lesson }[] = [];
  course.modules.forEach((mod, mi) => {
    mod.lessons.forEach((les, li) => {
      allLessons.push({ moduleIndex: mi, lessonIndex: li, lesson: les });
    });
  });
  const flatIndex = allLessons.findIndex(l => l.moduleIndex === moduleIndex && l.lessonIndex === lessonIndex);

  const goTo = (mi: number, li: number) => {
    setSearchParams({ m: mi.toString(), l: li.toString() });
    setCodeValue('');
    setShowSolution(false);
    setQuizAnswers({});
    setQuizSubmitted(false);
  };

  const goNext = () => {
    if (flatIndex < allLessons.length - 1) {
      const next = allLessons[flatIndex + 1];
      goTo(next.moduleIndex, next.lessonIndex);
    }
  };

  const goPrev = () => {
    if (flatIndex > 0) {
      const prev = allLessons[flatIndex - 1];
      goTo(prev.moduleIndex, prev.lessonIndex);
    }
  };

  const renderMarkdown = (text: string) => {
    // Simple markdown-to-HTML
    let html = text
      .replace(/^### (.+)/gm, '<h3>$1</h3>')
      .replace(/^## (.+)/gm, '<h2>$1</h2>')
      .replace(/^# (.+)/gm, '<h1>$1</h1>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/^- (.+)/gm, '<li>$1</li>')
      .replace(/^(\d+)\. (.+)/gm, '<li>$2</li>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br/>');

    // Wrap code blocks
    html = html.replace(/```(\w+)?\n?([\s\S]*?)```/g, '<pre class="cl-codeblock"><code>$2</code></pre>');
    html = html.replace(/```([\s\S]*?)```/g, '<pre class="cl-codeblock"><code>$1</code></pre>');

    return `<p>${html}</p>`;
  };

  return (
    <div className="course-learn">
      {/* Sidebar */}
      <aside className={`cl-sidebar ${sidebarOpen ? 'cl-sidebar--open' : ''}`}>
        <div className="cl-sidebar__header">
          <Link to={`/courses/${courseId}`} className="cl-sidebar__back">
            <ChevronLeft size={16} /> Course Overview
          </Link>
          <button className="cl-sidebar__close" onClick={() => setSidebarOpen(false)}>
            <X size={18} />
          </button>
        </div>
        <div className="cl-sidebar__progress">
          <div className="cl-sidebar__progress-bar">
            <div
              className="cl-sidebar__progress-fill"
              style={{ width: `${Math.round((allLessons.filter(l => l.lesson.completed).length / allLessons.length) * 100)}%` }}
            />
          </div>
          <span>{allLessons.filter(l => l.lesson.completed).length}/{allLessons.length} completed</span>
        </div>
        <div className="cl-sidebar__modules">
          {course.modules.map((mod, mi) => (
            <div key={mod.id} className="cl-sidebar__module">
              <h4>{mod.title}</h4>
              {mod.lessons.map((les, li) => {
                const TypeIcon = typeIcons[les.type] || BookOpen;
                const isActive = mi === moduleIndex && li === lessonIndex;
                return (
                  <button
                    key={les.id}
                    className={`cl-sidebar__lesson ${isActive ? 'cl-sidebar__lesson--active' : ''} ${les.completed ? 'cl-sidebar__lesson--done' : ''}`}
                    onClick={() => goTo(mi, li)}
                  >
                    {les.completed ? (
                      <CheckCircle size={16} className="cl-sidebar__lesson-icon cl-sidebar__lesson-icon--done" />
                    ) : (
                      <TypeIcon size={16} className="cl-sidebar__lesson-icon" />
                    )}
                    <span>{les.title}</span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className={`cl-main ${sidebarOpen ? '' : 'cl-main--full'}`}>
        {/* Top bar */}
        <div className="cl-topbar">
          {!sidebarOpen && (
            <button className="btn btn-sm btn-ghost" onClick={() => setSidebarOpen(true)}>
              <Menu size={18} />
            </button>
          )}
          <div className="cl-topbar__info">
            <span className="cl-topbar__module">Module {moduleIndex + 1}: {currentModule.title}</span>
            <h2>{currentLesson.title}</h2>
          </div>
          <div className="cl-topbar__nav">
            <button className="btn btn-sm btn-ghost" disabled={flatIndex === 0} onClick={goPrev}>
              <ChevronLeft size={16} /> Prev
            </button>
            <span className="cl-topbar__counter">{flatIndex + 1}/{allLessons.length}</span>
            <button className="btn btn-sm btn-primary" disabled={flatIndex === allLessons.length - 1} onClick={goNext}>
              Next <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentLesson.id}
            className="cl-content"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {/* Video Lesson */}
            {currentLesson.type === 'video' && (
              <div className="cl-video-lesson">
                <div className="cl-video-placeholder">
                  <div className="cl-video-placeholder__inner">
                    <Play size={48} />
                    <h3>{currentLesson.title}</h3>
                    <p>Video content — {currentLesson.duration}</p>
                  </div>
                </div>
                {currentLesson.content && (
                  <div className="cl-reading-body">
                    <h3>📝 Lesson Notes</h3>
                    <div dangerouslySetInnerHTML={{ __html: renderMarkdown(currentLesson.content) }} />
                  </div>
                )}
              </div>
            )}

            {/* Reading Lesson */}
            {currentLesson.type === 'reading' && (
              <div className="cl-reading-lesson">
                <div className="cl-reading-body">
                  {currentLesson.content && (
                    <div dangerouslySetInnerHTML={{ __html: renderMarkdown(currentLesson.content) }} />
                  )}
                </div>
              </div>
            )}

            {/* Code Lesson */}
            {currentLesson.type === 'code' && (
              <div className="cl-code-lesson">
                <h3>💻 Coding Exercise</h3>
                <p className="cl-code-desc">Complete the code below to solve the exercise.</p>
                <div className="cl-code-editor">
                  <div className="cl-code-editor__header">
                    <span>📄 solution.tsx</span>
                    <div className="cl-code-editor__actions">
                      <button
                        className="btn btn-sm btn-ghost"
                        onClick={() => setCodeValue(currentLesson.codeTemplate || '')}
                      >
                        Reset
                      </button>
                      <button
                        className={`btn btn-sm ${showSolution ? 'btn-secondary' : 'btn-primary'}`}
                        onClick={() => setShowSolution(!showSolution)}
                      >
                        {showSolution ? 'Hide Solution' : 'Show Solution'}
                      </button>
                    </div>
                  </div>
                  <textarea
                    className="cl-code-textarea"
                    value={codeValue || (showSolution ? currentLesson.codeSolution : currentLesson.codeTemplate) || ''}
                    onChange={e => { setCodeValue(e.target.value); setShowSolution(false); }}
                    spellCheck={false}
                  />
                  {showSolution && (
                    <div className="cl-code-solution-banner">
                      <CheckCircle size={16} /> Showing solution — study it, then try on your own!
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Quiz Lesson */}
            {currentLesson.type === 'quiz' && currentLesson.quizQuestions && (
              <div className="cl-quiz-lesson">
                <h3>📋 Quiz: {currentLesson.title}</h3>
                <p className="cl-quiz-desc">{currentLesson.quizQuestions.length} questions • Answer all to proceed</p>
                <div className="cl-quiz-questions">
                  {currentLesson.quizQuestions.map((q, qi) => (
                    <div key={qi} className={`cl-quiz-q ${quizSubmitted ? (quizAnswers[qi] === q.correctIndex ? 'cl-quiz-q--correct' : 'cl-quiz-q--wrong') : ''}`}>
                      <h4>Q{qi + 1}. {q.question}</h4>
                      <div className="cl-quiz-options">
                        {q.options.map((opt, oi) => (
                          <button
                            key={oi}
                            className={`cl-quiz-option ${quizAnswers[qi] === oi ? 'cl-quiz-option--selected' : ''} ${quizSubmitted && oi === q.correctIndex ? 'cl-quiz-option--correct' : ''} ${quizSubmitted && quizAnswers[qi] === oi && oi !== q.correctIndex ? 'cl-quiz-option--wrong' : ''}`}
                            onClick={() => { if (!quizSubmitted) setQuizAnswers({ ...quizAnswers, [qi]: oi }); }}
                            disabled={quizSubmitted}
                          >
                            <span className="cl-quiz-option__letter">{String.fromCharCode(65 + oi)}</span>
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                {!quizSubmitted ? (
                  <button
                    className="btn btn-primary btn-lg"
                    disabled={Object.keys(quizAnswers).length < (currentLesson.quizQuestions?.length || 0)}
                    onClick={() => setQuizSubmitted(true)}
                    style={{ marginTop: 20 }}
                  >
                    Submit Answers
                  </button>
                ) : (
                  <div className="cl-quiz-results">
                    <div className="cl-quiz-results__score">
                      Score: {currentLesson.quizQuestions.filter((q, i) => quizAnswers[i] === q.correctIndex).length}/{currentLesson.quizQuestions.length}
                    </div>
                    <button className="btn btn-primary" onClick={goNext}>
                      Continue <ArrowRight size={16} />
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Bottom navigation */}
            <div className="cl-bottom-nav">
              <button className="btn btn-secondary" disabled={flatIndex === 0} onClick={goPrev}>
                <ChevronLeft size={16} /> Previous Lesson
              </button>
              {flatIndex < allLessons.length - 1 ? (
                <button className="btn btn-primary" onClick={goNext}>
                  Next Lesson <ChevronRight size={16} />
                </button>
              ) : (
                <Link to={`/courses/${courseId}`} className="btn btn-primary">
                  <CheckCircle size={16} /> Complete Course
                </Link>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
