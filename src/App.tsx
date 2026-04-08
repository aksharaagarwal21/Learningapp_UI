import { Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useAuth } from './contexts/AuthContext';

// Layout
import DashboardLayout from './components/layout/DashboardLayout';

// Public Pages
import Landing from './pages/Landing/Landing';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';

// Learner Pages
import Dashboard from './pages/Dashboard/Dashboard';
import SkillAssessment from './pages/SkillAssessment/SkillAssessment';
import Certificates from './pages/Certificates/Certificates';
import Leaderboard from './pages/Leaderboard/Leaderboard';
import Profile from './pages/Profile/Profile';
import Courses from './pages/Courses/Courses';
import CourseDetail from './pages/Courses/CourseDetail';
import CourseLearn from './pages/Courses/CourseLearn';
import Practice from './pages/Practice/Practice';
import Notifications from './pages/Notifications/Notifications';
import Settings from './pages/Settings/Settings';

// Assessment Pages
import AssessmentDetail from './pages/Assessment/AssessmentDetail';
import AssessmentTake from './pages/Assessment/AssessmentTake';
import AssessmentResults from './pages/Assessment/AssessmentResults';

// Recruiter Pages
import RecruiterDashboard from './pages/Recruiter/RecruiterDashboard';

// Instructor Pages
import InstructorDashboard from './pages/Instructor/InstructorDashboard';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

export default function App() {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Dashboard Routes */}
        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          {/* Learner */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/skill-assessment" element={<SkillAssessment />} />
          <Route path="/certificates" element={<Certificates />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:courseId" element={<CourseDetail />} />
          <Route path="/courses/:courseId/learn" element={<CourseLearn />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/settings" element={<Settings />} />

          {/* Assessment */}
          <Route path="/assessment/:assessmentId" element={<AssessmentDetail />} />
          <Route path="/assessment/:assessmentId/take" element={<AssessmentTake />} />
          <Route path="/assessment/:assessmentId/results" element={<AssessmentResults />} />

          {/* Recruiter */}
          <Route path="/recruiter/dashboard" element={<RecruiterDashboard />} />
          <Route path="/recruiter/jobs" element={<RecruiterDashboard />} />
          <Route path="/recruiter/candidates" element={<RecruiterDashboard />} />
          <Route path="/recruiter/assessments" element={<RecruiterDashboard />} />

          {/* Instructor */}
          <Route path="/instructor/dashboard" element={<InstructorDashboard />} />
          <Route path="/instructor/create-assessment" element={<InstructorDashboard />} />
          <Route path="/instructor/analytics" element={<InstructorDashboard />} />
        </Route>

        {/* Fallback - redirect to dashboard if authenticated, landing if not */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}
