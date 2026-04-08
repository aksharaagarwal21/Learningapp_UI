import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import {
  Sun, Moon, Bell, Lock, Globe, Palette,
  Shield
} from 'lucide-react';
import './Settings.css';

export default function Settings() {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(true);
  const [assessmentReminders, setAssessmentReminders] = useState(true);
  const [leaderboardUpdates, setLeaderboardUpdates] = useState(false);
  const [twoFA, setTwoFA] = useState(false);

  const ToggleSwitch = ({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) => (
    <button className={`settings-toggle ${value ? 'settings-toggle--on' : ''}`} onClick={() => onChange(!value)}>
      <div className="settings-toggle__knob" />
    </button>
  );

  return (
    <motion.div className="settings-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h1>⚙️ Settings</h1>
      <p className="settings-page__subtitle">Manage your account preferences and notifications.</p>

      {/* Appearance */}
      <div className="settings-section card">
        <h2><Palette size={18} /> Appearance</h2>
        <div className="settings-row">
          <div className="settings-row__info">
            <h4>Theme</h4>
            <p>Switch between light and dark mode</p>
          </div>
          <div className="settings-theme-picker">
            <button className={`settings-theme-btn ${theme === 'light' ? 'settings-theme-btn--active' : ''}`} onClick={() => { if (theme !== 'light') toggleTheme(); }}>
              <Sun size={16} /> Light
            </button>
            <button className={`settings-theme-btn ${theme === 'dark' ? 'settings-theme-btn--active' : ''}`} onClick={() => { if (theme !== 'dark') toggleTheme(); }}>
              <Moon size={16} /> Dark
            </button>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="settings-section card">
        <h2><Bell size={18} /> Notifications</h2>
        <div className="settings-row">
          <div className="settings-row__info">
            <h4>Email Notifications</h4>
            <p>Receive updates and reminders via email</p>
          </div>
          <ToggleSwitch value={emailNotifs} onChange={setEmailNotifs} />
        </div>
        <div className="settings-row">
          <div className="settings-row__info">
            <h4>Push Notifications</h4>
            <p>Get browser push notifications</p>
          </div>
          <ToggleSwitch value={pushNotifs} onChange={setPushNotifs} />
        </div>
        <div className="settings-row">
          <div className="settings-row__info">
            <h4>Assessment Reminders</h4>
            <p>Remind me about upcoming assessment deadlines</p>
          </div>
          <ToggleSwitch value={assessmentReminders} onChange={setAssessmentReminders} />
        </div>
        <div className="settings-row">
          <div className="settings-row__info">
            <h4>Leaderboard Updates</h4>
            <p>Notify when my rank changes</p>
          </div>
          <ToggleSwitch value={leaderboardUpdates} onChange={setLeaderboardUpdates} />
        </div>
      </div>

      {/* Security */}
      <div className="settings-section card">
        <h2><Shield size={18} /> Security</h2>
        <div className="settings-row">
          <div className="settings-row__info">
            <h4>Two-Factor Authentication</h4>
            <p>Add an extra layer of security to your account</p>
          </div>
          <ToggleSwitch value={twoFA} onChange={setTwoFA} />
        </div>
        <div className="settings-row">
          <div className="settings-row__info">
            <h4>Change Password</h4>
            <p>Update your account password</p>
          </div>
          <button className="btn btn-sm btn-secondary"><Lock size={14} /> Change</button>
        </div>
      </div>

      {/* Account */}
      <div className="settings-section card">
        <h2><Globe size={18} /> Account</h2>
        <div className="settings-row">
          <div className="settings-row__info">
            <h4>Email</h4>
            <p>{user?.email || 'Not set'}</p>
          </div>
          <button className="btn btn-sm btn-ghost">Edit</button>
        </div>
        <div className="settings-row">
          <div className="settings-row__info">
            <h4>Language</h4>
            <p>English (US)</p>
          </div>
          <button className="btn btn-sm btn-ghost">Change</button>
        </div>
        <div className="settings-row settings-row--danger">
          <div className="settings-row__info">
            <h4>Delete Account</h4>
            <p>Permanently delete your account and all data</p>
          </div>
          <button className="btn btn-sm" style={{ color: 'var(--rose-500)', borderColor: 'var(--rose-500)', border: '1px solid' }}>Delete</button>
        </div>
      </div>
    </motion.div>
  );
}
