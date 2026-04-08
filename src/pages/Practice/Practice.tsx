import { useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Play, Clock, Flame, CheckCircle, ChevronRight, Zap } from 'lucide-react';
import './Practice.css';

const dailyChallenge = {
  title: 'Two Sum',
  difficulty: 'Easy',
  topic: 'Arrays & Hash Maps',
  description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
  timeLimit: '30 min',
  xpReward: 50,
};

const topics = [
  { name: 'Arrays', count: 45, solved: 18, icon: '📊' },
  { name: 'Strings', count: 38, solved: 12, icon: '📝' },
  { name: 'Linked Lists', count: 22, solved: 8, icon: '🔗' },
  { name: 'Trees', count: 30, solved: 5, icon: '🌳' },
  { name: 'Dynamic Programming', count: 35, solved: 3, icon: '🧮' },
  { name: 'Graphs', count: 25, solved: 2, icon: '🕸️' },
  { name: 'Sorting', count: 20, solved: 10, icon: '🔢' },
  { name: 'Binary Search', count: 18, solved: 7, icon: '🔍' },
];

const recentProblems = [
  { title: 'Maximum Subarray', difficulty: 'Medium', topic: 'Dynamic Programming', status: 'solved' },
  { title: 'Valid Parentheses', difficulty: 'Easy', topic: 'Stacks', status: 'solved' },
  { title: 'Merge Two Sorted Lists', difficulty: 'Easy', topic: 'Linked Lists', status: 'solved' },
  { title: 'Binary Tree Level Order', difficulty: 'Medium', topic: 'Trees', status: 'attempted' },
  { title: 'Word Break', difficulty: 'Hard', topic: 'Dynamic Programming', status: 'unsolved' },
];

export default function Practice() {
  return (
    <motion.div className="practice-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="practice-page__header">
        <h1>💻 Practice</h1>
        <p>Sharpen your coding skills with daily challenges and topic-based practice.</p>
      </div>

      {/* Daily Challenge */}
      <motion.div
        className="daily-challenge"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="daily-challenge__header">
          <div className="daily-challenge__badge">
            <Flame size={16} /> Daily Challenge
          </div>
          <span className="badge badge-warning"><Clock size={12} /> Resets in 14h 22m</span>
        </div>
        <div className="daily-challenge__content">
          <div className="daily-challenge__info">
            <h2>{dailyChallenge.title}</h2>
            <span className={`sa-card__difficulty sa-card__difficulty--${dailyChallenge.difficulty.toLowerCase()}`}>
              {dailyChallenge.difficulty}
            </span>
            <p>{dailyChallenge.description}</p>
            <div className="daily-challenge__meta">
              <span><Clock size={14} /> {dailyChallenge.timeLimit}</span>
              <span><Zap size={14} /> +{dailyChallenge.xpReward} XP</span>
            </div>
          </div>
          <button className="btn btn-primary btn-lg">
            <Play size={18} /> Start Challenge
          </button>
        </div>
      </motion.div>

      <div className="practice-grid">
        {/* Practice by Topic */}
        <div className="practice-section">
          <h2>Practice by Topic</h2>
          <div className="practice-topics">
            {topics.map(topic => (
              <motion.div
                key={topic.name}
                className="practice-topic-card"
                whileHover={{ y: -4 }}
              >
                <span className="practice-topic-card__icon">{topic.icon}</span>
                <div className="practice-topic-card__info">
                  <h4>{topic.name}</h4>
                  <span>{topic.solved}/{topic.count} solved</span>
                </div>
                <div className="practice-topic-card__bar">
                  <div
                    className="practice-topic-card__bar-fill"
                    style={{ width: `${(topic.solved / topic.count) * 100}%` }}
                  />
                </div>
                <ChevronRight size={16} className="practice-topic-card__arrow" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recent Problems */}
        <div className="practice-section">
          <h2>Recent Problems</h2>
          <div className="practice-problems">
            {recentProblems.map(problem => (
              <div key={problem.title} className="practice-problem-item">
                <div className={`practice-problem-item__status practice-problem-item__status--${problem.status}`}>
                  {problem.status === 'solved' ? <CheckCircle size={16} /> : <Code2 size={16} />}
                </div>
                <div className="practice-problem-item__info">
                  <span className="practice-problem-item__title">{problem.title}</span>
                  <span className="practice-problem-item__topic">{problem.topic}</span>
                </div>
                <span className={`sa-card__difficulty sa-card__difficulty--${problem.difficulty.toLowerCase()}`}>
                  {problem.difficulty}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
