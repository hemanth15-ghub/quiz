import { Question } from '../types';

export const questionData = {
  beginner: [
    {
      id: 'b1',
      text: 'Which of the following is the correct way to declare a variable in C?',
      type: 'single',
      options: [
        'var x = 10;',
        'int x = 10;',
        'x = 10;',
        'declare x = 10;'
      ],
      correctAnswers: [1]
    },
    {
      id: 'b2',
      text: 'In Python, which data types are mutable? (Select all that apply)',
      type: 'multiple',
      options: [
        'List',
        'Tuple',
        'Dictionary',
        'String',
        'Set'
      ],
      correctAnswers: [0, 2, 4]
    },
    {
      id: 'b3',
      text: 'What is the correct syntax for a for loop in C?',
      type: 'single',
      options: [
        'for (i = 0; i < 10; i++)',
        'for i in range(10):',
        'for (int i = 0; i < 10; i++)',
        'for i = 0 to 10'
      ],
      correctAnswers: [2]
    },
    {
      id: 'b4',
      text: 'Which Python function is used to get the length of a list?',
      type: 'single',
      options: [
        'length()',
        'size()',
        'len()',
        'count()'
      ],
      correctAnswers: [2]
    },
    {
      id: 'b5',
      text: 'What are valid ways to create a function in Python? (Select all that apply)',
      type: 'multiple',
      options: [
        'def function_name():',
        'function function_name() {}',
        'lambda x: x + 1',
        'def function_name(param):'
      ],
      correctAnswers: [0, 2, 3]
    }
  ] as Question[],

  intermediate: [
    {
      id: 'i1',
      text: 'Which ES6 feature allows you to extract values from arrays or objects?',
      type: 'single',
      options: [
        'Spread operator',
        'Destructuring',
        'Template literals',
        'Arrow functions'
      ],
      correctAnswers: [1]
    },
    {
      id: 'i2',
      text: 'Which methods can be used to select DOM elements in JavaScript? (Select all that apply)',
      type: 'multiple',
      options: [
        'document.getElementById()',
        'document.querySelector()',
        'document.getElementsByClassName()',
        'document.querySelectorAll()'
      ],
      correctAnswers: [0, 1, 2, 3]
    },
    {
      id: 'i3',
      text: 'In Java, what keyword is used to inherit from a class?',
      type: 'single',
      options: [
        'implements',
        'extends',
        'inherits',
        'super'
      ],
      correctAnswers: [1]
    },
    {
      id: 'i4',
      text: 'What are characteristics of polymorphism in OOP? (Select all that apply)',
      type: 'multiple',
      options: [
        'Method overriding',
        'Method overloading',
        'Same interface, different implementations',
        'Multiple inheritance'
      ],
      correctAnswers: [0, 1, 2]
    },
    {
      id: 'i5',
      text: 'Which JavaScript method creates a new array with all elements that pass a test?',
      type: 'single',
      options: [
        'map()',
        'filter()',
        'reduce()',
        'forEach()'
      ],
      correctAnswers: [1]
    }
  ] as Question[],

  advanced: [
    {
      id: 'a1',
      text: 'Which TypeScript utility type makes all properties optional?',
      type: 'single',
      options: [
        'Required<T>',
        'Partial<T>',
        'Pick<T, K>',
        'Omit<T, K>'
      ],
      correctAnswers: [1]
    },
    {
      id: 'a2',
      text: 'Which React hooks manage component state and lifecycle? (Select all that apply)',
      type: 'multiple',
      options: [
        'useState',
        'useEffect',
        'useContext',
        'useReducer',
        'useMemo'
      ],
      correctAnswers: [0, 1, 3]
    },
    {
      id: 'a3',
      text: 'In Node.js, what is the correct way to import a module using ES6 syntax?',
      type: 'single',
      options: [
        'const fs = require("fs")',
        'import fs from "fs"',
        'import * as fs from "fs"',
        'import { fs } from "fs"'
      ],
      correctAnswers: [2]
    },
    {
      id: 'a4',
      text: 'Which are valid ways to handle asynchronous operations in JavaScript? (Select all that apply)',
      type: 'multiple',
      options: [
        'Callbacks',
        'Promises',
        'async/await',
        'Generators'
      ],
      correctAnswers: [0, 1, 2, 3]
    },
    {
      id: 'a5',
      text: 'What does the useEffect hook\'s dependency array control?',
      type: 'single',
      options: [
        'When the component mounts',
        'When the effect runs',
        'What values the effect can access',
        'When the component unmounts'
      ],
      correctAnswers: [1]
    }
  ] as Question[],

  master: [
    {
      id: 'm1',
      text: 'Which SQL clause is used to filter groups of rows?',
      type: 'single',
      options: [
        'WHERE',
        'HAVING',
        'GROUP BY',
        'ORDER BY'
      ],
      correctAnswers: [1]
    },
    {
      id: 'm2',
      text: 'Which React optimization techniques prevent unnecessary re-renders? (Select all that apply)',
      type: 'multiple',
      options: [
        'React.memo',
        'useMemo',
        'useCallback',
        'useState',
        'PureComponent'
      ],
      correctAnswers: [0, 1, 2, 4]
    },
    {
      id: 'm3',
      text: 'In Next.js, what does SSG stand for?',
      type: 'single',
      options: [
        'Server-Side Generation',
        'Static Site Generation',
        'Server-Side Rendering',
        'Single Site Generation'
      ],
      correctAnswers: [1]
    },
    {
      id: 'm4',
      text: 'Which Django REST framework components handle API requests? (Select all that apply)',
      type: 'multiple',
      options: [
        'Serializers',
        'ViewSets',
        'Models',
        'Permissions'
      ],
      correctAnswers: [0, 1, 3]
    },
    {
      id: 'm5',
      text: 'In Express.js, what is middleware used for?',
      type: 'single',
      options: [
        'Database connections only',
        'Processing requests and responses',
        'Template rendering only',
        'Static file serving only'
      ],
      correctAnswers: [1]
    }
  ] as Question[]
};