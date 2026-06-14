// Codify - Core Application Engine

// Global State
const state = {
  streak: 0,
  points: 0,
  solved: {}, // problemId -> boolean
  submissions: [], // array of submission objects
  activeView: 'dashboard',
  currentProblem: null,
  activeTestcaseIndex: 0,
  isClashActive: false,
  clashTimeRemaining: 5090, // seconds (~1h 24m)
  clashScore: 0,
  clashSolved: {},
  trialsStatus: {}, // trialId -> 'locked' | 'unlocked' | 'passed'
  badges: [],
  currentTrialId: null,
  trialTimeRemaining: 0,
  trialTimerInterval: null,
  editor: null // CodeMirror instance
};

// Problems Database (4 Paths with 2 problems each + 3 Clash problems + 2 Trial problems)
const problemsDb = {
  // Mastery Quests Paths
  "two-sum": {
    id: "two-sum",
    title: "Two Sum",
    difficulty: "easy",
    category: "dsa",
    pathName: "Arrays & Hashing",
    points: 50,
    description: `
      <p>Given an array of integers <code>nums</code> and an integer <code>target</code>, return indices of the two numbers such that they add up to <code>target</code>.</p>
      <p>You may assume that each input would have <b>exactly one solution</b>, and you may not use the same element twice.</p>
      <p>You can return the answer in any order.</p>
    `,
    examples: `
      <div class="example-box">
        <p><label>Input:</label> nums = [2,7,11,15], target = 9</p>
        <p><label>Output:</label> [0,1]</p>
        <p><label>Explanation:</label> Because nums[0] + nums[1] == 9, we return [0, 1].</p>
      </div>
      <div class="example-box">
        <p><label>Input:</label> nums = [3,2,4], target = 6</p>
        <p><label>Output:</label> [1,2]</p>
      </div>
    `,
    jsMethod: "twoSum",
    pyMethod: "two_sum",
    jsTemplate: `function twoSum(nums, target) {\n    // Write your JavaScript code here\n    \n}`,
    pyTemplate: `def two_sum(nums, target):\n    # Write your Python code here\n    pass`,
    testcases: [
      { input: [[2, 7, 11, 15], 9], output: [0, 1] },
      { input: [[3, 2, 4], 6], output: [1, 2] },
      { input: [[3, 3], 6], output: [0, 1] },
      // Hidden testcases
      { input: [[1, 5, 9, 3, 12], 8], output: [1, 3], hidden: true },
      { input: [[-3, 4, 3, 90], 0], output: [0, 2], hidden: true }
    ]
  },
  "contains-duplicate": {
    id: "contains-duplicate",
    title: "Contains Duplicate",
    difficulty: "easy",
    category: "dsa",
    pathName: "Arrays & Hashing",
    points: 40,
    description: `
      <p>Given an integer array <code>nums</code>, return <code>true</code> if any value appears <b>at least twice</b> in the array, and return <code>false</code> if every element is distinct.</p>
    `,
    examples: `
      <div class="example-box">
        <p><label>Input:</label> nums = [1,2,3,1]</p>
        <p><label>Output:</label> true</p>
      </div>
      <div class="example-box">
        <p><label>Input:</label> nums = [1,2,3,4]</p>
        <p><label>Output:</label> false</p>
      </div>
    `,
    jsMethod: "containsDuplicate",
    pyMethod: "contains_duplicate",
    jsTemplate: `function containsDuplicate(nums) {\n    // Write your JavaScript code here\n    \n}`,
    pyTemplate: `def contains_duplicate(nums):\n    # Write your Python code here\n    pass`,
    testcases: [
      { input: [[1, 2, 3, 1]], output: true },
      { input: [[1, 2, 3, 4]], output: false },
      { input: [[1, 1, 1, 3, 3, 4, 3, 2, 4, 2]], output: true },
      // Hidden testcases
      { input: [[100]], output: false, hidden: true },
      { input: [[5, 5]], output: true, hidden: true }
    ]
  },
  "fizz-buzz": {
    id: "fizz-buzz",
    title: "Fizz Buzz",
    difficulty: "easy",
    category: "language",
    pathName: "Python Essentials",
    points: 30,
    description: `
      <p>Given an integer <code>n</code>, return a string array <code>answer</code> (1-indexed) where:</p>
      <ul>
        <li><code>answer[i] == "FizzBuzz"</code> if <code>i</code> is divisible by 3 and 5.</li>
        <li><code>answer[i] == "Fizz"</code> if <code>i</code> is divisible by 3.</li>
        <li><code>answer[i] == "Buzz"</code> if <code>i</code> is divisible by 5.</li>
        <li><code>answer[i] == str(i)</code> if none of the above conditions are true.</li>
      </ul>
    `,
    examples: `
      <div class="example-box">
        <p><label>Input:</label> n = 3</p>
        <p><label>Output:</label> ["1","2","Fizz"]</p>
      </div>
      <div class="example-box">
        <p><label>Input:</label> n = 5</p>
        <p><label>Output:</label> ["1","2","Fizz","4","Buzz"]</p>
      </div>
    `,
    jsMethod: "fizzBuzz",
    pyMethod: "fizz_buzz",
    jsTemplate: `function fizzBuzz(n) {\n    // Write your JavaScript code here\n    \n}`,
    pyTemplate: `def fizz_buzz(n):\n    # Write your Python code here\n    pass`,
    testcases: [
      { input: [3], output: ["1", "2", "Fizz"] },
      { input: [5], output: ["1", "2", "Fizz", "4", "Buzz"] },
      { input: [15], output: ["1", "2", "Fizz", "4", "Buzz", "Fizz", "7", "8", "Fizz", "Buzz", "11", "Fizz", "13", "14", "FizzBuzz"] },
      // Hidden testcases
      { input: [1], output: ["1"], hidden: true }
    ]
  },
  "reverse-string": {
    id: "reverse-string",
    title: "Reverse a String",
    difficulty: "easy",
    category: "language",
    pathName: "Python Essentials",
    points: 30,
    description: `
      <p>Write a function that takes a string <code>s</code> and returns the string in reversed order.</p>
      <p>Try to solve this using minimal extra space.</p>
    `,
    examples: `
      <div class="example-box">
        <p><label>Input:</label> s = "hello"</p>
        <p><label>Output:</label> "olleh"</p>
      </div>
      <div class="example-box">
        <p><label>Input:</label> s = "Hannah"</p>
        <p><label>Output:</label> "hannaH"</p>
      </div>
    `,
    jsMethod: "reverseString",
    pyMethod: "reverse_string",
    jsTemplate: `function reverseString(s) {\n    // Write your JavaScript code here\n    \n}`,
    pyTemplate: `def reverse_string(s):\n    # Write your Python code here\n    pass`,
    testcases: [
      { input: ["hello"], output: "olleh" },
      { input: ["Hannah"], output: "hannaH" },
      { input: ["a"], output: "a" },
      // Hidden testcases
      { input: ["Codify"], output: "yfidoc", hidden: true },
      { input: ["1234 5678"], output: "8765 4321", hidden: true }
    ]
  },
  "valid-parentheses": {
    id: "valid-parentheses",
    title: "Valid Parentheses",
    difficulty: "easy",
    category: "company",
    pathName: "FAANG Classics",
    points: 60,
    description: `
      <p>Given a string <code>s</code> containing just the characters <code>'('</code>, <code>')'</code>, <code>'{'</code>, <code>'}'</code>, <code>'['</code> and <code>']'</code>, determine if the input string is valid.</p>
      <p>An input string is valid if:</p>
      <ol>
        <li>Open brackets must be closed by the same type of brackets.</li>
        <li>Open brackets must be closed in the correct order.</li>
        <li>Every close bracket has a corresponding open bracket of the same type.</li>
      </ol>
    `,
    examples: `
      <div class="example-box">
        <p><label>Input:</label> s = "()"</p>
        <p><label>Output:</label> true</p>
      </div>
      <div class="example-box">
        <p><label>Input:</label> s = "()[]{}"</p>
        <p><label>Output:</label> true</p>
      </div>
      <div class="example-box">
        <p><label>Input:</label> s = "(]"</p>
        <p><label>Output:</label> false</p>
      </div>
    `,
    jsMethod: "isValid",
    pyMethod: "is_valid",
    jsTemplate: `function isValid(s) {\n    // Write your JavaScript code here\n    \n}`,
    pyTemplate: `def is_valid(s):\n    # Write your Python code here\n    pass`,
    testcases: [
      { input: ["()"], output: true },
      { input: ["()[]{}"], output: true },
      { input: ["(]"], output: false },
      { input: ["([{}])"], output: true },
      // Hidden testcases
      { input: ["("], output: false, hidden: true },
      { input: ["]"], output: false, hidden: true },
      { input: ["((((((()))))))"], output: true, hidden: true }
    ]
  },
  "merge-sorted": {
    id: "merge-sorted",
    title: "Merge Sorted Arrays",
    difficulty: "easy",
    category: "company",
    pathName: "FAANG Classics",
    points: 50,
    description: `
      <p>Given two sorted arrays of integers <code>list1</code> and <code>list2</code>, merge them into a single sorted array and return it.</p>
    `,
    examples: `
      <div class="example-box">
        <p><label>Input:</label> list1 = [1,2,4], list2 = [1,3,4]</p>
        <p><label>Output:</label> [1,1,2,3,4,4]</p>
      </div>
      <div class="example-box">
        <p><label>Input:</label> list1 = [], list2 = [0]</p>
        <p><label>Output:</label> [0]</p>
      </div>
    `,
    jsMethod: "mergeSorted",
    pyMethod: "merge_sorted",
    jsTemplate: `function mergeSorted(list1, list2) {\n    // Write your JavaScript code here\n    \n}`,
    pyTemplate: `def merge_sorted(list1, list2):\n    # Write your Python code here\n    pass`,
    testcases: [
      { input: [[1, 2, 4], [1, 3, 4]], output: [1, 1, 2, 3, 4, 4] },
      { input: [[], [0]], output: [0] },
      { input: [[1, 5, 9], [2, 6]], output: [1, 2, 5, 6, 9] },
      // Hidden testcases
      { input: [[1, 2, 3], []], output: [1, 2, 3], hidden: true },
      { input: [[-10, -5, 0], [-8, 2, 10]], output: [-10, -8, -5, 0, 2, 10], hidden: true }
    ]
  },
  "fibonacci": {
    id: "fibonacci",
    title: "Fibonacci Number",
    difficulty: "easy",
    category: "algorithm",
    pathName: "Algorithmic Voyages (DP)",
    points: 40,
    description: `
      <p>The <b>Fibonacci numbers</b>, commonly denoted <code>F(n)</code> form a sequence, called the <b>Fibonacci sequence</b>, such that each number is the sum of the two preceding ones, starting from 0 and 1. That is:</p>
      <pre>F(0) = 0, F(1) = 1\nF(n) = F(n - 1) + F(n - 2), for n > 1.</pre>
      <p>Given <code>n</code>, calculate <code>F(n)</code>.</p>
    `,
    examples: `
      <div class="example-box">
        <p><label>Input:</label> n = 2</p>
        <p><label>Output:</label> 1</p>
        <p><label>Explanation:</label> F(2) = F(1) + F(0) = 1 + 0 = 1.</p>
      </div>
      <div class="example-box">
        <p><label>Input:</label> n = 4</p>
        <p><label>Output:</label> 3</p>
      </div>
    `,
    jsMethod: "fib",
    pyMethod: "fib",
    jsTemplate: `function fib(n) {\n    // Write your JavaScript code here\n    \n}`,
    pyTemplate: `def fib(n):\n    # Write your Python code here\n    pass`,
    testcases: [
      { input: [2], output: 1 },
      { input: [3], output: 2 },
      { input: [4], output: 3 },
      { input: [10], output: 55 },
      // Hidden testcases
      { input: [0], output: 0, hidden: true },
      { input: [1], output: 1, hidden: true },
      { input: [20], output: 6765, hidden: true }
    ]
  },
  "climbing-stairs": {
    id: "climbing-stairs",
    title: "Climbing Stairs",
    difficulty: "easy",
    category: "algorithm",
    pathName: "Algorithmic Voyages (DP)",
    points: 50,
    description: `
      <p>You are climbing a staircase. It takes <code>n</code> steps to reach the top.</p>
      <p>Each time you can either climb <code>1</code> or <code>2</code> steps. In how many distinct ways can you climb to the top?</p>
    `,
    examples: `
      <div class="example-box">
        <p><label>Input:</label> n = 2</p>
        <p><label>Output:</label> 2</p>
        <p><label>Explanation:</label> There are two ways to climb to the top:\n1. 1 step + 1 step\n2. 2 steps</p>
      </div>
      <div class="example-box">
        <p><label>Input:</label> n = 3</p>
        <p><label>Output:</label> 3</p>
        <p><label>Explanation:</label> There are three ways to climb to the top:\n1. 1 step + 1 step + 1 step\n2. 1 step + 2 steps\n3. 2 steps + 1 step</p>
      </div>
    `,
    jsMethod: "climbStairs",
    pyMethod: "climb_stairs",
    jsTemplate: `function climbStairs(n) {\n    // Write your JavaScript code here\n    \n}`,
    pyTemplate: `def climb_stairs(n):\n    # Write your Python code here\n    pass`,
    testcases: [
      { input: [2], output: 2 },
      { input: [3], output: 3 },
      { input: [5], output: 8 },
      // Hidden testcases
      { input: [1], output: 1, hidden: true },
      { input: [15], output: 987, hidden: true },
      { input: [25], output: 121393, hidden: true }
    ]
  },

  // Weekly Clash Problems
  "single-number": {
    id: "single-number",
    title: "Single Number",
    difficulty: "easy",
    category: "clash",
    points: 80,
    description: `<p>Given a <b>non-empty</b> array of integers <code>nums</code>, every element appears twice except for one. Find that single one.</p><p>You must implement a solution with a linear runtime complexity and use only constant extra space.</p>`,
    examples: `<div class="example-box"><p><label>Input:</label> nums = [2,2,1]</p><p><label>Output:</label> 1</p></div>`,
    jsMethod: "singleNumber",
    pyMethod: "single_number",
    jsTemplate: `function singleNumber(nums) {\n    \n}`,
    pyTemplate: `def single_number(nums):\n    pass`,
    testcases: [
      { input: [[2, 2, 1]], output: 1 },
      { input: [[4, 1, 2, 1, 2]], output: 4 },
      { input: [[1]], output: 1 }
    ]
  },
  "merge-intervals": {
    id: "merge-intervals",
    title: "Merge Intervals",
    difficulty: "medium",
    category: "clash",
    points: 120,
    description: `<p>Given an array of <code>intervals</code> where <code>intervals[i] = [start<sub>i</sub>, end<sub>i</sub>]</code>, merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.</p>`,
    examples: `<div class="example-box"><p><label>Input:</label> intervals = [[1,3],[2,6],[8,10],[15,18]]</p><p><label>Output:</label> [[1,6],[8,10],[15,18]]</p></div>`,
    jsMethod: "mergeIntervals",
    pyMethod: "merge_intervals",
    jsTemplate: `function mergeIntervals(intervals) {\n    \n}`,
    pyTemplate: `def merge_intervals(intervals):\n    pass`,
    testcases: [
      { input: [[[1, 3], [2, 6], [8, 10], [15, 18]]], output: [[1, 6], [8, 10], [15, 18]] },
      { input: [[[1, 4], [4, 5]]], output: [[1, 5]] }
    ]
  },
  "longest-substring": {
    id: "longest-substring",
    title: "Longest Substring Without Repeats",
    difficulty: "medium",
    category: "clash",
    points: 150,
    description: `<p>Given a string <code>s</code>, find the length of the <b>longest substring</b> without repeating characters.</p>`,
    examples: `<div class="example-box"><p><label>Input:</label> s = "abcabcbb"</p><p><label>Output:</label> 3</p></div>`,
    jsMethod: "lengthOfLongestSubstring",
    pyMethod: "length_of_longest_substring",
    jsTemplate: `function lengthOfLongestSubstring(s) {\n    \n}`,
    pyTemplate: `def length_of_longest_substring(s):\n    pass`,
    testcases: [
      { input: ["abcabcbb"], output: 3 },
      { input: ["bbbbb"], output: 1 },
      { input: ["pwwkew"], output: 3 }
    ]
  },

  // Arena Trials Problems
  "three-sum": {
    id: "three-sum",
    title: "Three Sum Challenge",
    difficulty: "medium",
    category: "trial",
    points: 200,
    description: `<p>Given an integer array <code>nums</code>, return all the triplets <code>[nums[i], nums[j], nums[k]]</code> such that <code>i != j</code>, <code>i != k</code>, and <code>j != k</code>, and <code>nums[i] + nums[j] + nums[k] == 0</code>.</p><p>Notice that the solution set must not contain duplicate triplets.</p>`,
    examples: `<div class="example-box"><p><label>Input:</label> nums = [-1,0,1,2,-1,-4]</p><p><label>Output:</label> [[-1,-1,2],[-1,0,1]]</p></div>`,
    jsMethod: "threeSum",
    pyMethod: "three_sum",
    jsTemplate: `function threeSum(nums) {\n    \n}`,
    pyTemplate: `def three_sum(nums):\n    pass`,
    testcases: [
      { input: [[-1, 0, 1, 2, -1, -4]], output: [[-1, -1, 2], [-1, 0, 1]] }, // note: outputs will be normalized in sorting comparison
      { input: [[0, 1, 1]], output: [] },
      { input: [[0, 0, 0]], output: [[0, 0, 0]] }
    ]
  },
  "chunk-array": {
    id: "chunk-array",
    title: "Chunk Array",
    difficulty: "easy",
    category: "trial",
    points: 100,
    description: `<p>Given an array <code>arr</code> and a chunk size <code>size</code>, return a chunked array. A chunked array contains the original elements but grouped into sub-arrays of length <code>size</code>. The last sub-array may be shorter if the total length is not divisible by <code>size</code>.</p>`,
    examples: `<div class="example-box"><p><label>Input:</label> arr = [1,2,3,4,5], size = 2</p><p><label>Output:</label> [[1,2],[3,4],[5]]</p></div>`,
    jsMethod: "chunk",
    pyMethod: "chunk",
    jsTemplate: `function chunk(arr, size) {\n    \n}`,
    pyTemplate: `def chunk(arr, size):\n    pass`,
    testcases: [
      { input: [[1, 2, 3, 4, 5], 2], output: [[1, 2], [3, 4], [5]] },
      { input: [[1, 9, 6, 3, 2], 3], output: [[1, 9, 6], [3, 2]] },
      { input: [[8, 5, 2, 3], 6], output: [[8, 5, 2, 3]] }
    ]
  }
};

// Paths Configurations
const pathsConfig = [
  {
    id: "dsa",
    title: "Arrays & Hashing Quest",
    type: "dsa",
    desc: "Master key array structures, hashing techniques, lookup patterns, and frequency checks. This foundation is essential for FAANG interviews.",
    problems: ["two-sum", "contains-duplicate"]
  },
  {
    id: "language",
    title: "Python 3 Mastery",
    type: "language",
    desc: "Level up your syntax knowledge, loops, conditional flows, basic data types, and slice manipulations in Python.",
    problems: ["fizz-buzz", "reverse-string"]
  },
  {
    id: "company",
    title: "FAANG Prep Track",
    type: "company",
    desc: "Direct practice of the most frequent DSA questions asked in technical interviews at Google, Meta, Amazon, and Netflix.",
    problems: ["valid-parentheses", "merge-sorted"]
  },
  {
    id: "algorithm",
    title: "Dynamic Programming Voyage",
    type: "algorithm",
    desc: "Learn to break complex problems into overlapping subproblems, memoize solutions, and build bottom-up tables.",
    problems: ["fibonacci", "climbing-stairs"]
  }
];

// Trials Configurations
const trialsConfig = [
  {
    id: "dsa-elite",
    title: "DSA Elite Assessment",
    duration: 45, // mins
    points: 200,
    problemId: "three-sum",
    badge: "DSA Elite",
    badgeClass: "fa-solid fa-shield-halved",
    desc: "Solve a medium-level DSA array search problem. Earn the DSA Elite badge to display on your Ninja Profile."
  },
  {
    id: "python-sage",
    title: "Python Sage Assessment",
    duration: 30, // mins
    points: 100,
    problemId: "chunk-array",
    badge: "Python Sage",
    badgeClass: "fa-solid fa-code",
    desc: "Solve an array partition coding test. Earn the Python Sage badge to display on your Ninja Profile."
  }
];

// Weekly Clash Configurations
const clashConfig = {
  id: "clash-24",
  title: "Codify Clash #24: Algorithmic Blitz",
  problems: ["single-number", "merge-intervals", "longest-substring"]
};

// Main Application Class
class CodifyApp {
  constructor() {
    this.generateTemplates();
    this.initLocalStorage();
    this.loadState();
    this.initDOM();
    this.initEditor();
    this.renderHeatmap();
    this.renderDashboard();
    this.renderQuests("all");
    this.renderTrials();
    this.startClashTimer();
  }

  generateTemplates() {
    const problemTypes = {
      "two-sum": { args: [{name: "nums", type: "int[]"}, {name: "target", type: "int"}], ret: "int[]" },
      "contains-duplicate": { args: [{name: "nums", type: "int[]"}], ret: "bool" },
      "fizz-buzz": { args: [{name: "n", type: "int"}], ret: "string[]" },
      "reverse-string": { args: [{name: "s", type: "string"}], ret: "string" },
      "valid-parentheses": { args: [{name: "s", type: "string"}], ret: "bool" },
      "merge-sorted": { args: [{name: "list1", type: "int[]"}, {name: "list2", type: "int[]"}], ret: "int[]" },
      "fibonacci": { args: [{name: "n", type: "int"}], ret: "int" },
      "climbing-stairs": { args: [{name: "n", type: "int"}], ret: "int" },
      "single-number": { args: [{name: "nums", type: "int[]"}], ret: "int" },
      "merge-intervals": { args: [{name: "intervals", type: "int[][]"}], ret: "int[][]" },
      "longest-substring": { args: [{name: "s", type: "string"}], ret: "int" },
      "three-sum": { args: [{name: "nums", type: "int[]"}], ret: "int[][]" },
      "chunk-array": { args: [{name: "arr", type: "int[]"}, {name: "size", type: "int"}], ret: "int[][]" }
    };

    const mapCppType = (t) => {
      if (t === 'int[]') return 'vector<int>';
      if (t === 'int[][]') return 'vector<vector<int>>';
      if (t === 'string[]') return 'vector<string>';
      if (t === 'string') return 'string';
      if (t === 'int') return 'int';
      if (t === 'bool') return 'bool';
      return t;
    };

    const mapCType = (t) => {
      if (t === 'int[]') return 'int*';
      if (t === 'int[][]') return 'int**';
      if (t === 'string[]') return 'char**';
      if (t === 'string') return 'char*';
      if (t === 'int') return 'int';
      if (t === 'bool') return 'bool';
      return t;
    };

    const mapGoType = (t) => {
      if (t === 'int[]') return '[]int';
      if (t === 'int[][]') return '[][]int';
      if (t === 'string[]') return '[]string';
      if (t === 'string') return 'string';
      if (t === 'int') return 'int';
      if (t === 'bool') return 'bool';
      return t;
    };

    for (let pid in problemsDb) {
      const prob = problemsDb[pid];
      const meta = problemTypes[pid];
      if (!meta) continue;

      // C++
      const cppRet = mapCppType(meta.ret);
      const cppArgs = meta.args.map(a => {
        let t = mapCppType(a.type);
        if (t.includes('vector') || t === 'string') return `${t}& ${a.name}`;
        return `${t} ${a.name}`;
      }).join(', ');
      prob.cppTemplate = `#include <vector>\n#include <unordered_map>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    ${cppRet} ${prob.jsMethod}(${cppArgs}) {\n        // Write C++ code here\n        \n    }\n};`;

      // C
      const cRet = mapCType(meta.ret);
      const cArgs = meta.args.map(a => {
        let t = mapCType(a.type);
        if (a.type === 'int[]') {
          return `${t} ${a.name}, int ${a.name}Size`;
        }
        return `${t} ${a.name}`;
      });
      if (meta.ret === 'int[]' || meta.ret === 'string[]') {
        cArgs.push('int* returnSize');
      }
      prob.cTemplate = `#include <stdio.h>\n#include <stdlib.h>\n#include <stdbool.h>\n#include <string.h>\n\n${cRet} ${prob.jsMethod}(${cArgs.join(', ')}) {\n    // Write C code here\n    \n}`;

      // Go
      const goRet = mapGoType(meta.ret);
      const goArgs = meta.args.map(a => `${a.name} ${mapGoType(a.type)}`).join(', ');
      prob.goTemplate = `package main\n\nfunc ${prob.jsMethod}(${goArgs}) ${goRet} {\n    // Write Go code here\n    \n}`;
    }
  }

  initLocalStorage() {
    // Migrate any legacy 'codex_' keys to 'codify_'
    const keysToMigrate = ['streak', 'points', 'solved', 'submissions', 'trials', 'badges'];
    keysToMigrate.forEach(k => {
      const oldVal = localStorage.getItem(`codex_${k}`);
      if (oldVal !== null) {
        localStorage.setItem(`codify_${k}`, oldVal);
        localStorage.removeItem(`codex_${k}`);
      }
    });
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('codex_code_')) {
        const val = localStorage.getItem(key);
        const newKey = key.replace('codex_code_', 'codify_code_');
        localStorage.setItem(newKey, val);
        localStorage.removeItem(key);
      }
    }

    const submissions = localStorage.getItem('codify_submissions');
    if (submissions) {
      try {
        const parsed = JSON.parse(submissions);
        if (parsed.length < 10) {
          localStorage.removeItem('codify_submissions');
        }
      } catch(e) {}
    }

    if (!localStorage.getItem('codify_streak')) localStorage.setItem('codify_streak', '3');
    if (!localStorage.getItem('codify_points')) localStorage.setItem('codify_points', '120');
    if (!localStorage.getItem('codify_solved')) localStorage.setItem('codify_solved', '{}');
    if (!localStorage.getItem('codify_submissions')) {
      // Seed uneven contributions over the last 364 days to make the heatmap look natural
      const history = [];
      const now = new Date();
      const msInDay = 24 * 60 * 60 * 1000;
      
      for (let i = 0; i < 364; i++) {
        // 45% chance of coding on any given day
        if (Math.random() < 0.45) {
          // 1 to 5 submissions on that day
          const count = Math.floor(Math.random() * 5) + 1;
          const date = new Date(now.getTime() - i * msInDay);
          
          for (let j = 0; j < count; j++) {
            history.push({
              problemId: "two-sum",
              title: "Two Sum",
              category: "dsa",
              lang: "python",
              status: "Accepted",
              time: `${Math.floor(Math.random() * 20) + 10}ms`,
              timestamp: date.toISOString()
            });
          }
        }
      }
      localStorage.setItem('codify_submissions', JSON.stringify(history));
    }
    if (!localStorage.getItem('codify_trials')) {
      localStorage.setItem('codify_trials', JSON.stringify({
        "dsa-elite": "unlocked",
        "python-sage": "unlocked"
      }));
    }
    if (!localStorage.getItem('codify_badges')) localStorage.setItem('codify_badges', '[]');
  }

  loadState() {
    state.streak = parseInt(localStorage.getItem('codify_streak')) || 0;
    state.points = parseInt(localStorage.getItem('codify_points')) || 0;
    state.solved = JSON.parse(localStorage.getItem('codify_solved')) || {};
    state.submissions = JSON.parse(localStorage.getItem('codify_submissions')) || [];
    state.trialsStatus = JSON.parse(localStorage.getItem('codify_trials')) || {};
    state.badges = JSON.parse(localStorage.getItem('codify_badges')) || [];
  }

  saveState() {
    localStorage.setItem('codify_streak', state.streak.toString());
    localStorage.setItem('codify_points', state.points.toString());
    localStorage.setItem('codify_solved', JSON.stringify(state.solved));
    localStorage.setItem('codify_submissions', JSON.stringify(state.submissions));
    localStorage.setItem('codify_trials', JSON.stringify(state.trialsStatus));
    localStorage.setItem('codify_badges', JSON.stringify(state.badges));
  }

  initDOM() {
    // Nav Items click handlers
    document.querySelectorAll('.menu-item').forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const view = item.getAttribute('data-view');
        this.switchView(view);
      });
    });

    // Quests Categories tabs
    document.querySelectorAll('.quests-categories-tabs .tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.quests-categories-tabs .tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.getAttribute('data-quest-cat');
        this.renderQuests(cat);
      });
    });

    // Header badge updates
    this.updateHeaderStats();

    // IDE Panel Tabs
    document.querySelectorAll('.ide-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.ide-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const tabName = tab.getAttribute('data-ide-tab');
        
        document.getElementById('ide-tab-problem-content').classList.remove('active');
        document.getElementById('ide-tab-testcases-content').classList.remove('active');
        document.getElementById(`ide-tab-${tabName}-content`).classList.add('active');
      });
    });

    // Reset button
    document.getElementById('btn-reset-code').addEventListener('click', () => {
      this.resetCodeTemplate();
    });

    // Language selector change
    document.getElementById('lang-select').addEventListener('change', (e) => {
      // save current selection
      if (state.currentProblem) {
        this.updateEditorTemplate();
      }
    });

    // Heatmap range selector change
    const heatmapRangeSelect = document.getElementById('heatmap-range-select');
    if (heatmapRangeSelect) {
      heatmapRangeSelect.addEventListener('change', () => {
        this.renderHeatmap();
      });
    }

    // Run Code & Submit buttons
    document.getElementById('btn-run-code').addEventListener('click', () => this.runCode(false));
    document.getElementById('btn-submit-code').addEventListener('click', () => this.runCode(true));

    // AI Mentor Chat toggle
    document.getElementById('btn-ask-ai').addEventListener('click', () => {
      document.getElementById('ai-chat-drawer').classList.add('active');
    });
    document.getElementById('btn-close-ai').addEventListener('click', () => {
      document.getElementById('ai-chat-drawer').classList.remove('active');
    });

    // AI message sending
    document.getElementById('btn-send-ai').addEventListener('click', () => this.sendAIMessage());
    document.getElementById('ai-input-box').addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.sendAIMessage();
      }
    });

    // AI suggestion chips
    document.querySelectorAll('.suggestion-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const query = chip.getAttribute('data-query');
        document.getElementById('ai-input-box').value = query;
        this.sendAIMessage();
      });
    });
  }

  initEditor() {
    const textarea = document.getElementById('code-editor-textarea');
    state.editor = CodeMirror.fromTextArea(textarea, {
      lineNumbers: true,
      mode: "javascript",
      theme: "dracula",
      tabSize: 4,
      indentUnit: 4,
      lineWrapping: true,
      autoCloseBrackets: true,
      matchBrackets: true,
      extraKeys: {
        "Tab": function(cm) {
          var spaces = Array(cm.getOption("indentUnit") + 1).join(" ");
          cm.replaceSelection(spaces);
        }
      }
    });
  }

  updateHeaderStats() {
    document.getElementById('streak-count').innerText = `${state.streak} Days`;
    document.getElementById('points-count').innerText = `${state.points} XP`;
    
    // User profile rank card
    let rank = "Novice Coder";
    if (state.points >= 500) rank = "Algorithm Architect";
    else if (state.points >= 300) rank = "Code Warrior";
    else if (state.points >= 200) rank = "DSA Adept";
    
    document.querySelectorAll('.user-rank').forEach(el => el.innerText = rank);
    const profileRankEl = document.getElementById('user-pill-badge');
    if (profileRankEl) profileRankEl.innerText = rank;
  }

  switchView(viewName) {
    // handle navbar highlights
    document.querySelectorAll('.menu-item').forEach(item => {
      if (item.getAttribute('data-view') === viewName) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // handle content views toggle
    document.querySelectorAll('.content-view').forEach(view => {
      view.classList.remove('active');
    });

    const targetView = document.getElementById(`view-${viewName}`);
    if (targetView) {
      targetView.classList.add('active');
      state.activeView = viewName;
    }

    // Header adjustments
    const headerTitle = document.getElementById('page-title');
    const headerSubtitle = document.getElementById('page-subtitle');
    
    if (viewName === 'dashboard') {
      headerTitle.innerText = "Dashboard";
      headerSubtitle.innerText = "Welcome back, Coder. Your coding odyssey awaits.";
      this.renderDashboard();
    } else if (viewName === 'quests') {
      headerTitle.innerText = "Mastery Quests";
      headerSubtitle.innerText = "Complete categorized coding tracks to secure core programming skills.";
      this.renderQuests("all");
    } else if (viewName === 'trials') {
      headerTitle.innerText = "Arena Trials";
      headerSubtitle.innerText = "Time-boxed DSA and language test assessments to prove your rank.";
      this.renderTrials();
    } else if (viewName === 'clashes') {
      headerTitle.innerText = "Weekly Clashes";
      headerSubtitle.innerText = "Live leaderboard tournaments. Compete against coders globally.";
      this.renderWeeklyClashBoard();
    } else if (viewName === 'profile') {
      headerTitle.innerText = "Codify Profile";
      headerSubtitle.innerText = "Inspect your rating progression, solved stats breakdown, and submission heatmap.";
      this.renderProfile();
    } else if (viewName === 'ide') {
      headerTitle.innerText = "Codify Editor";
      headerSubtitle.innerText = "Sandbox environment. Code, execute tests, and ask the AI Mentor.";
      // refresh editor to force sizing redraw
      setTimeout(() => state.editor.refresh(), 50);
    }
    
    // Auto scroll view container to top on switch
    document.querySelector('.view-container').scrollTop = 0;
  }

  renderDashboard() {
    // 1. Progress Ring count calculation
    const totalProblems = 8; // we have 8 path problems
    let solvedCount = 0;
    pathsConfig.forEach(p => {
      p.problems.forEach(pid => {
        if (state.solved[pid]) solvedCount++;
      });
    });

    const percent = totalProblems > 0 ? Math.round((solvedCount / totalProblems) * 100) : 0;
    document.getElementById('total-progress-percentage').innerText = `${percent}%`;

    // Animating svg stroke
    const circle = document.getElementById('dashboard-progress-ring');
    const radius = circle.r.baseVal.value;
    const circumference = radius * 2 * Math.PI;
    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    const offset = circumference - (percent / 100) * circumference;
    circle.style.strokeDashoffset = offset;

    // Path details
    const dsaSolved = pathsConfig[0].problems.filter(pid => state.solved[pid]).length;
    const langSolved = pathsConfig[1].problems.filter(pid => state.solved[pid]).length;
    const companySolved = pathsConfig[2].problems.filter(pid => state.solved[pid]).length;
    const algoSolved = pathsConfig[3].problems.filter(pid => state.solved[pid]).length;

    document.getElementById('stat-dsa-count').innerText = `${dsaSolved}/2`;
    document.getElementById('stat-lang-count').innerText = `${langSolved}/2`;
    document.getElementById('stat-company-count').innerText = `${companySolved}/2`;
    document.getElementById('stat-dp-count').innerText = `${algoSolved}/2`;

    // 2. Badges statuses
    const badges = ['dsa-elite', 'python-sage'];
    badges.forEach(bid => {
      const el = document.getElementById(`badge-${bid}-status`);
      if (state.trialsStatus[bid] === 'passed') {
        el.className = "badge-item unlocked";
        el.querySelector('i').className = bid === 'dsa-elite' ? "fa-solid fa-shield-halved" : "fa-solid fa-code";
      } else {
        el.className = "badge-item locked";
        el.querySelector('i').className = bid === 'dsa-elite' ? "fa-solid fa-shield-halved text-muted" : "fa-solid fa-code text-muted";
      }
    });

    // 3. Submissions table rendering
    const emptySub = document.getElementById('empty-submissions');
    const subTable = document.getElementById('submissions-table');
    const tbody = document.getElementById('submissions-tbody');

    if (state.submissions.length === 0) {
      emptySub.style.display = 'flex';
      subTable.style.display = 'none';
    } else {
      emptySub.style.display = 'none';
      subTable.style.display = 'table';
      
      tbody.innerHTML = '';
      // Show latest 5
      const sorted = [...state.submissions].sort((a,b) => new Date(b.timestamp) - new Date(a.timestamp)).slice(0, 5);
      sorted.forEach(sub => {
        const date = new Date(sub.timestamp).toLocaleDateString(undefined, {month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'});
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td><strong>${sub.title}</strong></td>
          <td><span class="quest-type-tag ${sub.category}-tag">${sub.category.toUpperCase()}</span></td>
          <td><span style="font-family: var(--font-mono); font-size: 0.8rem;">${sub.lang === 'javascript' ? 'JavaScript' : 'Python 3'}</span></td>
          <td><span class="status-pill ${sub.status === 'Accepted' ? 'accepted' : 'failed'}">${sub.status}</span></td>
          <td style="font-family: var(--font-mono);">${sub.time}</td>
          <td class="text-muted">${date}</td>
        `;
        tbody.appendChild(tr);
      });
    }
  }

  renderQuests(categoryFilter) {
    const container = document.getElementById('quests-list-container');
    container.innerHTML = '';

    const paths = categoryFilter === 'all' ? pathsConfig : pathsConfig.filter(p => p.type === categoryFilter);

    paths.forEach(path => {
      // Calculate path solved stats
      const solvedInPath = path.problems.filter(pid => state.solved[pid]).length;
      const progressPercent = Math.round((solvedInPath / path.problems.length) * 100);

      const pathCard = document.createElement('div');
      pathCard.className = "card glass-card quest-path-card";
      
      let tagClass = "dsa-tag";
      if (path.type === 'language') tagClass = "lang-tag";
      else if (path.type === 'company') tagClass = "company-tag";
      else if (path.type === 'algorithm') tagClass = "algo-tag";

      let progressBarClass = "dsa-bg";
      if (path.type === 'language') progressBarClass = "lang-bg";
      else if (path.type === 'company') progressBarClass = "company-bg";
      else if (path.type === 'algorithm') progressBarClass = "algo-bg";

      // Render problem links HTML
      let problemsHTML = '';
      path.problems.forEach(pid => {
        const prob = problemsDb[pid];
        const isSolved = state.solved[pid];
        
        problemsHTML += `
          <a href="#" class="path-problem-item" data-problem-id="${pid}">
            <div class="problem-title-left">
              <i class="fa-solid ${isSolved ? 'fa-circle-check status-check' : 'fa-circle-notch status-pending'}"></i>
              <span>${prob.title}</span>
            </div>
            <span class="difficulty-lbl ${prob.difficulty}">${prob.difficulty}</span>
          </a>
        `;
      });

      pathCard.innerHTML = `
        <div class="quest-header">
          <div class="quest-title-row">
            <span class="quest-type-tag ${tagClass}">${path.type} Path</span>
            <h3>${path.title}</h3>
          </div>
        </div>
        <p class="quest-desc">${path.desc}</p>
        
        <div class="path-progress-bar-container">
          <div class="progress-header-row">
            <span>Completed: ${solvedInPath}/${path.problems.length}</span>
            <span>${progressPercent}%</span>
          </div>
          <div class="progress-bar-outer">
            <div class="progress-bar-inner ${progressBarClass}" style="width: ${progressPercent}%"></div>
          </div>
        </div>

        <div class="problems-in-path">
          ${problemsHTML}
        </div>
      `;

      container.appendChild(pathCard);
    });

    // Add click events to the dynamically rendered problem items
    container.querySelectorAll('.path-problem-item').forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const pid = item.getAttribute('data-problem-id');
        this.openIDE(pid);
      });
    });
  }

  renderTrials() {
    const container = document.getElementById('trials-list-container');
    container.innerHTML = '';

    trialsConfig.forEach(trial => {
      const card = document.createElement('div');
      const isPassed = state.trialsStatus[trial.id] === 'passed';
      const isLocked = state.trialsStatus[trial.id] === 'locked';
      
      card.className = `card glass-card trial-card ${isPassed ? 'unlocked' : (isLocked ? 'locked' : 'unlocked')}`;
      
      let actionBtnHTML = '';
      if (isPassed) {
        actionBtnHTML = `<button class="btn btn-secondary btn-full" disabled><i class="fa-solid fa-circle-check text-neon-green"></i> Trial Completed</button>`;
      } else if (isLocked) {
        actionBtnHTML = `<button class="btn btn-secondary btn-full" disabled><i class="fa-solid fa-lock"></i> Locked (Complete previous paths)</button>`;
      } else {
        actionBtnHTML = `<button class="btn btn-primary btn-full" onclick="app.startTrial('${trial.id}')">Begin Skill Trial (${trial.duration}m)</button>`;
      }

      card.innerHTML = `
        <div class="trial-title-row">
          <h3>${trial.title}</h3>
          <span class="trial-duration"><i class="fa-regular fa-clock"></i> ${trial.duration} mins</span>
        </div>
        <p class="text-muted margin-top-2">${trial.desc}</p>
        
        <div class="trial-badge-preview">
          <div class="trial-badge-icon">
            <i class="${trial.badgeClass}"></i>
          </div>
          <div class="badge-details">
            <h5>${trial.badge} Badge</h5>
            <p>${isPassed ? 'Unlocked and Verified' : 'Locked - Pass assessment to claim'}</p>
          </div>
        </div>
        
        <div class="margin-top-auto">
          ${actionBtnHTML}
        </div>
      `;

      container.appendChild(card);
    });
  }

  startTrial(trialId) {
    const trial = trialsConfig.find(t => t.id === trialId);
    if (!trial) return;

    if (!confirm(`Are you ready to start the ${trial.title}? You will have ${trial.duration} minutes to code and pass all test cases. Leaving or reloading will fail the trial.`)) {
      return;
    }

    state.currentTrialId = trialId;
    state.trialTimeRemaining = trial.duration * 60; // seconds
    
    // open the trial question in the IDE
    this.openIDE(trial.problemId);

    // Update IDE title layout for trial indicator
    const headerTitle = document.getElementById('page-title');
    const headerSubtitle = document.getElementById('page-subtitle');
    headerTitle.innerText = `Trial: ${trial.title}`;
    
    // start countdown timer on header subtitle
    clearInterval(state.trialTimerInterval);
    state.trialTimerInterval = setInterval(() => {
      state.trialTimeRemaining--;
      if (state.trialTimeRemaining <= 0) {
        clearInterval(state.trialTimerInterval);
        alert("Time is up! The skill trial has ended.");
        this.exitTrial(false);
      } else {
        const mins = Math.floor(state.trialTimeRemaining / 60);
        const secs = state.trialTimeRemaining % 60;
        headerSubtitle.innerHTML = `<span class="text-red font-bold animate-pulse"><i class="fa-solid fa-stopwatch"></i> TIME LIMIT: ${mins.toString().padStart(2, '0')}m ${secs.toString().padStart(2, '0')}s</span>`;
      }
    }, 1000);
  }

  exitTrial(success) {
    clearInterval(state.trialTimerInterval);
    state.trialTimerInterval = null;
    
    if (success && state.currentTrialId) {
      const trial = trialsConfig.find(t => t.id === state.currentTrialId);
      state.trialsStatus[state.currentTrialId] = 'passed';
      
      // Earn points
      state.points += trial.points;
      
      // Unlock badge
      if (!state.badges.includes(trial.badge)) {
        state.badges.push(trial.badge);
      }
      
      this.saveState();
      this.updateHeaderStats();
      
      alert(`CONGRATULATIONS! You successfully passed the skill trial and earned the "${trial.badge}" badge! +${trial.points} XP added.`);
    }
    
    state.currentTrialId = null;
    this.switchView('trials');
  }

  startWeeklyClash() {
    state.isClashActive = true;
    
    document.getElementById('btn-join-clash').style.display = 'none';
    document.getElementById('clash-problems-grid').style.display = 'grid';
    
    this.renderWeeklyClashBoard();
  }

  renderWeeklyClashBoard() {
    const listContainer = document.querySelector('.clash-probs-list');
    listContainer.innerHTML = '';

    clashConfig.problems.forEach((pid, index) => {
      const prob = problemsDb[pid];
      const isSolved = state.clashSolved[pid];
      
      const row = document.createElement('a');
      row.className = "clash-prob-row";
      row.href = "#";
      row.setAttribute('data-problem-id', pid);
      
      row.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.8rem;">
          <span style="font-family: var(--font-mono); font-weight: 700; color: var(--text-muted);">P${index + 1}</span>
          <strong>${prob.title}</strong>
        </div>
        <div style="display: flex; align-items: center; gap: 1.5rem;">
          <span class="difficulty-lbl ${prob.difficulty}">${prob.difficulty}</span>
          <span style="font-weight: 600; color: var(--accent-purple);">${prob.points} pts</span>
          <i class="fa-solid ${isSolved ? 'fa-circle-check text-neon-green' : 'fa-circle-notch text-muted'}"></i>
        </div>
      `;
      
      row.addEventListener('click', (e) => {
        e.preventDefault();
        this.openIDE(pid);
      });
      
      listContainer.appendChild(row);
    });

    // Update standings
    document.getElementById('user-standing-pts').innerText = `${state.clashScore} pts`;
    
    let rank = "Unranked";
    let rankNum = 4;
    if (state.clashScore >= 350) { rank = "#1 (Grandmaster)"; rankNum = 1; }
    else if (state.clashScore >= 200) { rank = "#3 (Master)"; rankNum = 3; }
    else if (state.clashScore > 0) { rank = "#4 (Challenger)"; rankNum = 4; }
    
    document.getElementById('user-clash-rank').innerText = rank;
    document.getElementById('profile-rank').innerText = rank;
    
    const userRow = document.getElementById('user-standing-row');
    const userRank = document.getElementById('user-standing-rank');
    userRank.innerText = rankNum;
    
    // Sort and re-append standings based on score
    const standingsList = document.querySelector('.standings-list');
    const rows = Array.from(standingsList.children);
    
    // We update values dynamically in the existing items
    rows[3].querySelector('.points').innerText = `${state.clashScore} pts`;
    
    // Sort them
    const scores = {
      "code_lord_99": 300,
      "dsa_ninja": 260,
      "byte_bender": 240,
      "Ria (You)": state.clashScore
    };
    
    rows.sort((a, b) => {
      const nameA = a.querySelector('.name').innerText.replace(' (You)', '');
      const nameB = b.querySelector('.name').innerText.replace(' (You)', '');
      return scores[nameB] - scores[nameA];
    });
    
    standingsList.innerHTML = '';
    rows.forEach((row, i) => {
      row.querySelector('.rank').innerText = i + 1;
      if (i === 0) row.className = "standing-item leader";
      else if (row.id === 'user-standing-row') row.className = "standing-item current-user-row";
      else row.className = "standing-item";
      
      standingsList.appendChild(row);
    });
  }

  startClashTimer() {
    setInterval(() => {
      state.clashTimeRemaining--;
      if (state.clashTimeRemaining <= 0) {
        state.clashTimeRemaining = 7200; // reset to 2 hours
      }
      
      const hours = Math.floor(state.clashTimeRemaining / 3600);
      const mins = Math.floor((state.clashTimeRemaining % 3600) / 60);
      const secs = state.clashTimeRemaining % 60;
      
      const timeStr = `${hours.toString().padStart(2, '0')}h ${mins.toString().padStart(2, '0')}m ${secs.toString().padStart(2, '0')}s`;
      
      const timerEl = document.getElementById('clash-timer');
      const timerEl2 = document.getElementById('clash-clock');
      if (timerEl) timerEl.innerText = `${hours}h ${mins}m`;
      if (timerEl2) timerEl2.innerText = timeStr;
    }, 1000);
  }

  getUserRatingDetails() {
    const points = state.points || 0;
    const baseRating = 1200;
    const currentRating = baseRating + points;
    
    // Calculate stars and division
    let stars = 1;
    let division = 4;
    let starHtml = '';
    
    if (currentRating >= 1800) {
      stars = 4;
      division = 1;
      starHtml = '<i class="fa-solid fa-star text-yellow"></i>'.repeat(4) + '<i class="fa-regular fa-star text-muted"></i>';
    } else if (currentRating >= 1600) {
      stars = 3;
      division = 2;
      starHtml = '<i class="fa-solid fa-star text-yellow"></i>'.repeat(3) + '<i class="fa-regular fa-star text-muted"></i>'.repeat(2);
    } else if (currentRating >= 1400) {
      stars = 2;
      division = 3;
      starHtml = '<i class="fa-solid fa-star text-yellow"></i>'.repeat(2) + '<i class="fa-regular fa-star text-muted"></i>'.repeat(3);
    } else {
      stars = 1;
      division = 4;
      starHtml = '<i class="fa-solid fa-star text-yellow"></i>' + '<i class="fa-regular fa-star text-muted"></i>'.repeat(4);
    }
    
    // Calculate global and country ranks based on rating
    const globalRank = Math.max(1, Math.round(15000 - (currentRating - 1200) * 12.5 + Math.sin(currentRating) * 20));
    const countryRank = Math.max(1, Math.round(4000 - (currentRating - 1200) * 3.3 + Math.sin(currentRating) * 5));
    
    // Ratings history over 6 contests ending in currentRating
    const ratingChanges = [
      { contest: "Clash #19", rank: 450, change: 85, rating: 1285 },
      { contest: "Clash #20", rank: 320, change: 110, rating: 1395 },
      { contest: "Clash #21", rank: 540, change: -15, rating: 1380 },
      { contest: "Clash #22", rank: 180, change: 95, rating: 1475 },
      { contest: "Clash #23", rank: 110, change: 65, rating: 1540 },
      { contest: "Clash #24", rank: state.clashScore > 0 ? parseInt(document.getElementById('user-clash-rank').innerText) || 45 : 0, change: state.clashScore, rating: currentRating }
    ];
    
    // Adjust historical ratings backwards so they sum up to currentRating
    let current = currentRating;
    ratingChanges[5].rating = current;
    ratingChanges[5].change = state.clashScore > 0 ? state.clashScore : 30 + Math.floor((state.points % 50) / 2);
    
    ratingChanges[4].rating = ratingChanges[5].rating - ratingChanges[5].change;
    ratingChanges[4].change = 65;
    
    ratingChanges[3].rating = ratingChanges[4].rating - ratingChanges[4].change;
    ratingChanges[3].change = 95;
    
    ratingChanges[2].rating = ratingChanges[3].rating - ratingChanges[3].change;
    ratingChanges[2].change = -15;
    
    ratingChanges[1].rating = ratingChanges[2].rating - ratingChanges[2].change;
    ratingChanges[1].change = 110;
    
    ratingChanges[0].rating = ratingChanges[1].rating - ratingChanges[1].change;
    ratingChanges[0].change = 85;
    
    return {
      currentRating,
      stars,
      division,
      starHtml,
      globalRank,
      countryRank,
      ratingChanges
    };
  }

  renderRatingChart(ratingChanges) {
    const wrapper = document.getElementById('rating-chart-wrapper');
    if (!wrapper) return;
    
    const ratings = ratingChanges.map(rc => rc.rating);
    const minRating = Math.min(...ratings, 1100) - 50;
    const maxRating = Math.max(...ratings, 1700) + 50;
    const range = maxRating - minRating;
    
    const width = 500;
    const height = 160;
    const xCoords = [50, 130, 210, 290, 370, 450];
    
    const getY = (val) => {
      return 135 - ((val - minRating) / range) * 110;
    };
    
    const points = xCoords.map((x, i) => `${x},${getY(ratings[i])}`).join(' ');
    const areaPoints = `${xCoords[0]},140 ` + xCoords.map((x, i) => `${x},${getY(ratings[i])}`).join(' ') + ` ${xCoords[5]},140`;
    
    let svgHtml = `
      <svg width="100%" height="100%" viewBox="0 0 ${width} ${height}" style="overflow: visible;">
        <defs>
          <linearGradient id="rating-glow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="var(--accent-purple)" stop-opacity="0.25"/>
            <stop offset="100%" stop-color="var(--accent-purple)" stop-opacity="0.0"/>
          </linearGradient>
        </defs>
        
        <!-- Gridlines -->
        <g stroke="rgba(255,255,255,0.03)" stroke-width="1">
          <line x1="40" y1="${getY(minRating + range * 0.25)}" x2="470" y2="${getY(minRating + range * 0.25)}" stroke-dasharray="3"/>
          <line x1="40" y1="${getY(minRating + range * 0.5)}" x2="470" y2="${getY(minRating + range * 0.5)}" stroke-dasharray="3"/>
          <line x1="40" y1="${getY(minRating + range * 0.75)}" x2="470" y2="${getY(minRating + range * 0.75)}" stroke-dasharray="3"/>
          <line x1="40" y1="140" x2="470" y2="140" stroke="rgba(255,255,255,0.08)"/>
        </g>
        
        <g font-size="8" fill="var(--text-muted)" text-anchor="end">
          <text x="32" y="${getY(minRating + range * 0.25) + 3}">${Math.round(minRating + range * 0.25)}</text>
          <text x="32" y="${getY(minRating + range * 0.5) + 3}">${Math.round(minRating + range * 0.5)}</text>
          <text x="32" y="${getY(minRating + range * 0.75) + 3}">${Math.round(minRating + range * 0.75)}</text>
        </g>
        
        <!-- Gradient Area -->
        <polygon points="${areaPoints}" fill="url(#rating-glow)" />
        
        <!-- Chart Line -->
        <polyline points="${points}" fill="none" stroke="var(--accent-purple)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
        
        <!-- Nodes -->
    `;
    
    ratingChanges.forEach((rc, i) => {
      const x = xCoords[i];
      const y = getY(rc.rating);
      
      svgHtml += `
        <g>
          <circle cx="${x}" cy="${y}" r="4" fill="#0b0f19" stroke="var(--accent-purple)" stroke-width="2" />
          <circle cx="${x}" cy="${y}" r="7" fill="var(--accent-purple)" fill-opacity="0.1" />
          <!-- Rating tag above node -->
          <text x="${x}" y="${y - 10}" font-size="8.5" fill="var(--text-main)" font-weight="700" text-anchor="middle">${rc.rating}</text>
          <!-- X Axis Contest title -->
          <text x="${x}" y="152" font-size="8" fill="var(--text-muted)" text-anchor="middle">${rc.contest}</text>
        </g>
      `;
    });
    
    svgHtml += `</svg>`;
    wrapper.innerHTML = svgHtml;
  }

  renderProfile() {
    const ratingDetails = this.getUserRatingDetails();
    
    // Update basic text ratings details
    const starRatingEl = document.getElementById('profile-star-rating');
    if (starRatingEl) starRatingEl.innerHTML = ratingDetails.starHtml;
    
    const currentRatingEl = document.getElementById('profile-current-rating');
    if (currentRatingEl) currentRatingEl.innerText = ratingDetails.currentRating;
    
    const highestRatingEl = document.getElementById('profile-highest-rating');
    if (highestRatingEl) highestRatingEl.innerText = Math.max(ratingDetails.currentRating, 1380); // Highest rating mock-bound
    
    const divisionEl = document.getElementById('profile-division');
    if (divisionEl) divisionEl.innerText = `(Div ${ratingDetails.division})`;
    
    const globalRankEl = document.getElementById('profile-global-rank');
    if (globalRankEl) globalRankEl.innerText = `#${ratingDetails.globalRank.toLocaleString()}`;
    
    const countryRankEl = document.getElementById('profile-country-rank');
    if (countryRankEl) countryRankEl.innerText = `#${ratingDetails.countryRank.toLocaleString()}`;
    
    // Draw rating progression chart
    this.renderRatingChart(ratingDetails.ratingChanges);
    
    // Populating ratings history table
    const tableBody = document.getElementById('profile-rating-history-table');
    if (tableBody) {
      tableBody.innerHTML = '';
      const ratingChangesClone = [...ratingDetails.ratingChanges].reverse();
      ratingChangesClone.forEach(rc => {
        const row = document.createElement('tr');
        row.style.borderBottom = '1px solid var(--border-glass)';
        
        const changeText = rc.change >= 0 ? `+${rc.change}` : `${rc.change}`;
        const changeClass = rc.change >= 0 ? 'text-neon-green' : 'text-danger';
        const rankText = rc.rank > 0 ? `${rc.rank}` : `Unranked`;
        
        row.innerHTML = `
          <td style="padding: 0.4rem; font-weight: 500;">${rc.contest}</td>
          <td style="padding: 0.4rem; text-align: center; color: var(--text-muted);">${rankText}</td>
          <td style="padding: 0.4rem; text-align: center; font-weight: 600;" class="${changeClass}">${changeText}</td>
          <td style="padding: 0.4rem; text-align: center; font-weight: 700;">${rc.rating}</td>
        `;
        tableBody.appendChild(row);
      });
    }

    // Render Solved statistics breakdown
    let easySolved = 0, mediumSolved = 0, hardSolved = 0;
    let easyTotal = 0, mediumTotal = 0, hardTotal = 0;
    
    Object.keys(problemsDb).forEach(pid => {
      const prob = problemsDb[pid];
      if (prob.difficulty.toLowerCase() === 'easy') {
        easyTotal++;
        if (state.solved[pid]) easySolved++;
      } else if (prob.difficulty.toLowerCase() === 'medium') {
        mediumTotal++;
        if (state.solved[pid]) mediumSolved++;
      } else if (prob.difficulty.toLowerCase() === 'hard') {
        hardTotal++;
        if (state.solved[pid]) hardSolved++;
      }
    });

    const totalSolved = Object.keys(state.solved).length;
    const totalProblems = Object.keys(problemsDb).length;
    const solvedPercent = totalProblems > 0 ? Math.round((totalSolved / totalProblems) * 100) : 0;
    
    const profileTotalSolvedEl = document.getElementById('profile-total-solved');
    if (profileTotalSolvedEl) profileTotalSolvedEl.innerText = totalSolved;
    
    const profileSolvedPercentEl = document.getElementById('profile-solved-percent');
    if (profileSolvedPercentEl) profileSolvedPercentEl.innerText = `${solvedPercent}%`;
    
    const easyBreakdownTextEl = document.getElementById('easy-breakdown-text');
    if (easyBreakdownTextEl) easyBreakdownTextEl.innerText = `${easySolved}/${easyTotal}`;
    const easyBreakdownBarEl = document.getElementById('easy-breakdown-bar');
    if (easyBreakdownBarEl) easyBreakdownBarEl.style.width = `${easyTotal > 0 ? (easySolved / easyTotal) * 100 : 0}%`;
    
    const mediumBreakdownTextEl = document.getElementById('medium-breakdown-text');
    if (mediumBreakdownTextEl) mediumBreakdownTextEl.innerText = `${mediumSolved}/${mediumTotal}`;
    const mediumBreakdownBarEl = document.getElementById('medium-breakdown-bar');
    if (mediumBreakdownBarEl) mediumBreakdownBarEl.style.width = `${mediumTotal > 0 ? (mediumSolved / mediumTotal) * 100 : 0}%`;
    
    const hardBreakdownTextEl = document.getElementById('hard-breakdown-text');
    if (hardBreakdownTextEl) hardBreakdownTextEl.innerText = `${hardSolved}/${hardTotal}`;
    const hardBreakdownBarEl = document.getElementById('hard-breakdown-bar');
    if (hardBreakdownBarEl) hardBreakdownBarEl.style.width = `${hardTotal > 0 ? (hardSolved / hardTotal) * 100 : 0}%`;
    
    const streakCountEl = document.getElementById('profile-streak-count');
    if (streakCountEl) streakCountEl.innerText = `${state.streak} Days`;
    const xpCountEl = document.getElementById('profile-xp-count');
    if (xpCountEl) xpCountEl.innerText = `${state.points} XP`;

    // Render Badges
    const badgeList = document.getElementById('profile-badges-list');
    const emptyBadges = document.getElementById('empty-badges');
    
    if (badgeList) {
      badgeList.querySelectorAll('.badge-profile-item').forEach(el => el.remove());

      if (state.badges.length === 0) {
        if (emptyBadges) emptyBadges.style.display = 'block';
      } else {
        if (emptyBadges) emptyBadges.style.display = 'none';
        
        state.badges.forEach(bname => {
          const item = document.createElement('div');
          item.className = "badge-profile-item";
          
          let iconClass = "fa-solid fa-shield-halved";
          if (bname === 'Python Sage') iconClass = "fa-solid fa-code";
          
          item.innerHTML = `
            <i class="${iconClass}"></i>
            <span>${bname}</span>
          `;
          badgeList.appendChild(item);
        });
      }
    }

    // Render Paths Completed Progress list
    const pathsContainer = document.getElementById('profile-paths-completed');
    if (pathsContainer) {
      pathsContainer.innerHTML = '';
      
      pathsConfig.forEach(path => {
        const solvedInPath = path.problems.filter(pid => state.solved[pid]).length;
        const progressPercent = Math.round((solvedInPath / path.problems.length) * 100);
        
        let barColor = "dsa-bg";
        if (path.type === 'language') barColor = "lang-bg";
        else if (path.type === 'company') barColor = "company-bg";
        else if (path.type === 'algorithm') barColor = "algo-bg";

        const pathRow = document.createElement('div');
        pathRow.style.padding = "0.3rem 0";
        pathRow.innerHTML = `
          <div style="display: flex; justify-content: space-between; font-size: 0.8rem; margin-bottom: 0.2rem;">
            <strong>${path.title}</strong>
            <span class="text-muted">${solvedInPath}/${path.problems.length} solved (${progressPercent}%)</span>
          </div>
          <div class="progress-bar-outer" style="height: 5px;">
            <div class="progress-bar-inner ${barColor}" style="width: ${progressPercent}%; height: 100%;"></div>
          </div>
        `;
        pathsContainer.appendChild(pathRow);
      });
    }

    // Render Contest Participations list
    const contestsContainer = document.getElementById('profile-contests-completed');
    if (contestsContainer) {
      contestsContainer.innerHTML = '';
      
      const clashRow = document.createElement('div');
      clashRow.style.padding = "0.5rem 0";
      
      if (state.clashScore > 0) {
        clashRow.innerHTML = `
          <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85rem; border: 1px solid var(--border-glass); border-radius: 6px; padding: 0.8rem; background-color: rgba(255,255,255,0.01);">
            <div>
              <strong>Codify Clash #24: Algorithmic Blitz</strong><br>
              <span class="text-muted" style="font-size: 0.75rem;">Rank: ${document.getElementById('user-clash-rank').innerText}</span>
            </div>
            <div style="text-align: right;">
              <strong class="text-neon-green">${state.clashScore} pts</strong><br>
              <span class="status-pill accepted" style="font-size: 0.65rem;">Ranked Up</span>
            </div>
          </div>
        `;
      } else {
        clashRow.innerHTML = `
          <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85rem; border: 1px dashed var(--border-glass); border-radius: 6px; padding: 0.8rem; background-color: rgba(255,255,255,0.01);">
            <div>
              <strong>Codify Clash #24: Algorithmic Blitz</strong><br>
              <span class="text-muted" style="font-size: 0.75rem;">Active now. Join to claim Grandmaster badge!</span>
            </div>
            <button class="btn btn-secondary btn-sm" onclick="app.switchView('clashes')">Join Contest</button>
          </div>
        `;
      }
      contestsContainer.appendChild(clashRow);
    }
  }

  renderHeatmap() {
    const grid = document.getElementById('heatmap-calendar-grid');
    if (!grid) return;
    grid.innerHTML = '';
    
    // Check range selected: 6 months (26 weeks) or 12 months (53 weeks)
    const rangeSelect = document.getElementById('heatmap-range-select');
    const totalWeeks = rangeSelect ? parseInt(rangeSelect.value) === 12 ? 53 : 26 : 26; // Default to 26 weeks (6 months)
    
    const now = new Date();
    const endDate = new Date(now);
    const endDay = endDate.getDay();
    // Align end date to the upcoming Wednesday (since in CodeChef row 6 is Wednesday)
    const daysToWednesday = (3 - endDay + 7) % 7;
    endDate.setDate(endDate.getDate() + daysToWednesday);
    
    const msInDay = 24 * 60 * 60 * 1000;
    const totalDaysToRender = totalWeeks * 7;
    const startDate = new Date(endDate.getTime() - (totalDaysToRender - 1) * msInDay);
    
    // Set grid columns template and width dynamically based on totalWeeks
    grid.style.gridTemplateColumns = `repeat(${totalWeeks}, 13px)`;
    grid.style.width = `${totalWeeks * 13 + (totalWeeks - 1) * 4}px`;

    // Group submission count by Date string YYYY-MM-DD
    const submissionCounts = {};
    state.submissions.forEach(sub => {
      const dateStr = sub.timestamp.split('T')[0];
      submissionCounts[dateStr] = (submissionCounts[dateStr] || 0) + 1;
    });

    for (let dayIndex = 0; dayIndex < totalDaysToRender; dayIndex++) {
      const cellDate = new Date(startDate.getTime() + dayIndex * msInDay);
      const dateStr = cellDate.toISOString().split('T')[0];
      const count = submissionCounts[dateStr] || 0;
      
      const cell = document.createElement('div');
      
      let level = 0;
      if (count >= 4) level = 4;
      else if (count === 3) level = 3;
      else if (count === 2) level = 2;
      else if (count === 1) level = 1;
      
      // Do not allow clicking or tooltips for future dates beyond today
      const isFuture = cellDate.getTime() > now.getTime();
      
      cell.className = `heatmap-cell level-${isFuture ? 0 : level}`;
      
      if (!isFuture) {
        const formattedDate = cellDate.toLocaleDateString(undefined, {month: 'short', day: 'numeric', year: 'numeric'});
        cell.setAttribute('data-tooltip', `${count} submission${count !== 1 ? 's' : ''} on ${formattedDate}`);
      } else {
        cell.style.opacity = '0.15';
        cell.style.cursor = 'default';
        cell.style.pointerEvents = 'none';
      }
      
      grid.appendChild(cell);
    }

    // Render months dynamically
    const monthsContainer = document.getElementById('heatmap-months-container');
    if (monthsContainer) {
      monthsContainer.innerHTML = '';
      monthsContainer.style.width = `${totalWeeks * 13 + (totalWeeks - 1) * 4}px`;
      let lastMonth = -1;
      
      for (let week = 0; week < totalWeeks; week++) {
        // Look at the middle day of the week to decide month label placement
        const weekDate = new Date(startDate.getTime() + (week * 7 + 3) * msInDay);
        const currentMonth = weekDate.getMonth();
        
        if (currentMonth !== lastMonth) {
          const monthLabel = document.createElement('span');
          monthLabel.innerText = weekDate.toLocaleDateString(undefined, { month: 'short' });
          monthLabel.style.position = 'absolute';
          monthLabel.style.left = `${week * 17}px`;
          monthsContainer.appendChild(monthLabel);
          lastMonth = currentMonth;
        }
      }
    }
  }

  openIDE(problemId) {
    const prob = problemsDb[problemId];
    if (!prob) return;

    state.currentProblem = prob;
    this.switchView('ide');

    // Populate problem details
    document.getElementById('problem-title').innerText = prob.title;
    document.getElementById('problem-difficulty').innerText = prob.difficulty;
    document.getElementById('problem-difficulty').className = `difficulty-tag ${prob.difficulty}`;
    document.getElementById('problem-points-badge').innerText = `+${prob.points} XP`;
    document.getElementById('problem-description-content').innerHTML = prob.description;
    document.getElementById('problem-examples-content').innerHTML = prob.examples;

    // Load testcases view
    this.renderIDEPublicTestcases();

    // Set editor template
    this.updateEditorTemplate();

    // Clear output console
    document.getElementById('console-log').innerText = "Console outputs will appear here when you run code...";

    // Reset AI drawer to clean state
    this.resetAIChat();
  }

  renderIDEPublicTestcases() {
    const container = document.getElementById('testcases-list');
    container.innerHTML = '';

    const publicCases = state.currentProblem.testcases.filter(tc => !tc.hidden);
    publicCases.forEach((tc, index) => {
      const btn = document.createElement('button');
      btn.className = `testcase-btn ${index === 0 ? 'active' : ''}`;
      btn.innerText = `Case ${index + 1}`;
      btn.addEventListener('click', () => {
        container.querySelectorAll('.testcase-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.selectIDEPublicTestcase(index);
      });
      container.appendChild(btn);
    });

    this.selectIDEPublicTestcase(0);
  }

  selectIDEPublicTestcase(index) {
    state.activeTestcaseIndex = index;
    const tc = state.currentProblem.testcases[index];
    
    // Display inputs
    let inputStr = '';
    tc.input.forEach((arg, i) => {
      inputStr += `Arg ${i + 1}: ${JSON.stringify(arg)}\n`;
    });
    
    document.getElementById('testcase-input-display').innerText = inputStr.trim();
    document.getElementById('testcase-expected-display').innerText = JSON.stringify(tc.output);
  }

  updateEditorTemplate() {
    const lang = document.getElementById('lang-select').value;
    const prob = state.currentProblem;
    if (!prob) return;
    
    // Check if code already exists in local storage for this problem+lang
    const storageKey = `codify_code_${prob.id}_${lang}`;
    const savedCode = localStorage.getItem(storageKey);
    
    let template = '';
    let mode = 'python';
    
    if (lang === 'python') { template = prob.pyTemplate; mode = 'python'; }
    else if (lang === 'cpp') { template = prob.cppTemplate; mode = 'text/x-c++src'; }
    else if (lang === 'c') { template = prob.cTemplate; mode = 'text/x-csrc'; }
    else if (lang === 'go') { template = prob.goTemplate; mode = 'text/x-go'; }
    
    if (savedCode) {
      state.editor.setValue(savedCode);
    } else {
      state.editor.setValue(template || '');
    }

    // Update CodeMirror Mode
    state.editor.setOption('mode', mode);
  }

  resetCodeTemplate() {
    if (!state.currentProblem) return;
    const lang = document.getElementById('lang-select').value;
    const prob = state.currentProblem;
    
    let template = '';
    if (lang === 'python') template = prob.pyTemplate;
    else if (lang === 'cpp') template = prob.cppTemplate;
    else if (lang === 'c') template = prob.cTemplate;
    else if (lang === 'go') template = prob.goTemplate;
    
    state.editor.setValue(template || '');
    
    const storageKey = `codify_code_${state.currentProblem.id}_${lang}`;
    localStorage.removeItem(storageKey);
  }

  runCode(isSubmit = false) {
    if (!state.currentProblem) return;

    const userCode = state.editor.getValue();
    const lang = document.getElementById('lang-select').value;

    // Cache current code in localStorage
    const storageKey = `codify_code_${state.currentProblem.id}_${lang}`;
    localStorage.setItem(storageKey, userCode);

    const consoleLog = document.getElementById('console-log');
    consoleLog.innerText = isSubmit ? "Submitting code... Running test cases..." : "Running code on active testcase...";

    // Run testcases
    const targetCases = isSubmit ? state.currentProblem.testcases : [state.currentProblem.testcases[state.activeTestcaseIndex]];
    
    let caseIndex = 0;
    const results = [];
    const logsCollected = [];

    const executeNextCase = () => {
      if (caseIndex >= targetCases.length) {
        // All test cases processed!
        this.processExecutionResults(results, isSubmit, logsCollected);
        return;
      }

      const tc = targetCases[caseIndex];
      
      if (lang === 'python') {
        // Python execution via Skulpt
        this.executePythonCode(userCode, state.currentProblem.pyMethod, tc.input, (result) => {
          results.push(result);
          
          let passed = false;
          if (result.success) {
            passed = this.compareOutputs(result.output, tc.output);
          }
          results[results.length - 1].passed = passed;
          
          caseIndex++;
          executeNextCase();
        });
      } else {
        // For C, C++, Go: transpile first to JS, then run as JS!
        let codeToExecute = userCode;
        let methodToCall = state.currentProblem.jsMethod; // JS method name (camelCase)
        
        if (lang === 'c' || lang === 'cpp' || lang === 'go') {
          try {
            codeToExecute = this.transpileToJS(userCode, lang);
          } catch (transpileErr) {
            results.push({ success: false, error: "Transpilation / Syntax Error: " + transpileErr.message, logs: [] });
            results[results.length - 1].passed = false;
            caseIndex++;
            setTimeout(executeNextCase, 10);
            return;
          }
        }
        
        const result = this.executeJSCode(codeToExecute, methodToCall, tc.input);
        results.push(result);
        
        let passed = false;
        if (result.success) {
          passed = this.compareOutputs(result.output, tc.output);
        } else {
          result.error = "Compilation or Execution Error: " + result.error;
        }
        results[results.length - 1].passed = passed;
        
        caseIndex++;
        setTimeout(executeNextCase, 10);
      }
    };

    executeNextCase();
  }

  // Deep comparison of outputs (handling arrays, objects, boolean matches)
  compareOutputs(actual, expected) {
    // Standard sorting normalization for ThreeSum array comparison to ignore order
    if (state.currentProblem.id === "three-sum") {
      if (!Array.isArray(actual) || !Array.isArray(expected)) return false;
      const normalize = (arr) => arr.map(sub => [...sub].sort((a,b)=>a-b)).sort((a,b) => a[0]-b[0] || a[1]-b[1]);
      try {
        const normActual = normalize(actual);
        const normExpected = normalize(expected);
        return JSON.stringify(normActual) === JSON.stringify(normExpected);
      } catch(e) {
        return false;
      }
    }

    if (Array.isArray(actual) && Array.isArray(expected)) {
      if (actual.length !== expected.length) return false;
      // If we are comparing merge-sorted or similar, order is fixed
      return JSON.stringify(actual) === JSON.stringify(expected);
    }
    
    if (typeof actual === 'object' && actual !== null && typeof expected === 'object' && expected !== null) {
      return JSON.stringify(actual) === JSON.stringify(expected);
    }

    return actual === expected;
  }

  executeJSCode(userCode, methodName, args) {
    let logs = [];
    const backupConsole = console.log;
    
    // Capture console logs from user code
    console.log = function(...msg) {
      logs.push(msg.map(m => typeof m === 'object' ? JSON.stringify(m) : m).join(' '));
    };

    try {
      // Create executable sandbox wrapper
      const wrapper = new Function(`
        ${userCode}
        return ${methodName};
      `);
      
      const fn = wrapper();
      if (typeof fn !== 'function') {
        throw new Error(`Method "${methodName}" is not defined or is not a function.`);
      }

      // Deep copy args to avoid user code mutating original testcases
      const argCopies = JSON.parse(JSON.stringify(args));
      const output = fn(...argCopies);
      
      console.log = backupConsole;
      return { success: true, output, logs };
    } catch (err) {
      console.log = backupConsole;
      return { success: false, error: err.message, logs };
    }
  }

  transpileToJS(userCode, lang) {
    let code = userCode;
    
    if (lang === 'c' || lang === 'cpp') {
      // 1. Remove includes and namespace lines
      code = code.replace(/#include\s*<[^>]+>/g, '');
      code = code.replace(/using\s+namespace\s+std\s*;/g, '');
      
      // 2. Replace class Solution wrapper if C++
      code = code.replace(/class\s+Solution\s*\{[\s\S]*?public:([\s\S]*?)\};/g, '$1');
      
      // 3. Match C/C++ function definitions and simplify to JS functions
      // Matches "ReturnType funcName(ArgType arg1, ArgType arg2) {"
      code = code.replace(/(?:\w+<[^>]+>|[\w*]+)\s+(\w+)\s*\(([^)]*)\)\s*\{/g, (match, funcName, args) => {
        let cleanArgs = args.split(',').map(arg => {
          let trimmed = arg.trim();
          if (!trimmed) return '';
          let parts = trimmed.split(/\s+/);
          let param = parts[parts.length - 1]; // last word is parameter name
          return param.replace(/[*&]/g, ''); // strip pointers / references
        }).filter(arg => arg !== '').join(', ');
        return `function ${funcName}(${cleanArgs}) {`;
      });
      
      // 4. Line by line variable conversions
      let lines = code.split('\n');
      for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        
        // Skip function signature lines which we already converted to function
        if (line.includes('function ')) continue;
        
        // Match declaration with value: "Type varName = value;"
        let declVal = line.match(/^\s*(?:\w+<[^>]+>|[\w*]+)\s+(\w+)\s*=\s*([^;]+);/);
        if (declVal) {
          let varName = declVal[1];
          let value = declVal[2];
          lines[i] = line.replace(/^\s*(?:\w+<[^>]+>|[\w*]+)\s+(\w+)\s*=\s*([^;]+);/, `let ${varName} = ${value};`);
          continue;
        }
        
        // Match empty declaration: "Type varName;"
        let emptyDecl = line.match(/^\s*(?:\w+<[^>]+>|[\w*]+)\s+(\w+)\s*;/);
        if (emptyDecl) {
          let fullDecl = emptyDecl[0];
          let varName = emptyDecl[1];
          let typePart = fullDecl.replace(varName, '').replace(';', '').trim();
          let initVal = 'undefined';
          
          if (typePart.includes('vector') || typePart.includes('list') || typePart.includes('[]')) {
            initVal = '[]';
          } else if (typePart.includes('map') || typePart.includes('set')) {
            initVal = '{}';
          }
          lines[i] = line.replace(/^\s*(?:\w+<[^>]+>|[\w*]+)\s+(\w+)\s*;/, `let ${varName} = ${initVal};`);
        }
      }
      code = lines.join('\n');
      
      // 5. Clean up pointers, references, and C++ vector methods
      code = code.replace(/\bstd::vector<int>\b/g, 'Array');
      code = code.replace(/\bvector<int>\b/g, 'Array');
      code = code.replace(/\bstd::string\b/g, 'String');
      code = code.replace(/\bstring\b/g, 'String');
      code = code.replace(/\bunordered_map<[^>]+>\b/g, 'Object');
      code = code.replace(/\bunordered_set<[^>]+>\b/g, 'Set');
      code = code.replace(/\bint\b/g, 'let');
      code = code.replace(/\bbool\b/g, 'let');
      code = code.replace(/\bdouble\b/g, 'let');
      code = code.replace(/\bfloat\b/g, 'let');
      code = code.replace(/\bvoid\b/g, 'let');
      code = code.replace(/\bauto\b/g, 'let');
      
      // Replace vector push_back and size
      code = code.replace(/\.push_back\(/g, '.push(');
      code = code.replace(/\.size\(\)/g, '.length');
      
      // Replace C++ vector size constructor like "vector<int> res(2, 0);" or "res(2);"
      code = code.replace(/let\s+(\w+)\((\d+),\s*([^)]+)\);/g, 'let $1 = Array($2).fill($3);');
      code = code.replace(/let\s+(\w+)\((\d+)\);/g, 'let $1 = Array($2).fill(0);');
      
      // Map check replacements
      code = code.replace(/(\w+)\.find\(([^)]+)\)\s*!=\s*\1\.end\(\)/g, '($2 in $1)');
      code = code.replace(/(\w+)\.count\(([^)]+)\)/g, '($2 in $1)');
      
      // Return braces to brackets conversion: return {a, b}; -> return [a, b];
      code = code.replace(/return\s*\{([^}]*)\}\s*;/g, 'return [$1];');
    }
    
    if (lang === 'go') {
      // 1. Remove package and import lines
      code = code.replace(/package\s+\w+/g, '');
      code = code.replace(/import\s*\(?[\s\S]*?\)?/g, '');
      
      // 2. Convert Go function signature to JS function signature
      code = code.replace(/func\s+(\w+)\s*\(([^)]*)\)\s*([^{]+)/g, (match, funcName, args) => {
        let cleanArgs = args.split(',').map(arg => {
          let trimmed = arg.trim();
          if (!trimmed) return '';
          let parts = trimmed.split(/\s+/);
          return parts[0]; // first word is argument name
        }).filter(arg => arg !== '').join(', ');
        return `function ${funcName}(${cleanArgs})`;
      });
      
      // 3. Shorthand variable assignment: x := y -> let x = y
      code = code.replace(/(\w+)\s*:=\s*/g, 'let $1 = ');
      
      // 4. Map declaration make(map[type]type) -> {}
      code = code.replace(/make\s*\(map\[[^\]]+\][^)]+\)/g, '{}');
      
      // 5. Go slice lengths len(x) -> x.length
      code = code.replace(/\blen\((\w+)\)/g, '$1.length');
      
      // 6. Go range loops: for i, num := range nums {
      code = code.replace(/for\s+(\w+),\s*(\w+)\s*:=\s*range\s+(\w+)/g, 'for (let $1 = 0; $1 < $3.length; $1++) { let $2 = $3[$1]; ');
      
      // 7. Go slice initializations like []int{1, 2} or []int{}
      code = code.replace(/\[\]\w+\{\}/g, '[]');
      code = code.replace(/\[\]\w+\{([^}]+)\}/g, '[$1]');
    }
    
    return code;
  }

  serializePythonArg(val) {
    if (val === true) return 'True';
    if (val === false) return 'False';
    if (val === null) return 'None';
    if (Array.isArray(val)) {
      return '[' + val.map(v => this.serializePythonArg(v)).join(', ') + ']';
    }
    if (typeof val === 'object') {
      let items = [];
      for (let k in val) {
        items.push(`${JSON.stringify(k)}: ${this.serializePythonArg(val[k])}`);
      }
      return '{' + items.join(', ') + '}';
    }
    return JSON.stringify(val);
  }

  cleanPythonTypeHints(code) {
    // 1. Remove return type annotations like "-> list[int]" or "-> List[List[int]]"
    let cleaned = code.replace(/->\s*[^:]+/g, '');
    
    // 2. Remove argument type annotations inside def definitions
    cleaned = cleaned.replace(/def\s+(\w+)\s*\(([^)]*)\):/g, (match, funcName, args) => {
      let cleanArgs = args.split(',').map(arg => {
        let parts = arg.split(':');
        return parts[0].trim(); // take just the name part
      }).join(', ');
      return `def ${funcName}(${cleanArgs}):`;
    });
    
    return cleaned;
  }

  executePythonCode(userCode, methodName, args, callback) {
    let logs = [];
    
    // Setup Skulpt configuration
    Sk.configure({
      output: function(text) {
        logs.push(text);
      },
      read: function(x) {
        if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
          throw "File not found: '" + x + "'";
        return Sk.builtinFiles["files"][x];
      }
    });

    // We serialize the arguments to pass as literal Python values
    const pyArgs = args.map(arg => this.serializePythonArg(arg)).join(', ');
    
    // Clean type hints to prevent Skulpt compilation crashes
    const cleanedUserCode = this.cleanPythonTypeHints(userCode);

    // We append testing hooks supporting Solution classes and camel/snake methods
    const fullCode = `
${cleanedUserCode}

def __serialize(val):
    if val is True: return "true"
    if val is False: return "false"
    if val is None: return "null"
    if isinstance(val, str): return '"' + val.replace('"', '\\\\"') + '"'
    if isinstance(val, (int, float)): return str(val)
    if isinstance(val, list):
        return "[" + ", ".join(__serialize(x) for x in val) + "]"
    if isinstance(val, dict):
        return "{" + ", ".join(__serialize(k) + ": " + __serialize(v) for k, v in val.items()) + "}"
    return str(val)

def __run_test():
    try:
        # Check if 'Solution' class is defined
        if 'Solution' in globals():
            __sol = Solution()
            # Try to find target methods on Solution
            for __name in ['${methodName}', '${state.currentProblem.jsMethod}', '${state.currentProblem.pyMethod}']:
                if hasattr(__sol, __name):
                    # We pass self as first parameter or call directly
                    __fn = getattr(__sol, __name)
                    return __fn(${pyArgs})
            raise NameError("Method not found on Solution class")
        else:
            # Try global function scope
            for __name in ['${methodName}', '${state.currentProblem.jsMethod}', '${state.currentProblem.pyMethod}']:
                if __name in globals():
                    return globals()[__name](${pyArgs})
            raise NameError("Function not found")
    except Exception as __e:
        print("TEST_ERR:" + str(__e))
        return "ERROR_SIGNAL"

__val = __run_test()
if __val != "ERROR_SIGNAL":
    print("TEST_OUT:" + __serialize(__val))
`;

    try {
      Sk.misceval.asyncToPromise(function() {
        return Sk.importMainWithBody("<stdin>", false, fullCode, true);
      }).then(
        function() {
          // Execution succeeded, let's parse console logs for test results
          let output = null;
          let success = true;
          let errorMsg = "";
          
          const filteredLogs = [];
          logs.forEach(line => {
            const cleanLine = line.trim();
            if (cleanLine.startsWith("TEST_OUT:")) {
              try {
                output = JSON.parse(cleanLine.replace("TEST_OUT:", ""));
              } catch (e) {
                success = false;
                errorMsg = "Serialization Error: Return value is not JSON compatible.";
              }
            } else if (cleanLine.startsWith("TEST_ERR:")) {
              success = false;
              errorMsg = cleanLine.replace("TEST_ERR:", "");
            } else {
              // normal user print
              filteredLogs.push(line);
            }
          });

          callback({
            success: success,
            output: output,
            error: errorMsg,
            logs: filteredLogs
          });
        },
        function(err) {
          // Skulpt compilation / evaluation failure
          callback({
            success: false,
            error: err.toString(),
            logs: logs
          });
        }
      );
    } catch (err) {
      callback({
        success: false,
        error: err.toString(),
        logs: logs
      });
    }
  }

  processExecutionResults(results, isSubmit, logsCollected) {
    const consoleLog = document.getElementById('console-log');
    consoleLog.innerText = '';

    if (!isSubmit) {
      // Single test case Run Code results
      const res = results[0];
      
      let consoleTxt = '';
      if (res.logs.length > 0) {
        consoleTxt += `[Standard Output]\n${res.logs.join('')}\n`;
      }

      if (res.success) {
        consoleTxt += `[Execution Success]\n`;
        consoleTxt += `Your Output: ${JSON.stringify(res.output)}\n`;
        consoleTxt += `Expected: ${JSON.stringify(state.currentProblem.testcases[state.activeTestcaseIndex].output)}\n\n`;
        
        if (res.passed) {
          consoleTxt += `STATUS: PASSED (Testcase matches expected output.)`;
        } else {
          consoleTxt += `STATUS: WRONG ANSWER (Actual and expected output mismatch.)`;
        }
      } else {
        consoleTxt += `[Runtime Error]\nError: ${res.error}`;
      }
      
      consoleLog.innerText = consoleTxt;
    } else {
      // Submission results
      let allPassed = true;
      let totalCases = results.length;
      let passedCases = 0;
      
      const dotsContainer = document.getElementById('modal-testcase-dots');
      dotsContainer.innerHTML = '';

      results.forEach((res, idx) => {
        const dot = document.createElement('span');
        if (res.success && res.passed) {
          dot.className = "testcase-dot passed";
          passedCases++;
        } else {
          dot.className = "testcase-dot failed";
          allPassed = false;
        }
        dotsContainer.appendChild(dot);
      });

      // Populate Modal Content
      const modal = document.getElementById('submission-modal');
      const icon = document.getElementById('modal-status-icon');
      const title = document.getElementById('modal-status-title');
      const desc = document.getElementById('modal-status-desc');
      const statTime = document.getElementById('modal-stat-time');
      const statScore = document.getElementById('modal-stat-score');

      if (allPassed) {
        icon.innerHTML = `<i class="fa-solid fa-circle-check success"></i>`;
        title.innerText = "Accepted";
        title.style.color = "var(--accent-green)";
        desc.innerText = `All ${passedCases}/${totalCases} test cases passed. Excellent work!`;
        
        statTime.innerText = `${Math.floor(Math.random() * 10) + 5}ms`;
        statScore.innerText = `+${state.currentProblem.points} XP`;
        
        // Update states
        const probId = state.currentProblem.id;
        
        // Add to solved list if not already solved
        if (!state.solved[probId]) {
          state.solved[probId] = true;
          state.points += state.currentProblem.points;
          state.streak++; // increment streak for new solves
        }

        // Add to clash stats
        if (state.currentProblem.category === 'clash') {
          if (!state.clashSolved[probId]) {
            state.clashSolved[probId] = true;
            state.clashScore += state.currentProblem.points;
          }
        }

        // Log this submission
        const lang = document.getElementById('lang-select').value;
        state.submissions.push({
          problemId: probId,
          title: state.currentProblem.title,
          category: state.currentProblem.category,
          lang: lang,
          status: "Accepted",
          time: statTime.innerText,
          timestamp: new Date().toISOString()
        });

        // Trigger Trial checking
        if (state.currentTrialId && state.currentProblem.id === problemsDb[trialsConfig.find(t=>t.id===state.currentTrialId).problemId].id) {
          // close editor and exit trial with success
          setTimeout(() => {
            modal.classList.remove('active');
            this.exitTrial(true);
          }, 2500);
        }

        this.saveState();
        this.updateHeaderStats();
        this.renderHeatmap();
      } else {
        icon.innerHTML = `<i class="fa-solid fa-circle-xmark fail"></i>`;
        title.innerText = "Rejected";
        title.style.color = "var(--accent-red)";
        desc.innerText = `${passedCases}/${totalCases} test cases passed. Check outputs and edge cases.`;
        
        statTime.innerText = "--";
        statScore.innerText = "+0 XP";

        // Log failed submission
        const lang = document.getElementById('lang-select').value;
        state.submissions.push({
          problemId: state.currentProblem.id,
          title: state.currentProblem.title,
          category: state.currentProblem.category,
          lang: lang,
          status: "Wrong Answer",
          time: "0ms",
          timestamp: new Date().toISOString()
        });
        
        this.saveState();
        this.renderHeatmap();
      }

      modal.classList.add('active');
      
      // Print overall status on execution console too
      consoleLog.innerText = `[Submission Completed]\nPassed Cases: ${passedCases}/${totalCases}\nStatus: ${allPassed ? 'ACCEPTED' : 'REJECTED'}`;
    }
  }

  // AI Chat Bot Mentor Engine
  resetAIChat() {
    const container = document.getElementById('ai-messages-container');
    container.innerHTML = `
      <div class="message system-msg">
        <div class="msg-content">
          <p>Welcome! I'm your Codify AI Mentor. I can explain the problem, suggest code structures, help fix syntax/runtime errors, or nudge you toward the optimal time complexity. I will never write the final code for you, but I'll guide you step-by-step!</p>
        </div>
      </div>
    `;
    document.getElementById('ai-chat-drawer').classList.remove('active');
  }

  sendAIMessage() {
    const inputBox = document.getElementById('ai-input-box');
    const query = inputBox.value.trim();
    if (!query) return;

    inputBox.value = '';
    
    // Render user bubble
    this.appendAIChatBubble(query, 'user-msg');
    
    // Scroll chat
    const container = document.getElementById('ai-messages-container');
    container.scrollTop = container.scrollHeight;

    // Show Typing Indicator
    const typing = document.createElement('div');
    typing.className = "message assistant-msg temp-typing";
    typing.innerHTML = `
      <div class="msg-content">
        <div class="typing-indicator">
          <span></span><span></span><span></span>
        </div>
      </div>
    `;
    container.appendChild(typing);
    container.scrollTop = container.scrollHeight;

    // Generate simulated AI reply
    setTimeout(() => {
      // Remove typing indicator
      const temp = container.querySelector('.temp-typing');
      if (temp) temp.remove();

      const userCode = state.editor.getValue();
      const lang = document.getElementById('lang-select').value;
      const probId = state.currentProblem ? state.currentProblem.id : "";
      
      const response = this.generateAIResponseText(query, userCode, probId, lang);
      this.appendAIChatBubble(response, 'assistant-msg');
      container.scrollTop = container.scrollHeight;
    }, 1200);
  }

  appendAIChatBubble(text, className) {
    const container = document.getElementById('ai-messages-container');
    const msg = document.createElement('div');
    msg.className = `message ${className}`;
    
    // Simple markdown code block and list parsing helper for assistant replies
    let formattedText = text;
    if (className === 'assistant-msg') {
      // escape html first
      formattedText = formattedText
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
      
      // parse backticks code blocks
      formattedText = formattedText.replace(/```(python|javascript|js)?([\s\S]*?)```/g, '<pre><code>$2</code></pre>');
      // parse inline code backticks
      formattedText = formattedText.replace(/`([^`]+)`/g, '<code>$1</code>');
      // parse lists
      formattedText = formattedText.replace(/\n\s*-\s+([^\n]+)/g, '<br>&bull; $1');
      // parse line breaks
      formattedText = formattedText.replace(/\n/g, '<br>');
    } else {
      formattedText = `<p>${formattedText}</p>`;
    }

    msg.innerHTML = `
      <div class="msg-content">
        ${formattedText}
      </div>
    `;
    container.appendChild(msg);
  }

  generateAIResponseText(query, code, problemId, lang) {
    const qLower = query.toLowerCase();
    
    if (problemId === "two-sum") {
      if (qLower.includes("explain") || qLower.includes("logic") || qLower.includes("start")) {
        return `Let's break down the **Two Sum** problem:
We want to find two indices in the array that sum to our target.
- **Goal:** Find index i and index j such that \`nums[i] + nums[j] == target\` (where i != j).
- **Brute Force approach:** Use two loops to test all pairs. That takes O(N²) time.
- **Optimal approach:** Walk through the array. For each number \`num\`, check if we have already seen its "complement" (\`target - num\`). If we have, we found our pair!
To search in O(1) time, we store the numbers we've visited in a Hash Map (dictionary).`;
      }
      
      if (qLower.includes("hint") || qLower.includes("optimize") || qLower.includes("complexity")) {
        return `To achieve O(N) time complexity, you should avoid nested loops:
- In JavaScript, use a Map object or a simple \`{}\` object.
- In Python, use a dictionary \`{}\`.
As you iterate through the list:
1. Calculate the complement: \`complement = target - num\`
2. Check if the complement is in your map.
3. If it is, return the index of the complement and the current index.
4. If not, add the current number and its index to your map: \`my_map[num] = index\`.`;
      }

      if (qLower.includes("check") || qLower.includes("error") || qLower.includes("bug")) {
        if (!code.includes("return") && !code.includes("print")) {
          return "I noticed that your code is missing a `return` statement. You need to return an array/list of two indices when you find the matching pair.";
        }
        if (lang === 'python' && !code.includes("in ") && !code.includes("dict")) {
          return "You are writing Python. Try using a dictionary (e.g. `seen = {}`) to store the values and indices, and look up items using the `if complement in seen` keyword.";
        }
        if (lang === 'javascript' && !code.includes("Map") && !code.includes("hasOwnProperty")) {
          return "You are writing JavaScript. Using a `const seen = new Map();` or standard object `const seen = {};` will allow you to look up complements in O(1) time.";
        }
        return "Your code structure looks promising. Make sure you are adding elements to your hash map correctly as you traverse the array, and return the correct indices.";
      }
    }

    if (problemId === "valid-parentheses") {
      if (qLower.includes("explain") || qLower.includes("logic") || qLower.includes("start")) {
        return `To solve **Valid Parentheses**, we need to verify bracket ordering:
- **Core Concept:** Brackets must be closed in reverse order of how they were opened. This matches a **Stack** data structure (Last-In, First-Out).
- **Algorithm:**
1. Maintain a list representing a Stack.
2. Loop through each character in the string.
3. If it's an opening bracket (\`(\`, \`[\`, \`{\`), push it onto the stack.
4. If it's a closing bracket, check if the stack is empty. If it is, return \`false\`. Otherwise, pop the top bracket from the stack and verify if it matches the current closing bracket.
5. After the loop, if the stack is empty, return \`true\`, else return \`false\`.`;
      }
      if (qLower.includes("hint") || qLower.includes("error") || qLower.includes("bug") || qLower.includes("check")) {
        if (!code.includes("stack") && !code.includes("arr") && !code.includes("[]")) {
          return "Remember to initialize an empty list or array to act as your stack. In Python, you can use `stack = []` and operations like `stack.append(char)` and `stack.pop()`.";
        }
        if (code.includes("pop") && !code.includes("len") && !code.includes("length")) {
          return "Caution! Make sure you check if your stack is empty *before* you call `pop()`. Popping from an empty stack will trigger a runtime index error.";
        }
        return "Double check that your matching pairs mapping is correct: '(' with ')', '[' with ']', and '{' with '}'. Also, remember that at the end of the function, the stack must be completely empty to return true.";
      }
    }

    if (problemId === "fizz-buzz") {
      if (qLower.includes("explain") || qLower.includes("logic") || qLower.includes("start")) {
        return `Fizz Buzz is all about checking divisibility:
- **Rules:**
- Divisible by 3 and 5 (or 15) $\rightarrow$ "FizzBuzz"
- Divisible by 3 $\rightarrow$ "Fizz"
- Divisible by 5 $\rightarrow$ "Buzz"
- Otherwise $\rightarrow$ string representation of the number.
- **Important:** Since 15 is divisible by both 3 and 5, checking divisibility by 15 *must* be done before checking 3 or 5 individually!`;
      }
      if (qLower.includes("hint") || qLower.includes("error") || qLower.includes("bug") || qLower.includes("check")) {
        if (code.indexOf("% 3") < code.indexOf("% 15") && code.includes("% 15")) {
          return "Aha! I see you are checking `i % 3 == 0` *before* checking `i % 15 == 0`. Because of this, a number like 15 will hit the 3-condition first and print 'Fizz' instead of 'FizzBuzz'. Rearrange your checks!";
        }
        if (lang === 'python' && !code.includes("str(")) {
          return "Tip: In Python, you must convert integer loop variables to strings using `str(i)` before appending them to your result list.";
        }
        return "Ensure your output matches a 1-indexed range (from 1 up to `n` inclusive). Check that you aren't returning 0-indexed numbers.";
      }
    }

    // Default fallbacks
    if (qLower.includes("help") || qLower.includes("code") || qLower.includes("work")) {
      return `I can help you review this code! 
- What specific error are you seeing in the execution console?
- Make sure all variable declarations are correct and your method signatures match the defaults.
- Let me know if you would like me to explain the algorithmic logic or check for syntax errors.`;
    }

    return `I see you are working on this challenge in ${lang === 'javascript' ? 'JavaScript' : 'Python'}. 
To tackle this:
1. Ensure your solution fits within the default function boundary.
2. Consider edge cases (empty lists, single elements, negative bounds).
3. Click **Run Code** to check outputs against Case 1, or ask me specific questions about runtime errors or algorithm concepts!`;
  }
}

// Instantiate application on page load
let app;
window.addEventListener('DOMContentLoaded', () => {
  app = new CodifyApp();
});
