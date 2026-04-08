import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { courses } from '../../data/courseData';
import { Play, Clock, Star, ChevronRight } from 'lucide-react';
import './Courses.css';

const containerV = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const itemV = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

export default function Courses() {
  return (
    <motion.div className="courses-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="courses-page__header">
        <div>
          <h1>📚 Courses</h1>
          <p>Browse mini-courses linked to each skill. Video lessons, reading material, and mini-quizzes included.</p>
        </div>
      </div>

      <motion.div
        className="courses-grid"
        variants={containerV}
        initial="hidden"
        animate="visible"
      >
        {courses.map(course => (
          <motion.div key={course.id} className="course-card" variants={itemV} whileHover={{ y: -6 }}>
            <Link to={`/courses/${course.id}`} className="course-card__link">
              <div className="course-card__banner" style={{ background: course.color }}>
                <span className="course-card__banner-icon">{course.icon}</span>
                <span className="course-card__category">{course.category}</span>
              </div>
              <div className="course-card__body">
                <h3>{course.title}</h3>
                <p className="course-card__instructor">by {course.instructor}</p>
                <div className="course-card__stats">
                  <span><Play size={14} /> {course.lessons} lessons</span>
                  <span><Clock size={14} /> {course.duration}</span>
                </div>
                <div className="course-card__rating">
                  <Star size={14} fill="#F59E0B" color="#F59E0B" />
                  <span>{course.rating}</span>
                  <span className="course-card__students">({course.students.toLocaleString()} students)</span>
                </div>
                {course.progress > 0 && (
                  <div className="course-card__progress-bar">
                    <div className="course-card__progress-fill" style={{ width: `${course.progress}%` }} />
                    <span>{course.progress}% complete</span>
                  </div>
                )}
                <div className="course-card__action-btn">
                  {course.progress > 0 ? 'Continue Learning' : 'Start Course'} <ChevronRight size={14} />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
