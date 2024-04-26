module.exports = {
  extends: [
    "react-app",
    "react-app/jest",
    "plugin:react-perf/recommended",
    "./typescript.js",
    "prettier",
  ],
  rules: {
    "react/jsx-curly-brace-presence": ["warn", "never"],
    "react-perf/jsx-no-new-object-as-prop": 1,
    "react-perf/jsx-no-new-array-as-prop": 1,
    "react-perf/jsx-no-new-function-as-prop": 1,
    "testing-library/prefer-screen-queries": 1,
    "testing-library/no-unnecessary-act": 1,
    "jest/no-conditional-expect": 1,
    "import/first": 1,
  },
};
