import React, { useState, useEffect } from 'react';
import { Box, TextField, Typography, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Node, useReactFlow } from 'reactflow';
import { styled } from '@mui/material/styles';

type TextMessageNodeData = {
  label: string;
  // Add other node data properties as needed
};

type TextMessageNode = Node<TextMessageNodeData>;

const PanelContainer = styled(Box)({
  width: '320px',
  backgroundColor: '#FFFFFF',
  borderLeft: '1px solid #E2E8F0',
  padding: '24px',
  height: '100%',
  overflowY: 'auto',
  boxShadow: '-2px 0 12px rgba(0, 0, 0, 0.04)',
  '& .MuiTextField-root': {
    marginBottom: '16px',
    '& .MuiOutlinedInput-root': {
      borderRadius: '8px',
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: '#CBD5E1',
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: '#4F46E5',
        boxShadow: '0 0 0 2px rgba(79, 70, 229, 0.2)',
      },
    },
  },
  '& .MuiButton-root': {
    textTransform: 'none',
    fontWeight: 500,
    padding: '8px 16px',
    borderRadius: '8px',
    boxShadow: 'none',
    '&:hover': {
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    },
  },
  '&::-webkit-scrollbar': {
    width: '6px',
  },
  '&::-webkit-scrollbar-track': {
    background: '#f8fafc',
    borderRadius: '3px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: '#cbd5e1',
    borderRadius: '3px',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    background: '#94a3b8',
  },
});

const SectionTitle = styled(Typography)({
  fontSize: '14px',
  fontWeight: 600,
  color: '#475569',
  marginBottom: '12px',
  marginTop: '20px',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  display: 'flex',
  alignItems: 'center',
  '&:first-of-type': {
    marginTop: '0',
  },
  '&::before': {
    content: '""',
    display: 'inline-block',
    width: '4px',
    height: '14px',
    backgroundColor: '#4F46E5',
    marginRight: '8px',
    borderRadius: '2px',
  },
});

const NodeIdText = styled(Box)({
  fontFamily: 'Fira Code, monospace',
  backgroundColor: '#f8fafc',
  padding: '8px 12px',
  borderRadius: '6px',
  fontSize: '13px',
  color: '#475569',
  wordBreak: 'break-all',
  border: '1px solid #e2e8f0',
  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    borderColor: '#c7d2fe',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
  },
});


const StyledTextField = styled(TextField)({
  marginBottom: '20px',
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    '&:hover fieldset': {
      borderColor: '#CBD5E1',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#4F46E5',
      boxShadow: '0 0 0 2px rgba(79, 70, 229, 0.2)',
    },
  },
  '& .MuiOutlinedInput-input': {
    padding: '12px 14px',
    fontSize: '14px',
    '&::placeholder': {
      color: '#9CA3AF',
      opacity: 1,
    },
  },
  '& .MuiInputLabel-root': {
    color: '#6B7280',
    '&.Mui-focused': {
      color: '#4F46E5',
    },
    '&.MuiInputLabel-shrink': {
      transform: 'translate(14px, -9px) scale(0.85)',
      backgroundColor: 'white',
      padding: '0 4px',
    },
  },
});

interface SettingsPanelProps {
  selectedNode: TextMessageNode | null;
  onBack: () => void;
  setNodes: (nodes: any[]) => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({ selectedNode, onBack }) => {
  const [message, setMessage] = useState('');
  const { setNodes, getNodes } = useReactFlow();

  useEffect(() => {
    if (selectedNode) {
      setMessage(selectedNode.data?.label || '');
    }
  }, [selectedNode]);

  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMessage = event.target.value;
    setMessage(newMessage);

    // Update the node's data
    if (selectedNode) {
      setNodes(
        getNodes().map((node) => {
          if (node.id === selectedNode.id) {
            return {
              ...node,
              data: {
                ...node.data,
                label: newMessage,
              },
            };
          }
          return node;
        })
      );
    }
  };

  if (!selectedNode) {
    return (
      <PanelContainer>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          mb: 3,
          position: 'relative',
          minHeight: '40px'
        }}>
          <IconButton 
            onClick={onBack}
            size="small"
            sx={{
              position: 'absolute',
              left: 0,
              color: 'text.secondary',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.02)',
              },
            }}
          >
            <ArrowBackIcon fontSize="small" />
          </IconButton>
          <Typography 
            variant="subtitle2" 
            sx={{ 
              textAlign: 'center', 
              width: '100%',
              fontWeight: 600,
              color: 'text.primary',
            }}
          >
            Node Settings
          </Typography>
        </Box>
        <Box sx={{ 
          p: 3, 
          textAlign: 'center', 
          color: 'text.secondary',
          backgroundColor: 'rgba(0, 0, 0, 0.01)',
          borderRadius: 1,
          border: '1px dashed',
          borderColor: 'divider',
          my: 2
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 7H13V13H11V7ZM11 15H13V17H11V15Z" fill="#9CA3AF"/>
          </svg>
          <Typography variant="body2" sx={{ mt: 1 }}>Select a node to edit its properties</Typography>
        </Box>
      </PanelContainer>
    );
  }

  return (
    <PanelContainer>
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        mb: 3,
        position: 'relative',
        minHeight: '40px',
        borderBottom: '1px solid #f0f0f0',
        pb: 2
      }}>
        <IconButton 
          onClick={onBack}
          size="small"
          sx={{
            position: 'absolute',
            left: 0,
            color: 'text.secondary',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.02)',
            },
          }}
        >
          <ArrowBackIcon fontSize="small" />
        </IconButton>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 1,
          width: '100%',
          justifyContent: 'center'
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H5.17L4 17.17V4H20V16Z" fill="#4F46E5"/>
          </svg>
          <Typography variant="h2" sx={{ fontSize: '1.125rem', fontWeight: 600 }}>Message</Typography>
        </Box>
      </Box>
      
      <Box sx={{ px: 2, py: 1, mb: 2 }}>
        <SectionTitle>Text</SectionTitle>
        <StyledTextField
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          value={message}
          onChange={handleMessageChange}
          placeholder="Type your message here..."
        />
      </Box>
      
      <Box sx={{ 
        mt: 'auto', 
        p: 2, 
        borderTop: '1px solid #f0f0f0',
        backgroundColor: '#fafafa',
      }}>
        <SectionTitle>Node ID</SectionTitle>
        <NodeIdText>{selectedNode.id}</NodeIdText>
      </Box>
    </PanelContainer>
  );
};


