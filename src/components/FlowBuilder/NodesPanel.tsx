import React, { useCallback } from 'react';
import { Box, Typography, styled } from '@mui/material';
import { useReactFlow, Node } from 'reactflow';
import MessageIcon from '@mui/icons-material/Message';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const PanelContainer = styled(Box)({
  width: '280px',
  backgroundColor: '#FFFFFF',
  borderRight: '1px solid #E2E8F0',
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  overflowY: 'auto',
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

const PanelHeader = styled(Typography)({
  fontSize: '13px',
  fontWeight: 600,
  color: '#64748B',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  marginBottom: '4px',
  paddingBottom: '8px',
  borderBottom: '1px solid #F1F5F9',
});

const NodeItem = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '12px 16px',
  backgroundColor: '#FFFFFF',
  borderRadius: '8px',
  border: '1px solid #E2E8F0',
  cursor: 'grab',
  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    backgroundColor: '#F8FAFF',
    borderColor: '#C7D2FE',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
    transform: 'translateX(2px)',
  },
  '&:active': {
    cursor: 'grabbing',
  },
  '& .message-icon': {
    color: '#4F46E5',
    fontSize: '18px',
    flexShrink: 0,
  },
  '& .whatsapp-icon': {
    color: '#25D366',
    fontSize: '18px',
    flexShrink: 0,
    marginLeft: 'auto',
  },
  '& .label': {
    fontSize: '13px',
    color: '#333',
    fontWeight: 500,
  },
});

const NodesPanel: React.FC = () => {
  const { setNodes, screenToFlowPosition } = useReactFlow();

  const nodeTypes = [
    {
      type: 'textMessage',
      label: 'Message',
    },
  ];

  // Function to handle drag start
  const onDragStart = useCallback((event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
    
    // Add a class to the dragged element
    const target = event.target as HTMLElement;
    target.classList.add('dragging');
  }, []);

  // Function to add a new text message node
  const addTextNode = useCallback((event: React.MouseEvent) => {
    const position = screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    });

    const newNode: Node = {
      id: `node-${Date.now()}`,
      type: 'textMessage',
      position,
      data: { label: 'New message' },
    };
    
    setNodes((nodes) => [...nodes, newNode]);
  }, [setNodes, screenToFlowPosition]);

  return (
    <PanelContainer>
      <PanelHeader>Add Nodes</PanelHeader>
      <Typography variant="body2" color="textSecondary" sx={{ mb: 2, fontSize: '13px' }}>
        Drag and drop nodes to the canvas
      </Typography>
      
      {nodeTypes.map((nodeType) => (
        <NodeItem
          key={nodeType.type}
          onDragStart={(event) => onDragStart(event, nodeType.type)}
          draggable
          onDragEnd={(event) => {
            const target = event.target as HTMLElement;
            target.classList.remove('dragging');
          }}
          onClick={addTextNode}
          onDragOver={(e) => e.preventDefault()}
        >
          <MessageIcon className="message-icon" />
          <Typography className="label">Message</Typography>
          <WhatsAppIcon className="whatsapp-icon" />
        </NodeItem>
      ))}
    </PanelContainer>
  );
};

export default NodesPanel;
