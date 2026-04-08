export interface AssessmentQuestion {
  id: string;
  type: 'mcq' | 'code' | 'truefalse';
  question: string;
  options?: string[];
  correctIndex?: number;
  correctAnswer?: boolean;
  codeTemplate?: string;
  explanation: string;
  points: number;
}

export interface AssessmentData {
  id: string;
  title: string;
  description: string;
  icon: string;
  duration: string;
  totalQuestions: number;
  passingScore: number;
  difficulty: string;
  category: string;
  color: string;
  questions: AssessmentQuestion[];
}

export const assessments: AssessmentData[] = [
  {
    id: 'react',
    title: 'React',
    description: 'Test your knowledge of React fundamentals, hooks, state management, and component patterns.',
    icon: '⚛️',
    duration: '45 min',
    totalQuestions: 10,
    passingScore: 70,
    difficulty: 'Intermediate',
    category: 'Frontend',
    color: '#6366F1',
    questions: [
      { id: 'q1', type: 'mcq', question: 'What is the correct way to create a React component?', options: ['function App() { return <div /> }', 'const App = new Component()', 'React.create("App")', 'class App { render() {} }'], correctIndex: 0, explanation: 'Functional components are the recommended way to create React components. They are simpler and support hooks.', points: 10 },
      { id: 'q2', type: 'mcq', question: 'Which hook is used to manage side effects in React?', options: ['useState', 'useEffect', 'useContext', 'useReducer'], correctIndex: 1, explanation: 'useEffect is used for side effects like data fetching, subscriptions, and DOM manipulation.', points: 10 },
      { id: 'q3', type: 'truefalse', question: 'React uses a Virtual DOM to optimize rendering performance.', correctAnswer: true, explanation: 'React maintains a Virtual DOM to efficiently compute the minimal set of changes needed to update the real DOM.', points: 10 },
      { id: 'q4', type: 'mcq', question: 'What is the purpose of the key prop in React lists?', options: ['Styling elements', 'Helping React identify which items changed', 'Adding event handlers', 'Setting component state'], correctIndex: 1, explanation: 'Keys help React identify which items have changed, been added, or removed, enabling efficient re-rendering.', points: 10 },
      { id: 'q5', type: 'mcq', question: 'Which of these is NOT a React hook?', options: ['useState', 'useEffect', 'useHistory', 'useMemo'], correctIndex: 2, explanation: 'useHistory was part of React Router v5, not a built-in React hook. React Router v6 uses useNavigate instead.', points: 10 },
      { id: 'q6', type: 'truefalse', question: 'Props in React are read-only and cannot be modified by the child component.', correctAnswer: true, explanation: 'Props follow a one-way data flow. A child component should never modify its own props.', points: 10 },
      { id: 'q7', type: 'mcq', question: 'What does useState return?', options: ['A single value', 'An object with state and dispatch', 'An array with state value and setter function', 'A promise'], correctIndex: 2, explanation: 'useState returns an array with two elements: the current state value and a function to update it.', points: 10 },
      { id: 'q8', type: 'mcq', question: 'When does useEffect with an empty dependency array run?', options: ['Every render', 'Only on mount', 'Only on unmount', 'Never'], correctIndex: 1, explanation: 'An empty dependency array [] means the effect runs once after the initial render (mount) and the cleanup runs on unmount.', points: 10 },
      { id: 'q9', type: 'truefalse', question: 'React components must return a single root element or fragment.', correctAnswer: true, explanation: 'React components must return a single root element. You can use <React.Fragment> or <> to wrap multiple elements.', points: 10 },
      { id: 'q10', type: 'mcq', question: 'What is the Context API used for?', options: ['Routing', 'State management across components without prop drilling', 'Styling components', 'HTTP requests'], correctIndex: 1, explanation: 'Context provides a way to pass data through the component tree without having to pass props manually at every level.', points: 10 },
    ],
  },
  {
    id: 'javascript',
    title: 'JavaScript',
    description: 'Master the language of the web — test your JS knowledge from ES6+ features to async patterns.',
    icon: '⚡',
    duration: '40 min',
    totalQuestions: 10,
    passingScore: 70,
    difficulty: 'Beginner',
    category: 'Frontend',
    color: '#F59E0B',
    questions: [
      { id: 'q1', type: 'mcq', question: 'What is the difference between let and var?', options: ['let is block-scoped, var is function-scoped', 'let is faster than var', 'var is deprecated', 'No difference'], correctIndex: 0, explanation: 'let is block-scoped while var is function-scoped. let was introduced in ES6 to address issues with var.', points: 10 },
      { id: 'q2', type: 'mcq', question: 'What does the spread operator (...) do?', options: ['Multiplies values', 'Expands iterables into individual elements', 'Creates a loop', 'Defines a class'], correctIndex: 1, explanation: 'The spread operator expands an iterable (array, string, etc.) into individual elements.', points: 10 },
      { id: 'q3', type: 'truefalse', question: 'JavaScript is a single-threaded language.', correctAnswer: true, explanation: 'JavaScript is single-threaded but uses an event loop to handle asynchronous operations.', points: 10 },
      { id: 'q4', type: 'mcq', question: 'What is a Promise in JavaScript?', options: ['A guaranteed return value', 'An object representing an eventual completion or failure of an async operation', 'A type of loop', 'A variable declaration'], correctIndex: 1, explanation: 'A Promise represents a value that might be available now, in the future, or never.', points: 10 },
      { id: 'q5', type: 'mcq', question: 'Which method converts a JSON string to a JavaScript object?', options: ['JSON.stringify()', 'JSON.parse()', 'JSON.convert()', 'JSON.toObject()'], correctIndex: 1, explanation: 'JSON.parse() parses a JSON string and returns the corresponding JavaScript value or object.', points: 10 },
      { id: 'q6', type: 'truefalse', question: 'Arrow functions have their own "this" context.', correctAnswer: false, explanation: 'Arrow functions do NOT have their own "this" context. They inherit "this" from the enclosing scope.', points: 10 },
      { id: 'q7', type: 'mcq', question: 'What does Array.prototype.map() return?', options: ['The original array', 'A new array with results of calling a function on every element', 'undefined', 'A boolean'], correctIndex: 1, explanation: 'map() creates a new array with the results of calling a provided function on every element.', points: 10 },
      { id: 'q8', type: 'mcq', question: 'What is destructuring in JavaScript?', options: ['Deleting objects', 'Extracting values from arrays/objects into variables', 'Creating new data structures', 'Garbage collection'], correctIndex: 1, explanation: 'Destructuring allows you to extract values from arrays or properties from objects into distinct variables.', points: 10 },
      { id: 'q9', type: 'truefalse', question: 'null and undefined are the same in JavaScript.', correctAnswer: false, explanation: 'null is an intentional absence of value, while undefined means a variable has been declared but not assigned.', points: 10 },
      { id: 'q10', type: 'mcq', question: 'What is the output of typeof null?', options: ['"null"', '"undefined"', '"object"', '"boolean"'], correctIndex: 2, explanation: 'This is a well-known JavaScript bug. typeof null returns "object" even though null is not an object.', points: 10 },
    ],
  },
  {
    id: 'typescript',
    title: 'TypeScript',
    description: 'Add type safety to your JavaScript projects — test your TypeScript expertise.',
    icon: '📘',
    duration: '40 min',
    totalQuestions: 8,
    passingScore: 70,
    difficulty: 'Intermediate',
    category: 'Frontend',
    color: '#3B82F6',
    questions: [
      { id: 'q1', type: 'mcq', question: 'What is the main benefit of TypeScript?', options: ['Faster runtime', 'Static type checking', 'Smaller bundle size', 'Built-in testing'], correctIndex: 1, explanation: 'TypeScript\'s primary benefit is static type checking, catching errors at compile time.', points: 12 },
      { id: 'q2', type: 'mcq', question: 'What is an interface in TypeScript?', options: ['A class implementation', 'A way to define the shape/structure of an object', 'A function type', 'A module system'], correctIndex: 1, explanation: 'Interfaces define contracts in your code and provide explicit names for type checking.', points: 12 },
      { id: 'q3', type: 'truefalse', question: 'TypeScript is a superset of JavaScript.', correctAnswer: true, explanation: 'TypeScript is a strict syntactical superset of JavaScript — all valid JS is valid TS.', points: 12 },
      { id: 'q4', type: 'mcq', question: 'What does the "any" type do?', options: ['Ensures type safety', 'Disables type checking for that variable', 'Creates a new type', 'Throws an error'], correctIndex: 1, explanation: 'The "any" type effectively opts out of type checking for that variable.', points: 12 },
      { id: 'q5', type: 'mcq', question: 'What is a generic in TypeScript?', options: ['A default type', 'A type that works with multiple types via parameters', 'A class feature', 'A built-in type'], correctIndex: 1, explanation: 'Generics enable you to create reusable components that work with a variety of types.', points: 13 },
      { id: 'q6', type: 'truefalse', question: 'TypeScript code runs directly in the browser.', correctAnswer: false, explanation: 'TypeScript must be compiled/transpiled to JavaScript before it can run in the browser.', points: 13 },
      { id: 'q7', type: 'mcq', question: 'What is a union type?', options: ['Two types merged', 'A variable that can be one of several types', 'An array type', 'A class type'], correctIndex: 1, explanation: 'A union type describes a value that can be one of several types, using the pipe | operator.', points: 13 },
      { id: 'q8', type: 'mcq', question: 'What does "readonly" do to a property?', options: ['Makes it optional', 'Prevents modification after initialization', 'Makes it nullable', 'Adds validation'], correctIndex: 1, explanation: 'readonly properties can only be set during initialization and cannot be changed afterwards.', points: 13 },
    ],
  },
];

export function getAssessmentById(id: string): AssessmentData | undefined {
  return assessments.find(a => a.id === id);
}
