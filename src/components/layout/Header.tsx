import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { Search, Sun, Moon, Bell } from 'lucide-react';
import { motion } from 'framer-motion';
import './Header.css';

export default function Header() {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  if (!user) return null;

  return (
    <header className="header">
      <div className="header__search">
        <Search size={18} className="header__search-icon" />
        <input type="text" placeholder="Search skills, courses, users..." className="header__search-input" />
        <kbd className="header__search-kbd">⌘K</kbd>
      </div>

      <div className="header__actions">
        <motion.button
          className="header__icon-btn"
          onClick={toggleTheme}
          whileTap={{ scale: 0.9 }}
          aria-label="Toggle theme"
        >
          <motion.div
            initial={false}
            animate={{ rotate: theme === 'dark' ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </motion.div>
        </motion.button>

        <button className="header__icon-btn header__notifications" aria-label="Notifications">
          <Bell size={18} />
          <span className="header__notification-badge">3</span>
        </button>

        <div className="header__profile">
          <div className="header__avatar">
            {user.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="header__user-info">
            <span className="header__user-name">{user.name}</span>
            <span className="header__user-role">{user.role}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
