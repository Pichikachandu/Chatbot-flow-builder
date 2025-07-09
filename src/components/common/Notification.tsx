import React, { useEffect, useState } from 'react';
import { Box, Typography, Slide, styled } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';

type NotificationType = 'success' | 'error' | 'info' | 'warning';

interface NotificationContainerProps {
  type: NotificationType;
  children?: React.ReactNode;
}

const getNotificationColor = (type: NotificationType) => {
  switch (type) {
    case 'success':
      return '#4CAF50';
    case 'error':
      return '#F44336';
    case 'warning':
      return '#FF9800';
    case 'info':
    default:
      return '#2196F3';
  }
};

const NotificationContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'type',
})<NotificationContainerProps>(({ theme, type }) => ({
  position: 'fixed',
  top: '20px',
  right: '20px',
  backgroundColor: getNotificationColor(type),
  color: '#FFFFFF',
  padding: '12px 20px',
  borderRadius: '6px',
  display: 'flex',
  alignItems: 'flex-start',
  gap: '12px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  zIndex: 1400,
  minWidth: '320px',
  maxWidth: '400px',
  animation: 'slideIn 0.3s ease-out',
  '& .MuiSvgIcon-root': {
    fontSize: '20px',
    color: '#FFFFFF',
    flexShrink: 0,
    marginTop: '2px',
  },
  '& .MuiTypography-root': {
    color: '#FFFFFF',
    fontWeight: 500,
    lineHeight: 1.5,
    fontSize: '0.9375rem',
    wordBreak: 'break-word',
  },
  '@keyframes slideIn': {
    from: { transform: 'translateX(100%)', opacity: 0 },
    to: { transform: 'translateX(0)', opacity: 1 },
  },
}));

interface NotificationProps {
  message: string | React.ReactNode;
  type: NotificationType;
  onClose: () => void;
}

export const Notification: React.FC<NotificationProps> = ({ message, type = 'info', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const renderIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircleIcon />;
      case 'error':
        return <ErrorIcon />;
      case 'warning':
        return <WarningIcon />;
      case 'info':
      default:
        return <InfoIcon />;
    }
  };

  return (
    <Slide direction="left" in={true} mountOnEnter unmountOnExit>
      <NotificationContainer type={type}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: '12px', width: '100%' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {renderIcon()}
          </Box>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            {typeof message === 'string' ? (
              <Typography variant="body1" sx={{ color: 'white' }}>{message}</Typography>
            ) : (
              message
            )}
          </Box>
        </Box>
      </NotificationContainer>
    </Slide>
  );
};

interface NotificationContextType {
  showNotification: (message: string | React.ReactNode, type?: NotificationType) => void;
  closeNotification: () => void;
}

const NotificationContext = React.createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [notification, setNotification] = useState<{
    open: boolean;
    message: string | React.ReactNode;
    type: NotificationType;
  }>({
    open: false,
    message: '',
    type: 'success',
  });

  const showNotification = (message: string | React.ReactNode, type: NotificationType = 'info') => {
    setNotification({ open: true, message, type });
  };

  const closeNotification = () => {
    setNotification(prev => ({ ...prev, open: false }));
  };

  return (
    <NotificationContext.Provider value={{ showNotification, closeNotification }}>
      {children}
      {notification.open && (
        <Notification 
          message={notification.message} 
          type={notification.type} 
          onClose={closeNotification} 
        />
      )}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = React.useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
