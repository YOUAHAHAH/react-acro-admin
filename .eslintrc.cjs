module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:import/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "prettier"
  ],
  plugins: ["react", "prettier"],
  rules: {
    "no-unused-vars": 0,
    "react/react-in-jsx-scope": "off",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["off"],
    "@typescript-eslint/no-explicit-any": ["off"]
  },
  settings: {
    "import/resolver": {
      typescript: {}
    },
    react: {
      version: "detect"
    }
  }
};
