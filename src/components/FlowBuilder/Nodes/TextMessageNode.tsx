import React from 'react';
import { Handle, NodeProps, Position } from 'reactflow';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import MessageIcon from '@mui/icons-material/Message';
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

const NodeContainer = styled(Box)({
  width: '240px',
  borderRadius: '16px',
  backgroundColor: 'white',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  overflow: 'visible',
  fontFamily: 'Inter, sans-serif',
  position: 'relative',
  zIndex: 1,
  border: '1.5px solid #E2E8F0',
  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    boxShadow: '0 4px 16px 0 rgba(0, 0, 0, 0.1)',
    transform: 'translateY(-2px)',
    borderColor: '#CBD5E1',
  },
  '& .react-flow__handle': {
    visibility: 'visible',
    width: '12px',
    height: '12px',
    borderRadius: '50%',
  },
  '&.selected': {
    border: '2px solid #4F46E5',
    boxShadow: '0 0 0 2px rgba(79, 70, 229, 0.2), 0 6px 16px 0 rgba(0, 0, 0, 0.1)',
    transform: 'translateY(-2px)',
  },
});

const NodeHeader = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px 16px',
  backgroundColor: '#2563EB',
  borderBottom: '1px solid #1D4ED8',
  '& .left-section': {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  '& .message-icon': {
    color: 'white',
    fontSize: '16px',
  },
  '& .whatsapp-icon': {
    color: 'white',
    backgroundColor: '#25D366',
    fontSize: '14px',
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    padding: '3px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
  },
  '& .title': {
    fontSize: '12px',
    fontWeight: 600,
    color: 'white',
    margin: 0,
    lineHeight: 1.2,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
});

const NodeContent = styled(Box)({
  padding: '12px 16px',
  backgroundColor: '#F8FAFC',
  '& .message-text': {
    color: '#1E40AF',
    fontSize: '13px',
    lineHeight: '1.4',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    fontFamily: 'monospace',
    backgroundColor: '#EFF6FF',
    padding: '10px 12px',
    borderRadius: '8px',
    border: '1px solid #BFDBFE',
    boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.05)',
    minHeight: '44px',
    display: 'flex',
    alignItems: 'center',
    transition: 'all 0.2s ease',
    '&:hover': {
      borderColor: '#93C5FD',
      boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.2)',
    }
  },
});

const HandleStyled = styled(Handle)({
  width: '14px',
  height: '14px',
  backgroundColor: 'black',
  border: '2px solid white',
  '&.react-flow__handle-right': {
    right: '-12px',
    top: '50%',
    transform: 'translateY(-50%)',
  },
  '&.react-flow__handle-left': {
    left: '-12px',
    top: '50%',
    transform: 'translateY(-50%)',
  },
  '&:hover, &.react-flow__handle-connecting, &.react-flow__handle-valid': {
    backgroundColor: 'black',
    borderColor: 'white',
    transform: 'scale(1.2) translateY(-50%)',
  },
  transition: 'all 0.2s ease-in-out',
});

const TextMessageNode: React.FC<NodeProps> = ({ data, selected }) => {
  return (
    <NodeContainer className={selected ? 'selected' : ''}>
      <HandleStyled type="target" position={Position.Left} isConnectable />
      <NodeHeader>
        <div className="left-section">
          <MessageIcon className="message-icon" />
          <Typography className="title">Send Message</Typography>
        </div>
        <WhatsAppIcon className="whatsapp-icon" />
      </NodeHeader>
      <NodeContent>
        <Typography component="div" variant="body2" className="message-text">
          {data.label || 'New message'}
        </Typography>
      </NodeContent>
      <HandleStyled 
        type="source" 
        position={Position.Right} 
        isConnectable
        id="a"
      />
    </NodeContainer>
  );
};

export default TextMessageNode;
