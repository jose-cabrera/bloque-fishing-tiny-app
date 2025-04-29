module.exports = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    darkMode: 'class', // enables 'dark' variants via adding a 'class'
    theme: {
      extend: {
        colors: {
          background: {
            light: '#ffffff',
            dark: '#000000',
            gradientDark: '#444444', // Used for gradients
          },
          surface: {
            light: '#f5f5f5',
            dark: '#1e1e1e',
          },
          textPrimary: {
            light: '#222222',
            dark: '#f5f5f5',
          },
          textSecondary: {
            light: '#666666',
            dark: '#b0b0b0',
          },
          divider: {
            light: '#dddddd',
            dark: '#333333',
          },
          buttonPrimary: {
            light: '#005a94', 
            dark: '#00bcd4',
          },
          buttonPrimaryHover: {
            light: '#004873',
            dark: '#00acc1',
          },
          buttonSecondary: {
            light: '#bbbbbb',
            dark: '#666666',
          },
          buttonSecondaryHover: {
            light: '#cccccc',
            dark: '#777777',
          },
          gold: {
            light: '#cfa300',
            dark: '#ffd700',
          },
          danger: {
            light: '#d32f2f',
            dark: '#ff5252',
          },
          success: {
            light: '#388e3c',
            dark: '#4caf50',
          },
        },
      },
    },
    plugins: [],
  };