module.exports = {
  extends: [
    'react-app',
    'react-app/jest'
  ],
  rules: {
    // Downgrade all problematic rules from error to warn
    'no-unused-vars': 'warn',
    'react-hooks/exhaustive-deps': 'warn',
    'no-eval': 'warn',
    'jsx-a11y/img-redundant-alt': 'warn',
    'no-dupe-class-members': 'warn',
    'import/no-anonymous-default-export': 'warn'
  }
};