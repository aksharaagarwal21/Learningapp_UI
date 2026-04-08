import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getCourseById } from '../../data/courseData';
import {
  Clock, Play, Star, Users, ChevronRight, BookOpen, Code2,
  CheckCircle, Award, BarChart3, Video, FileText, HelpCircle
} from 'lucide-react';
import './CourseDetail.css';

const typeIcons: Record<string, typeof Video> = { video: Video, reading: FileText, code: Code2, quiz: HelpCircle };
const typeLabels: Record<string, string> = { video: 'Video', reading: 'Reading', code: 'Coding', quiz: 'Quiz' };

export default function CourseDetail() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const course = getCourseById(courseId || '');

  if (!course) {
    return (
      <div className="cd-not-found">
        <h2>Course not found</h2>
        <p>The course you're looking for doesn't exist.</p>
        <Link to="/courses" className="btn btn-primary">← Back to Courses</Link>
      </div>
    );
  }

  const totalLessons = course.modules.reduce((sum, m) => sum + m.lessons.length, 0);
  const completedLessons = course.modules.reduce((sum, m) => sum + m.lessons.filter(l => l.completed).length, 0);
  const progressPercent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  // Find the first incomplete lesson
  let nextLesson: { moduleIndex: number; lessonIndex: number } | null = null;
  for (let mi = 0; mi < course.modules.length; mi++) {
    for (let li = 0; li < course.modules[mi].lessons.length; li++) {
      if (!course.modules[mi].lessons[li].completed) {
        nextLesson = { moduleIndex: mi, lessonIndex: li };
        break;
      }
    }
    if (nextLesson) break;
  }

  return (
    <motion.div className="course-detail" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* Breadcrumb */}
      <div className="cd-breadcrumb">
        <Link to="/courses">Courses</Link>
        <ChevronRight size={14} />
        <span>{course.title}</span>
      </div>

      {/* Hero */}
      <div className="cd-hero" style={{ background: course.color }}>
        <div className="cd-hero__content">
          <span className="cd-hero__badge">{course.category} • {course.difficulty}</span>
          <h1>{course.icon} {course.title}</h1>
          <p>{course.description}</p>
          <div className="cd-hero__meta">
            <span><Users size={16} /> {course.students.toLocaleString()} students</span>
            <span><Star size={16} fill="#F59E0B" color="#F59E0B" /> {course.rating}</span>
            <span><Clock size={16} /> {course.duration}</span>
            <span><Play size={16} /> {course.lessons} lessons</span>
          </div>
          <p className="cd-hero__instructor">Instructor: <strong>{course.instructor}</strong></p>
          <div className="cd-hero__actions">
            {course.progress > 0 ? (
              <button
                className="btn btn-lg"
                style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', backdropFilter: 'blur(10px)' }}
                onClick={() => navigate(`/courses/${course.id}/learn${nextLesson ? `?m=${nextLesson.moduleIndex}&l=${nextLesson.lessonIndex}` : ''}`)}
              >
                <Play size={18} /> Continue Learning
              </button>
            ) : (
              <button
                className="btn btn-lg"
                style={{ background: '#fff', color: '#1E293B' }}
                onClick={() => navigate(`/courses/${course.id}/learn?m=0&l=0`)}
              >
                <Play size={18} /> Start Course
              </button>
            )}
          </div>
        </div>
        {course.progress > 0 && (
          <div className="cd-hero__progress">
            <div className="cd-hero__progress-ring">
              <svg width="100" height="100" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="8" />
                <circle
                  cx="50" cy="50" r="42" fill="none" stroke="#fff" strokeWidth="8"
                  strokeDasharray={`${2 * Math.PI * 42}`}
                  strokeDashoffset={`${2 * Math.PI * 42 * (1 - progressPercent / 100)}`}
                  strokeLinecap="round"
                  style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}
                />
              </svg>
              <span>{progressPercent}%</span>
            </div>
            <div>
              <span className="cd-hero__progress-text">{completedLessons}/{totalLessons} lessons</span>
            </div>
          </div>
        )}
      </div>

      <div className="cd-grid">
        {/* Left: About + Curriculum */}
        <div className="cd-main">
          {/* About */}
          <div className="cd-section card">
            <h2>About this course</h2>
            <p className="cd-about-text">{course.longDescription}</p>
          </div>

          {/* What you'll learn */}
          <div className="cd-section card">
            <h2>What you'll learn</h2>
            <div className="cd-learn-grid">
              {course.whatYouLearn.map((item, i) => (
                <div key={i} className="cd-learn-item">
                  <CheckCircle size={16} color="var(--emerald-500)" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Curriculum */}
          <div className="cd-section card">
            <h2>Curriculum</h2>
            <div className="cd-modules">
              {course.modules.map((mod, mi) => (
                <div key={mod.id} className="cd-module">
                  <div className="cd-module__header">
                    <h3>Module {mi + 1}: {mod.title}</h3>
                    <span className="cd-module__count">{mod.lessons.length} lessons</span>
                  </div>
                  <div className="cd-module__lessons">
                    {mod.lessons.map((lesson, li) => {
                      const TypeIcon = typeIcons[lesson.type] || BookOpen;
                      return (
                        <Link
                          key={lesson.id}
                          to={`/courses/${course.id}/learn?m=${mi}&l=${li}`}
                          className={`cd-lesson ${lesson.completed ? 'cd-lesson--completed' : ''}`}
                        >
                          <div className="cd-lesson__left">
                            {lesson.completed ? (
                              <div className="cd-lesson__check"><CheckCircle size={18} /></div>
                            ) : (
                              <div className="cd-lesson__num">{li + 1}</div>
                            )}
                            <div>
                              <span className="cd-lesson__title">{lesson.title}</span>
                              <span className="cd-lesson__meta">
                                <TypeIcon size={12} /> {typeLabels[lesson.type]} • {lesson.duration}
                              </span>
                            </div>
                          </div>
                          <ChevronRight size={16} className="cd-lesson__arrow" />
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="cd-sidebar">
          <div className="cd-sidebar-card card">
            <h3>Prerequisites</h3>
            <ul className="cd-prereqs">
              {course.prerequisites.map((p, i) => (
                <li key={i}><ChevronRight size={14} /> {p}</li>
              ))}
            </ul>
          </div>
          <div className="cd-sidebar-card card">
            <h3>Includes</h3>
            <ul className="cd-includes">
              <li><Video size={16} /> On-demand video lessons</li>
              <li><Code2 size={16} /> Hands-on coding exercises</li>
              <li><HelpCircle size={16} /> Interactive quizzes</li>
              <li><Award size={16} /> Certificate of completion</li>
              <li><BarChart3 size={16} /> Progress tracking</li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
