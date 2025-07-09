import React from 'react';
import { ReactFlowProvider } from 'reactflow';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { NotificationProvider } from './components/common/Notification';
import FlowBuilder from './components/FlowBuilder/FlowBuilder';
import MainLayout from './components/Layout/MainLayout';
import { Box } from '@mui/material';
import '@fontsource/inter';
import './App.css';

// Create a professional theme instance
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#4F46E5',
      light: '#818cf8',
      dark: '#3730a3',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#10B981',
      light: '#6EE7B7',
      dark: '#059669',
    },
    background: {
      default: '#F9FAFB',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#111827',
      secondary: '#4B5563',
      disabled: '#9CA3AF',
    },
    divider: '#E5E7EB',
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2rem',
      lineHeight: 1.2,
    },
    h2: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.3,
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.4,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          padding: '8px 16px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
          },
        },
        contained: {
          '&:hover': {
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.04)',
          border: '1px solid #E5E7EB',
          '&:hover': {
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
          },
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NotificationProvider>
        <MainLayout>
          <Box sx={{ height: 'calc(100vh - 64px - 64px)', width: '100%' }}> {/* Account for header and footer */}
            <ReactFlowProvider>
              <FlowBuilder />
            </ReactFlowProvider>
          </Box>
        </MainLayout>
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;
