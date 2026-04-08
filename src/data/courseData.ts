export interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'reading' | 'quiz' | 'code';
  duration: string;
  completed: boolean;
  content?: string;
  videoUrl?: string;
  codeTemplate?: string;
  codeSolution?: string;
  quizQuestions?: QuizQuestion[];
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

export interface CourseModule {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  instructor: string;
  description: string;
  longDescription: string;
  lessons: number;
  duration: string;
  progress: number;
  rating: number;
  students: number;
  icon: string;
  category: string;
  color: string;
  difficulty: string;
  prerequisites: string[];
  whatYouLearn: string[];
  modules: CourseModule[];
}

export const courses: Course[] = [
  {
    id: 'react-masterclass',
    title: 'React Masterclass',
    instructor: 'Dr. Michael Park',
    description: 'Build modern web applications with React 19, hooks, and advanced patterns.',
    longDescription: 'This comprehensive course takes you from React fundamentals to advanced patterns used in production apps at top tech companies. You\'ll learn hooks, context, state management, performance optimization, testing, and deployment strategies. Each module includes hands-on projects that build on each other to create a real-world application.',
    lessons: 24,
    duration: '12 hours',
    progress: 65,
    rating: 4.8,
    students: 2340,
    icon: '⚛️',
    category: 'Frontend',
    color: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
    difficulty: 'Intermediate',
    prerequisites: ['JavaScript ES6+', 'HTML & CSS basics', 'Basic terminal/command line'],
    whatYouLearn: [
      'React 19 fundamentals and JSX syntax',
      'Hooks: useState, useEffect, useRef, useMemo, useCallback',
      'Context API and state management patterns',
      'Component composition and reusable design patterns',
      'Performance optimization and React.memo',
      'Testing with React Testing Library',
      'Server-side rendering and Next.js basics',
      'Building and deploying production applications',
    ],
    modules: [
      {
        id: 'm1',
        title: 'Getting Started with React',
        lessons: [
          {
            id: 'l1',
            title: 'Introduction to React',
            type: 'video',
            duration: '15 min',
            completed: true,
            content: `# Introduction to React

React is a JavaScript library for building user interfaces. It was created by Facebook and is now maintained by Meta and a community of developers.

## Why React?

- **Component-Based**: Build encapsulated components that manage their own state
- **Declarative**: Design simple views for each state in your application
- **Learn Once, Write Anywhere**: Develop new features without rewriting existing code

## Key Concepts

React introduces several key concepts:

1. **Components** - Reusable UI building blocks
2. **JSX** - A syntax extension that looks like HTML
3. **Props** - Data passed from parent to child components
4. **State** - Internal data that changes over time
5. **Virtual DOM** - Efficient rendering mechanism`,
          },
          {
            id: 'l2',
            title: 'Setting Up Your Development Environment',
            type: 'reading',
            duration: '10 min',
            completed: true,
            content: `# Setting Up Your Development Environment

## Prerequisites
- Node.js 18+ installed
- A code editor (VS Code recommended)
- Git installed

## Creating a New Project

\`\`\`bash
npx create-vite@latest my-app --template react-ts
cd my-app
npm install
npm run dev
\`\`\`

## Project Structure
\`\`\`
my-app/
├── public/
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
└── vite.config.ts
\`\`\`

## VS Code Extensions
- ES7+ React/Redux/React-Native snippets
- Prettier - Code formatter
- ESLint
- Auto Import`,
          },
          {
            id: 'l3',
            title: 'Your First Component',
            type: 'code',
            duration: '20 min',
            completed: true,
            codeTemplate: `// Create a Greeting component that accepts a 'name' prop
// and renders "Hello, {name}! Welcome to React."

function Greeting() {
  // TODO: Add props and render the greeting
  return (
    <div>
      {/* Your code here */}
    </div>
  );
}

export default Greeting;`,
            codeSolution: `interface GreetingProps {
  name: string;
}

function Greeting({ name }: GreetingProps) {
  return (
    <div className="greeting">
      <h1>Hello, {name}!</h1>
      <p>Welcome to React.</p>
    </div>
  );
}

export default Greeting;`,
          },
          {
            id: 'l4',
            title: 'Module 1 Quiz',
            type: 'quiz',
            duration: '5 min',
            completed: false,
            quizQuestions: [
              {
                question: 'What is React?',
                options: [
                  'A CSS framework',
                  'A JavaScript library for building UIs',
                  'A backend framework',
                  'A database system',
                ],
                correctIndex: 1,
              },
              {
                question: 'What syntax extension does React use?',
                options: ['HTML', 'XML', 'JSX', 'YAML'],
                correctIndex: 2,
              },
              {
                question: 'Which tool creates a new Vite React project?',
                options: ['npm start', 'npx create-vite', 'react init', 'vite new'],
                correctIndex: 1,
              },
            ],
          },
        ],
      },
      {
        id: 'm2',
        title: 'React Hooks Deep Dive',
        lessons: [
          {
            id: 'l5',
            title: 'useState Hook',
            type: 'video',
            duration: '20 min',
            completed: true,
            content: `# useState Hook

The useState hook is the most fundamental hook in React. It lets you add state to functional components.

## Basic Usage

\`\`\`tsx
const [count, setCount] = useState(0);
\`\`\`

## Rules
- Call at the top level of your component
- Don't call inside loops, conditions, or nested functions
- Initial value is only used on first render

## Updating State
- Use the setter function, never mutate directly
- For objects/arrays, always create new references
- Use functional updates when new state depends on previous`,
          },
          {
            id: 'l6',
            title: 'Building a Counter App',
            type: 'code',
            duration: '15 min',
            completed: false,
            codeTemplate: `import { useState } from 'react';

function Counter() {
  // TODO: Create state for count
  // TODO: Add increment, decrement, and reset functions

  return (
    <div>
      <h2>Counter</h2>
      {/* Display count and buttons */}
    </div>
  );
}

export default Counter;`,
            codeSolution: `import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => prev - 1);
  const reset = () => setCount(0);

  return (
    <div>
      <h2>Counter: {count}</h2>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
      <button onClick={increment}>+</button>
    </div>
  );
}

export default Counter;`,
          },
          {
            id: 'l7',
            title: 'useEffect Hook',
            type: 'video',
            duration: '25 min',
            completed: false,
            content: `# useEffect Hook

useEffect lets you synchronize your component with external systems — APIs, subscriptions, DOM manipulation, timers.

## Basic Pattern

\`\`\`tsx
useEffect(() => {
  // Side effect code here
  return () => {
    // Cleanup function (optional)
  };
}, [dependencies]);
\`\`\`

## Dependency Array
- **No array**: Runs after every render
- **Empty array []**: Runs only on mount 
- **With values [a, b]**: Runs when a or b changes`,
          },
        ],
      },
      {
        id: 'm3',
        title: 'State Management & Context',
        lessons: [
          {
            id: 'l8',
            title: 'React Context API',
            type: 'video',
            duration: '20 min',
            completed: false,
            content: `# React Context API

Context provides a way to pass data through the component tree without having to pass props down manually at every level.

## When to use Context
- Theme data (dark/light mode)
- User authentication state
- Language/locale preferences
- Application-wide settings`,
          },
          {
            id: 'l9',
            title: 'Building a Theme Provider',
            type: 'code',
            duration: '20 min',
            completed: false,
            codeTemplate: `import { createContext, useContext, useState } from 'react';

// TODO: Create a ThemeContext
// TODO: Create a ThemeProvider component
// TODO: Create a useTheme custom hook`,
            codeSolution: `import { createContext, useContext, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark';

const ThemeContext = createContext<{
  theme: Theme;
  toggle: () => void;
} | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const toggle = () => setTheme(t => t === 'light' ? 'dark' : 'light');
  
  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be inside ThemeProvider');
  return ctx;
}`,
          },
        ],
      },
    ],
  },
  {
    id: 'nodejs-backend',
    title: 'Node.js Backend Development',
    instructor: 'Sarah Chen',
    description: 'Build scalable REST APIs and backend services with Node.js and Express.',
    longDescription: 'Master server-side JavaScript with Node.js. Learn to build production-ready REST APIs, handle authentication, work with databases, implement real-time features with WebSockets, and deploy to the cloud. This course covers everything from basic routing to advanced patterns like middleware chains and error handling.',
    lessons: 18,
    duration: '9 hours',
    progress: 30,
    rating: 4.7,
    students: 1890,
    icon: '🟢',
    category: 'Backend',
    color: 'linear-gradient(135deg, #10B981, #059669)',
    difficulty: 'Intermediate',
    prerequisites: ['JavaScript fundamentals', 'Basic understanding of HTTP', 'Command line basics'],
    whatYouLearn: [
      'Node.js runtime and core modules',
      'Express.js framework and middleware',
      'RESTful API design principles',
      'Database integration with PostgreSQL & MongoDB',
      'Authentication with JWT and sessions',
      'Error handling and validation',
      'Testing APIs with Jest and Supertest',
      'Deployment to cloud platforms',
    ],
    modules: [
      {
        id: 'm1',
        title: 'Node.js Fundamentals',
        lessons: [
          { id: 'l1', title: 'Introduction to Node.js', type: 'video', duration: '15 min', completed: true, content: '# Introduction to Node.js\n\nNode.js is a JavaScript runtime built on Chrome\'s V8 engine. It allows you to run JavaScript on the server side.' },
          { id: 'l2', title: 'Core Modules: fs, path, http', type: 'reading', duration: '20 min', completed: true, content: '# Core Modules\n\nNode.js comes with built-in modules that provide essential functionality.' },
          { id: 'l3', title: 'Build a Simple HTTP Server', type: 'code', duration: '15 min', completed: false, codeTemplate: 'const http = require("http");\n\n// TODO: Create a server that responds with "Hello World"', codeSolution: 'const http = require("http");\n\nconst server = http.createServer((req, res) => {\n  res.writeHead(200, { "Content-Type": "text/plain" });\n  res.end("Hello World");\n});\n\nserver.listen(3000, () => console.log("Server running on port 3000"));' },
        ],
      },
      {
        id: 'm2',
        title: 'Express.js Framework',
        lessons: [
          { id: 'l4', title: 'Setting up Express', type: 'video', duration: '20 min', completed: false, content: '# Express.js\n\nExpress is a minimal and flexible Node.js web application framework.' },
          { id: 'l5', title: 'Routing & Middleware', type: 'video', duration: '25 min', completed: false, content: '# Routing & Middleware\n\nMiddleware functions have access to the request, response, and next middleware function.' },
          { id: 'l6', title: 'Build a REST API', type: 'code', duration: '30 min', completed: false, codeTemplate: '// TODO: Build a CRUD API for a "tasks" resource', codeSolution: 'const express = require("express");\nconst app = express();\n\napp.use(express.json());\n\nlet tasks = [];\n\napp.get("/tasks", (req, res) => res.json(tasks));\napp.post("/tasks", (req, res) => {\n  const task = { id: Date.now(), ...req.body };\n  tasks.push(task);\n  res.status(201).json(task);\n});\n\napp.listen(3000);' },
        ],
      },
    ],
  },
  {
    id: 'typescript-deepdive',
    title: 'TypeScript Deep Dive',
    instructor: 'James Wu',
    description: 'Master TypeScript\'s type system for safer, more productive development.',
    longDescription: 'Go beyond the basics of TypeScript. This course covers advanced types, generics, utility types, declaration files, compiler options, and integration with popular frameworks. You\'ll build type-safe applications that catch bugs at compile time instead of runtime.',
    lessons: 16,
    duration: '8 hours',
    progress: 0,
    rating: 4.9,
    students: 3120,
    icon: '📘',
    category: 'Frontend',
    color: 'linear-gradient(135deg, #3B82F6, #6366F1)',
    difficulty: 'Advanced',
    prerequisites: ['JavaScript proficiency', 'Basic TypeScript knowledge', 'Experience with a JS framework'],
    whatYouLearn: [
      'Advanced type system features',
      'Generics and conditional types',
      'Utility types and mapped types',
      'Type guards and narrowing',
      'Declaration files and module augmentation',
      'TypeScript with React patterns',
      'Compiler options and project configuration',
      'Migration strategies for existing projects',
    ],
    modules: [
      {
        id: 'm1',
        title: 'Advanced Types',
        lessons: [
          { id: 'l1', title: 'Union & Intersection Types', type: 'video', duration: '15 min', completed: false, content: '# Union & Intersection Types\n\nTypeScript provides powerful ways to combine types.' },
          { id: 'l2', title: 'Type Guards & Narrowing', type: 'code', duration: '20 min', completed: false, codeTemplate: '// TODO: Implement a type guard for Shape types', codeSolution: 'type Circle = { kind: "circle"; radius: number };\ntype Square = { kind: "square"; side: number };\ntype Shape = Circle | Square;\n\nfunction getArea(shape: Shape): number {\n  switch (shape.kind) {\n    case "circle": return Math.PI * shape.radius ** 2;\n    case "square": return shape.side ** 2;\n  }\n}' },
        ],
      },
    ],
  },
  {
    id: 'docker-k8s',
    title: 'Docker & Kubernetes',
    instructor: 'Emily Rodriguez',
    description: 'Containerize and orchestrate applications at scale.',
    longDescription: 'Learn container technologies from the ground up. Start with Docker fundamentals, then progress to Kubernetes for orchestrating containers in production. Includes hands-on labs with real deployment scenarios.',
    lessons: 20,
    duration: '10 hours',
    progress: 0,
    rating: 4.6,
    students: 1560,
    icon: '🐳',
    category: 'DevOps',
    color: 'linear-gradient(135deg, #06B6D4, #0891B2)',
    difficulty: 'Intermediate',
    prerequisites: ['Linux basics', 'Command line proficiency', 'Basic networking concepts'],
    whatYouLearn: ['Docker images and containers', 'Dockerfile best practices', 'Docker Compose', 'Kubernetes architecture', 'Deployments, Services, and Ingress', 'Helm charts', 'CI/CD pipelines', 'Monitoring and logging'],
    modules: [{ id: 'm1', title: 'Docker Fundamentals', lessons: [
      { id: 'l1', title: 'What is Docker?', type: 'video', duration: '15 min', completed: false, content: '# What is Docker?\n\nDocker is a platform for developing, shipping, and running applications in containers.' },
    ]}],
  },
  {
    id: 'python-datascience',
    title: 'Python for Data Science',
    instructor: 'Arjun Patel',
    description: 'Versatile programming for data analysis and machine learning.',
    longDescription: 'Master Python for data science applications. Cover NumPy, Pandas, Matplotlib, scikit-learn, and more. Build real data analysis projects and machine learning models.',
    lessons: 30,
    duration: '15 hours',
    progress: 0,
    rating: 4.8,
    students: 4200,
    icon: '🐍',
    category: 'Data',
    color: 'linear-gradient(135deg, #10B981, #06B6D4)',
    difficulty: 'Beginner',
    prerequisites: ['Basic programming concepts'],
    whatYouLearn: ['Python fundamentals', 'NumPy arrays', 'Pandas DataFrames', 'Data visualization', 'Machine learning basics', 'scikit-learn', 'Data cleaning', 'Statistical analysis'],
    modules: [{ id: 'm1', title: 'Python Basics', lessons: [
      { id: 'l1', title: 'Getting Started with Python', type: 'video', duration: '20 min', completed: false, content: '# Getting Started with Python\n\nPython is one of the most popular programming languages for data science.' },
    ]}],
  },
  {
    id: 'css-animations',
    title: 'CSS Animations & Layouts',
    instructor: 'Lisa Wang',
    description: 'Style beautiful and responsive web pages with modern CSS.',
    longDescription: 'Deep dive into modern CSS including Grid, Flexbox, custom properties, animations, and responsive design patterns. Build stunning layouts that work across all devices.',
    lessons: 14,
    duration: '7 hours',
    progress: 0,
    rating: 4.5,
    students: 980,
    icon: '🎨',
    category: 'Frontend',
    color: 'linear-gradient(135deg, #EC4899, #8B5CF6)',
    difficulty: 'Beginner',
    prerequisites: ['HTML basics'],
    whatYouLearn: ['CSS Grid mastery', 'Flexbox layout', 'CSS custom properties', 'Keyframe animations', 'Transitions', 'Responsive design', 'CSS architecture', 'Modern CSS features'],
    modules: [{ id: 'm1', title: 'CSS Layout Fundamentals', lessons: [
      { id: 'l1', title: 'Flexbox Deep Dive', type: 'video', duration: '20 min', completed: false, content: '# Flexbox Deep Dive\n\nFlexbox is a one-dimensional layout method for arranging items in rows or columns.' },
    ]}],
  },
];

export function getCourseById(id: string): Course | undefined {
  return courses.find(c => c.id === id);
}
