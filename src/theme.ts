import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2196f3', // Weather app blue
    },
    secondary: {
      main: '#ff9800', // Warm orange
    },
    background: {
      default: '#fafafa',
    },
  },
  typography: {
    h1: {
      fontSize: '2.5rem',
      fontWeight: 300,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          borderRadius: 12,
        },
      },
    },
  },
  spacing: 8, // Provides good whitespace
});