export default {
  parserOptions: {
    sourceType: "module",
  },
  env: {
    browser: true,
    es6: true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  plugins: ["react"],
};
